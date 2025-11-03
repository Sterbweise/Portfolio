/**
 * Modern Carousel Component
 * Responsive, sleek carousel with modern design
 */
class Carousel {
  constructor(element, options = {}) {
    this.element = element;
    this.config = {
      itemsPerView: { mobile: 1, tablet: 2, desktop: 3 },
      breakpoints: { mobile: 768, tablet: 1024, desktop: 1280 },
      gap: 24,
      autoHeight: false,
      ...options
    };

    this.currentIndex = 0;
    this.totalSlides = 0;
    this.slidesToShow = 3;
    this.isInitialized = false;

    this.init();
  }

  init() {
    if (!this.element) return;

    this.track = this.element.querySelector('.proj-track');
    this.prevBtn = this.element.querySelector('.proj-arrow.prev');
    this.nextBtn = this.element.querySelector('.proj-arrow.next');
    this.tiles = this.element.querySelectorAll('.tile');

    if (!this.track || !this.tiles.length) return;

    this.totalSlides = this.tiles.length;
    this.updateSlidesToShow();
    this.updateCarousel();
    this.updateButtons();
    this.setupEventListeners();

    this.isInitialized = true;
  }

  setupEventListeners() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.navigate(-1));
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.navigate(1));
    }

    window.addEventListener('resize', this.debounce(() => {
      this.updateSlidesToShow();
      const maxIndex = Math.max(0, this.totalSlides - this.slidesToShow);
      if (this.currentIndex > maxIndex) {
        this.currentIndex = maxIndex;
      }
      this.updateCarousel();
      this.updateButtons();
    }, 250));
  }

  navigate(direction) {
    const maxIndex = Math.max(0, this.totalSlides - this.slidesToShow);

    if (direction === -1 && this.currentIndex > 0) {
      this.currentIndex--;
    } else if (direction === 1 && this.currentIndex < maxIndex) {
      this.currentIndex++;
    }

    this.updateCarousel();
    this.updateButtons();
  }

  updateSlidesToShow() {
    const width = window.innerWidth;

    if (width <= this.config.breakpoints.mobile) {
      this.slidesToShow = this.config.itemsPerView.mobile;
    } else if (width <= this.config.breakpoints.tablet) {
      this.slidesToShow = this.config.itemsPerView.tablet;
    } else {
      this.slidesToShow = this.config.itemsPerView.desktop;
    }
  }

  updateCarousel() {
    if (!this.track || window.innerWidth <= this.config.breakpoints.mobile) return;

    const slideWidth = 100 / this.slidesToShow;
    const translateX = -(this.currentIndex * slideWidth);
    this.track.style.transform = `translateX(${translateX}%)`;
  }

  updateButtons() {
    if (!this.prevBtn || !this.nextBtn || window.innerWidth <= this.config.breakpoints.mobile) return;

    const maxIndex = Math.max(0, this.totalSlides - this.slidesToShow);

    this.prevBtn.disabled = this.currentIndex <= 0;
    this.nextBtn.disabled = this.currentIndex >= maxIndex;

    this.prevBtn.style.opacity = this.currentIndex <= 0 ? '0.3' : '1';
    this.nextBtn.style.opacity = this.currentIndex >= maxIndex ? '0.3' : '1';
    this.prevBtn.style.cursor = this.currentIndex <= 0 ? 'not-allowed' : 'pointer';
    this.nextBtn.style.cursor = this.currentIndex >= maxIndex ? 'not-allowed' : 'pointer';
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  destroy() {
    if (this.prevBtn) this.prevBtn.replaceWith(this.prevBtn.cloneNode(true));
    if (this.nextBtn) this.nextBtn.replaceWith(this.nextBtn.cloneNode(true));
    this.isInitialized = false;
  }
}

// Auto-initialize carousel on DOM ready
function initCarousel() {
  const carouselElement = document.querySelector('.proj-carousel');
  if (carouselElement && !carouselElement._carouselInstance) {
    carouselElement._carouselInstance = new Carousel(carouselElement);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCarousel);
} else {
  initCarousel();
}

// Re-initialize after components are loaded
document.addEventListener('componentsLoaded', initCarousel);

// Export for manual initialization
if (typeof window !== 'undefined') {
  window.Carousel = Carousel;
  window.initCarousel = initCarousel;
}
