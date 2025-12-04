/**
 * Shared Markdown Parser Component
 * Handles front matter parsing, markdown conversion, and content utilities
 */
class MarkdownParser {
  constructor() {
    this.wordsPerMinute = 200;
  }

  /**
   * Parse markdown content with YAML front matter
   * @param {string} content - Raw markdown content
   * @param {string} filename - Source filename
   * @returns {Object} Parsed article object
   */
  parse(content, filename) {
    const lines = content.split(/\r?\n/);
    let frontMatterEnd = -1;
    let frontMatter = {};

    // Parse YAML front matter
    if (lines[0] && lines[0].trim() === '---') {
      for (let i = 1; i < lines.length; i++) {
        if (lines[i] && lines[i].trim() === '---') {
          frontMatterEnd = i;
          break;
        }

        const line = lines[i];
        if (!line || !line.includes(':')) continue;

        const colonIndex = line.indexOf(':');
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        if (key && value) {
          // Remove quotes if present
          if ((value.startsWith('"') && value.endsWith('"')) ||
              (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }

          // Parse arrays (tags)
          if (value.startsWith('[') && value.endsWith(']')) {
            value = value.slice(1, -1).split(',').map(item =>
              item.trim().replace(/['"]/g, '')
            );
          }

          frontMatter[key] = value;
        }
      }
    }

    // Get content after front matter
    const markdownContent = lines.slice(frontMatterEnd + 1).join('\n');

    return {
      id: filename.replace('.md', ''),
      title: frontMatter.title || 'Untitled',
      date: frontMatter.date || new Date().toISOString().split('T')[0],
      category: frontMatter.category || 'General',
      tags: frontMatter.tags || [],
      excerpt: frontMatter.excerpt || this.extractExcerpt(markdownContent),
      readTime: frontMatter.readTime || this.calculateReadTime(markdownContent),
      content: markdownContent,
      filename
    };
  }

  /**
   * Extract excerpt from markdown content
   * @param {string} content - Markdown content
   * @returns {string} Excerpt text
   */
  extractExcerpt(content) {
    const cleanContent = content
      .replace(/^#+\s+.*/gm, '') // Remove headers
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]+`/g, '') // Remove inline code
      .trim();

    const firstParagraph = cleanContent.split('\n\n')[0];
    return firstParagraph.length > 150
      ? firstParagraph.substring(0, 150) + '...'
      : firstParagraph;
  }

  /**
   * Calculate estimated reading time
   * @param {string} content - Markdown content
   * @returns {string} Reading time (e.g., "5 min")
   */
  calculateReadTime(content) {
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / this.wordsPerMinute);
    return `${minutes} min`;
  }

  /**
   * Format date for display
   * @param {string} dateString - ISO date string
   * @param {string} format - 'long' or 'short'
   * @returns {string} Formatted date
   */
  formatDate(dateString, format = 'long') {
    const date = new Date(dateString);
    const options = format === 'long'
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : { year: 'numeric', month: 'short', day: 'numeric' };

    return date.toLocaleDateString('en-US', options);
  }
}

// Export for use in other modules
if (typeof window !== 'undefined') {
  window.MarkdownParser = MarkdownParser;
}
