/**
 * Blog System
 * Dynamic article loading, filtering, and search functionality
 */
class BlogSystem {
  constructor() {
    this.parser = new MarkdownParser();
    this.articles = [];
    this.filteredArticles = [];
    this.currentFilter = 'all';
    this.searchQuery = '';

    this.init();
  }

  async init() {
    await this.loadArticles();
    this.setupEventListeners();
    this.renderBlog();
  }

  async loadArticles() {
    let articleFiles = [];

    try {
      // Try to load the auto-generated articles list
      if (window.ARTICLES_LIST && Array.isArray(window.ARTICLES_LIST)) {
        articleFiles = window.ARTICLES_LIST;
      } else {
        // Fallback: try to discover articles
        articleFiles = await this.discoverArticles();
      }
    } catch (error) {
      console.warn('Could not load articles list', error);
      articleFiles = await this.discoverArticles();
    }

    try {
      const articlePromises = articleFiles.map(async (filename) => {
        try {
          const response = await fetch(`articles/${filename}`);
          if (!response.ok) throw new Error(`Failed to load ${filename}`);
          const content = await response.text();

          // Validate that we actually received markdown, not HTML
          // (prevents SPA fallback from serving index.html on 404)
          if (content.trim().startsWith('<!DOCTYPE') || content.trim().startsWith('<html')) {
            throw new Error(`Received HTML instead of markdown for ${filename} - file may not exist`);
          }

          return this.parser.parse(content, filename);
        } catch (error) {
          console.warn(`Could not load article: ${filename}`, error);
          return null;
        }
      });

      const loadedArticles = await Promise.all(articlePromises);
      this.articles = loadedArticles.filter(article => article !== null);

      // Sort by date (newest first)
      this.articles.sort((a, b) => new Date(b.date) - new Date(a.date));

      this.filteredArticles = [...this.articles];
    } catch (error) {
      console.error('Error loading articles:', error);
      this.articles = [];
      this.filteredArticles = [];
    }
  }

  async discoverArticles() {
    // Fallback article discovery
    const commonNames = [
      'getting-started-with-csharp',
      'devops-automation-best-practices',
      'software-architecture-patterns',
      'docker-containerization-guide',
      'web-performance-optimization'
    ];

    const discoveredArticles = [];

    for (const name of commonNames) {
      try {
        const response = await fetch(`articles/${name}.md`);
        if (response.ok) {
          discoveredArticles.push(`${name}.md`);
        }
      } catch (error) {
        // Article doesn't exist, continue
      }
    }

    return discoveredArticles;
  }

  setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('blog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value.toLowerCase();
        this.filterArticles();
      });
    }

    // Filter buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('blog-filter')) {
        // Update active filter
        document.querySelectorAll('.blog-filter').forEach(btn => 
          btn.classList.remove('active')
        );
        e.target.classList.add('active');
        
        this.currentFilter = e.target.dataset.filter;
        this.filterArticles();
      }
    });
  }

  filterArticles() {
    this.filteredArticles = this.articles.filter(article => {
      // Category filter
      const categoryMatch = this.currentFilter === 'all' || 
                           article.category.toLowerCase() === this.currentFilter.toLowerCase();
      
      // Search filter
      const searchMatch = this.searchQuery === '' ||
                         article.title.toLowerCase().includes(this.searchQuery) ||
                         article.excerpt.toLowerCase().includes(this.searchQuery) ||
                         article.tags.some(tag => tag.toLowerCase().includes(this.searchQuery));
      
      return categoryMatch && searchMatch;
    });

    this.renderArticles();
    this.updateStats();
  }

  renderBlog() {
    this.renderFilters();
    this.renderArticles();
    this.updateStats();
  }

  renderFilters() {
    const filtersContainer = document.getElementById('blog-filters');
    if (!filtersContainer) return;

    // Get unique categories
    const categories = ['all', ...new Set(this.articles.map(article => article.category))];
    
    filtersContainer.innerHTML = categories.map(category => `
      <button class="blog-filter ${category === 'all' ? 'active' : ''}" 
              data-filter="${category}">
        ${category === 'all' ? 'All' : category}
      </button>
    `).join('');
  }

  renderArticles() {
    const container = document.getElementById('blog-grid');
    if (!container) return;

    if (this.filteredArticles.length === 0) {
      container.innerHTML = `
        <div class="blog-empty">
          <h3>No articles found</h3>
          <p>Try adjusting your search or filter criteria.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = this.filteredArticles.map(article => `
      <article class="blog-card" data-article-id="${article.id}">
        <header class="blog-card-header">
          <h2 class="blog-card-title">${article.title}</h2>
          <div class="blog-meta">
            <span class="blog-category">${article.category}</span>
            <span class="blog-meta-separator"></span>
            <span class="blog-date">
              <i class="fas fa-calendar-alt"></i>
              ${this.parser.formatDate(article.date, 'short')}
            </span>
            <span class="blog-meta-separator"></span>
            <span class="blog-read-time">
              <i class="fas fa-clock"></i>
              ${article.readTime}
            </span>
          </div>
        </header>
        <p class="blog-excerpt">${article.excerpt}</p>
        ${article.tags.length > 0 ? `
          <div class="blog-tags">
            ${article.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </article>
    `).join('');

    // Add click listeners to cards
    container.querySelectorAll('.blog-card').forEach(card => {
      card.addEventListener('click', () => {
        const articleId = card.dataset.articleId;
        window.location.href = `article.html?id=${articleId}`;
      });
    });
  }

  updateStats() {
    const statsContainer = document.getElementById('blog-stats');
    if (!statsContainer) return;

    const totalArticles = this.articles.length;
    const filteredCount = this.filteredArticles.length;
    const categories = new Set(this.articles.map(article => article.category)).size;

    statsContainer.innerHTML = `
      <div class="blog-stat">
        <i class="fas fa-file-alt"></i>
        <span>${filteredCount} of ${totalArticles} articles</span>
      </div>
      <div class="blog-stat">
        <i class="fas fa-folder"></i>
        <span>${categories} categories</span>
      </div>
    `;
  }

}

// Initialize blog system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('blog-grid')) {
    new BlogSystem();
  }
});