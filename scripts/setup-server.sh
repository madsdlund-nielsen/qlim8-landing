#!/usr/bin/env bash
# Kør én gang på en ny Ubuntu 24.04 VPS på Hetzner:
#   curl -fsSL https://raw.githubusercontent.com/madsdlund-nielsen/qlim8-landing/main/scripts/setup-server.sh | bash
# Eller med custom email:
#   curl -fsSL https://raw.githubusercontent.com/madsdlund-nielsen/qlim8-landing/main/scripts/setup-server.sh | EMAIL=you@example.com bash
set -euo pipefail

DOMAIN="${DOMAIN:-qlim8.com}"
EMAIL="${EMAIL:-mads@viridis-ramosa.com}"
APP_DIR="${APP_DIR:-/opt/qlim8}"

# ── 1. System-opdatering ────────────────────────────────────────────────────
apt-get update && apt-get upgrade -y
apt-get install -y curl git ufw

# ── 2. Docker ────────────────────────────────────────────────────────────────
curl -fsSL https://get.docker.com | sh
systemctl enable --now docker

# ── 3. Firewall ──────────────────────────────────────────────────────────────
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

# ── 4. Certbot (Let's Encrypt) ───────────────────────────────────────────────
snap install --classic certbot
ln -sf /snap/bin/certbot /usr/bin/certbot

# Hent certifikat (port 80 skal være fri — Docker er ikke startet endnu)
certbot certonly \
  --standalone \
  --non-interactive \
  --agree-tos \
  --email "$EMAIL" \
  -d "$DOMAIN" \
  -d "www.$DOMAIN"

# Auto-fornyelse: stop nginx → forny → start nginx igen
cat > /etc/cron.d/certbot-renew << 'EOF'
0 3 * * * root certbot renew --quiet \
  --pre-hook  "docker compose -f /opt/qlim8/docker-compose.yml stop nginx" \
  --post-hook "docker compose -f /opt/qlim8/docker-compose.yml start nginx"
EOF

# ── 5. Deploy-mappe ──────────────────────────────────────────────────────────
mkdir -p "$APP_DIR"
cat > "$APP_DIR/docker-compose.yml" << 'COMPOSE'
services:
  web:
    image: ghcr.io/madsdlund-nielsen/qlim8-landing:latest
    restart: unless-stopped
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    expose:
      - "3000"
    networks:
      - proxy

  nginx:
    image: nginx:alpine
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - /opt/qlim8/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - /etc/letsencrypt:/etc/letsencrypt:ro
    depends_on:
      - web
    networks:
      - proxy

networks:
  proxy:
    driver: bridge
COMPOSE

# ── 6. nginx-konfiguration ───────────────────────────────────────────────────
# Hentes direkte fra repoet (samme som nginx.conf i roden)
curl -fsSL \
  "https://raw.githubusercontent.com/madsdlund-nielsen/qlim8-landing/main/nginx.conf" \
  -o "$APP_DIR/nginx.conf"

# ── 7. Log ind på GHCR og start services ────────────────────────────────────
echo ""
echo "──────────────────────────────────────────────"
echo "Server klar. Næste skridt:"
echo ""
echo "1. Log ind på GitHub Container Registry:"
echo "   docker login ghcr.io -u DIT_GITHUB_BRUGERNAVN"
echo "   (brug et Personal Access Token med 'read:packages' scope)"
echo ""
echo "2. Start services:"
echo "   cd $APP_DIR && docker compose pull && docker compose up -d"
echo ""
echo "3. Tilføj GitHub Secrets i dit repo:"
echo "   HETZNER_HOST  = $(curl -s ifconfig.me)"
echo "   HETZNER_USER  = root"
echo "   HETZNER_SSH_KEY = (indhold af din private SSH-nøgle)"
echo "──────────────────────────────────────────────"
