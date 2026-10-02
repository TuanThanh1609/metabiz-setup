const { chromium } = require('playwright');
const path = require('path');
const http = require('http');
const fs = require('fs');
const leadsHandler = require('../api/leads.js');

async function main() {
  // Start local server to serve src/crm.html and api/leads
  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, 'http://localhost:3000');
    if (url.pathname.startsWith('/api/leads')) {
      const query = Object.fromEntries(url.searchParams);
      return leadsHandler({ method: req.method, query }, res);
    }
    // Serve static files
    let filePath = path.join(__dirname, '..', 'src', url.pathname === '/' || url.pathname === '/redgold' || url.pathname === '/crm' ? 'crm.html' : url.pathname);
    if (!fs.existsSync(filePath)) {
      filePath = path.join(__dirname, '..', 'src', 'crm.html');
    }
    const ext = path.extname(filePath);
    const contentType = ext === '.js' ? 'application/javascript' : ext === '.css' ? 'text/css' : 'text/html';
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(fs.readFileSync(filePath));
  });

  await new Promise(r => server.listen(3000, r));
  console.log('Local test server running on port 3000');

  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });

  console.log('Navigating to http://localhost:3000/redgold ...');
  await page.goto('http://localhost:3000/redgold');
  await page.waitForTimeout(2000);

  // If PIN modal appears, fill 1609
  const pinInput = page.locator('#inputPin');
  if (await pinInput.isVisible()) {
    console.log('Entering PIN 1609...');
    await pinInput.fill('1609');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(3000);
  }

  // Wait for data load
  await page.waitForTimeout(4000);

  const screenshotPath = path.join(__dirname, '..', 'redgold-crm-dashboard.png');
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Screenshot saved to:', screenshotPath);

  // Open Drawer on the first lead row
  const firstRow = page.locator('#leadsTableBody tr').first();
  if (await firstRow.isVisible()) {
    console.log('Clicking first lead row to inspect drawer...');
    await firstRow.click();
    await page.waitForTimeout(2000);
    const drawerScreenshotPath = path.join(__dirname, '..', 'redgold-crm-drawer.png');
    await page.screenshot({ path: drawerScreenshotPath, fullPage: true });
    console.log('Drawer screenshot saved to:', drawerScreenshotPath);
  }

  await browser.close();
  server.close();
  console.log('Done!');
}

main().catch(console.error);
