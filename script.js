// New Year Banner - Show only on Dec 31 and Jan 1
// To show the banner always, comment out the date check below
const newYearBanner = document.getElementById('newyearBanner');
if (newYearBanner) {
  const today = new Date();
  const month = today.getMonth(); // 0-11 (0 = January)
  const date = today.getDate();
  
  // Show banner on December 31st (month 11, date 31) or January 1st (month 0, date 1)
  // For now, showing always - uncomment the if statement and remove the display block to enable date check
  newYearBanner.style.display = 'block';
  // if ((month === 11 && date === 31) || (month === 0 && date === 1)) {
  //   newYearBanner.style.display = 'block';
  // } else {
  //   newYearBanner.style.display = 'none';
  // }
}

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
    this.isAnimating = false; // Prevent rapid clicking
    
    this.init();
  }
  
  init() {
    // Carousel navigation
    this.prevBtn?.addEventListener('click', () => this.scrollCarousel('prev'));
    this.nextBtn?.addEventListener('click', () => this.scrollCarousel('next'));
    
    // Add touch/swipe support for mobile
    this.addTouchSupport();
    
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
  
  
  getResponsiveItemWidth() {
    // Get actual item width based on screen size
    const screenWidth = window.innerWidth;
    if (screenWidth <= 640) {
      return 220 + 20; // Mobile: 220px + 20px gap
    } else if (screenWidth <= 960) {
      return 250 + 20; // Tablet: 250px + 20px gap  
    } else {
      return 280 + 20; // Desktop: 280px + 20px gap
    }
  }

  scrollCarousel(direction) {
    if (!this.carousel || this.isAnimating) return;
    
    const track = this.carousel.querySelector('.gallery-track');
    if (!track) return;
    
    this.isAnimating = true;
    
    const itemWidth = this.getResponsiveItemWidth();
    const containerWidth = this.carousel.clientWidth;
    const maxScroll = track.scrollWidth - containerWidth;
    const currentScroll = this.carousel.scrollLeft;
    
    let targetScroll;
    
    if (direction === 'next') {
      targetScroll = currentScroll + itemWidth;
      
      // If we're at or past the end, loop back to beginning
      if (targetScroll >= maxScroll) {
        targetScroll = 0;
      }
    } else {
      targetScroll = currentScroll - itemWidth;
      
      // If we're at or before the beginning, loop to end
      if (targetScroll <= 0) {
        targetScroll = maxScroll;
      }
    }
    
    // Smooth scroll with enhanced easing
    this.smoothScrollTo(targetScroll);
  }
  
  
  smoothScrollTo(targetPosition) {
    const startPosition = this.carousel.scrollLeft;
    const distance = targetPosition - startPosition;
    
    // Adaptive duration based on distance for more natural feel
    const baseDuration = 700;
    const maxDistance = this.carousel.scrollWidth;
    const duration = Math.min(baseDuration, Math.max(300, Math.abs(distance) / maxDistance * baseDuration));
    
    let startTime = null;
    
    // Enhanced easing function for ultra-smooth animation (ease-out-quart)
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      
      const ease = easeOutQuart(progress);
      const currentPosition = startPosition + (distance * ease);
      
      this.carousel.scrollLeft = currentPosition;
      
      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      } else {
        // Ensure we end up exactly at the target position
        this.carousel.scrollLeft = targetPosition;
        // Re-enable carousel navigation
        this.isAnimating = false;
      }
    };
    
    requestAnimationFrame(animateScroll);
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
  
  addTouchSupport() {
    if (!this.carousel) return;
    
    let startX = 0;
    let startScrollLeft = 0;
    let isDragging = false;
    
    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      startScrollLeft = this.carousel.scrollLeft;
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
      this.carousel.scrollLeft = startScrollLeft + diffX;
    };
    
    const handleTouchEnd = () => {
      isDragging = false;
    };
    
    // Add touch event listeners
    this.carousel.addEventListener('touchstart', handleTouchStart, { passive: true });
    this.carousel.addEventListener('touchmove', handleTouchMove, { passive: false });
    this.carousel.addEventListener('touchend', handleTouchEnd, { passive: true });
  }
}

// Initialize carousel and lightbox when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new GalleryCarousel();
  new GalleryLightbox();
});

