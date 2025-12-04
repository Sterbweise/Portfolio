// Services Filter and Search Functionality

class ServicesFilter {
  constructor() {
    this.services = [];
    this.filteredServices = [];
    this.currentCategory = 'all';
    this.currentSort = 'default';
    this.searchTerm = '';
    
    this.init();
  }
  
  init() {
    this.collectServices();
    this.bindEvents();
    this.updateDisplay();
  }
  
  collectServices() {
    const serviceCards = document.querySelectorAll('.freelance-service, .service-card');

    if (serviceCards.length === 0) {
      console.warn('No service cards found to filter');
      return;
    }

    this.services = Array.from(serviceCards).map(card => {
      const h3 = card.querySelector('h3');
      const p = card.querySelector('p');

      return {
        element: card,
        title: h3 ? h3.textContent.toLowerCase() : '',
        description: p ? p.textContent.toLowerCase() : '',
        category: card.dataset.category || 'all',
        price: this.extractPrice(card.dataset.price),
        delivery: parseInt(card.dataset.delivery) || 0,
        keywords: this.extractKeywords(card)
      };
    });

    this.filteredServices = [...this.services];
    console.log(`Collected ${this.services.length} services for filtering`);
  }
  
  extractPrice(priceString) {
    if (!priceString) return 0;
    // Remove currency symbols and extract number
    const match = priceString.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  }
  
  extractKeywords(card) {
    const keywords = [];
    const listItems = card.querySelectorAll('li');
    listItems.forEach(item => {
      keywords.push(item.textContent.toLowerCase());
    });
    return keywords.join(' ');
  }
  
  bindEvents() {
    // Search input
    const searchInput = document.getElementById('service-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchTerm = e.target.value.toLowerCase();
        this.filterAndSort();
      });
    }
    
    // Category filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Remove active class from all buttons
        filterButtons.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        e.target.classList.add('active');
        
        this.currentCategory = e.target.dataset.category;
        this.filterAndSort();
      });
    });
    
    // Sort dropdown
    const sortSelect = document.getElementById('price-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        this.currentSort = e.target.value;
        this.filterAndSort();
      });
    }
  }
  
  filterAndSort() {
    // Filter by category
    this.filteredServices = this.services.filter(service => {
      if (this.currentCategory !== 'all' && service.category !== this.currentCategory) {
        return false;
      }
      return true;
    });
    
    // Filter by search term
    if (this.searchTerm) {
      this.filteredServices = this.filteredServices.filter(service => {
        return service.title.includes(this.searchTerm) ||
               service.description.includes(this.searchTerm) ||
               service.keywords.includes(this.searchTerm);
      });
    }
    
    // Sort results
    this.sortServices();
    
    // Update display
    this.updateDisplay();
    
    // Add search highlight effect
    this.highlightResults();
  }
  
  sortServices() {
    switch (this.currentSort) {
      case 'price-low':
        this.filteredServices.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredServices.sort((a, b) => b.price - a.price);
        break;
      case 'delivery':
        this.filteredServices.sort((a, b) => a.delivery - b.delivery);
        break;
      default:
        // Keep original order
        break;
    }
  }
  
  updateDisplay() {
    console.log(`Updating display: showing ${this.filteredServices.length} of ${this.services.length} services`);

    // Hide all services first
    this.services.forEach(service => {
      service.element.style.display = 'none';
      service.element.classList.add('hidden');
    });

    // Show filtered services
    this.filteredServices.forEach((service, index) => {
      service.element.style.display = '';
      service.element.classList.remove('hidden');

      // Add stagger animation
      service.element.style.animationDelay = `${index * 0.05}s`;
    });

    // Update results count
    this.updateResultsCount();

    // Animate visible cards
    this.animateCards();
  }
  
  updateResultsCount() {
    const count = this.filteredServices.length;
    const total = this.services.length;
    
    // Create or update results counter
    let counter = document.querySelector('.results-counter');
    if (!counter) {
      counter = document.createElement('div');
      counter.className = 'results-counter';
      const filterContainer = document.querySelector('.services-filter-container');
      if (filterContainer) {
        filterContainer.appendChild(counter);
      }
    }
    
    if (count === total) {
      counter.textContent = `Showing all ${total} services`;
    } else {
      counter.textContent = `Showing ${count} of ${total} services`;
    }
    
    counter.style.cssText = `
      margin-top: 1rem;
      color: var(--muted);
      font-size: 0.9rem;
      text-align: center;
    `;
  }
  
  highlightResults() {
    // Remove existing highlights
    this.services.forEach(service => {
      service.element.classList.remove('highlight');
    });
    
    // Add highlight to search results
    if (this.searchTerm && this.filteredServices.length > 0) {
      this.filteredServices.forEach((service, index) => {
        setTimeout(() => {
          service.element.classList.add('highlight');
          setTimeout(() => {
            service.element.classList.remove('highlight');
          }, 1000);
        }, index * 100);
      });
    }
  }
  
  animateCards() {
    const visibleCards = this.filteredServices.map(s => s.element);
    
    visibleCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 50);
    });
  }
  
  // Public method to reset filters
  resetFilters() {
    this.currentCategory = 'all';
    this.currentSort = 'default';
    this.searchTerm = '';
    
    // Reset UI elements
    const searchInput = document.getElementById('service-search');
    if (searchInput) searchInput.value = '';
    
    const sortSelect = document.getElementById('price-sort');
    if (sortSelect) sortSelect.value = 'default';
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
      btn.classList.remove('active');
      if (btn.dataset.category === 'all') {
        btn.classList.add('active');
      }
    });
    
    this.filterAndSort();
  }

  // Public method to reinitialize with new services
  reinitialize() {
    this.collectServices();
    this.updateDisplay();
  }
}

// Initialize when DOM is loaded and services are rendered
document.addEventListener('DOMContentLoaded', () => {
  // Wait for services to be loaded first
  const initFilter = () => {
    const serviceCards = document.querySelectorAll('.freelance-service, .service-card');
    if (serviceCards.length > 0) {
      // Destroy existing instance if any
      if (window.servicesFilter) {
        window.servicesFilter = null;
      }

      const servicesFilter = new ServicesFilter();
      window.servicesFilter = servicesFilter;

      console.log(`Services filter initialized with ${serviceCards.length} services`);
    } else {
      // Retry after a short delay if services aren't loaded yet
      console.log('Waiting for services to load...');
      setTimeout(initFilter, 200);
    }
  };

  // Start initialization
  initFilter();

  // Also listen for custom events from services loader
  window.addEventListener('servicesLoaded', () => {
    console.log('Services loaded event received, reinitializing filter');
    setTimeout(initFilter, 100);
  });

  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.getElementById('service-search');
      if (searchInput) {
        searchInput.focus();
      }
    }

    // Escape to clear search
    if (e.key === 'Escape') {
      const searchInput = document.getElementById('service-search');
      if (searchInput && document.activeElement === searchInput && window.servicesFilter) {
        searchInput.value = '';
        window.servicesFilter.searchTerm = '';
        window.servicesFilter.filterAndSort();
        searchInput.blur();
      }
    }
  });
});