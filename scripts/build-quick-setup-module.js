const fs = require('fs');
const path = require('path');

// 1. UPDATE src/js/app.js to add switchModule and update setSystemVersion
const appJsPath = path.join(__dirname, '../src/js/app.js');
let appJsCode = fs.readFileSync(appJsPath, 'utf8');

const targetSetSysVer = `  // --- TOPBAR: SYSTEM VERSION SWITCHER (STANDARD VS ADVANCE) ---
  setSystemVersion(version) {
    this.systemVersion = version; // 'standard' | 'advance'
    this.totalSteps = version === 'standard' ? 6 : 8;`;

const replacementSetSysVer = `  // --- TOPBAR: SYSTEM VERSION SWITCHER (STANDARD VS ADVANCE) ---
  setSystemVersion(version) {
    this.switchModule('metaAgent');
    this.systemVersion = version; // 'standard' | 'advance'
    this.totalSteps = version === 'standard' ? 6 : 8;`;

appJsCode = appJsCode.replace(targetSetSysVer, replacementSetSysVer);

// Add switchModule method to SmaxApp class
const switchViewTarget = `  switchView(viewId) {
    this.closeWizard();
    this.currentView = viewId;`;

const switchModuleCode = `  // --- MODULE SWITCHER (META BUSINESS AGENT VS QUICK SETUP) ---
  switchModule(moduleName) {
    this.currentModule = moduleName; // 'metaAgent' | 'quickSetup'

    const metaSidebar = document.querySelector('.smax-sidebar');
    const metaContent = document.querySelector('.smax-content-pane');
    const qsSidebar = document.getElementById('quickSetupSidebar');
    const qsContent = document.getElementById('quickSetupContentPane');

    const linkStandard = document.getElementById('topMenuMetaStandard');
    const linkAdvance = document.getElementById('topMenuMetaAdvance');
    const linkQuickSetup = document.getElementById('topMenuQuickSetup');

    if (moduleName === 'quickSetup') {
      if (metaSidebar) metaSidebar.style.display = 'none';
      if (metaContent) metaContent.style.display = 'none';
      if (qsSidebar) qsSidebar.style.display = 'flex';
      if (qsContent) qsContent.style.display = 'flex';

      if (linkStandard) linkStandard.classList.remove('active');
      if (linkAdvance) linkAdvance.classList.remove('active');
      if (linkQuickSetup) linkQuickSetup.classList.add('active');

      if (window.quickSetupApp) {
        window.quickSetupApp.init();
        window.quickSetupApp.switchQsView('qsWizardView');
      }

      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast('Đã chuyển sang Quick Setup — Hướng dẫn kích hoạt Automation');
      }
    } else {
      if (metaSidebar) metaSidebar.style.display = 'flex';
      if (metaContent) metaContent.style.display = 'block';
      if (qsSidebar) qsSidebar.style.display = 'none';
      if (qsContent) qsContent.style.display = 'none';

      if (linkQuickSetup) linkQuickSetup.classList.remove('active');
      if (this.systemVersion === 'standard') {
        if (linkStandard) linkStandard.classList.add('active');
        if (linkAdvance) linkAdvance.classList.remove('active');
      } else {
        if (linkAdvance) linkAdvance.classList.add('active');
        if (linkStandard) linkStandard.classList.remove('active');
      }
    }
  }

  switchView(viewId) {
    this.closeWizard();
    this.currentView = viewId;`;

appJsCode = appJsCode.replace(switchViewTarget, switchModuleCode);
fs.writeFileSync(appJsPath, appJsCode, 'utf8');
console.log('src/js/app.js updated with switchModule method!');

// 2. UPDATE src/index.html
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

// A. Add CSS in <head>
if (!htmlCode.includes('css/quick-setup.css')) {
  htmlCode = htmlCode.replace(
    '<link rel="stylesheet" href="css/tabs.css">',
    '<link rel="stylesheet" href="css/tabs.css">\n  <link rel="stylesheet" href="css/quick-setup.css">'
  );
}

// B. Add Quick Setup Menu Item in Topbar
const topMenuTarget = `          <li><a href="#" class="smax-menu-item" id="topMenuMetaStandard" onclick="app.setSystemVersion('standard'); return false;">Meta Business Agent Standard</a></li>
          <li><a href="#" class="smax-menu-item active" id="topMenuMetaAdvance" onclick="app.setSystemVersion('advance'); return false;">Meta Business Agent Advance</a></li>`;

const topMenuReplacement = `          <li><a href="#" class="smax-menu-item" id="topMenuMetaStandard" onclick="app.setSystemVersion('standard'); return false;">Meta Business Agent Standard</a></li>
          <li><a href="#" class="smax-menu-item active" id="topMenuMetaAdvance" onclick="app.setSystemVersion('advance'); return false;">Meta Business Agent Advance</a></li>
          <li><a href="#" class="smax-menu-item" id="topMenuQuickSetup" onclick="app.switchModule('quickSetup'); return false;" style="display: inline-flex; align-items: center; gap: 5px;"><span>🚀</span> Quick Setup</a></li>`;

htmlCode = htmlCode.replace(topMenuTarget, topMenuReplacement);

// C. Add Script tag for quick-setup.js
if (!htmlCode.includes('js/quick-setup.js')) {
  htmlCode = htmlCode.replace(
    '<script src="js/app.js"></script>',
    '<script src="js/quick-setup.js"></script>\n  <script src="js/app.js"></script>'
  );
}

// D. Add Quick Setup Sidebar and Content Pane into .smax-main-layout
const quickSetupMarkup = `
      <!-- ========================================================================== -->
      <!-- QUICK SETUP MODULE: SIDEBAR & CONTENT PANE (ONBOARDING AUTOMATION WIZARD) -->
      <!-- ========================================================================== -->
      
      <!-- QUICK SETUP SIDEBAR -->
      <aside class="smax-qs-sidebar" id="quickSetupSidebar" style="display: none;">
        <div>
          <div class="smax-qs-sidebar-title">QUICK SETUP AUTOMATION</div>
          <ul class="smax-qs-sidebar-menu">
            <li>
              <a href="#" class="smax-qs-sidebar-item active" data-view="qsWizardView" onclick="quickSetupApp.switchQsView('qsWizardView'); return false;">
                <span class="smax-qs-icon">🚀</span>
                <span>Luồng Setup 7 Bước</span>
              </a>
            </li>
            <li>
              <a href="#" class="smax-qs-sidebar-item" data-view="qsOverviewView" onclick="quickSetupApp.switchQsView('qsOverviewView'); return false;">
                <span class="smax-qs-icon">📊</span>
                <span>Tổng quan</span>
              </a>
            </li>
            <li>
              <a href="#" class="smax-qs-sidebar-item" data-view="qsScenarioLogView" onclick="quickSetupApp.switchQsView('qsScenarioLogView'); return false;">
                <span class="smax-qs-icon">📋</span>
                <span>Log Kịch bản</span>
              </a>
            </li>
            <li>
              <a href="#" class="smax-qs-sidebar-item" data-view="qsConversionView" onclick="quickSetupApp.switchQsView('qsConversionView'); return false;">
                <span class="smax-qs-icon">📈</span>
                <span>Hiệu quả Chuyển đổi</span>
              </a>
            </li>
            <li>
              <a href="#" class="smax-qs-sidebar-item" data-view="qsAiInsightView" onclick="quickSetupApp.switchQsView('qsAiInsightView'); return false;">
                <span class="smax-qs-icon">🧠</span>
                <span>AI Insight Dashboard</span>
              </a>
            </li>
            <li>
              <a href="#" class="smax-qs-sidebar-item" data-view="qsChannelManageView" onclick="quickSetupApp.switchQsView('qsChannelManageView'); return false;">
                <span class="smax-qs-icon">⚙️</span>
                <span>Quản lý Kênh & Kịch bản</span>
              </a>
            </li>
          </ul>
        </div>

        <div style="padding: 0 14px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; font-size: 12px; color: #64748b;">
            <div style="font-weight: 700; color: #0f1835; margin-bottom: 4px;">💡 Hành trình Onboarding</div>
            Kích hoạt tự động hóa xuyên suốt Trước mua → Trong mua → Sau mua.
          </div>
        </div>
      </aside>

      <!-- QUICK SETUP CONTENT PANE -->
      <main class="smax-qs-content-pane" id="quickSetupContentPane" style="display: none;">

        <!-- 1. WIZARD VIEW (INLINE 7-STEP WIZARD) -->
        <section id="qsWizardView" class="smax-qs-view-section active">
          
          <!-- Wizard Top Banner -->
          <div class="smax-qs-wizard-header">
            <div class="smax-qs-wizard-title-row">
              <div>
                <div class="smax-qs-wizard-title">
                  <span>🚀 Quick Setup — Kích Hoạt Tự Động Hóa Bán Hàng & CSKH</span>
                  <span class="smax-badge smax-badge-coral">Onboarding Mới</span>
                </div>
                <div class="smax-qs-wizard-subtitle">
                  Hướng dẫn từng bước thiết lập 1 luồng automation hoàn chỉnh xuyên suốt toàn bộ hành trình khách hàng (Trước mua → Trong mua → Sau mua)
                </div>
              </div>
              <button class="smax-btn smax-btn-sm" style="background: #f1f5f9; color: #475569; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 12px; padding: 6px 12px;" onclick="quickSetupApp.switchQsView('qsOverviewView')">
                📊 Xem Dashboard Giám Sát
              </button>
            </div>

            <!-- Stepper 7 Cột -->
            <div class="smax-qs-stepper" id="qsStepperContainer">
              <button class="smax-qs-step-item active" data-step="1" onclick="quickSetupApp.goToStep(1)">
                <span class="smax-qs-step-top-line">Bước 1</span>
                <span class="smax-qs-step-title-line">Kênh & Thương hiệu</span>
              </button>
              <button class="smax-qs-step-item" data-step="2" onclick="quickSetupApp.goToStep(2)">
                <span class="smax-qs-step-top-line">Bước 2</span>
                <span class="smax-qs-step-title-line">Chào đón & Trợ lý AI</span>
              </button>
              <button class="smax-qs-step-item" data-step="3" onclick="quickSetupApp.goToStep(3)">
                <span class="smax-qs-step-top-line">Bước 3</span>
                <span class="smax-qs-step-title-line">Lead & Chốt đơn</span>
              </button>
              <button class="smax-qs-step-item" data-step="4" onclick="quickSetupApp.goToStep(4)">
                <span class="smax-qs-step-top-line">Bước 4</span>
                <span class="smax-qs-step-title-line">Bám đuổi & Minigame</span>
              </button>
              <button class="smax-qs-step-item" data-step="5" onclick="quickSetupApp.goToStep(5)">
                <span class="smax-qs-step-top-line">Bước 5</span>
                <span class="smax-qs-step-title-line">Sau mua & Upsale</span>
              </button>
              <button class="smax-qs-step-item" data-step="6" onclick="quickSetupApp.goToStep(6)">
                <span class="smax-qs-step-top-line">Bước 6</span>
                <span class="smax-qs-step-title-line">AI Insight 6 chiều</span>
              </button>
              <button class="smax-qs-step-item" data-step="7" onclick="quickSetupApp.goToStep(7)">
                <span class="smax-qs-step-top-line">Bước 7</span>
                <span class="smax-qs-step-title-line">Kiểm thử & Kích hoạt</span>
              </button>
            </div>
          </div>

          <!-- BƯỚC 1: KÊNH & THƯƠNG HIỆU (🏠 NỀN TẢNG) -->
          <div class="smax-qs-step-panel active" id="qsStep1Panel" data-step="1">
            
            <!-- Card 1: Kênh Bán Hàng -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">1. Chọn Các Kênh Bạn Muốn Kích Hoạt Tự Động Hóa</div>
                <span class="smax-badge smax-badge-blue">Đa Kênh Omnichannel</span>
              </div>
              <p style="color: #5d6c7b; font-size: 13px; margin-bottom: 14px;">
                Chọn các nền tảng khách hàng thường nhắn tin với shop để đồng bộ tin nhắn về Smax và áp dụng kịch bản tự động.
              </p>

              <div class="smax-qs-channels-grid">
                <label class="smax-qs-channel-card selected">
                  <input type="checkbox" checked>
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Facebook Messenger</strong>
                    <div style="font-size: 11px; color: #10b981;">● Đã kết nối Fanpage</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card selected">
                  <input type="checkbox" checked>
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Zalo OA</strong>
                    <div style="font-size: 11px; color: #10b981;">● Đã xác thực OA</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card">
                  <input type="checkbox">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Instagram Direct</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card">
                  <input type="checkbox">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">TikTok Shop</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card">
                  <input type="checkbox">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Shopee Chat</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card">
                  <input type="checkbox">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Telegram Bot</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card">
                  <input type="checkbox">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">WhatsApp Business</strong>
                    <div style="font-size: 11px; color: #64748b;">Cloud API</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card">
                  <input type="checkbox">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Livechat Website</strong>
                    <div style="font-size: 11px; color: #64748b;">Widget nhúng Web</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Card 2: Nhận Diện Thương Hiệu & Ngành Hàng -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">2. Nhận Diện Thương Hiệu & Ngành Hàng</div>
                <span class="smax-badge smax-badge-coral">Auto-Presets</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="smax-form-group" style="margin-bottom: 0;">
                  <label class="smax-label" style="font-size: 12.5px;">Tên Thương Hiệu / Cửa Hàng: <span style="color: #eb6553;">*</span></label>
                  <input type="text" id="qsBrandName" class="smax-input" value="Shop Thời Trang Smax" placeholder="Nhập tên shop của bạn...">
                </div>

                <div class="smax-form-group" style="margin-bottom: 0;">
                  <label class="smax-label" style="font-size: 12.5px;">Ngành Hàng Kinh Doanh (Tự Động Điền Kịch Bản Chuẩn):</label>
                  <select id="qsIndustrySelect" class="smax-select">
                    <option value="fashion" selected>👗 Thời Trang & Phụ Kiện (Quần áo, Giày dép, Túi xách)</option>
                    <option value="cosmetics">💄 Mỹ Phẩm & Chăm Sóc Sắc Đẹp (Skincare, Makeup, Spa)</option>
                    <option value="fnb">🧋 F&B - Trà Sữa, Cafe & Đồ Ăn (Giao hàng nhanh, Mua 1 tặng 1)</option>
                    <option value="real_estate">🏢 Bất Động Sản & Dự Án (Bảng giá, Mặt bằng, Tư vấn đầu tư)</option>
                    <option value="spa_clinic">✨ Thẩm Mỹ Viện, Nha Khoa & Clinic (Đặt lịch hẹn, Khám da)</option>
                    <option value="education">🎓 Giáo Dục & Đào Tạo (Khóa học, Luyện thi, Test năng lực)</option>
                    <option value="other">📦 Bán Lẻ & Dịch Vụ Khác</option>
                  </select>
                </div>
              </div>
              <div style="font-size: 12px; color: #64748b; margin-top: 10px; background: #f8fafc; padding: 8px 12px; border-radius: 8px;">
                💡 <strong>Gợi ý:</strong> Chọn đúng ngành hàng sẽ giúp Smax tự động cấu hình tin nhắn chào mừng, kịch bản bám đuổi, minigame và ưu đãi sau mua phù hợp nhất.
              </div>
            </div>

            <!-- Card 3: Nguồn Dữ Liệu Sản Phẩm -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">3. Nguồn Dữ Liệu Sản Phẩm & Bảng Giá (Tùy chọn)</div>
                <span class="smax-badge smax-badge-gray">RAG Grounding</span>
              </div>
              <div style="display: flex; gap: 20px; align-items: center;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="radio" name="qsDataSource" value="sheet">
                  <span>Google Sheet (Bảng giá/Kho)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="radio" name="qsDataSource" value="drive">
                  <span>Google Drive (Catalogue/Ảnh)</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="radio" name="qsDataSource" value="shopee">
                  <span>Link Gian Hàng Shopee</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="radio" name="qsDataSource" value="none" checked>
                  <span>Bỏ qua — Tôi sẽ nạp sau</span>
                </label>
              </div>
            </div>

          </div>

          <!-- BƯỚC 2: CHÀO ĐÓN & TRỢ LÝ AI GENAI (📥 TRƯỚC MUA) -->
          <div class="smax-qs-step-panel" id="qsStep2Panel" data-step="2">
            
            <!-- Card 1: Welcome Bot -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">1. Kịch Bản Chào Mừng Khách Hàng (Welcome Bot)</div>
                <span class="smax-badge smax-badge-blue">Trước Mua</span>
              </div>

              <div class="smax-form-group">
                <label class="smax-label" style="font-size: 12.5px;">Tin nhắn chào mừng tự động khi khách mở chat lần đầu:</label>
                <textarea id="qsWelcomeMessage" class="smax-textarea" rows="3" style="font-size: 13px;">Xin chào {{name}}! 👋 Chào mừng bạn đến với Shop Thời Trang Smax. Em là Trợ lý AI có thể tư vấn mẫu mã, chọn size và nhận đơn tự động. Bạn đang tìm trang phục cho dịp nào ạ? 😊</textarea>
              </div>

              <div>
                <label class="smax-label" style="font-size: 12.5px; margin-bottom: 8px;">Các nút gợi ý nhanh (Quick Replies):</label>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                  <span class="smax-badge smax-badge-gray" style="padding: 6px 12px; font-size: 12px;">🛍️ Xem BST Mới ✕</span>
                  <span class="smax-badge smax-badge-gray" style="padding: 6px 12px; font-size: 12px;">📏 Tư vấn chọn size ✕</span>
                  <span class="smax-badge smax-badge-gray" style="padding: 6px 12px; font-size: 12px;">🏷️ Bảng giá & Ưu đãi ✕</span>
                  <span class="smax-badge smax-badge-gray" style="padding: 6px 12px; font-size: 12px;">📞 Gặp nhân viên tư vấn ✕</span>
                  <button class="smax-btn-sm" style="background: #f1f5f9; border: 1px dashed #94a3b8; border-radius: 6px; padding: 4px 10px; font-size: 11.5px; cursor: pointer;">+ Thêm nút</button>
                </div>
              </div>
            </div>

            <!-- Card 2: Trợ Lý AI GenAI -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">2. Kết Nối Trợ Lý AI GenAI & Nhận Diện Ý Định (Intentions)</div>
                <span class="smax-badge smax-badge-coral">GenAI Thay Keyword</span>
              </div>
              <p style="color: #5d6c7b; font-size: 13px; margin-bottom: 14px;">
                Thay vì dùng từ khóa thủ công dễ lỗi, Smax tích hợp mô hình ngôn ngữ lớn (LLM) để AI tự động hiểu ý định khách hàng và tư vấn mượt mà như nhân viên thật.
              </p>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                <div class="smax-form-group" style="margin-bottom: 0;">
                  <label class="smax-label" style="font-size: 12.5px;">Chọn Mô Hình GenAI:</label>
                  <select id="qsGenAiProvider" class="smax-select">
                    <option value="openai" selected>OpenAI ChatGPT (GPT-4o / GPT-4o-mini)</option>
                    <option value="gemini">Google Gemini 1.5 Pro / Flash</option>
                    <option value="claude">Anthropic Claude 3.5 Sonnet</option>
                    <option value="deepseek">DeepSeek V3 / R1</option>
                    <option value="groq">Groq Llama 3 (Siêu Tốc)</option>
                  </select>
                </div>

                <div class="smax-form-group" style="margin-bottom: 0;">
                  <label class="smax-label" style="font-size: 12.5px;">API Key Doanh Nghiệp:</label>
                  <input type="password" id="qsGenAiApiKey" class="smax-input" value="sk-proj-smax-ai-demo-key-2026">
                </div>
              </div>

              <!-- AI Intentions Box -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px;">
                <strong style="font-size: 13px; color: #0f1835; display: block; margin-bottom: 10px;">Các Ý Định AI Tự Động Nhận Diện & Xử Lý:</strong>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px;">
                    <input type="checkbox" checked>
                    <span>✅ <strong>Hỏi Giá / Tư Vấn SP:</strong> AI trả lời giá + ảnh sản phẩm</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px;">
                    <input type="checkbox" checked>
                    <span>✅ <strong>Chốt Đơn Mua:</strong> Bật luồng thu thập SĐT & địa chỉ</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px;">
                    <input type="checkbox" checked>
                    <span>✅ <strong>Hỏi Vận Chuyển:</strong> Thông báo phí ship & thời gian giao</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px;">
                    <input type="checkbox" checked>
                    <span>✅ <strong>Khiếu Nại / Yêu Cầu Người Thật:</strong> Chuyển nhân viên trực</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Card 3: Auto-Reply Comment -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">3. Tự Động Phản Hồi Bình Luận & Ẩn Số Điện Thoại (Comment-to-Inbox)</div>
                <span class="smax-badge smax-badge-gray">Chống Cướp Khách</span>
              </div>

              <div style="display: flex; gap: 24px; margin-bottom: 14px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <span>Tự động <strong>Thích (Like)</strong> bình luận</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <span style="color: #dc2626; font-weight: 600;">Tự động ẨN bình luận chứa SĐT/Email</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <span>Tự động <strong>Gửi tin nhắn Inbox</strong> kèm báo giá</span>
                </label>
              </div>

              <div class="smax-form-group" style="margin-bottom: 0;">
                <label class="smax-label" style="font-size: 12px;">Mẫu tin nhắn gửi vào Inbox (Hỗ trợ Spin-syntax ngẫu nhiên tránh spam):</label>
                <textarea class="smax-textarea" rows="2" style="font-size: 12.5px;">Dạ {chào|xin chào|hi} [=GENDER("anh","chị","bạn")] {{name}}, shop đã gửi {bảng giá|thông tin chi tiết sản phẩm|ưu đãi hôm nay} vào hộp thư Messenger rồi ạ! Bạn kiểm tra tin nhắn giúp shop nhé {🥰|✨}</textarea>
              </div>
            </div>

          </div>

          <!-- BƯỚC 3: LEAD & CHỐT ĐƠN (🛒 TRONG MUA) -->
          <div class="smax-qs-step-panel" id="qsStep3Panel" data-step="3">
            
            <!-- Card 1: Thu thập Lead -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">1. Tự Động Thu Thập Lead & Gắn Nhãn (Tag) Khách Hàng</div>
                <span class="smax-badge smax-badge-blue">Trong Mua</span>
              </div>
              <p style="color: #5d6c7b; font-size: 13px; margin-bottom: 14px;">
                Chọn các thông tin AI sẽ tự động bóc tách từ hội thoại và lưu vào hồ sơ khách hàng:
              </p>

              <div style="display: flex; gap: 24px; flex-wrap: wrap; margin-bottom: 16px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" id="qsSkillLeadCapture" checked>
                  <strong>Số điện thoại</strong>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <strong>Địa chỉ giao hàng</strong>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <strong>Họ và tên</strong>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <span>Email</span>
                </label>
              </div>

              <!-- Rules for tagging -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px;">
                <strong style="font-size: 13px; color: #0f1835; margin-bottom: 8px; display: block;">Quy Tắc Gắn Nhãn (Tag) Tự Động:</strong>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12.5px; color: #475569;">
                  <div>• Khi khách để lại SĐT ➔ Gắn tag: <span class="smax-badge smax-badge-coral">Lead Nóng</span> <span class="smax-badge smax-badge-blue">Có SĐT</span></div>
                  <div>• Khi khách hỏi giá SP ➔ Gắn tag: <span class="smax-badge smax-badge-gray">Đã Báo Giá</span></div>
                  <div>• Khi khách chốt đơn ➔ Gắn tag: <span class="smax-badge smax-badge-green">Đã Lên Đơn</span> <span class="smax-badge smax-badge-blue">Khách Mua</span></div>
                  <div>• Khi khách từ chối ➔ Gắn tag: <span class="smax-badge smax-badge-gray">Từ Chối_Cần Bám Đuổi</span></div>
                </div>
              </div>
            </div>

            <!-- Card 2: Tạo đơn hàng & POS -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">2. Tự Động Lên Đơn Hàng & Đồng Bộ POS</div>
                <span class="smax-badge smax-badge-green">E-Commerce</span>
              </div>

              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px;">
                <div>
                  <strong style="font-size: 14px; color: #0f1835;">Tự động nhận diện đơn hàng khi khách chốt mua</strong>
                  <div style="font-size: 12px; color: #5d6c7b;">AI tự lấy mẫu mã, kích cỡ, số lượng, địa chỉ để tạo đơn ngay lập tức.</div>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="qsSkillAutoOrder" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <div class="smax-form-group" style="margin-bottom: 0;">
                <label class="smax-label" style="font-size: 12.5px;">Hệ thống Quản lý Bán hàng (POS) đồng bộ:</label>
                <div style="display: flex; gap: 20px; flex-wrap: wrap;">
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="radio" name="qsPosRadio" id="qsPosProvider" value="kiotviet" checked>
                    <strong>KiotViet</strong>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="radio" name="qsPosRadio" value="haravan">
                    <strong>Haravan</strong>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="radio" name="qsPosRadio" value="sapo">
                    <strong>Sapo</strong>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="radio" name="qsPosRadio" value="nhanh">
                    <strong>Nhanh.vn</strong>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="radio" name="qsPosRadio" value="smax_pos">
                    <span>Smax POS Nội Bộ</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- Card 3: Thanh toán QR Payment Hub -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">3. Thanh Toán Tự Động Qua Mã QR (Payment Hub)</div>
                <span class="smax-badge smax-badge-coral">VietQR Tự Động</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14px;">
                <div class="smax-form-group" style="margin-bottom: 0;">
                  <label class="smax-label" style="font-size: 12px;">Ngân hàng nhận tiền:</label>
                  <select class="smax-select">
                    <option value="vcb">Vietcombank (VCB)</option>
                    <option value="tcb">Techcombank (TCB)</option>
                    <option value="mbb">MB Bank (Quân Đội)</option>
                    <option value="acb">ACB (Á Châu)</option>
                  </select>
                </div>
                <div class="smax-form-group" style="margin-bottom: 0;">
                  <label class="smax-label" style="font-size: 12px;">Số tài khoản:</label>
                  <input type="text" class="smax-input" value="1029384756">
                </div>
                <div class="smax-form-group" style="margin-bottom: 0;">
                  <label class="smax-label" style="font-size: 12px;">Tên chủ tài khoản:</label>
                  <input type="text" class="smax-input" value="NGUYEN VAN A">
                </div>
              </div>
            </div>

          </div>

          <!-- BƯỚC 4: BÁM ĐUỔI 24H & MINIGAME (🛒 TRONG MUA) -->
          <div class="smax-qs-step-panel" id="qsStep4Panel" data-step="4">
            
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div>
                  <div class="smax-qs-card-title">Chuỗi Bám Đuổi Trong 24H & Minigame Kích Cầu Tự Động</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 2px;">
                    Tận dụng tối đa "cửa sổ vàng 24h" gửi tin nhắn miễn phí của Meta để tăng gấp đôi tỷ lệ chốt đơn
                  </div>
                </div>
                <span class="smax-badge smax-badge-coral">24H Window + Minigame</span>
              </div>

              <!-- Vertical Timeline 5 Steps -->
              <div class="smax-qs-timeline" id="qsFollowupTimeline">
                
                <!-- Mốc 1 -->
                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">1</div>
                  <div class="smax-qs-timeline-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <strong style="font-size: 13.5px; color: #0f1835;">Mốc 1 (Ngay lập tức / 0s): Gửi Voucher Ưu Đãi Độc Quyền</strong>
                      <span class="smax-badge smax-badge-blue">Miễn phí 0s</span>
                    </div>
                    <div style="font-size: 12.5px; color: #475569;">
                      "Tặng bạn mã ưu đãi <strong>SALE10</strong> giảm 10% + Miễn phí vận chuyển khi đặt hàng trong hôm nay!"
                    </div>
                  </div>
                </div>

                <!-- Mốc 2 -->
                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">2</div>
                  <div class="smax-qs-timeline-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <strong style="font-size: 13.5px; color: #0f1835;">Mốc 2 (Sau 1 giờ): Gửi Bằng Chứng Xã Hội (Social Proof)</strong>
                      <span class="smax-badge smax-badge-gray">1 Giờ sau</span>
                    </div>
                    <div style="font-size: 12.5px; color: #475569;">
                      Gửi album 5 hình ảnh feedback & đánh giá 5 sao từ những khách hàng đã mua sản phẩm trước đó.
                    </div>
                  </div>
                </div>

                <!-- Mốc 3 -->
                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">3</div>
                  <div class="smax-qs-timeline-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <strong style="font-size: 13.5px; color: #0f1835;">Mốc 3 (Sau 3 giờ): Tạo Sự Khan Hiếm (Urgency)</strong>
                      <span class="smax-badge smax-badge-gray">3 Giờ sau</span>
                    </div>
                    <div style="font-size: 12.5px; color: #475569;">
                      "Dạ mẫu bạn quan tâm trong kho hiện chỉ còn đúng 2 chiếc size của mình thôi ạ! Bạn có muốn em giữ hàng cho mình không?"
                    </div>
                  </div>
                </div>

                <!-- Mốc 4: Minigame -->
                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot" style="background: #fff5f3;">🎰</div>
                  <div class="smax-qs-timeline-content" style="border-color: #fca5a5; background: #fffdfc;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <strong style="font-size: 14px; color: #eb6553;">Mốc 4 (Sau 8 giờ): GỬI MINIGAME TƯƠNG TÁC KÍCH CẦU</strong>
                      <span class="smax-badge smax-badge-coral">Gamification</span>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 10px;">
                      <div>
                        <label class="smax-label" style="font-size: 11.5px;">Loại Minigame:</label>
                        <select id="qsMinigameType" class="smax-select" style="font-size: 12.5px;">
                          <option value="lucky_wheel" selected>🎡 Vòng Quay May Mắn (Lucky Wheel)</option>
                          <option value="open_gift">🎁 Mở Hộp Quà Bí Mật (Gift Box)</option>
                          <option value="quiz">🧩 Trắc Nghiệm Nhận Quà (Quiz Game)</option>
                        </select>
                      </div>
                      <div>
                        <label class="smax-label" style="font-size: 11.5px;">Tỷ lệ trúng thưởng:</label>
                        <select class="smax-select" style="font-size: 12.5px;">
                          <option value="70" selected>70% Trúng Thưởng (Khuyên dùng)</option>
                          <option value="100">100% Trúng Quà (Tăng tương tác)</option>
                          <option value="50">50% Trúng Thưởng</option>
                        </select>
                      </div>
                    </div>

                    <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #0f1835;">
                      <input type="checkbox" checked>
                      <span>Cơ chế Viral: <strong>Tag 2 bạn bè vào bài viết</strong> = Tự động tặng thêm +1 lượt quay</span>
                    </label>
                  </div>
                </div>

                <!-- Mốc 5 -->
                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">5</div>
                  <div class="smax-qs-timeline-content">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                      <strong style="font-size: 13.5px; color: #0f1835;">Mốc 5 (Sau 20 giờ): Cơ Hội Cuối (Last Chance)</strong>
                      <span class="smax-badge smax-badge-gray">20 Giờ sau</span>
                    </div>
                    <div style="font-size: 12.5px; color: #475569;">
                      "Mã ưu đãi SALE10 sắp hết hạn trong 4 giờ tới! Đặt ngay để kịp nhận ưu đãi hôm nay nhé bạn."
                    </div>
                  </div>
                </div>

              </div>

              <!-- Auto-exit notice -->
              <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #166534;">
                🛡️ <strong>Cơ chế thoát thông minh (Sequence REMOVE):</strong> Ngay khi khách bấm "Đặt hàng" hoặc hoàn tất đơn, hệ thống sẽ <strong>tự động ngắt chuỗi bám đuổi ngay lập tức</strong>, tuyệt đối không làm phiền khách đã mua.
              </div>
            </div>

          </div>

          <!-- BƯỚC 5: SAU MUA & UPSALE (📦 SAU MUA) -->
          <div class="smax-qs-step-panel" id="qsStep5Panel" data-step="5">
            
            <!-- Card 1: Webview Đơn hàng -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">1. Webview Xác Nhận & Theo Dõi Hành Trình Đơn Hàng</div>
                <span class="smax-badge smax-badge-green">Sau Mua</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 340px; gap: 20px; align-items: flex-start;">
                <div>
                  <p style="color: #5d6c7b; font-size: 13px; margin-bottom: 14px;">
                    Gửi trang Webview chuyên nghiệp ngay trong Messenger để khách xem lại chi tiết đơn hàng, tra cứu mã vận đơn và hành trình giao hàng theo thời gian thực.
                  </p>

                  <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px;">
                    <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; cursor: pointer;">
                      <input type="checkbox" id="qsWebviewOrderConfirm" checked>
                      <strong>Gửi Webview Xác nhận đơn hàng (Hiển thị sản phẩm, số lượng, địa chỉ & tổng tiền)</strong>
                    </label>
                    <label style="display: flex; align-items: center; gap: 10px; font-size: 13px; cursor: pointer;">
                      <input type="checkbox" checked>
                      <strong>Gửi Webview Theo dõi Hành trình đơn (Đã xác nhận ➔ Đang đóng gói ➔ Đang giao ➔ Đã giao)</strong>
                    </label>
                  </div>

                  <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 12px 14px; font-size: 12px; color: #475569;">
                    ✅ <strong>Đồng bộ tự động:</strong> Dữ liệu mã vận đơn và trạng thái giao hàng được cập nhật trực tiếp từ hệ thống POS (KiotViet/Haravan).
                  </div>
                </div>

                <!-- Webview Phone Mockup Preview -->
                <div style="background: #ffffff; border: 2px solid #0f1835; border-radius: 24px; padding: 12px; box-shadow: 0 4px 16px rgba(0,0,0,0.08);">
                  <div style="text-align: center; font-size: 10px; color: #94a3b8; margin-bottom: 8px;">LIVE WEBVIEW PREVIEW</div>
                  <div style="background: #f8fafc; border: 1px solid #e8ecf2; border-radius: 14px; padding: 12px;">
                    <div style="font-weight: 800; font-size: 13px; color: #0f1835; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-bottom: 8px;">
                      Shop Thời Trang Smax
                    </div>
                    <div style="font-size: 11.5px; color: #64748b;">Mã đơn: <strong style="color: #0f1835;">#123456789</strong></div>
                    <div style="font-size: 11.5px; color: #64748b;">Khách hàng: <strong style="color: #0f1835;">Lê Văn An</strong></div>
                    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px dashed #cbd5e1; font-size: 12px; color: #0f1835;">
                      <div>• Áo polo nam Classic (x1) - 350.000₫</div>
                    </div>
                    <div style="margin-top: 6px; display: flex; justify-content: space-between; font-weight: 700; color: #eb6553; font-size: 13px;">
                      <span>Tổng tiền:</span>
                      <span>350.000₫</span>
                    </div>
                    <button class="smax-btn-primary-coral" style="width: 100%; margin-top: 10px; padding: 6px; font-size: 11.5px; justify-content: center;">
                      Xác Nhận Đơn Hàng
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 2: Upsale 7 ngày -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div>
                  <div class="smax-qs-card-title">2. Chuỗi Chăm Sóc & Upsale 7 Ngày Sau Mua (Voucher Re-engagement)</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 2px;">
                    Tự động gửi tin nhắn chăm sóc và gợi ý mua lại sau khi khách nhận hàng thành công
                  </div>
                </div>
                <span class="smax-badge smax-badge-coral">Upsale Tăng LTV</span>
              </div>

              <!-- Timeline 4 mốc sau mua -->
              <div class="smax-qs-timeline" id="qsUpsaleTimeline">
                
                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">1</div>
                  <div class="smax-qs-timeline-content">
                    <strong style="font-size: 13px; color: #0f1835;">Ngay khi giao thành công:</strong> Cảm ơn & Gửi hướng dẫn bảo quản trang phục + Xin đánh giá 5 sao.
                  </div>
                </div>

                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">2</div>
                  <div class="smax-qs-timeline-content">
                    <strong style="font-size: 13px; color: #0f1835;">Ngày thứ 3:</strong> Hỏi thăm trải nghiệm mặc đồ (Có vừa vặn không? Cần đổi size miễn phí không?).
                  </div>
                </div>

                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">3</div>
                  <div class="smax-qs-timeline-content">
                    <strong style="font-size: 13px; color: #0f1835;">Ngày thứ 5 (Cross-sell):</strong> Gửi gợi ý phối đồ: Quần jean / Giày sneaker cực hợp với áo đã mua.
                  </div>
                </div>

                <div class="smax-qs-timeline-node">
                  <div class="smax-qs-timeline-dot">4</div>
                  <div class="smax-qs-timeline-content" style="background: #fffdfc; border-color: #fca5a5;">
                    <strong style="font-size: 13px; color: #eb6553;">Ngày thứ 7 (Re-purchase):</strong> Tặng mã <strong>VIP20</strong> giảm 20% cho đơn hàng tiếp theo (Hiệu lực 7 ngày).
                  </div>
                </div>

              </div>

              <div style="display: flex; gap: 20px; align-items: center; margin-top: 14px; font-size: 12.5px; color: #64748b;">
                <span>Kênh gửi ngoài 24h: <strong>Smax Extension (Khuyên dùng)</strong></span>
                <span>Khung giờ gửi an toàn: <strong>9:00 - 20:00</strong></span>
              </div>
            </div>

          </div>

          <!-- BƯỚC 6: AI INSIGHT 6 CHIỀU (🧠 XUYÊN SUỐT) -->
          <div class="smax-qs-step-panel" id="qsStep6Panel" data-step="6">
            
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div>
                  <div class="smax-qs-card-title">1. Phân Tích Insight Phiên Hội Thoại - AI Lead Intelligence (6 Chiều)</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 2px;">
                    AI tự động phân tích sâu toàn bộ hội thoại xuyên suốt Trước mua, Trong mua và Sau mua để chấm điểm và phân loại khách hàng
                  </div>
                </div>
                <span class="smax-badge smax-badge-coral">AI Intelligence</span>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
                <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                  <input type="checkbox" id="qsInsightLeadScoring" checked style="margin-top: 2px;">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">1. Chấm điểm Leads (Lead Scoring 0-100)</strong>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Đo lường mức độ sẵn sàng mua hàng dựa trên tương tác và câu hỏi.</div>
                  </div>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                  <input type="checkbox" checked style="margin-top: 2px;">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">2. Mức độ tiềm năng (Hot / Warm / Cold)</strong>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Phân loại tự động để ưu tiên nhân viên chăm sóc khách Hot Lead trước.</div>
                  </div>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                  <input type="checkbox" checked style="margin-top: 2px;">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">3. Sản phẩm quan tâm (Interested Products)</strong>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Trích xuất danh sách SKU, kích cỡ và màu sắc khách đang tìm kiếm.</div>
                  </div>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                  <input type="checkbox" checked style="margin-top: 2px;">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">4. Nhu cầu cụ thể (Specific Needs)</strong>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Nhận diện ngữ cảnh mua (mua đi tiệc, đi làm, quà tặng sinh nhật...).</div>
                  </div>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                  <input type="checkbox" id="qsInsightObjections" checked style="margin-top: 2px;">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">5. Lý do từ chối (Objections Analysis)</strong>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Phát hiện điểm khách ngập ngừng: giá cao, phí ship, sợ không vừa size...</div>
                  </div>
                </label>

                <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                  <input type="checkbox" checked style="margin-top: 2px;">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">6. Kịch bản xử lý từ chối (Objection Handling)</strong>
                    <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Gợi ý câu trả lời & phương án thuyết phục tức thì cho từng lý do từ chối.</div>
                  </div>
                </label>
              </div>

              <!-- Live AI Lead Insight Card Preview -->
              <div style="background: #ffffff; border: 1.5px solid #fed7aa; border-radius: 14px; padding: 16px; box-shadow: 0 2px 10px rgba(235, 101, 83, 0.06);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                  <strong style="font-size: 13.5px; color: #9a3412;">🧠 LIVE PREVIEW — AI LEAD INSIGHT CARD</strong>
                  <span class="smax-badge smax-badge-coral">88/100 🔥 Hot Lead</span>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 12.5px;">
                  <div>• <strong>Sản phẩm quan tâm:</strong> Áo Polo Nam Classic (Size L, Màu Xanh Navy)</div>
                  <div>• <strong>Nhu cầu cụ thể:</strong> Mua trang phục đi làm công sở & gặp đối tác</div>
                  <div>• <strong>Lý do từ chối:</strong> Khách phân vân chất vải có bị co rút sau khi giặt không</div>
                  <div>• <strong>Kịch bản đề xuất:</strong> Gửi cam kết bảo hành vải 1 đổi 1 trong 30 ngày + tặng voucher 50k</div>
                </div>
              </div>
            </div>

            <!-- Card 2: Meta CAPI -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">2. Đồng Bộ Tín Hiệu Chuyển Đổi (Meta CAPI / Dataset)</div>
                <span class="smax-badge smax-badge-blue">Tối Ưu Meta Ads</span>
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <strong style="font-size: 13.5px; color: #0f1835;">Tự động bắn sự kiện Lead & Purchase về Trình quản lý quảng cáo Meta</strong>
                  <div style="font-size: 12px; color: #5d6c7b; margin-top: 2px;">Giúp tài khoản quảng cáo học nhanh tệp khách tiềm năng và giảm chi phí quảng cáo (CPA ↓35%).</div>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="qsMetaCapiToggle" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>
            </div>

          </div>

          <!-- BƯỚC 7: KIỂM THỬ & KÍCH HOẠT (🚀 KÍCH HOẠT) -->
          <div class="smax-qs-step-panel" id="qsStep7Panel" data-step="7">
            
            <!-- Card 1: Customer Journey Map -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">1. Sơ Đồ Toàn Bộ Luồng Tự Động Hóa (Customer Journey Map)</div>
                <span class="smax-badge smax-badge-green">6/6 Sẵn Sàng</span>
              </div>

              <div class="smax-qs-journey-map" id="qsJourneyMap">
                <div class="smax-qs-journey-node active-stage">
                  <div style="font-size: 10px; font-weight: 700; color: #15803d; text-transform: uppercase;">1. TIẾP CẬN</div>
                  <div style="font-size: 12px; font-weight: 700; color: #0f1835; margin: 4px 0;">Welcome + GenAI</div>
                  <span class="smax-badge smax-badge-green" style="font-size: 10px;">✅ Sẵn sàng</span>
                </div>
                <span class="smax-qs-journey-arrow">➔</span>
                
                <div class="smax-qs-journey-node active-stage">
                  <div style="font-size: 10px; font-weight: 700; color: #15803d; text-transform: uppercase;">2. THU THẬP LEAD</div>
                  <div style="font-size: 12px; font-weight: 700; color: #0f1835; margin: 4px 0;">Bóc tách SĐT & Tag</div>
                  <span class="smax-badge smax-badge-green" style="font-size: 10px;">✅ Sẵn sàng</span>
                </div>
                <span class="smax-qs-journey-arrow">➔</span>

                <div class="smax-qs-journey-node active-stage">
                  <div style="font-size: 10px; font-weight: 700; color: #15803d; text-transform: uppercase;">3. BÁM ĐUỔI 24H</div>
                  <div style="font-size: 12px; font-weight: 700; color: #0f1835; margin: 4px 0;">5 Mốc + Minigame</div>
                  <span class="smax-badge smax-badge-green" style="font-size: 10px;">✅ Sẵn sàng</span>
                </div>
                <span class="smax-qs-journey-arrow">➔</span>

                <div class="smax-qs-journey-node active-stage">
                  <div style="font-size: 10px; font-weight: 700; color: #15803d; text-transform: uppercase;">4. CHỐT ĐƠN</div>
                  <div style="font-size: 12px; font-weight: 700; color: #0f1835; margin: 4px 0;">POS + Payment QR</div>
                  <span class="smax-badge smax-badge-green" style="font-size: 10px;">✅ Sẵn sàng</span>
                </div>
                <span class="smax-qs-journey-arrow">➔</span>

                <div class="smax-qs-journey-node active-stage">
                  <div style="font-size: 10px; font-weight: 700; color: #15803d; text-transform: uppercase;">5. SAU MUA</div>
                  <div style="font-size: 12px; font-weight: 700; color: #0f1835; margin: 4px 0;">Webview + Upsale 7d</div>
                  <span class="smax-badge smax-badge-green" style="font-size: 10px;">✅ Sẵn sàng</span>
                </div>
              </div>
            </div>

            <!-- Card 2: Chat Simulator -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">2. Trình Giả Lập Trò Chuyện (Chat Simulator)</div>
                <span class="smax-badge smax-badge-blue">Thử Nghiệm Thực Tế</span>
              </div>

              <div id="qsChatSimulator" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; gap: 10px; align-items: flex-start;">
                  <div style="width: 32px; height: 32px; border-radius: 50%; background: #eb6553; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">AI</div>
                  <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 14px; font-size: 13px; max-width: 80%; color: #0f1835;">
                    Xin chào bạn! 👋 Em là Trợ lý AI của Shop Thời Trang Smax. Em có thể giúp gì cho mình hôm nay ạ?
                  </div>
                </div>
              </div>
            </div>

            <!-- Card 3: Nút Kích Hoạt Toàn Bộ -->
            <div class="smax-qs-card" style="text-align: center; padding: 32px 24px; background: linear-gradient(180deg, #ffffff 0%, #fff9f8 100%); border: 1.5px solid #fed7aa;">
              <div style="font-size: 28px; margin-bottom: 8px;">🎉</div>
              <h2 style="font-size: 20px; font-weight: 800; color: #0f1835; margin-bottom: 8px;">
                Bạn Đã Hoàn Tất Toàn Bộ Thiết Lập Tự Động Hóa!
              </h2>
              <p style="color: #5d6c7b; font-size: 13.5px; max-width: 600px; margin: 0 auto 20px;">
                Nhấn nút bên dưới để đồng bộ và kích hoạt 6 kịch bản tự động chạy xuyên suốt trên tất cả các kênh bán hàng của bạn.
              </p>

              <button class="smax-btn-primary-coral" id="qsBtnActivateAll" style="padding: 12px 32px; font-size: 15px; font-weight: 700; border-radius: 100px; margin: 0 auto;" onclick="quickSetupApp.activateAllScenarios()">
                <span>🚀 KÍCH HOẠT TOÀN BỘ LUỒNG AUTOMATION</span>
              </button>
            </div>

          </div>

          <!-- Wizard Sticky Footer -->
          <div class="smax-qs-footer">
            <button class="smax-btn-outline" id="qsBtnPrevStep" style="visibility: hidden;" onclick="quickSetupApp.prevStep()">
              <span>← Quay lại</span>
            </button>
            <button class="smax-btn-primary-coral" id="qsBtnNextStep" onclick="quickSetupApp.nextStep()">
              <span>Tiếp tục (Bước 2/7) →</span>
            </button>
          </div>

        </section>

        <!-- ========================================================================== -->
        <!-- 2. TAB 1: TỔNG QUAN GIÁM SÁT (#qsOverviewView)                              -->
        <!-- ========================================================================== -->
        <section id="qsOverviewView" class="smax-qs-view-section">
          
          <div class="smax-pane-header">
            <div>
              <div class="smax-pane-title">Tổng Quan Hiệu Quả Quick Setup Automation</div>
              <div style="font-size: 13px; color: #5d6c7b; margin-top: 2px;">Theo dõi tiến độ triển khai và phễu chuyển đổi toàn bộ khách hàng</div>
            </div>
            <button class="smax-btn-primary-coral" onclick="quickSetupApp.switchQsView('qsWizardView')">
              <span>✏️ Chỉnh Sửa Luồng Setup</span>
            </button>
          </div>

          <!-- Progress Bar Card -->
          <div class="smax-qs-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
              <strong style="font-size: 14px; color: #0f1835;">Tiến độ kích hoạt kịch bản:</strong>
              <strong style="font-size: 14px; color: #10b981;">100% Hoàn Thành (6/6 Kịch bản đang chạy)</strong>
            </div>
            <div style="width: 100%; height: 10px; background: #e2e8f0; border-radius: 100px; overflow: hidden;">
              <div style="width: 100%; height: 100%; background: linear-gradient(90deg, #eb6553, #10b981); border-radius: 100px;"></div>
            </div>
          </div>

          <!-- 4 Scorecards -->
          <div class="smax-scorecards-grid">
            <div class="smax-scorecard">
              <div class="smax-scorecard-top"><span class="smax-scorecard-label">Tổng phiên tiếp cận</span></div>
              <div class="smax-scorecard-value">1.234</div>
              <div class="smax-scorecard-bottom"><div class="smax-stat-row"><span>Tự động qua bot</span><strong>100%</strong></div></div>
            </div>
            <div class="smax-scorecard">
              <div class="smax-scorecard-top"><span class="smax-scorecard-label">Leads bóc tách</span></div>
              <div class="smax-scorecard-value">556 <span style="font-size: 13px; color: #10b981;">(45%)</span></div>
              <div class="smax-scorecard-bottom"><div class="smax-stat-row"><span>Hot Leads</span><strong>234</strong></div></div>
            </div>
            <div class="smax-scorecard">
              <div class="smax-scorecard-top"><span class="smax-scorecard-label">Đơn hàng chốt</span></div>
              <div class="smax-scorecard-value">178 <span style="font-size: 13px; color: #eb6553;">(32%)</span></div>
              <div class="smax-scorecard-bottom"><div class="smax-stat-row"><span>Qua Webview</span><strong>178</strong></div></div>
            </div>
            <div class="smax-scorecard">
              <div class="smax-scorecard-top"><span class="smax-scorecard-label">Doanh thu Automation</span></div>
              <div class="smax-scorecard-value">62.1M₫</div>
              <div class="smax-scorecard-bottom"><div class="smax-stat-row"><span>Từ Upsale 7d</span><strong>15.6M₫</strong></div></div>
            </div>
          </div>

          <!-- Visual Conversion Funnel Card -->
          <div class="smax-qs-card">
            <div class="smax-qs-card-header">
              <div class="smax-qs-card-title">Phễu Chuyển Đổi Xuyên Suốt Hành Trình Khách Hàng (Customer Journey Funnel)</div>
              <span class="smax-badge smax-badge-coral">Real-time Conversion</span>
            </div>

            <div class="smax-qs-funnel">
              <div class="smax-qs-funnel-tier" style="background: #3b82f6; width: 100%;">
                <span>1. Tiếp cận (Welcome Bot & Auto Comment): 1.234 khách</span>
                <span>100%</span>
              </div>
              <div class="smax-qs-funnel-tier" style="background: #2563eb; width: 85%; margin-left: 7.5%;">
                <span>2. Tương tác GenAI & Xem BST: 890 khách</span>
                <span>72.1%</span>
              </div>
              <div class="smax-qs-funnel-tier" style="background: #f59e0b; width: 70%; margin-left: 15%;">
                <span>3. Thu thập SĐT & Lead Nóng: 556 khách</span>
                <span>45.0%</span>
              </div>
              <div class="smax-qs-funnel-tier" style="background: #eb6553; width: 55%; margin-left: 22.5%;">
                <span>4. Chốt Đơn & Thanh toán Webview: 178 đơn</span>
                <span>32.0%</span>
              </div>
              <div class="smax-qs-funnel-tier" style="background: #10b981; width: 40%; margin-left: 30%;">
                <span>5. Mua Lại Sau 7 Ngày (Upsale Voucher): 50 khách</span>
                <span>28.1%</span>
              </div>
            </div>
          </div>

        </section>

        <!-- ========================================================================== -->
        <!-- 3. TAB 2: LOG KỊCH BẢN REALTIME (#qsScenarioLogView)                        -->
        <!-- ========================================================================== -->
        <section id="qsScenarioLogView" class="smax-qs-view-section">
          <div class="smax-pane-header">
            <div>
              <div class="smax-pane-title">Nhật Ký Thực Thi Kịch Bản (Scenario Execution Log)</div>
              <div style="font-size: 13px; color: #5d6c7b; margin-top: 2px;">Giám sát thời gian thực các trigger, block và sự kiện tự động kích hoạt</div>
            </div>
          </div>

          <!-- Chart trigger theo giờ -->
          <div class="smax-qs-card" style="height: 220px;">
            <div style="font-size: 13px; font-weight: 700; color: #0f1835; margin-bottom: 8px;">Tần Suất Kích Hoạt Trigger Theo Giờ Trong Ngày</div>
            <div style="position: relative; height: 160px; width: 100%;">
              <canvas id="qsLogHourlyChart"></canvas>
            </div>
          </div>

          <!-- Log Table -->
          <div class="smax-table-container">
            <table class="smax-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Giai đoạn</th>
                  <th>Kịch bản thực thi</th>
                  <th>Kênh</th>
                  <th>Khách hàng</th>
                  <th>Trạng thái</th>
                  <th>Hành động ghi nhận</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>10:45:12</td>
                  <td><span class="smax-badge smax-badge-blue">Trước mua</span></td>
                  <td><strong>Welcome Bot + GenAI</strong></td>
                  <td>FB Messenger</td>
                  <td>Nguyễn Văn An</td>
                  <td><span class="smax-badge smax-badge-green">Thành công</span></td>
                  <td>Tư vấn size Áo Polo L & Báo giá 350k</td>
                </tr>
                <tr>
                  <td>10:44:05</td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td><strong>Thu Thập SĐT & Tag</strong></td>
                  <td>FB Messenger</td>
                  <td>Trần Thu Hà</td>
                  <td><span class="smax-badge smax-badge-green">Thành công</span></td>
                  <td>Lấy SĐT 0912345678 ➔ Gắn tag [Lead Nóng]</td>
                </tr>
                <tr>
                  <td>10:42:30</td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td><strong>Bám Đuổi Mốc 4 (Minigame)</strong></td>
                  <td>Zalo OA</td>
                  <td>Lê Hoàng Nam</td>
                  <td><span class="smax-badge smax-badge-green">Thành công</span></td>
                  <td>Khách quay trúng Voucher 15% ➔ Chốt đơn</td>
                </tr>
                <tr>
                  <td>10:40:18</td>
                  <td><span class="smax-badge smax-badge-green">Sau mua</span></td>
                  <td><strong>Webview Xác Nhận Đơn</strong></td>
                  <td>FB Messenger</td>
                  <td>Phạm Minh Tuấn</td>
                  <td><span class="smax-badge smax-badge-green">Thành công</span></td>
                  <td>Đồng bộ KiotViet #ORD-9912</td>
                </tr>
                <tr>
                  <td>10:38:00</td>
                  <td><span class="smax-badge smax-badge-green">Sau mua</span></td>
                  <td><strong>Upsale Ngày Thứ 7 (VIP20)</strong></td>
                  <td>Smax Extension</td>
                  <td>Hoàng Mỹ Linh</td>
                  <td><span class="smax-badge smax-badge-green">Thành công</span></td>
                  <td>Gửi mã VIP20 ➔ Khách mở Web đặt tiếp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ========================================================================== -->
        <!-- 4. TAB 3: HIỆU QUẢ CHUYỂN ĐỔI (#qsConversionView)                          -->
        <!-- ========================================================================== -->
        <section id="qsConversionView" class="smax-qs-view-section">
          <div class="smax-pane-header">
            <div>
              <div class="smax-pane-title">Báo Cáo Hiệu Quả Chuyển Đổi & Doanh Thu Automation</div>
              <div style="font-size: 13px; color: #5d6c7b; margin-top: 2px;">Đo lường chi tiết doanh số tạo ra từ các kịch bản tự động</div>
            </div>
          </div>

          <!-- Trend Chart -->
          <div class="smax-qs-card" style="height: 280px;">
            <div style="font-size: 13px; font-weight: 700; color: #0f1835; margin-bottom: 8px;">Xu Hướng Leads & Đơn Hàng 30 Ngày Gần Nhất</div>
            <div style="position: relative; height: 220px; width: 100%;">
              <canvas id="qsTrendChart"></canvas>
            </div>
          </div>

          <!-- Scenario Performance Table -->
          <div class="smax-table-container">
            <table class="smax-table">
              <thead>
                <tr>
                  <th>Tên Kịch Bản</th>
                  <th>Giai đoạn</th>
                  <th>Số lượt gửi</th>
                  <th>Số chuyển đổi</th>
                  <th>Tỷ lệ chuyển đổi</th>
                  <th>Doanh thu đem lại</th>
                  <th>Đánh giá ROI</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Chuỗi Bám Đuổi 24h</strong></td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td>450</td>
                  <td>89 đơn</td>
                  <td><strong>19.7%</strong></td>
                  <td>31.200.000₫</td>
                  <td><span class="smax-badge smax-badge-green">ROI 245%</span></td>
                </tr>
                <tr>
                  <td><strong>Minigame Vòng Quay May Mắn</strong></td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td>320</td>
                  <td>112 đơn</td>
                  <td><strong>35.0%</strong></td>
                  <td>15.600.000₫</td>
                  <td><span class="smax-badge smax-badge-green">ROI 312%</span></td>
                </tr>
                <tr>
                  <td><strong>Chuỗi Chăm Sóc & Upsale 7 Ngày</strong></td>
                  <td><span class="smax-badge smax-badge-green">Sau mua</span></td>
                  <td>178</td>
                  <td>50 đơn</td>
                  <td><strong>28.1%</strong></td>
                  <td>8.900.000₫</td>
                  <td><span class="smax-badge smax-badge-green">ROI 180%</span></td>
                </tr>
                <tr>
                  <td><strong>Auto-Reply Comment ➔ Messenger</strong></td>
                  <td><span class="smax-badge smax-badge-blue">Trước mua</span></td>
                  <td>890</td>
                  <td>245 lead</td>
                  <td><strong>27.5%</strong></td>
                  <td>6.400.000₫</td>
                  <td><span class="smax-badge smax-badge-green">ROI 420%</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- ========================================================================== -->
        <!-- 5. TAB 4: AI INSIGHT DASHBOARD (#qsAiInsightView)                          -->
        <!-- ========================================================================== -->
        <section id="qsAiInsightView" class="smax-qs-view-section">
          <div class="smax-pane-header">
            <div>
              <div class="smax-pane-title">AI Lead Intelligence & Phân Tích Chuyên Sâu 6 Chiều</div>
              <div style="font-size: 13px; color: #5d6c7b; margin-top: 2px;">Trích xuất thông minh chân dung, nhu cầu và lý do từ chối của khách hàng</div>
            </div>
          </div>

          <div style="display: grid; grid-template-columns: 340px 1fr; gap: 20px;">
            <!-- Donut Lead Score -->
            <div class="smax-qs-card" style="height: 320px;">
              <div style="font-size: 13.5px; font-weight: 700; color: #0f1835; margin-bottom: 10px;">Phân Bổ Tiềm Năng Khách Hàng (Lead Scoring)</div>
              <div style="position: relative; height: 240px; width: 100%;">
                <canvas id="qsLeadScoreDonut"></canvas>
              </div>
            </div>

            <!-- Top Objections & Handling -->
            <div class="smax-qs-card" style="height: 320px; overflow-y: auto;">
              <div style="font-size: 13.5px; font-weight: 700; color: #0f1835; margin-bottom: 12px;">Top Lý Do Từ Chối (Objections) & Đề Xuất Xử Lý Tự Động</div>
              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 10px; padding: 10px 12px; font-size: 12.5px;">
                  <div style="display: flex; justify-content: space-between; font-weight: 700; color: #991b1b;">
                    <span>1. Phân vân về giá sản phẩm (45%)</span>
                    <span>156 lượt</span>
                  </div>
                  <div style="color: #475569; margin-top: 4px;">
                    💡 <strong>Đề xuất:</strong> Tự động kích hoạt Voucher SALE10 + Giải thích chất liệu cao cấp.
                  </div>
                </div>

                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 10px; padding: 10px 12px; font-size: 12.5px;">
                  <div style="display: flex; justify-content: space-between; font-weight: 700; color: #92400e;">
                    <span>2. Muốn xem ảnh thật & sợ không vừa size (26%)</span>
                    <span>89 lượt</span>
                  </div>
                  <div style="color: #475569; margin-top: 4px;">
                    💡 <strong>Đề xuất:</strong> Gửi album ảnh feedback thật + Cam kết đổi size tận nhà miễn phí.
                  </div>
                </div>

                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 10px 12px; font-size: 12.5px;">
                  <div style="display: flex; justify-content: space-between; font-weight: 700; color: #166534;">
                    <span>3. Phí vận chuyển cao (19%)</span>
                    <span>67 lượt</span>
                  </div>
                  <div style="color: #475569; margin-top: 4px;">
                    💡 <strong>Đề xuất:</strong> Gợi ý mua combo 2 áo để được Freeship toàn quốc.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ========================================================================== -->
        <!-- 6. TAB 5: QUẢN LÝ KÊNH & KỊCH BẢN (#qsChannelManageView)                    -->
        <!-- ========================================================================== -->
        <section id="qsChannelManageView" class="smax-qs-view-section">
          <div class="smax-pane-header">
            <div>
              <div class="smax-pane-title">Quản Lý Kênh Kết Nối & Trạng Thái 10 Kịch Bản</div>
              <div style="font-size: 13px; color: #5d6c7b; margin-top: 2px;">Bật/tắt nhanh các kịch bản và theo dõi tình trạng kết nối API</div>
            </div>
          </div>

          <!-- Kênh đã kết nối -->
          <div class="smax-qs-card">
            <div class="smax-qs-card-title" style="margin-bottom: 12px;">Trạng Thái Kênh Nhắn Tin</div>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;">
              <div style="border: 1px solid #bbf7d0; background: #f0fdf4; border-radius: 10px; padding: 12px;">
                <div style="font-weight: 700; font-size: 13px; color: #166534;">Facebook Messenger</div>
                <div style="font-size: 11.5px; color: #15803d; margin-top: 2px;">● Online (Fanpage ABC)</div>
              </div>
              <div style="border: 1px solid #bbf7d0; background: #f0fdf4; border-radius: 10px; padding: 12px;">
                <div style="font-weight: 700; font-size: 13px; color: #166534;">Zalo Official Account</div>
                <div style="font-size: 11.5px; color: #15803d; margin-top: 2px;">● Online (Zalo OA)</div>
              </div>
              <div style="border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 10px; padding: 12px;">
                <div style="font-weight: 700; font-size: 13px; color: #475569;">Instagram DM</div>
                <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Chưa kích hoạt</div>
              </div>
              <div style="border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 10px; padding: 12px;">
                <div style="font-weight: 700; font-size: 13px; color: #475569;">TikTok Shop Chat</div>
                <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Chưa kích hoạt</div>
              </div>
            </div>
          </div>

          <!-- Master Switches for 10 Scenarios -->
          <div class="smax-table-container">
            <table class="smax-table">
              <thead>
                <tr>
                  <th>Tên Kịch Bản Tự Động Hóa</th>
                  <th>Giai đoạn</th>
                  <th>Công nghệ áp dụng</th>
                  <th>Trạng thái hoạt động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>1. Welcome Bot & Phản Hồi Chào Mừng</strong></td>
                  <td><span class="smax-badge smax-badge-blue">Trước mua</span></td>
                  <td>Messenger Trigger</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>2. Trợ Lý AI GenAI & Nhận Diện Ý Định</strong></td>
                  <td><span class="smax-badge smax-badge-blue">Trước mua</span></td>
                  <td>OpenAI / Gemini LLM</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>3. Auto-Reply Bình Luận & Ẩn SĐT</strong></td>
                  <td><span class="smax-badge smax-badge-blue">Trước mua</span></td>
                  <td>Comment-to-Inbox</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>4. Tự Động Bóc Tách Lead & Gắn Tag</strong></td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td>User Input Parsing</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>5. Tự Động Tạo Đơn & Đồng Bộ POS</strong></td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td>KiotViet / Haravan API</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>6. Chuỗi Bám Đuổi Trong 24H (5 Mốc)</strong></td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td>Sequence Engine</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>7. Minigame Tương Tác (Lucky Wheel)</strong></td>
                  <td><span class="smax-badge smax-badge-coral">Trong mua</span></td>
                  <td>Gamification Engine</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>8. Webview Xác Nhận & Tracking Đơn</strong></td>
                  <td><span class="smax-badge smax-badge-green">Sau mua</span></td>
                  <td>Smax Webview SDK</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>9. Chuỗi Chăm Sóc & Upsale 7 Ngày</strong></td>
                  <td><span class="smax-badge smax-badge-green">Sau mua</span></td>
                  <td>Smax Extension / FMM</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
                <tr>
                  <td><strong>10. AI Lead Insight & Meta CAPI</strong></td>
                  <td><span class="smax-badge smax-badge-coral">Xuyên suốt</span></td>
                  <td>Meta Dataset API</td>
                  <td>
                    <label class="smax-switch"><input type="checkbox" checked><span class="smax-switch-slider"></span></label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </main>
`;

// Insert quickSetupMarkup right before closing </main> or at the end of .smax-main-layout
const layoutEndTarget = `      </main>

    </div>

    <!-- ========================================================================== -->
    <!-- 85% WIDTH FOCUSED POPUP MODAL (WIZARD SETUP META BUSINESS AGENT)`;

const layoutEndReplacement = `      </main>
${quickSetupMarkup}
    </div>

    <!-- ========================================================================== -->
    <!-- 85% WIDTH FOCUSED POPUP MODAL (WIZARD SETUP META BUSINESS AGENT)`;

htmlCode = htmlCode.replace(layoutEndTarget, layoutEndReplacement);
fs.writeFileSync(htmlPath, htmlCode, 'utf8');
console.log('src/index.html updated with complete Quick Setup Module UI!');
