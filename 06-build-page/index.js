const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  const entries = await fs.readdir(src, { withFileTypes: true });

  await fs.mkdir(dest, { recursive: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      await copyDir(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function buildPage() {
  const templatePath = path.join(__dirname, 'template.html');
  const stylesDir = path.join(__dirname, 'styles');
  const componentsDir = path.join(__dirname, 'components');
  const assetsDir = path.join(__dirname, 'assets');
  const distDir = path.join(__dirname, 'project-dist');

  try {
    await fs.mkdir(distDir, { recursive: true });

    let template = await fs.readFile(templatePath, 'utf8');

    const tags = template.match(/{{\s*\w+\s*}}/g) || [];

    for (let tag of tags) {
      const componentName = tag.replace(/{{\s*|\s*}}/g, '');
      const componentPath = path.join(componentsDir, `${componentName}.html`);
      const componentContent = await fs.readFile(componentPath, 'utf8');
      template = template.replace(tag, componentContent);
    }

    await fs.writeFile(path.join(distDir, 'index.html'), template);

    const styleFiles = await fs.readdir(stylesDir);
    const styles = await Promise.all(
      styleFiles.map((file) => fs.readFile(path.join(stylesDir, file), 'utf8')),
    );
    await fs.writeFile(path.join(distDir, 'style.css'), styles.join('\n'));

    await copyDir(assetsDir, path.join(distDir, 'assets'));

    console.log('Page built successfully!');
  } catch (err) {
    console.error(err);
  }
}

buildPage();
