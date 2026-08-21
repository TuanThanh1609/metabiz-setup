const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '../src/index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Find boundaries
const startStep3 = html.indexOf('<!-- BƯỚC 3: CHỦ ĐỀ NÊN TRÁNH & TÙY CHỈNH -->');
const startStep4 = html.indexOf('<!-- BƯỚC 4: THƯ VIỆN KIẾN THỨC -->');
const startStep5 = html.indexOf('<!-- BƯỚC 5: KỸ NĂNG -->');

if (startStep3 === -1 || startStep4 === -1 || startStep5 === -1) {
  console.error('Could not find step markers:', { startStep3, startStep4, startStep5 });
  process.exit(1);
}

let guardrailsContent = html.substring(startStep3, startStep4).trim();
let knowledgeContent = html.substring(startStep4, startStep5).trim();

// Transform Guardrails from Step 3 -> Step 4
guardrailsContent = guardrailsContent
  .replace('<!-- BƯỚC 3: CHỦ ĐỀ NÊN TRÁNH & TÙY CHỈNH -->', '<!-- BƯỚC 4: CHỦ ĐỀ NÊN TRÁNH & TÙY CHỈNH -->')
  .replace('data-step="3"', 'data-step="4"')
  .replace('Bước 3: Những Điều Nên Làm', 'Bước 4: Những Điều Nên Làm');

// Transform Knowledge from Step 4 -> Step 3
knowledgeContent = knowledgeContent
  .replace('<!-- BƯỚC 4: THƯ VIỆN KIẾN THỨC -->', '<!-- BƯỚC 3: THƯ VIỆN KIẾN THỨC -->')
  .replace('data-step="4"', 'data-step="3"')
  .replace('Bước 4: Thư Viện Kiến Thức Của AI', 'Bước 3: Thư Viện Kiến Thức Của AI');

const before = html.substring(0, startStep3);
const after = html.substring(startStep5);

const newHtml = before + knowledgeContent + '\n\n          ' + guardrailsContent + '\n\n          ' + after;

fs.writeFileSync(indexPath, newHtml, 'utf8');
console.log('Successfully swapped Step 3 (Knowledge Hub) and Step 4 (Guardrails) in src/index.html!');
