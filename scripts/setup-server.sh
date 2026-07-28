#!/usr/bin/env bash
# Kør én gang på en ny Ubuntu 24.04 VPS på Hetzner:
#   curl -fsSL https://raw.githubusercontent.com/madsdlund-nielsen/qlim8-landing/main/scripts/setup-server.sh | bash
set -euo pipefail

# Domæne og Let's Encrypt-e-mail sættes i scripts/init-letsencrypt.sh, som
# udsteder certifikatet — de bruges ikke her.
APP_DIR="/opt/qlim8"

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
# BEVIDST TOMT. Certifikater håndteres udelukkende af certbot-containeren i
# docker-compose.yml, som skriver til det navngivne volume `certbot-etc`.
#
# Her stod tidligere en host-installeret certbot (snap) der udstedte med
# --standalone til hostens /etc/letsencrypt, plus et /etc/cron.d/certbot-renew
# job. Det er fjernet, fordi hostens /etc/letsencrypt er et ANDET filsystem end
# det volume nginx-containeren læser fra — fornyelser dér nåede aldrig frem til
# nginx. Kombineret med at intet genindlæste nginx udløb certifikatet
# 2026-07-27 20:16Z mens nginx blev ved med at servere det gamle.
#
# Bootstrap af certifikat sker med scripts/init-letsencrypt.sh EFTER første
# deploy (se trin 3 nedenfor). Fornyelse sker derefter automatisk: certbot
# fornyer hver 12. time, og nginx genindlæser hver 6. time.
#
# Kører du dette script på en server der stadig har det gamle cron-job:
#   rm -f /etc/cron.d/certbot-renew
rm -f /etc/cron.d/certbot-renew

# ── 5. Deploy-mappe + config ─────────────────────────────────────────────────
# Både docker-compose.yml og nginx.conf hentes direkte fra repoet. De blev
# tidligere skrevet som en heredoc-kopi her i scriptet, hvilket drev fra
# repoets version — bl.a. monterede kopien hostens /etc/letsencrypt i stedet
# for volumet `certbot-etc`, så de to filer beskrev to forskellige
# certifikat-lagre. Deploy-workflowet scp'er alligevel repoets version ud over
# denne ved hver deploy, så repoet er eneste kilde til sandhed.
mkdir -p "$APP_DIR"
for f in docker-compose.yml nginx.conf; do
  curl -fsSL \
    "https://raw.githubusercontent.com/madsdlund-nielsen/qlim8-landing/main/$f" \
    -o "$APP_DIR/$f"
done

# ── 6. Log ind på GHCR og start services ────────────────────────────────────
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
echo "3. Udsted certifikat (kun første gang — nginx starter ikke uden):"
echo "   bash scripts/init-letsencrypt.sh"
echo "   Derefter fornyer certbot hver 12. time, og nginx genindlæser hver 6. time."
echo ""
echo "4. Tilføj GitHub Secrets i dit repo:"
echo "   HETZNER_HOST  = $(curl -s ifconfig.me)"
echo "   HETZNER_USER  = root"
echo "   HETZNER_SSH_KEY = (indhold af din private SSH-nøgle)"
echo "──────────────────────────────────────────────"
