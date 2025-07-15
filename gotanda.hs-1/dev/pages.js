const fs = require('fs');

const pagesDir = process.argv[2] || '../../slide-pages/';
const outDir = pagesDir + '/gotanda.hs-1/';

const files = [
  'index.html'
];

fs.mkdirSync(outDir, { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, outDir + '/' + file);
}
