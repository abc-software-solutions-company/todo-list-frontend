const svgtofont = require('svgtofont');
const path = require('path');
const pkg = require('../package.json');

const options = {
  src: path.resolve(process.cwd(), 'src/vendors/abc-icons/input'),
  dist: path.resolve(process.cwd(), 'src/vendors/abc-icons/dist'),
  fontName: 'abc',
  css: {
    cssPath: '/fonts/'
  },
  startUnicode: 0xea01,
  svgicons2svgfont: {
    fontHeight: 1000,
    normalize: true
  },
  website: {
    title: 'ABC Icons Font',
    logo: false,
    version: pkg.version,
    meta: {
      description: 'Converts SVG fonts to TTF/EOT/WOFF/WOFF2/SVG',
      keywords: 'svgtofont,TTF,EOT,WOFF,WOFF2,SVG'
    },
    description: null,
    corners: null,
    links: [
      {
        title: 'Font Class',
        url: 'index.html'
      },
      {
        title: 'Unicode',
        url: 'unicode.html'
      }
    ],
    footerInfo: null
  }
};

svgtofont(options).then(() => {
  console.log('done!');
});
