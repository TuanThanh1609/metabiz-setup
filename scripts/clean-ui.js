const fs = require('fs');
const path = require('path');

// 1. Clean src/index.html
const indexPath = path.join(__dirname, '../src/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

html = html.replace(/<span style="font-size: 16px;">🎮<\/span>\s*/g, '')
           .replace(/<span style="font-size: 16px;">📱<\/span>\s*/g, '')
           .replace(/<span style="color: #1877f2;">👤<\/span>\s*/g, '')
           .replace(/<span style="color: #1877f2;">📍<\/span>\s*/g, '')
           .replace(/<span style="color: #1877f2;">📦<\/span>\s*/g, '')
           .replace(/<span style="color: #1877f2;">🚚<\/span>\s*/g, '')
           .replace(/<span style="font-size: 16px;">📡<\/span>\s*/g, '')
           .replace(/<span style="font-size: 16px;">🧠<\/span>\s*/g, '')
           .replace(/<span style="font-size: 16px;">🔀<\/span>\s*/g, '')
           .replace(/💬\s*/g, '');

fs.writeFileSync(indexPath, html, 'utf8');

// 2. Clean src/js/app.js
const appPath = path.join(__dirname, '../src/js/app.js');
let appJs = fs.readFileSync(appPath, 'utf8');

appJs = appJs.replace(/>🗑️<\/button>/g, '>Xóa</button>')
             .replace(/🗑️/g, '');

fs.writeFileSync(appPath, appJs, 'utf8');

console.log('Final emoji cleanup completed!');
