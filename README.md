# AS40271 — SFMIX IP Network Website

Static website for the SFMIX IP Network (AS40271), hosted at [ip.sfmix.org](https://ip.sfmix.org/).

## Stack

- **Hugo** v0.142.0
- **Deployed** via GitHub Pages + GitHub Actions on push to `main`

## Local Development

```bash
docker run --rm \
  -v "$(pwd):/src" \
  -p 1313:1313 \
  hugomods/hugo:exts-0.142.0 \
  server --bind 0.0.0.0 --baseURL http://localhost:1313/ --poll 500ms
```

Visit http://localhost:1313/.
