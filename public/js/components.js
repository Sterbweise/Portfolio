/**
 * Component Loader - Charge les composants réutilisables
 */

class ComponentLoader {
  /**
   * Charge un composant HTML depuis un fichier
   * @param {string} componentPath - Chemin vers le fichier du composant
   * @param {string} targetSelector - Sélecteur de l'élément cible
   */
  static async loadComponent(componentPath, targetSelector) {
    try {
      const response = await fetch(componentPath);
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      const html = await response.text();
      const targetElement = document.querySelector(targetSelector);
      
      if (targetElement) {
        targetElement.innerHTML = html;
        return true;
      } else {
        console.warn(`Élément cible non trouvé: ${targetSelector}`);
        return false;
      }
    } catch (error) {
      console.error(`Erreur lors du chargement du composant ${componentPath}:`, error);
      return false;
    }
  }

  /**
   * Charge le header dans l'élément avec l'id "header-placeholder"
   */
  static async loadHeader() {
    const loaded = await this.loadComponent('components/header.html', '#header-placeholder');
    if (loaded) {
      // Marquer la page active dans la navigation
      this.setActiveNavLink();
    }
    return loaded;
  }

  /**
   * Charge le footer dans l'élément avec l'id "footer-placeholder"
   */
  static async loadFooter() {
    const loaded = await this.loadComponent('components/footer.html', '#footer-placeholder');
    if (loaded) {
      // Initialiser l'année dans le footer
      this.initializeFooterYear();
    }
    return loaded;
  }

  /**
   * Marque le lien de navigation actif selon la page courante
   */
  static setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
      link.removeAttribute('aria-current');
      const href = link.getAttribute('href');
      
      if (href === currentPage || 
          (currentPage === '' && href === 'index.html') ||
          (currentPage === 'index.html' && href === 'index.html')) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  /**
   * Initialise l'année courante dans le footer
   */
  static initializeFooterYear() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  }

  /**
   * Charge tous les composants
   */
  static async loadAllComponents() {
    const headerPromise = this.loadHeader();
    const footerPromise = this.loadFooter();
    
    await Promise.all([headerPromise, footerPromise]);
    
    // Déclencher un événement personnalisé quand tous les composants sont chargés
    document.dispatchEvent(new CustomEvent('componentsLoaded'));
    
    // Initialiser les fonctionnalités qui dépendent des composants
    this.initializeComponentFeatures();
  }

  /**
   * Initialise les fonctionnalités après chargement des composants
   */
  static initializeComponentFeatures() {
    // Réinitialiser les fonctionnalités du main.js qui dépendent du DOM
    if (window.initializeThemeToggle) {
      window.initializeThemeToggle();
    }
    if (window.initializeNavToggle) {
      window.initializeNavToggle();
    }
    if (window.initializeLangSelector) {
      window.initializeLangSelector();
    }
    if (window.initializeBackToTop) {
      window.initializeBackToTop();
    }
  }
}

// Auto-initialisation quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
  ComponentLoader.loadAllComponents();
});

// Export pour utilisation dans d'autres scripts
window.ComponentLoader = ComponentLoader;