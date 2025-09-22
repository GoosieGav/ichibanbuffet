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

// Gallery Carousel
class ImageCarousel {
  constructor() {
    this.track = document.getElementById('carouselTrack');
    this.prevBtn = document.getElementById('prevBtn');
    this.nextBtn = document.getElementById('nextBtn');
    this.dotsContainer = document.getElementById('carouselDots');
    this.slides = this.track ? this.track.querySelectorAll('.carousel-slide') : [];
    this.currentIndex = 0;
    
    if (this.track && this.slides.length > 0) {
      this.init();
    }
  }
  
  init() {
    // Create dots
    this.createDots();
    
    // Add event listeners
    this.prevBtn?.addEventListener('click', () => this.prevSlide());
    this.nextBtn?.addEventListener('click', () => this.nextSlide());
    
    // Auto-play (optional)
    this.startAutoPlay();
    
    // Pause auto-play on hover
    this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
    this.track.addEventListener('mouseleave', () => this.startAutoPlay());
  }
  
  createDots() {
    if (!this.dotsContainer) return;
    
    this.slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      
      dot.addEventListener('click', () => this.goToSlide(index));
      this.dotsContainer.appendChild(dot);
    });
  }
  
  updateSlide() {
    const slideWidth = 100;
    const translateX = -this.currentIndex * slideWidth;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    // Update dots
    const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
    dots?.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
    this.updateSlide();
  }
  
  prevSlide() {
    this.currentIndex = this.currentIndex === 0 ? this.slides.length - 1 : this.currentIndex - 1;
    this.updateSlide();
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateSlide();
  }
  
  startAutoPlay() {
    this.stopAutoPlay(); // Clear any existing interval
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
  
  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ImageCarousel();
});

