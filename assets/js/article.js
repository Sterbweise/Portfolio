/**
 * Article Page Handler
 * Loads and displays individual blog articles with markdown rendering
 */
class ArticlePage {
  constructor() {
    this.parser = new MarkdownParser();
    this.markedLoaded = false;
    this.init();
  }

  async init() {
    // Load marked.js dynamically
    await this.loadMarked();

    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');

    if (!articleId) {
      this.showError();
      return;
    }

    try {
      await this.loadArticle(articleId);
      this.initBackToTop();
    } catch (error) {
      console.error('Error loading article:', error);
      this.showError();
    }
  }

  async loadMarked() {
    try {
      if (window.marked) {
        this.markedLoaded = true;
        this.setupMarked();
        return;
      }

      // Dynamically import marked.js
      const { marked } = await import('https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js');
      window.marked = marked;
      this.markedLoaded = true;
      this.setupMarked();
    } catch (error) {
      console.warn('Could not load marked.js, will use basic markdown parsing', error);
      this.markedLoaded = false;
    }
  }

  setupMarked() {
    if (!window.marked) return;

    window.marked.setOptions({
      breaks: false,
      gfm: true,
      headerIds: true,
      mangle: false
    });
  }

  async loadArticle(articleId) {
    const loadingEl = document.getElementById('article-loading');
    const contentEl = document.getElementById('article-content');

    try {
      const response = await fetch(`articles/${articleId}.md`);
      if (!response.ok) throw new Error('Article not found');

      const content = await response.text();
      const article = this.parser.parse(content, articleId);

      // Update page metadata
      document.getElementById('article-title').textContent = `${article.title} — Killian Chandeze`;
      document.querySelector('meta[name="description"]').setAttribute('content', article.excerpt);

      // Render article
      contentEl.innerHTML = this.renderArticle(article);

      // Show content, hide loading
      loadingEl.style.display = 'none';
      contentEl.style.display = 'block';

      // Apply syntax highlighting
      this.applySyntaxHighlighting();

    } catch (error) {
      console.error('Error loading article:', error);
      this.showError();
    }
  }

  renderArticle(article) {
    const header = `
      <header class="article-header">
        <h1>${article.title}</h1>
        <div class="blog-meta">
          <span class="blog-category">${article.category}</span>
          <span class="blog-meta-separator"></span>
          <span class="blog-date">
            <i class="fas fa-calendar-alt"></i>
            ${this.parser.formatDate(article.date, 'long')}
          </span>
          <span class="blog-meta-separator"></span>
          <span class="blog-read-time">
            <i class="fas fa-clock"></i>
            ${article.readTime}
          </span>
        </div>
        ${article.tags.length > 0 ? `
          <div class="blog-tags">
            ${article.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
      </header>
    `;

    // Use marked.js if available, otherwise fallback to basic parsing
    let content;
    if (this.markedLoaded && window.marked) {
      content = window.marked.parse(article.content);
    } else {
      content = this.basicMarkdownParse(article.content);
    }

    content = this.postProcessContent(content);

    return header + content;
  }

  basicMarkdownParse(markdown) {
    let html = markdown
      // Code blocks with language support
      .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
        const language = lang || 'text';
        return `<pre><code class="language-${language}">${this.escapeHtml(code.trim())}</code></pre>`;
      })
      // Inline code
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Links
      .replace(/\[([^\]]+)\]\(([^\)]+)\)/gim, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>');

    return `<p>${html}</p>`;
  }

  postProcessContent(html) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Fix external links
    tempDiv.querySelectorAll('a').forEach(link => {
      const href = link.getAttribute('href');
      if (href && (href.startsWith('http') || href.startsWith('//'))) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      }
    });

    // Add language classes to code blocks
    tempDiv.querySelectorAll('pre code').forEach(codeBlock => {
      const className = codeBlock.className;
      if (!className || !className.includes('language-')) {
        const pre = codeBlock.parentElement;
        if (pre && pre.className) {
          codeBlock.className = pre.className;
        }
      }
    });

    return tempDiv.innerHTML;
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  applySyntaxHighlighting() {
    setTimeout(() => {
      if (window.hljs) {
        try {
          document.querySelectorAll('pre code').forEach((block) => {
            if (!block.classList.contains('hljs')) {
              window.hljs.highlightElement(block);
            }
          });
        } catch (error) {
          console.warn('Syntax highlighting failed:', error);
        }
      } else if (window.Prism) {
        try {
          window.Prism.highlightAll();
        } catch (error) {
          console.warn('Syntax highlighting failed:', error);
        }
      }
    }, 50);
  }

  initBackToTop() {
    if (window.initializeBackToTop) {
      window.initializeBackToTop();
    }
  }

  showError() {
    document.getElementById('article-loading').style.display = 'none';
    document.getElementById('article-content').style.display = 'none';
    document.getElementById('article-error').style.display = 'block';
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('article-content')) {
    new ArticlePage();
  }
});