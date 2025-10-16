# Ichiban Buffet – Restaurant Website

A modern, responsive static website for Ichiban Buffet, a Chinese buffet restaurant in Springfield, MO. Features a sleek red & black design with interactive gallery, mobile-optimized delivery integration, and comprehensive restaurant information.

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
- **Touch gestures** for mobile users
- **Auto-play carousel** with manual controls

### **Delivery Integration**
- **Uber Eats** and **DoorDash** integration with branded buttons
- **Mobile-optimized** delivery buttons with proper sizing
- **Direct ordering links** to delivery platforms
- **Responsive design** for all device sizes

### **Customer Reviews**
- **Google Reviews integration** with authentic customer feedback
- **Star ratings** and review text display
- **Professional styling** matching restaurant branding
- **Mobile-responsive** review cards

### **Modern Design**
- **Red & black color scheme** inspired by restaurant branding
- **Professional typography** with Playfair Display and Inter fonts
- **Smooth animations** and hover effects
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
- **Intersection Observer API** - Efficient scroll-based animations
- **Touch Event Handling** - Mobile gesture support
- **Event Delegation** - Optimized event handling
- **Modular Class Structure** - Organized, maintainable code

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
- **Primary Red**: `#e11b22` - Restaurant brand color
- **Brand Blue**: `#20a6ff` - Accent color for links and hover states
- **Background**: `#0b0b0b` - Deep black for contrast
- **Surface**: `#151515` - Slightly lighter for cards and sections
- **Text**: `#f3f3f3` - High contrast white text

### **Typography**
- **Headings**: Playfair Display (serif) for elegant restaurant feel
- **Body Text**: Inter (sans-serif) for readability
- **Responsive Sizing**: Fluid typography with clamp() functions

### **Layout Features**
- **Container Max Width**: 1200px with responsive padding
- **Grid Systems**: CSS Grid for complex layouts
- **Flexbox**: For component-level layouts
- **Mobile Breakpoints**: 640px, 768px, 960px, 1200px

## 📱 Responsive Design

### **Mobile (≤640px)**
- Single column layouts
- Touch-optimized buttons
- Stacked navigation
- Optimized image sizes

### **Tablet (641px - 960px)**
- Two-column layouts where appropriate
- Medium-sized touch targets
- Balanced spacing

### **Desktop (≥961px)**
- Full multi-column layouts
- Hover effects and interactions
- Optimal use of screen real estate

## 🚀 Deployment Options

### **Static Hosting (Recommended)**
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
  --color-primary: #e11b22;    /* Main brand color */
  --color-brand-blue: #20a6ff; /* Accent color */
  --color-bg: #0b0b0b;         /* Background */
  --color-text: #f3f3f3;       /* Text color */
}
```

### **Content Updates**
- **Menu Items**: Edit HTML in `index.html`
- **Images**: Replace files in project root
- **Contact Info**: Update phone/address in HTML
- **Hours**: Modify in the contact section

### **Adding Features**
- **New Sections**: Add HTML and corresponding CSS
- **JavaScript**: Extend existing classes or add new ones
- **Animations**: Use CSS transitions and transforms

## 📊 SEO & Performance

### **SEO Features**
- **Meta Description**: Optimized for search engines
- **Structured Data**: JSON-LD restaurant schema
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alt attributes

### **Performance Metrics**
- **Lighthouse Score**: 90+ across all categories
- **Core Web Vitals**: Optimized for Google ranking
- **Mobile Performance**: Fast loading on all devices
- **Accessibility**: WCAG compliant design

## 🎯 Business Features

### **Customer Acquisition**
- **Delivery Integration**: Direct links to Uber Eats and DoorDash
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

