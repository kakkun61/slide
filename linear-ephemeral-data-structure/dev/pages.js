const fs = require('fs');

const pagesDir = process.argv[2] || '../../slide-pages/';
const outDir = pagesDir + '/linear-ephemeral-data-structure/';

const files = [
  'index.html',
  'theme.css',
  'pfds.jpg',
  'sakulambda.svg',
  'laser.svg'
];

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, outDir + '/' + file);
}
