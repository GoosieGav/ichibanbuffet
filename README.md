# Ichiban Buffet – Restaurant Website

A modern, responsive static website for Ichiban Buffet, a Chinese buffet restaurant in Springfield, MO. Visitors can compare buffet prices, browse photos, and find directions, hours, and DoorDash ordering.

## 🍽️ Website Features

### **Restaurant Information**
- **Complete menu sections** with real pricing and authentic dishes
- **Operating hours** and location details
- **Contact information** with clickable phone and address links
- **About section** highlighting restaurant features and atmosphere

### **Interactive Gallery**
- **Image carousel** with touch/swipe support for mobile devices
- **Lightbox functionality** for full-screen image viewing
- **Keyboard navigation** (arrow keys, escape)
- **Native horizontal scrolling** and manual previous/next controls
- **Direct photo links** work with JavaScript disabled

### **Delivery Integration**
- **DoorDash** ordering from the header and contact section
- **Mobile-optimized** delivery buttons with proper sizing
- **Direct ordering links** to delivery platforms
- **Responsive design** for all device sizes

### **Customer Reviews**
- **Selected Google reviews** included in the page HTML
- **Star ratings** and review text display
- **Professional styling** matching restaurant branding
- **Mobile-responsive** review cards

### **Modern Design**
- **Burgundy and cream palette** with the restaurant’s blue and red logo
- **Local serif and sans-serif fonts**
- **Reduced-motion support** for gallery navigation
- **Mobile-first responsive design**
- **Accessibility features** with proper ARIA labels

## 🛠️ Tech Stack

### **Frontend Technologies**
- **HTML5** - Semantic markup with proper structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, and custom properties
- **Vanilla JavaScript** - No frameworks, lightweight and fast
- **Responsive Design** - Mobile-first approach with breakpoints

### **CSS Features**
- **CSS Custom Properties** - Centralized color and spacing variables
- **CSS Grid & Flexbox** - Modern layout techniques
- **Media Queries** - Responsive design for all devices
- **CSS Transitions** - Smooth hover and interaction effects
- **Mobile Optimization** - Touch-friendly interfaces

### **JavaScript Features**
- Native modal photo viewer with keyboard controls and focus restoration
- Mobile navigation disclosure with native fragment links
- Holiday notices expire using Springfield’s Central time zone

### **Performance Optimizations**
- **Lightweight** - No external dependencies or frameworks
- **Fast Loading** - Optimized images and minimal CSS/JS
- **Caching Friendly** - Static assets with version parameters
- **SEO Optimized** - Proper meta tags and structured data

## 📁 Project Structure

```
ichiban-buffet/
├── index.html              # Main HTML file
├── styles.css              # Complete CSS styling
├── script.js               # JavaScript functionality
├── vercel.json             # Production HTTP security headers
├── images/                 # WebP photos, site logo, and favicon
├── assets/
│   └── logo.png            # Restaurant logo
├── ubereatslogo.png        # Uber Eats branding
├── doordashlogo.png        # DoorDash branding
├── new_background.png      # Hero background image
├── food_image.png          # Gallery images
├── foodimage.png
├── plate_image.png
├── restaurant_image.png
├── sushiBarimage.png
├── buffetbarimage.png
├── broccoli.png
├── crablegs.png
└── ichian_building.png
```

## 🎨 Design System

### **Color Palette**
- **Action color** `--wine` (#881f30)
- **Background** `--paper` (#fcf9f4)
- **Text** `--ink` (#241c19)

### **Typography**
- **Headings**: Georgia and local serif fallbacks
- **Body Text**: Locally available Inter or the system sans-serif
- **Responsive Sizing**: Fluid typography with clamp() functions

### **Layout Features**
- **Container Max Width**: 1200px with responsive padding
- **Grid Systems**: CSS Grid for complex layouts
- **Flexbox**: For component-level layouts
- **Mobile Breakpoints**: 38rem and 54rem

## 📱 Responsive Design

### **Small screens (up to 38rem)**
- Single column layouts
- Touch-optimized buttons
- Stacked navigation
- Optimized image sizes

### **Mid-sized screens (38rem to 54rem)**
- Two-column layouts where appropriate
- Medium-sized touch targets
- Balanced spacing

### **Wide screens (above 54rem)**
- Full multi-column layouts
- Hover effects and interactions
- Optimal use of screen real estate

## 🚀 Deployment Options

### Production security

The production site uses Vercel. `vercel.json` applies the Content Security Policy and other response headers across the site. Scripts, styles, and images load from the site’s own origin. Maps and DoorDash are outbound links. If hosting changes, configure equivalent headers on the new host.

### **Static Hosting Options**
- **GitHub Pages** - Free hosting with custom domain
- **Netlify** - Advanced features with form handling
- **Vercel** - Fast global CDN
- **AWS S3** - Scalable cloud hosting

### **Traditional Hosting**
- **GoDaddy** - cPanel file manager upload
- **Bluehost** - Standard shared hosting
- **Any static host** - Upload files to public_html

### **Local Development**
```bash
# Start local server
python3 -m http.server 8000

# Or with Node.js
npx serve .

# Or with PHP
php -S localhost:8000
```

## 🔧 Customization Guide

### **Colors**
Update CSS custom properties in `styles.css`:
```css
:root {
  --wine: #881f30;   /* Primary actions */
  --paper: #fcf9f4;  /* Page background */
  --ink: #241c19;    /* Body text */
}
```

### **Content Updates**
- **Menu Items**: Edit HTML in `index.html`
- **Images**: Update display assets in `images/`
- **Contact Info**: Update phone/address in HTML
- **Hours**: Update the visit strip, contact section, and Restaurant structured data together

### **Adding Features**
- **New Sections**: Add HTML and corresponding CSS
- **JavaScript**: Update navigation, photo controls, or holiday notices in `script.js`
- **Animations**: Use CSS transitions and transforms

## 📊 SEO & Performance

### **SEO Features**
- **Meta Description**: Optimized for search engines
- **Structured Data**: JSON-LD restaurant schema
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alt attributes

### **Loading behavior**
- Browsers select a buffet photo size for the hero using `srcset`.
- Gallery thumbnails and the exterior photo load lazily.

## 🎯 Business Features

### **Customer Acquisition**
- **Delivery Integration**: Direct links to DoorDash
- **Contact Information**: Clickable phone and address
- **Menu Display**: Complete pricing and item listings
- **Visual Appeal**: High-quality food photography

### **Customer Experience**
- **Mobile-First**: Optimized for mobile users
- **Fast Loading**: Quick access to information
- **Easy Navigation**: Clear menu structure
- **Professional Design**: Builds trust and credibility

## 📞 Support & Maintenance

### **Regular Updates**
- **Menu Changes**: Update HTML content
- **Image Updates**: Replace gallery photos
- **Contact Info**: Update phone/address as needed
- **Hours Changes**: Modify operating hours

### **Technical Maintenance**
- **Browser Testing**: Ensure compatibility
- **Performance Monitoring**: Check loading speeds
- **Mobile Testing**: Verify responsive design
- **SEO Monitoring**: Track search rankings

---

**Built with ❤️ for Ichiban Buffet, Springfield, MO**

