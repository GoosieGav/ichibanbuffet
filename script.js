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

// Gallery Carousel with Lightbox
class GalleryCarousel {
  constructor() {
    this.carousel = document.getElementById('galleryCarousel');
    this.prevBtn = document.getElementById('galleryPrev');
    this.nextBtn = document.getElementById('galleryNext');
    
    // Lightbox elements
    this.lightbox = document.getElementById('lightbox');
    this.lightboxImage = document.getElementById('lightboxImage');
    this.lightboxOverlay = document.getElementById('lightboxOverlay');
    this.lightboxClose = document.getElementById('lightboxClose');
    this.lightboxPrev = document.getElementById('lightboxPrev');
    this.lightboxNext = document.getElementById('lightboxNext');
    
    this.galleryItems = document.querySelectorAll('.gallery__item');
    this.images = Array.from(document.querySelectorAll('.gallery__image'));
    this.currentLightboxIndex = 0;
    
    this.init();
  }
  
  init() {
    // Carousel navigation
    this.prevBtn?.addEventListener('click', () => this.scrollCarousel('prev'));
    this.nextBtn?.addEventListener('click', () => this.scrollCarousel('next'));
    
    // Lightbox functionality
    this.galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });
    
    this.lightboxClose?.addEventListener('click', () => this.closeLightbox());
    this.lightboxOverlay?.addEventListener('click', () => this.closeLightbox());
    this.lightboxPrev?.addEventListener('click', () => this.prevImage());
    this.lightboxNext?.addEventListener('click', () => this.nextImage());
    
    // Keyboard event listeners
    document.addEventListener('keydown', (e) => {
      if (this.lightbox?.classList.contains('active')) {
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
  
  scrollCarousel(direction) {
    if (!this.carousel) return;
    
    const scrollAmount = 300; // Adjust based on image width + gap
    const currentScroll = this.carousel.scrollLeft;
    
    if (direction === 'next') {
      this.carousel.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    } else {
      this.carousel.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    }
  }
  
  // Lightbox methods
  openLightbox(index) {
    this.currentLightboxIndex = index;
    const img = this.images[index];
    
    if (this.lightboxImage && img) {
      this.lightboxImage.src = img.src;
      this.lightboxImage.alt = img.alt;
      this.lightbox?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  
  closeLightbox() {
    this.lightbox?.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  nextImage() {
    this.currentLightboxIndex = (this.currentLightboxIndex + 1) % this.images.length;
    this.updateLightboxImage();
  }
  
  prevImage() {
    this.currentLightboxIndex = this.currentLightboxIndex === 0 ? this.images.length - 1 : this.currentLightboxIndex - 1;
    this.updateLightboxImage();
  }
  
  updateLightboxImage() {
    const img = this.images[this.currentLightboxIndex];
    if (this.lightboxImage && img) {
      this.lightboxImage.src = img.src;
      this.lightboxImage.alt = img.alt;
    }
  }
}

// Initialize carousel and lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GalleryCarousel();
});

