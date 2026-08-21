const fs = require('fs');
const path = require('path');

// 1. UPDATE src/index.html
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

// Replace all "Truy cập Chat" with "Thêm kênh"
htmlCode = htmlCode.replaceAll('Truy cập Chat', 'Thêm kênh');
fs.writeFileSync(htmlPath, htmlCode, 'utf8');
console.log('src/index.html: Replaced all "Truy cập Chat" with "Thêm kênh"!');

// 2. UPDATE src/js/quick-setup.js
const jsPath = path.join(__dirname, '../src/js/quick-setup.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

jsCode = jsCode.replaceAll("'Truy cập Chat'", "'Thêm kênh'");
fs.writeFileSync(jsPath, jsCode, 'utf8');
console.log('src/js/quick-setup.js: Replaced all "Truy cập Chat" with "Thêm kênh"!');
