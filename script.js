// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('show');
  });
}

// Smooth scroll for hash links
document.addEventListener('click', (e) => {
  const target = e.target;
  if (target instanceof HTMLAnchorElement && target.hash && target.href.includes('#')) {
    const el = document.querySelector(target.hash);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navMenu?.classList.remove('show');
      navToggle?.setAttribute('aria-expanded', 'false');
    }
  }
});

// Year for footer
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Gallery Lightbox
class GalleryLightbox {
  constructor() {
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightboxImage');
    this.lightboxOverlay = document.getElementById('lightboxOverlay');
    this.closeBtn = document.getElementById('lightboxClose');
    this.prevBtn = document.getElementById('lightboxPrev');
    this.nextBtn = document.getElementById('lightboxNext');
    this.galleryItems = document.querySelectorAll('.gallery__item');
    this.images = Array.from(document.querySelectorAll('.gallery__image'));
    this.currentIndex = 0;
    
    this.init();
  }
  
  init() {
    // Add click event listeners to gallery items
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });
    
    // Add event listeners for lightbox controls
    this.closeBtn?.addEventListener('click', () => this.closeLightbox());
    this.lightboxOverlay?.addEventListener('click', () => this.closeLightbox());
    this.prevBtn?.addEventListener('click', () => this.prevImage());
    this.nextBtn?.addEventListener('click', () => this.nextImage());
    
    // Add keyboard event listeners
    document.addEventListener('keydown', (e) => {
      if (this.lightbox.classList.contains('active')) {
        switch (e.key) {
          case 'Escape':
            this.closeLightbox();
            break;
          case 'ArrowLeft':
            this.prevImage();
            break;
          case 'ArrowRight':
            this.nextImage();
            break;
        }
      }
    });
  }
  
  openLightbox(index) {
    this.currentIndex = index;
    const img = this.images[index];
    
    this.lightboxImage.src = img.src;
    this.lightboxImage.alt = img.alt;
    this.lightbox.classList.add('active');
    
    // Prevent body scrolling when lightbox is open
    document.body.style.overflow = 'hidden';
  }
  
  closeLightbox() {
    this.lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.updateImage();
  }
  
  prevImage() {
    this.currentIndex = this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
    this.updateImage();
  }
  
  updateImage() {
    const img = this.images[this.currentIndex];
    this.lightboxImage.src = img.src;
    this.lightboxImage.alt = img.alt;
  }
}

// Scroll Animation Observer
class ScrollAnimations {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
    this.init();
  }
  
  init() {
    // Add animation classes to elements
    this.addAnimationClasses();
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('[data-animation]');
    animatedElements.forEach(el => this.observer.observe(el));
  }
  
  addAnimationClasses() {
    // Hero section
    const heroTitle = document.querySelector('.hero__title');
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroActions = document.querySelector('.hero__actions');
    
    if (heroTitle) heroTitle.setAttribute('data-animation', 'fade-in');
    if (heroSubtitle) heroSubtitle.setAttribute('data-animation', 'fade-in');
    if (heroActions) heroActions.setAttribute('data-animation', 'fade-in');
    
    // Section titles
    const sectionTitles = document.querySelectorAll('.section__title');
    sectionTitles.forEach(title => title.setAttribute('data-animation', 'fade-in'));
    
    // About section
    const aboutContent = document.querySelector('.visit__content');
    const aboutImage = document.querySelector('.visit__image');
    if (aboutContent) aboutContent.setAttribute('data-animation', 'slide-in-left');
    if (aboutImage) aboutImage.setAttribute('data-animation', 'slide-in-right');
    
    // Menu sections
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach(section => section.setAttribute('data-animation', 'fade-in'));
    
    // Menu items with stagger
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
      item.setAttribute('data-animation', 'stagger-item');
      if (index < 6) {
        item.classList.add(`stagger-delay-${(index % 6) + 1}`);
      }
    });
    
    // Gallery items with stagger
    const galleryItems = document.querySelectorAll('.gallery__item');
    galleryItems.forEach((item, index) => {
      item.setAttribute('data-animation', 'stagger-item');
      if (index < 6) {
        item.classList.add(`stagger-delay-${(index % 6) + 1}`);
      }
    });
    
    // Review cards with stagger
    const reviewCards = document.querySelectorAll('.review-card');
    reviewCards.forEach((card, index) => {
      card.setAttribute('data-animation', 'stagger-item');
      if (index < 6) {
        card.classList.add(`stagger-delay-${(index % 6) + 1}`);
      }
    });
    
    // Pricing cards
    const pricingCards = document.querySelectorAll('.card--pricing');
    pricingCards.forEach(card => card.setAttribute('data-animation', 'scale-in'));
    
    // Contact section
    const contactContent = document.querySelector('.contact__content');
    if (contactContent) contactContent.setAttribute('data-animation', 'fade-in');
  }
  
  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const animationType = entry.target.getAttribute('data-animation');
        if (animationType) {
          entry.target.classList.add(animationType, 'visible');
          // Unobserve after animation to prevent re-triggering
          this.observer.unobserve(entry.target);
        }
      }
    });
  }
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GalleryLightbox();
  new ScrollAnimations();
});

