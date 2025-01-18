const fs = require('fs');

const out = '../../slide-pages/monad-drill-help/';

const files = [
  'index.html',
  'theme.css',
  'doujin-site.png',
  'drill-11.png',
  'laser.svg'
];

fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, out + file);
}
