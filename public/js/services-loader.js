// Services Loader - Load services from JSON files
class ServicesLoader {
  constructor() {
    this.services = new Map();
    this.config = null;
    this.isLoaded = false;
  }

  async loadConfig() {
    try {
      const response = await fetch('services/services-config.json');
      this.config = await response.json();
      return this.config;
    } catch (error) {
      console.error('Failed to load services config:', error);
      return null;
    }
  }

  async loadService(serviceId) {
    try {
      const response = await fetch(`services/${serviceId}.json`);
      const service = await response.json();
      this.services.set(serviceId, service);
      return service;
    } catch (error) {
      console.error(`Failed to load service ${serviceId}:`, error);
      return null;
    }
  }

  async loadAllServices() {
    if (!this.config) {
      await this.loadConfig();
    }

    if (!this.config) {
      console.error('Cannot load services without config');
      return false;
    }

    const loadPromises = this.config.services.map(serviceId => 
      this.loadService(serviceId)
    );

    try {
      await Promise.all(loadPromises);
      this.isLoaded = true;
      return true;
    } catch (error) {
      console.error('Failed to load all services:', error);
      return false;
    }
  }

  getService(serviceId) {
    return this.services.get(serviceId);
  }

  getAllServices() {
    return Array.from(this.services.values());
  }

  getServicesByCategory(category) {
    return this.getAllServices().filter(service => service.category === category);
  }

  generateServiceCard(service) {
    return `
      <article class="service-card freelance-service"
               data-tone="${service.tone}"
               data-service="${service.id}"
               data-category="${service.category}"
               data-price="${service.startingPrice}"
               data-delivery="${service.deliveryDays}">
        <header>
          <span class="service-icon"><i class="${service.icon}"></i></span>
          <h3>${service.title}</h3>
        </header>
        <div class="service-card-content">
          <p>${service.description}</p>
          <div class="service-pricing">
            <span class="price-label">Starting at</span>
            <span class="price-value">$${service.startingPrice}</span>
          </div>
        </div>
        <div class="service-card-footer">
          <div class="service-meta">
            <span class="delivery-time"><i class="fas fa-clock"></i> ${service.meta.deliveryTime}</span>
            <span class="revisions"><i class="fas fa-redo"></i> ${service.meta.revisions}</span>
          </div>
        </div>
      </article>
    `;
  }

  async renderServices(containerId = 'services-grid') {
    if (!this.isLoaded) {
      await this.loadAllServices();
    }

    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Container ${containerId} not found`);
      return;
    }

    const servicesHTML = this.getAllServices()
      .map(service => this.generateServiceCard(service))
      .join('');

    container.innerHTML = servicesHTML;

    // Dispatch event that services are loaded
    window.dispatchEvent(new CustomEvent('servicesLoaded'));

    console.log(`Rendered ${this.getAllServices().length} services`);

    // Reinitialize service interactions after rendering
    this.initializeServiceInteractions();
  }

  initializeServiceInteractions() {
    // Reinitialize the FreelanceServicesManager with new data
    if (window.freelanceServicesManager) {
      window.freelanceServicesManager.updateServiceData(this.services);
    }
    
    // Reinitialize the services filter
    if (window.servicesFilter) {
      window.servicesFilter.reinitialize();
    }
  }


}

// Global instance
window.servicesLoader = new ServicesLoader();

// Auto-load services when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  await window.servicesLoader.renderServices();
  
  // Reinitialize filter after services are loaded
  setTimeout(() => {
    if (window.servicesFilter) {
      window.servicesFilter.reinitialize();
    }
  }, 100);
});