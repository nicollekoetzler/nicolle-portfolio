#!/usr/bin/env bash
# Downloads the site's images from the Figma file into ./assets.
# Figma's links expire 7 days after 2026-10-13; after that, ask Claude for fresh ones.
set -euo pipefail
cd "$(dirname "$0")/../public"
mkdir -p assets
B="https://www.figma.com/api/mcp/asset"
while read -r name id; do
  [ -z "$name" ] && continue
  echo "-> assets/$name"
  curl -fsSL -o "assets/$name" "$B/$id"
done <<'EOF'
photo-london.png 62be9d0a-8a8d-4fdc-b31f-4cf1ec02eee5.png
photo-bw.png cdea60e7-cee0-4eca-904b-c587751d8b46.png
photo-portrait.png cc586ca5-0aa4-4716-abda-d9f2cd6c236b.png
logo-california-trial.png a6fede95-549c-4ce3-8a5c-406d17c312cc.png
case-connector.png d1b45170-df5d-4d6d-85de-aa65e2fc7707.png
project-california-trial.png 65b459bd-4244-4434-a7bd-03ce42d92f1e.png
project-moore-payne.png 3e663a1d-4a45-4577-9ed0-649e0977f1f1.png
project-law-di-gras.png f324c674-0263-4d65-a4dd-3527240bfb91.png
project-wilk-law.png 156cf97a-9bfa-4cd8-8f07-5ab9cf964e3b.png
ellipse-8.svg f723ef32-459a-42ff-b440-dd12d9deb4f1.svg
ellipse-7.svg ad6130e7-5ceb-4e0d-9770-da0c84af756c.svg
nk-logo.svg 99c73dd9-56a2-4196-b7ae-d131526626e4.svg
linkedin.svg e28e7553-ed18-438b-8454-ef80d53d5b6a.svg
arrow-white.svg 50387d32-b678-4532-a4d5-f8afe6002d8c.svg
arrow-dark.svg 89fc3e36-c6a1-416d-9b63-2c5d2d36ac58.svg
logo-morrell-mask.svg d8593121-a057-4d92-917a-f8c4fd155e18.svg
logo-morrell.svg 92dbf1f3-df6b-4242-a4d2-b246b93064dc.svg
logo-justice4elders.svg 42e6c1ff-a773-49c9-9612-1fa81c4749d1.svg
logo-simmons-word.svg 89a2c4b7-622a-4f86-887e-026349831e8f.svg
logo-simmons-mark.svg 99bd87f4-9aa1-4f0b-8657-3b86f59e7b93.svg
logo-bush.svg fae7c1d2-121a-4064-a125-2b398afec916.svg
logo-taylor-siemens.svg 611bd341-6c6b-459b-aa32-5ecc7efb1d97.svg
EOF
echo "Pronto: $(ls assets | wc -l | tr -d ' ') arquivos em assets/"
