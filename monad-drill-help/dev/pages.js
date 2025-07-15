const fs = require('fs');

const pagesDir = process.argv[2] || '../../slide-pages/';
const outDir = pagesDir + '/monad-drill-help/';

const files = [
  'index.html',
  'theme.css',
  'doujin-site.png',
  'drill-11.png',
  'laser.svg'
];

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, outDir + '/' + file);
}
