// Services Page JavaScript - Original animations + Modal functionality

(function(){
  const scopedSelector = (selector) => document.querySelector(selector);
  const serviceHero = scopedSelector('.service-hero');
  const serviceBlocks = document.querySelectorAll('.service-block, .service-intro, .service-cta');
  const cards = document.querySelectorAll('.service-card');
  const introCard = scopedSelector('.service-glow-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  [serviceHero, ...serviceBlocks].forEach(el => {
    if (!el) return;
    observer.observe(el);
  });

  const hoverIntent = (element, enter, leave) => {
    let state = 'idle';
    let timer;

    element.addEventListener('pointerenter', () => {
      clearTimeout(timer);
      if (state === 'active') return;
      state = 'pending';
      timer = setTimeout(() => {
        state = 'active';
        enter();
      }, 80);
    });

    element.addEventListener('pointerleave', () => {
      clearTimeout(timer);
      if (state !== 'active') {
        state = 'idle';
        return;
      }
      state = 'cooldown';
      leave();
      timer = setTimeout(() => { state = 'idle'; }, 120);
    });
  };

  const createRipple = (card) => {
    const ripple = document.createElement('span');
    ripple.className = 'service-ripple';
    card.appendChild(ripple);
    return ripple;
  };

  cards.forEach(card => {
    const ripple = createRipple(card);

    hoverIntent(card,
      () => {
        ripple.classList.add('active');
      },
      () => {
        ripple.classList.remove('active');
      }
    );

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      ripple.style.setProperty('--x', `${x}%`);
      ripple.style.setProperty('--y', `${y}%`);
    });
  });

  if (introCard) {
    hoverIntent(introCard,
      () => introCard.classList.add('active'),
      () => introCard.classList.remove('active')
    );
  }

  window.addEventListener('beforeunload', () => {
    observer.disconnect();
  });
})();

// Freelance Services Modal System
class FreelanceServicesManager {
  constructor() {
    this.modal = document.getElementById('service-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalContent = document.getElementById('modal-content');
    this.closeBtn = document.querySelector('.service-modal-close');
    
    this.serviceData = new Map();
    
    this.init();
  }

  updateServiceData(servicesMap) {
    this.serviceData = servicesMap;
    this.reinitializeEventListeners();
  }
  
  init() {
    this.reinitializeEventListeners();
  }

  reinitializeEventListeners() {
    // Add click listeners to freelance service cards
    document.querySelectorAll('.freelance-service').forEach(card => {
      // Remove existing listeners to avoid duplicates
      card.replaceWith(card.cloneNode(true));
    });

    // Re-add listeners to all cards
    document.querySelectorAll('.freelance-service').forEach(card => {
      card.addEventListener('click', (e) => {
        const serviceType = card.dataset.service;
        this.openModal(serviceType);
      });
    });
    
    // Close modal listeners
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeModal());
    }
    
    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) {
          this.closeModal();
        }
      });
    }
    
    // Escape key to close modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
  
  openModal(serviceType) {
    let service = this.serviceData.get ? this.serviceData.get(serviceType) : null;
    
    // Fallback to legacy data if service not found in new format
    if (!service) {
      const legacyData = this.getServiceDataLegacy();
      service = legacyData[serviceType];
    }
    
    if (!service || !this.modal) return;
    
    this.modalTitle.textContent = service.title;
    this.modalContent.innerHTML = this.generateModalContent(service);
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Add contact button listeners
    this.addContactListeners(service.title);
  }
  
  closeModal() {
    if (this.modal) {
      this.modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
  
  generateModalContent(service) {
    return `
      <div class="service-description">
        <h3>Service Overview</h3>
        <p>${service.description}</p>
        </br>
        ${service.detailedDescription ? `<p><strong>Detailed Description:</strong> ${service.detailedDescription}</p>` : ''}
      </div>
      
      <div class="service-packages">
        <h3>Choose Your Package</h3>
        <div class="packages-grid">
          ${service.packages.map(pkg => `
            <div class="package-option">
              <div class="package-header">
                <span class="package-name">${pkg.name}</span>
                <span class="package-price">${pkg.price}</span>
              </div>
              <ul class="package-features">
                ${pkg.features.map(feature => `
                  <li><i class="fas fa-check"></i> ${feature}</li>
                `).join('')}
              </ul>
              <div class="package-footer">
                <div class="delivery-time">
                  <i class="fas fa-clock"></i> Delivery: ${pkg.deliveryTime}
                </div>
                <div class="contact-section">
                  <a href="#" class="contact-btn" data-package="${pkg.name}" data-price="${pkg.price}">
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      ${service.extras ? `
      <div class="service-extras-section">
        <h3><i class="fas fa-plus-circle"></i> Available Extras</h3>
        <div class="extras-list">
          ${service.extras.map(extra => `
            <div class="extra-item">
              <div class="extra-header">
                <span class="extra-name">${extra.name}</span>
                <span class="extra-price">${extra.price}</span>
              </div>
              <p class="extra-description">${extra.description}</p>
            </div>
          `).join('')}
        </div>
      </div>
      ` : ''}

      <div class="service-details">
        <h3>What's Included & Guarantees</h3>
        <div class="details-grid">
          <div class="detail-section">
            <h4><i class="fas fa-shield-alt"></i> Service Guarantees</h4>
            <ul>
              ${service.guarantees ? service.guarantees.map(guarantee => `
                <li><i class="${guarantee.icon}"></i> ${guarantee.text}</li>
              `).join('') : `
                <li><i class="fas fa-check"></i> 100% satisfaction guarantee</li>
                <li><i class="fas fa-check"></i> Free revisions as specified</li>
                <li><i class="fas fa-check"></i> On-time delivery commitment</li>
                <li><i class="fas fa-check"></i> Professional communication</li>
                <li><i class="fas fa-check"></i> Secure payment processing</li>
              `}
            </ul>
          </div>
          
          <div class="detail-section">
            <h4><i class="fas fa-cogs"></i> Development Process</h4>
            <ul>
              <li><i class="fas fa-comments"></i> Initial consultation & requirements gathering</li>
              <li><i class="fas fa-drafting-compass"></i> Project planning & architecture design</li>
              <li><i class="fas fa-code"></i> Development with regular progress updates</li>
              <li><i class="fas fa-vial"></i> Testing & quality assurance</li>
              <li><i class="fas fa-rocket"></i> Deployment & final delivery</li>
              <li><i class="fas fa-headset"></i> Post-delivery support & documentation</li>
            </ul>
          </div>

          <div class="detail-section">
            <h4><i class="fas fa-tools"></i> Technologies & Expertise</h4>
            <ul>
              <li><i class="fab fa-js-square"></i> Modern JavaScript frameworks</li>
              <li><i class="fas fa-database"></i> Database design & optimization</li>
              <li><i class="fas fa-cloud"></i> Cloud deployment & hosting</li>
              <li><i class="fab fa-git-alt"></i> Version control & collaboration</li>
              <li><i class="fas fa-lock"></i> Security best practices</li>
              <li><i class="fas fa-mobile-alt"></i> Responsive & mobile-first design</li>
            </ul>
          </div>
        </div>
        
        <div class="service-modal-footer">
          <button class="btn get-in-touch-btn">
            <i class="fas fa-envelope"></i> Get in touch
          </button>
        </div>
      </div>
    `;
  }
  
  addContactListeners(serviceTitle) {
    document.querySelectorAll('.contact-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const packageName = btn.dataset.package;
        const price = btn.dataset.price;
        this.openContactModal(serviceTitle, packageName, price);
      });
    });

    // Add listener for "Get in touch" button
    const getInTouchBtn = document.querySelector('.get-in-touch-btn');
    if (getInTouchBtn) {
      getInTouchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openGeneralContactModal(serviceTitle);
      });
    }
  }
  
  openContactModal(serviceTitle, packageName, price) {
    // Create contact modal
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    const body = encodeURIComponent(`Hi Killian,

I'm interested in your ${serviceTitle} service, specifically the "${packageName}" package (${price}).

Could you please provide more details about:
- Project timeline
- Requirements gathering process
- Payment terms
- Next steps

My project details:
[Please describe your project here]

Best regards`);
    
    modal.innerHTML = `
      <div class="contact-modal-content">
        <div class="contact-modal-header">
          <h3>Contact me for ${serviceTitle}</h3>
          <button class="contact-modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="contact-modal-body">
          <p class="contact-message">Get in touch to discuss the "${packageName}" package (${price}) and receive detailed information about the project.</p>
          <div class="contact-methods">
            <a href="mailto:chandeze.killian@proton.me?subject=Service Inquiry: ${serviceTitle} - ${packageName}&body=Hi Killian,%0A%0AI'm interested in your ${serviceTitle} service, specifically the '${packageName}' package (${price}).%0A%0ACould you please provide more details?" class="contact-method email">
              <i class="fas fa-envelope"></i>
              <span>Email</span>
            </a>
            <a href="https://wa.me/60182839937?text=Hi, I'm interested in your ${serviceTitle} service, specifically the ${packageName} package" class="contact-method whatsapp" target="_blank">
              <i class="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
            <a href="https://t.me/SG991" class="contact-method telegram" target="_blank">
              <i class="fab fa-telegram"></i>
              <span>Telegram</span>
            </a>
            <a href="https://linkedin.com/in/killian-chandeze" class="contact-method linkedin" target="_blank">
              <i class="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close modal listeners
    const closeBtn = modal.querySelector('.contact-modal-close');
    closeBtn.addEventListener('click', () => this.closeContactModal(modal));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeContactModal(modal);
      }
    });

    // Escape key to close
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeContactModal(modal);
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Close modal after initiating contact
    this.closeModal();
  }

  closeContactModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (modal.parentNode) {
        modal.parentNode.removeChild(modal);
      }
    }, 300);
  }

  openGeneralContactModal(serviceTitle) {
    // Create general contact modal without specific package info
    const modal = document.createElement('div');
    modal.className = 'contact-modal';
    modal.innerHTML = `
      <div class="contact-modal-content">
        <div class="contact-modal-header">
          <h3>Contact me for ${serviceTitle}</h3>
          <button class="contact-modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="contact-modal-body">
          <p class="contact-message">Get in touch to discuss your project requirements and receive a custom quote.</p>
          <div class="contact-methods">
            <a href="mailto:chandeze.killian@proton.me?subject=Service Inquiry: ${serviceTitle}&body=Hi Killian,%0A%0AI'm interested in your ${serviceTitle} service.%0A%0ACould you please provide more details?" class="contact-method email">
              <i class="fas fa-envelope"></i>
              <span>Email</span>
            </a>
            <a href="https://wa.me/601828399337?text=Hi, I'm interested in your ${serviceTitle} service" class="contact-method whatsapp" target="_blank">
              <i class="fab fa-whatsapp"></i>
              <span>WhatsApp</span>
            </a>
            <a href="https://t.me/SG991" class="contact-method telegram" target="_blank">
              <i class="fab fa-telegram"></i>
              <span>Telegram</span>
            </a>
            <a href="https://linkedin.com/in/killian-chandeze" class="contact-method linkedin" target="_blank">
              <i class="fab fa-linkedin"></i>
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close modal listeners
    const closeBtn = modal.querySelector('.contact-modal-close');
    closeBtn.addEventListener('click', () => this.closeContactModal(modal));
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeContactModal(modal);
      }
    });

    // Escape key to close
    const escapeHandler = (e) => {
      if (e.key === 'Escape') {
        this.closeContactModal(modal);
        document.removeEventListener('keydown', escapeHandler);
      }
    };
    document.addEventListener('keydown', escapeHandler);
    
    // Close the service modal after opening contact modal
    this.closeModal();
  }
}

// Initialize freelance services manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.freelanceServicesManager = new FreelanceServicesManager();
  
  // Add listener for the general "Get in touch" button in the CTA section
  const generalContactBtn = document.getElementById('general-contact-btn');
  if (generalContactBtn) {
    generalContactBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.freelanceServicesManager.openGeneralContactModal('General Inquiry');
    });
  }
});