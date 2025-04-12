const fs = require('fs');

const out = '../../slide-pages/ppl-2025/';

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

fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(out + '/image', { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, out + file);
}
