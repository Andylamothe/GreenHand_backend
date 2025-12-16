const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, '../src/data');
const targetDir = path.join(__dirname, '../dist/data');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`✅ Created directory: ${targetDir}`);
}

// Copy all files from src/data to dist/data
if (fs.existsSync(sourceDir)) {
  const files = fs.readdirSync(sourceDir);
  files.forEach(file => {
    const src = path.join(sourceDir, file);
    const dest = path.join(targetDir, file);
    
    const stat = fs.statSync(src);
    if (stat.isDirectory()) {
      // Recursively copy directories
      fs.cpSync(src, dest, { recursive: true, force: true });
      console.log(`✅ Copied directory: ${file}`);
    } else {
      // Copy files
      fs.copyFileSync(src, dest);
      console.log(`✅ Copied file: ${file}`);
    }
  });
  console.log(`✅ All data files copied from src/data to dist/data`);
} else {
  console.warn(`⚠️  Source directory not found: ${sourceDir}`);
}
