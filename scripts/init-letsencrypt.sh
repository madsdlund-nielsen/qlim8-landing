#!/bin/bash
# Run this ONCE on the Hetzner server after the first deploy to bootstrap SSL certs.
# After this, certbot renews automatically every 12h.
set -e

DOMAIN="qlim8.com"
EMAIL="mads@viridis-ramosa.com"
COMPOSE_DIR="/opt/qlim8"

cd "$COMPOSE_DIR"

echo "==> Creating temporary self-signed cert so nginx can start..."
docker compose run --rm --entrypoint "sh -c '
  mkdir -p /etc/letsencrypt/live/$DOMAIN &&
  openssl req -x509 -nodes -newkey rsa:2048 -days 1
    -keyout /etc/letsencrypt/live/$DOMAIN/privkey.pem
    -out /etc/letsencrypt/live/$DOMAIN/fullchain.pem
    -subj \"/CN=localhost\"
'" certbot

echo "==> Starting nginx with temporary cert..."
docker compose up --force-recreate -d nginx

echo "==> Removing temporary cert..."
docker compose run --rm --entrypoint "sh -c '
  rm -rf /etc/letsencrypt/live/$DOMAIN
  rm -rf /etc/letsencrypt/archive/$DOMAIN
  rm -rf /etc/letsencrypt/renewal/$DOMAIN.conf
'" certbot

echo "==> Requesting real Let's Encrypt certificate..."
docker compose run --rm --entrypoint "certbot certonly --webroot
  -w /var/www/certbot
  -d $DOMAIN -d www.$DOMAIN
  --email $EMAIL
  --agree-tos
  --no-eff-email
  --force-renewal" certbot

echo "==> Reloading nginx with real cert..."
docker compose exec nginx nginx -s reload

echo "==> Starting all services..."
docker compose up -d

echo ""
echo "Done! https://qlim8.com should be live."
