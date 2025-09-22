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

// Initialize lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GalleryLightbox();
});

