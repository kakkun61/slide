const fs = require('fs');

const pagesDir = process.argv[2] || '../../slide-pages/';
const outDir = pagesDir + '/ppl-2025/';

const files = [
  'index.html',
  'theme.css',
  'image/enkaijo.jpg',
  'image/fee.png',
  'image/kaijo.jpg',
  'image/poster.jpg',
  'image/ppl-title.jpg',
  'image/shokuji.jpg',
  'laser.svg'
];

fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(outDir + '/image', { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, outDir + '/' + file);
}
