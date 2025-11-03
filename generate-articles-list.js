// Script to automatically generate articles list
const fs = require('fs');
const path = require('path');

const articlesDir = path.join(__dirname, 'articles');
const outputFile = path.join(__dirname, 'assets', 'js', 'articles-list.js');

try {
  // Read all .md files from articles directory
  const files = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.md'))
    .sort(); // Sort alphabetically

  // Generate the JavaScript file content
  const content = `// Auto-generated articles list
// This file is automatically updated when new articles are added
window.ARTICLES_LIST = [
${files.map(file => `  '${file}'`).join(',\n')}
];`;

  // Write the file
  fs.writeFileSync(outputFile, content, 'utf8');
  
  console.log(`✅ Generated articles list with ${files.length} articles:`);
  files.forEach(file => console.log(`   - ${file}`));
  console.log(`📝 Updated: ${outputFile}`);
  
} catch (error) {
  console.error('❌ Error generating articles list:', error.message);
  process.exit(1);
}