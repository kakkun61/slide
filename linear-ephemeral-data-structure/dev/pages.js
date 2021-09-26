const fs = require('fs');

const out = '../../slide-pages/linear-ephemeral-data-structure/';

const files = [
  'index.html',
  'theme.css',
  'pfds.jpg',
  'sakulambda.svg',
  'laser.svg'
];

fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, out + file);
}
