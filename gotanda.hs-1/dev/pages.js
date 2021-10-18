const fs = require('fs');

const out = '../../slide-pages/gotanda.hs-1/';

const files = [
  'index.html'
];

fs.mkdirSync(out, { recursive: true });

for (const file of files) {
  fs.copyFileSync(file, out + file);
}
