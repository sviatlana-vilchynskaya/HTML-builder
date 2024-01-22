const fs = require('fs').promises;
const path = require('path');

async function mergeStyles() {
  const stylesDir = path.join(__dirname, 'styles');
  const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');

  try {
    const files = await fs.readdir(stylesDir);

    const styles = await Promise.all(
      files
        .filter((file) => path.extname(file) === '.css')
        .map((file) => fs.readFile(path.join(stylesDir, file), 'utf8')),
    );

    await fs.writeFile(bundlePath, styles.join('\n'));

    console.log('Styles bundled successfully!');
  } catch (err) {
    console.error(err);
  }
}

mergeStyles();
