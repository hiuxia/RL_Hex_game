const fs = require('fs');
const path = require('path');

// Configuration
const rootDir = './RL_Hex_game';
const outputMdPath = './RL_Hex_game/repository.md';
const fileTypesToInclude = ['.py', '.js', '.md', '.json', '.yml', '.yaml', '.toml', '.ini', '.cfg', '.conf'];
const maxFileSizeBytes = 1000000; // 1MB max file size
const excludedDirs = ['node_modules', '__pycache__', '.git', 'venv', 'env', '.venv'];

// Store content to be written to the markdown file
let markdownContent = '';

// Add header to markdown file
markdownContent += `# RL_Hex_game Project Documentation\n\n`;
markdownContent += `Generated on ${new Date().toLocaleDateString()}\n\n`;
markdownContent += `This document contains code files from the RL_Hex_game project.\n\n`;

// Add table of contents section
markdownContent += `## Table of Contents\n\n`;

// Store file paths and their TOC entries for later
const fileEntries = [];

// Recursive function to traverse directories and generate TOC
function traverseTOC(dirPath, indent = 0) {
  const items = fs.readdirSync(dirPath).sort();

  for (const item of items) {
    const itemPath = path.join(dirPath, item);
    let stats;
    
    try {
      stats = fs.statSync(itemPath);
    } catch (statError) {
      console.warn(`Warning: Could not get stats for ${itemPath}, skipping. Error: ${statError.message}`);
      continue;
    }

    if (stats.isDirectory()) {
      if (excludedDirs.includes(item)) {
        continue;
      }
      
      // Add directory to TOC
      markdownContent += `${'  '.repeat(indent)}- 📁 ${item}/\n`;
      
      // Recursively traverse subdirectory
      traverseTOC(itemPath, indent + 1);
      
    } else { // It's a file
      const ext = path.extname(item).toLowerCase();
      if (fileTypesToInclude.includes(ext)) {
        if (stats.size > maxFileSizeBytes) {
          markdownContent += `${'  '.repeat(indent)}- 📄 ${item} [File too large - ${(stats.size / 1024).toFixed(1)} KB]\n`;
          continue;
        }
        
        // Generate a link-friendly ID for the file
        const relativePath = path.relative(rootDir, itemPath);
        const fileId = relativePath.replace(/[^\w]/g, '-').toLowerCase();
        
        // Add file to TOC with link to content section
        markdownContent += `${'  '.repeat(indent)}- 📄 [${item}](#${fileId})\n`;
        
        // Store file info for content section
        fileEntries.push({
          path: itemPath,
          relativePath: relativePath,
          id: fileId
        });
      }
    }
  }
}

// Generate the table of contents
traverseTOC(rootDir);

// Add file contents
markdownContent += `\n## Source Code\n\n`;

// Process each file
fileEntries.forEach(fileEntry => {
  try {
    const content = fs.readFileSync(fileEntry.path, 'utf8');
    
    // Determine language for syntax highlighting
    const ext = path.extname(fileEntry.path).toLowerCase();
    let language = '';
    
    switch (ext) {
      case '.py': language = 'python'; break;
      case '.js': language = 'javascript'; break;
      case '.md': language = 'markdown'; break;
      case '.json': language = 'json'; break;
      case '.yml':
      case '.yaml': language = 'yaml'; break;
      case '.toml': language = 'toml'; break;
      default: language = 'plaintext';
    }
    
    // Add file header with anchor
    markdownContent += `### <a id="${fileEntry.id}"></a>${fileEntry.relativePath}\n\n`;
    
    // Add file content with syntax highlighting
    markdownContent += `\`\`\`${language}\n${content}\n\`\`\`\n\n`;
    
  } catch (error) {
    console.error(`Error processing file ${fileEntry.path}:`, error.message);
    markdownContent += `### ${fileEntry.relativePath}\n\n`;
    markdownContent += `**Error processing file: ${error.message}**\n\n`;
  }
});

// Write to the markdown file
fs.writeFileSync(outputMdPath, markdownContent);

console.log(`Markdown documentation successfully created at ${outputMdPath}`);