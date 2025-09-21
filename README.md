## Ichiban Buffet – Static Website

Red & black themed, Restaurantly-inspired static site for Ichiban Buffet (Springfield, MO). Built as a lightweight static bundle suitable for hosting on GoDaddy, Netlify, GitHub Pages, S3, or any static web host.

### Structure
- `index.html` – markup
- `styles.css` – theme styles (red/black)
- `script.js` – mobile nav, smooth scroll, footer year
- `assets/` – place images here (`logo.png`, hero background, gallery)

### Replace the hero background
For now the hero uses a dark gradient. To add a background image later, drop a file like `assets/hero.jpg` and either:

1) Update CSS (best for caching):
.hero__bg { background-image: url('assets/hero.jpg'); }

2) Or set it at runtime in `script.js`:
document.querySelector('.hero__bg').style.backgroundImage = "url('assets/hero.jpg')";

### Local preview
Open `index.html` directly in a browser, or serve with any static server:
python3 -m http.server 8080

### Deploying on GoDaddy (cPanel or basic hosting)
1. Create an `assets/` folder and upload your images (logo, hero, gallery).
2. Upload `index.html`, `styles.css`, `script.js`, and the `assets/` folder to your hosting root (often `public_html/`).
3. Ensure `index.html` is set as the default index file.

### SEO & structured data
- `meta description` is included
- JSON-LD `Restaurant` schema with address, phone, cuisines, and price range

### Customization
- Colors are driven by CSS variables at the top of `styles.css`.
- Navigation and sections can be adjusted in `index.html`.

