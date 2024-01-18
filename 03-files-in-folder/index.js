const fs = require('fs').promises;
const path = require('path');

async function displayFileInfo(dirPath) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isFile()) {
      const filePath = path.join(dirPath, entry.name);
      const stats = await fs.stat(filePath);
      const fileExt = path.extname(entry.name);
      const fileName = path.basename(entry.name, fileExt);
      const fileSize = (stats.size / 1024).toFixed(3); //перевод в kb

      console.log(`${fileName} - ${fileExt.slice(1)} - ${fileSize}kb`);
    }
  }
}

const dirPath = path.join(__dirname, 'secret-folder');
displayFileInfo(dirPath);
