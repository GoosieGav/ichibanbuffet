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
    this.originalItems = []; // Store original items for infinite loop
    this.totalOriginalItems = 0;
    
    this.init();
  }
  
  init() {
    // Setup infinite loop by cloning items
    this.setupInfiniteLoop();
    
    // Carousel navigation
    this.prevBtn?.addEventListener('click', () => this.scrollCarousel('prev'));
    this.nextBtn?.addEventListener('click', () => this.scrollCarousel('next'));
    
    // Add touch/swipe support for mobile
    this.addTouchSupport();
    
    // Lightbox functionality - use original items for lightbox
    this.originalItems.forEach((item, index) => {
      const allMatchingItems = document.querySelectorAll(`[data-original-index="${index}"]`);
      allMatchingItems.forEach(matchingItem => {
        matchingItem.addEventListener('click', () => this.openLightbox(index));
      });
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
  
  setupInfiniteLoop() {
    if (!this.carousel) return;
    
    const track = this.carousel.querySelector('.gallery-track');
    if (!track) return;
    
    // Store original items
    this.originalItems = Array.from(track.children);
    this.totalOriginalItems = this.originalItems.length;
    
    // Mark original items with data attribute
    this.originalItems.forEach((item, index) => {
      item.setAttribute('data-original-index', index);
    });
    
    // Clone first 3 items and append to end
    const firstItems = this.originalItems.slice(0, 3);
    firstItems.forEach((item, index) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-original-index', index);
      track.appendChild(clone);
    });
    
    // Clone last 3 items and prepend to beginning
    const lastItems = this.originalItems.slice(-3);
    lastItems.forEach((item, index) => {
      const clone = item.cloneNode(true);
      clone.setAttribute('data-original-index', this.totalOriginalItems - 3 + index);
      track.insertBefore(clone, track.firstChild);
    });
    
    // Set initial position to show first original item (after the 3 cloned last items)
    const itemWidth = this.getResponsiveItemWidth();
    this.carousel.scrollLeft = itemWidth * 3;
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
    const currentScroll = this.carousel.scrollLeft;
    
    let targetScroll;
    
    if (direction === 'next') {
      targetScroll = currentScroll + itemWidth;
    } else {
      targetScroll = currentScroll - itemWidth;
    }
    
    // Smooth scroll with enhanced easing
    this.smoothScrollTo(targetScroll, direction);
  }
  
  checkAndHandleInfiniteLoop(direction) {
    if (!this.carousel || this.totalOriginalItems === 0) return;
    
    const itemWidth = this.getResponsiveItemWidth();
    const currentScroll = this.carousel.scrollLeft;
    const track = this.carousel.querySelector('.gallery-track');
    
    // Calculate positions
    const clonedItemsWidth = itemWidth * 3; // 3 cloned items on each side
    const originalItemsWidth = itemWidth * this.totalOriginalItems;
    
    // If we scrolled past the last original item (into the cloned first items)
    if (currentScroll >= clonedItemsWidth + originalItemsWidth) {
      // Jump back to the beginning of original items (after the 3 cloned last items)
      this.carousel.scrollLeft = clonedItemsWidth;
    }
    // If we scrolled before the first original item (into the cloned last items)
    else if (currentScroll < clonedItemsWidth) {
      // Jump forward to the end of original items (before the 3 cloned first items)
      this.carousel.scrollLeft = clonedItemsWidth + originalItemsWidth - itemWidth;
    }
  }
  
  smoothScrollTo(targetPosition, direction) {
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
        
        // Check if we need to handle infinite loop (jump to equivalent position)
        setTimeout(() => {
          this.checkAndHandleInfiniteLoop(direction);
          // Re-enable carousel navigation
          this.isAnimating = false;
        }, 50);
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
      // After touch ends, check if we need to handle infinite loop
      setTimeout(() => {
        this.checkAndHandleInfiniteLoop();
      }, 100);
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
});

