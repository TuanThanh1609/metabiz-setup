const fs = require('fs');
const path = require('path');

// 1. UPDATE src/js/tabs.js to add safe style access and global exposure
const tabsPath = path.join(__dirname, '../src/js/tabs.js');
let tabsCode = fs.readFileSync(tabsPath, 'utf8');

tabsCode = tabsCode.replace(/if \(groupWrong\) groupWrong\.style\.display/g, 'if (groupWrong && groupWrong.style) groupWrong.style.display');

const tabsGlobalTarget = `// Global instance
window.tabsApp = new TabsManager();
document.addEventListener('DOMContentLoaded', () => {
  window.tabsApp.init();
});`;

const tabsGlobalReplacement = `// Global instance
window.tabsApp = new TabsManager();
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.tabsApp.init();
    });
  } else {
    window.tabsApp.init();
  }
}`;

tabsCode = tabsCode.replace(tabsGlobalTarget, tabsGlobalReplacement);
fs.writeFileSync(tabsPath, tabsCode, 'utf8');
console.log('src/js/tabs.js updated safely!');

// 2. UPDATE src/js/app.js to initialize app instance immediately and safely
const appPath = path.join(__dirname, '../src/js/app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

const appGlobalTarget = `// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new SmaxStudioApp();
});`;

const appGlobalReplacement = `// Global app instance
window.app = new SmaxStudioApp();
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.app && !window.app.initialized) {
        window.app.init();
      }
    });
  }
}`;

appCode = appCode.replace(appGlobalTarget, appGlobalReplacement);
fs.writeFileSync(appPath, appCode, 'utf8');
console.log('src/js/app.js updated safely!');
