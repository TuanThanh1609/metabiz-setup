const fs = require('fs');
const path = require('path');

// 1. UPDATE src/css/quick-setup.css with Accordion & Toggle styles
const cssPath = path.join(__dirname, '../src/css/quick-setup.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

const accordionStyles = `
/* ==========================================================================
   PROGRESSIVE DISCLOSURE: COLLAPSIBLE TOGGLE CARDS (ON/OFF ACCORDION)
   ========================================================================== */
.smax-qs-card.smax-qs-card-collapsible {
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: 16px;
  border: 1px solid var(--smax-border-main, #e8ecf2);
  margin-bottom: 16px;
}

.smax-qs-card.smax-qs-card-collapsible.collapsed {
  background: #ffffff;
  border-color: #edf2f7;
  box-shadow: none;
  padding: 16px 22px;
}

.smax-qs-card.smax-qs-card-collapsible.collapsed .smax-qs-card-header {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.smax-qs-card.smax-qs-card-collapsible.collapsed .smax-qs-card-body {
  display: none;
}

.smax-qs-card.smax-qs-card-collapsible .smax-qs-card-header {
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.smax-qs-card-header-left {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}

.smax-qs-card-header-right {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.smax-qs-card-collapsible.collapsed .smax-qs-card-title {
  color: #334155;
  font-weight: 600;
}

.smax-qs-card-collapsible:not(.collapsed) {
  border-color: #cbd5e1;
  box-shadow: 0 4px 16px rgba(15, 24, 53, 0.05);
}

.smax-qs-card-collapsible:not(.collapsed) .smax-qs-card-title {
  color: #0f1835;
  font-weight: 700;
}

.smax-qs-card-body {
  margin-top: 14px;
  animation: smaxFadeSlideDown 0.2s ease;
}

@keyframes smaxFadeSlideDown {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

if (!cssCode.includes('PROGRESSIVE DISCLOSURE: COLLAPSIBLE TOGGLE CARDS')) {
  cssCode += accordionStyles;
  fs.writeFileSync(cssPath, cssCode, 'utf8');
  console.log('src/css/quick-setup.css updated with Progressive Disclosure Accordion styles!');
}

// 2. UPDATE src/index.html (7 Steps Panels)
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

const wizardContainerStart = `        <!-- 1. WIZARD VIEW (INLINE 7-STEP WIZARD) -->`;
const wizardContainerEnd = `        <!-- ========================================================================== -->\n        <!-- 2. TAB 1: TỔNG QUAN GIÁM SÁT (#qsOverviewView)`;

const startIdx = htmlCode.indexOf(wizardContainerStart);
const endIdx = htmlCode.indexOf(wizardContainerEnd);

if (startIdx === -1 || endIdx === -1) {
  console.error('Wizard container bounds not found in index.html!', { startIdx, endIdx });
} else {
  const newWizardHtml = `        <!-- 1. WIZARD VIEW (INLINE 7-STEP WIZARD) -->
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

          <!-- ==================================================================== -->
          <!-- BƯỚC 1: KÊNH & THƯƠNG HIỆU (🏠 NỀN TẢNG)                             -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel active" id="qsStep1Panel" data-step="1">
            
            <!-- Mục 1: KẾT NỐI KÊNH & TRANG ÁP DỤNG (MẶC ĐỊNH: BẬT ON) -->
            <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step1_1">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step1_1')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">1. Kết Nối Kênh Nhắn Tin & Chọn Trang (Page) Áp Dụng</div>
                  <div style="font-size: 12px; color: #5d6c7b;">
                    Nhấn vào nút "Thêm kênh" để chọn nền tảng (Facebook, Zalo, Instagram...) và chọn các Trang / Fanpage áp dụng.
                  </div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral" id="qsSelectedPagesCountBadge">Đã chọn 3 Trang</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step1_1', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung mở rộng Mục 1 -->
              <div class="smax-qs-card-body">
                <!-- KHUNG CHÍNH: BUTTON THÊM KÊNH ĐẶT Ở CHÍNH GIỮA -->
                <div class="smax-qs-channel-center-card">
                  <div style="width: 48px; height: 48px; border-radius: 50%; background: #fff5f3; color: #eb6553; display: flex; align-items: center; justify-content: center; font-size: 22px; margin-bottom: 12px;">
                    🚀
                  </div>
                  <h3 style="font-size: 16px; font-weight: 700; color: #0f1835; margin-bottom: 6px;">
                    Thêm Kênh & Trang Áp Dụng Tự Động Hóa
                  </h3>
                  <p style="font-size: 13px; color: #64748b; max-width: 520px; margin: 0 auto 18px; line-height: 1.5;">
                    Chọn kênh nhắn tin phù hợp (Facebook Messenger, Zalo OA, Instagram...), kết nối tài khoản và chọn các Fanpage / Trang để kích hoạt kịch bản.
                  </p>

                  <button class="smax-btn-add-channel-center" id="btnQsOpenAddChannelModal" onclick="quickSetupApp.openAddChannelModal()">
                    <span style="font-size: 16px;">+</span>
                    <span>Thêm kênh</span>
                  </button>
                </div>

                <!-- DANH SÁCH CÁC TRANG / PAGE ĐÃ ĐƯỢC CHỌN KẾT NỐI -->
                <div id="qsSelectedPagesSection">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <strong style="font-size: 13px; color: #0f1835;">Các Trang (Page) Đang Được Áp Dụng Kịch Bản:</strong>
                    <button class="smax-btn-sm" style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 4px 10px; font-size: 11.5px; cursor: pointer;" onclick="quickSetupApp.openAddChannelModal()">
                      + Thêm / Đổi trang khác
                    </button>
                  </div>

                  <div class="smax-qs-page-grid" id="qsConnectedPagesGrid">
                    <!-- Selected Page 1 -->
                    <div class="smax-qs-page-card selected" id="qsSelectedCard_fb_1">
                      <div class="smax-qs-page-avatar-wrapper">
                        <div class="smax-qs-page-avatar" style="background: #0f1835;">BL</div>
                        <div class="smax-qs-page-platform-badge">f</div>
                      </div>
                      <div class="smax-qs-page-info">
                        <div class="smax-qs-page-name" title="Biluxury - Thời Trang Nam Cao Cấp">Biluxury - Thời Trang Nam Cao Cấp</div>
                        <div class="smax-qs-page-meta">
                          <span style="color: #2563eb; font-family: monospace;">ID: fb645567518632118</span>
                          <span>•</span>
                          <span style="color: #10b981; font-weight: 600;">● Đang kết nối</span>
                        </div>
                      </div>
                      <button class="smax-btn-row-delete" onclick="quickSetupApp.removeSelectedPage('fb_1')" title="Xóa trang">&times;</button>
                    </div>

                    <!-- Selected Page 2 -->
                    <div class="smax-qs-page-card selected" id="qsSelectedCard_fb_2">
                      <div class="smax-qs-page-avatar-wrapper">
                        <div class="smax-qs-page-avatar" style="background: #0f1835;">BL</div>
                        <div class="smax-qs-page-platform-badge">f</div>
                      </div>
                      <div class="smax-qs-page-info">
                        <div class="smax-qs-page-name" title="Biluxury - Thời Trang Nam">Biluxury - Thời Trang Nam</div>
                        <div class="smax-qs-page-meta">
                          <span style="color: #2563eb; font-family: monospace;">ID: fb106934742500380</span>
                          <span>•</span>
                          <span style="color: #10b981; font-weight: 600;">● Đang kết nối</span>
                        </div>
                      </div>
                      <button class="smax-btn-row-delete" onclick="quickSetupApp.removeSelectedPage('fb_2')" title="Xóa trang">&times;</button>
                    </div>

                    <!-- Selected Page 3 -->
                    <div class="smax-qs-page-card selected" id="qsSelectedCard_zalo_1">
                      <div class="smax-qs-page-avatar-wrapper">
                        <div class="smax-qs-page-avatar" style="background: #0068ff;">ZL</div>
                        <div class="smax-qs-page-platform-badge zalo">Z</div>
                      </div>
                      <div class="smax-qs-page-info">
                        <div class="smax-qs-page-name" title="Biluxury Official (Zalo OA)">Biluxury Official (Zalo OA)</div>
                        <div class="smax-qs-page-meta">
                          <span style="color: #2563eb; font-family: monospace;">ID: zalo998811</span>
                          <span>•</span>
                          <span style="color: #f59e0b; font-weight: 700;">Tích Vàng ⭐</span>
                        </div>
                      </div>
                      <button class="smax-btn-row-delete" onclick="quickSetupApp.removeSelectedPage('zalo_1')" title="Xóa trang">&times;</button>
                    </div>
                  </div>

                  <!-- Summary bar -->
                  <div class="smax-qs-page-summary-box" id="qsPageSummaryBox" style="margin-top: 12px;">
                    <div>
                      🎯 <strong>Đang áp dụng cho:</strong> <span id="qsSelectedPagesText">2 Fanpage Facebook và 1 Zalo OA</span>.
                    </div>
                    <div style="font-size: 11.5px; opacity: 0.9;">
                      Khách nhắn tin vào bất kỳ Trang nào ở trên đều sẽ được tự động kích hoạt kịch bản!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mục 2: THƯƠNG HIỆU & NGÀNH HÀNG (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step1_2">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step1_2')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">2. Nhận Diện Thương Hiệu & Ngành Hàng</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tự động nạp mẫu kịch bản chuẩn ngành hàng (Thời trang, Mỹ phẩm, F&B, BĐS...)</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-gray">Tùy chỉnh</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step1_2', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 2 -->
              <div class="smax-qs-card-body" style="display: none;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                  <div class="smax-form-group" style="margin-bottom: 0;">
                    <label class="smax-label" style="font-size: 12.5px;">Tên Thương Hiệu / Cửa Hàng: <span style="color: #eb6553;">*</span></label>
                    <input type="text" id="qsBrandName" class="smax-input" value="Biluxury - Thời Trang Nam" placeholder="Nhập tên shop của bạn...">
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
            </div>

            <!-- Mục 3: NGUỒN DỮ LIỆU SẢN PHẨM (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step1_3">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step1_3')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">3. Nguồn Dữ Liệu Sản Phẩm & Bảng Giá (RAG Grounding)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Nạp dữ liệu từ Google Sheet, Google Drive hoặc link Shopee</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-gray">Tùy chọn</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step1_3', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 3 -->
              <div class="smax-qs-card-body" style="display: none;">
                <div style="display: flex; gap: 20px; align-items: center; flex-wrap: wrap;">
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

          </div>

          <!-- ==================================================================== -->
          <!-- BƯỚC 2: CHÀO ĐÓN & TRỢ LÝ AI GENAI (📥 TRƯỚC MUA)                    -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep2Panel" data-step="2">
            
            <!-- Mục 1: WELCOME BOT (MẶC ĐỊNH: BẬT ON) -->
            <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step2_1">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step2_1')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">1. Kịch Bản Chào Mừng Khách Hàng (Welcome Bot)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tự động gửi lời chào & nút gợi ý khi khách mở khung chat lần đầu</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-blue">Trước Mua</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step2_1', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung mở rộng Mục 1 -->
              <div class="smax-qs-card-body">
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
            </div>

            <!-- Mục 2: GENAI TRỢ LÝ THÔNG MINH (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step2_2">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step2_2')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">2. Kết Nối Trợ Lý AI GenAI & Nhận Diện Ý Định (Intentions)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tích hợp mô hình ngôn ngữ lớn (OpenAI, Gemini, Claude...) để AI tự hiểu ý định</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral">GenAI Thay Keyword</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step2_2', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 2 -->
              <div class="smax-qs-card-body" style="display: none;">
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
            </div>

            <!-- Mục 3: AI COMMENT-TO-INBOX (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsAiCommentCard">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsAiCommentCard')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">3. AI Tự Động Phản Hồi Bình Luận & Gửi Tin Nhắn Cho Khách Hàng (AI Comment-to-Inbox)</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 2px;" id="qsAiCommentMechanismNote">
                    AI sẽ đọc nội dung bài post và nội dung khách hàng Comment, để tạo ra câu trả lời và gửi tin nhắn phù hợp
                  </div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral">GenAI Đọc Post</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsAiCommentCard', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 3 -->
              <div class="smax-qs-card-body" style="display: none;">
                <div style="display: flex; gap: 20px; margin-bottom: 14px; flex-wrap: wrap;">
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkQsAiCommentReply" checked>
                    <span>Dùng AI <strong>Tự động trả lời Comment</strong> theo ngữ cảnh bài post</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" id="chkQsAiCommentInbox" checked>
                    <span>Dùng AI <strong>Tự động gửi tin nhắn Inbox</strong> tư vấn & chốt đơn</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" checked>
                    <span>Tự động <strong>Thích (Like)</strong> bình luận</span>
                  </label>
                  <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                    <input type="checkbox" checked>
                    <span style="color: #dc2626; font-weight: 600;">Tự động ẨN bình luận chứa SĐT/Email (Chống cướp khách)</span>
                  </label>
                </div>

                <!-- Khung mô phỏng cơ chế AI đọc post & trả lời -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <strong style="font-size: 12.5px; color: #0f1835;">Mô phỏng cơ chế AI đọc bài Post và sinh câu trả lời tự nhiên:</strong>
                    <span class="smax-badge smax-badge-green" style="font-size: 11px;">● Live AI Context Simulator</span>
                  </div>
                  <div style="font-size: 12px; color: #475569; line-height: 1.6; display: flex; flex-direction: column; gap: 7px;">
                    <div>📌 <strong>Nội dung bài Post trên Fanpage:</strong> <em>"BST Sơ mi lụa Biluxury 2026 - Giảm 20% khi mua từ 2 áo, form Regular Fit tôn dáng..."</em></div>
                    <div>💬 <strong>Khách bình luận dưới bài:</strong> <em>"Áo này có size L màu đen không shop? Giá bao nhiêu vậy?"</em></div>
                    <div style="background: #ffffff; border-left: 3px solid #3b82f6; padding: 7px 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                      🤖 <strong>AI Tự động trả lời Comment (Công khai):</strong> <em>"Dạ Biluxury chào bạn! Mẫu sơ mi lụa màu đen bên shop vẫn còn đủ size L ạ. Shop vừa gửi thông tin chi tiết bảng size và ưu đãi giảm 20% vào hộp thư Messenger rồi, bạn kiểm tra tin nhắn giúp shop nhé! 🥰"</em>
                    </div>
                    <div style="background: #ffffff; border-left: 3px solid #10b981; padding: 7px 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                      ✉️ <strong>AI Tự động gửi tin nhắn Inbox (Riêng tư):</strong> <em>"Dạ em chào anh/chị! Em gửi thông tin chi tiết áo Sơ mi lụa đen size L giá 399k (giá gốc 499k). Anh/chị cho em xin chiều cao cân nặng để em chọn chuẩn size cho mình nha!"</em>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <!-- ==================================================================== -->
          <!-- BƯỚC 3: LEAD & CHỐT ĐƠN (🛒 TRONG MUA)                               -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep3Panel" data-step="3">
            
            <!-- Mục 1: THU THẬP LEAD (MẶC ĐỊNH: BẬT ON) -->
            <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step3_1">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step3_1')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">1. Tự Động Thu Thập Lead & Gắn Nhãn (Tag) Khách Hàng</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tự động bóc tách SĐT, địa chỉ, họ tên và gắn tag phân loại khách hàng</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-blue">Trong Mua</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step3_1', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung mở rộng Mục 1 -->
              <div class="smax-qs-card-body">
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
            </div>

            <!-- Mục 2: LÊN ĐƠN HÀNG & POS (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step3_2">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step3_2')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">2. Tự Động Lên Đơn Hàng & Đồng Bộ POS</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tự tạo đơn hàng trên KiotViet, Haravan, Sapo khi khách chốt mua</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-green">E-Commerce</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step3_2', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 2 -->
              <div class="smax-qs-card-body" style="display: none;">
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
            </div>

            <!-- Mục 3: THANH TOÁN PAYMENT HUB (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step3_3">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step3_3')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">3. Thanh Toán Tự Động Qua Mã QR (Payment Hub)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tạo mã VietQR động kèm số tiền và nội dung đơn hàng để khách chuyển khoản tức thì</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral">VietQR Tự Động</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step3_3', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 3 -->
              <div class="smax-qs-card-body" style="display: none;">
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

          </div>

          <!-- ==================================================================== -->
          <!-- BƯỚC 4: BÁM ĐUỔI 24H & MINIGAME (🛒 TRONG MUA)                       -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep4Panel" data-step="4">
            
            <!-- Mục 1: CHUỖI BÁM ĐUỔI 24H 5 MỐC (MẶC ĐỊNH: BẬT ON) -->
            <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step4_1">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step4_1')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">1. Chuỗi Bám Đuổi Tự Động Trong 24H (5 Mốc)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tận dụng "cửa sổ vàng 24h" của Meta gửi tin nhắn miễn phí bám đuổi khách</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral">24H Window</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step4_1', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung mở rộng Mục 1 -->
              <div class="smax-qs-card-body">
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

                  <!-- Mốc 4 -->
                  <div class="smax-qs-timeline-node">
                    <div class="smax-qs-timeline-dot">4</div>
                    <div class="smax-qs-timeline-content">
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                        <strong style="font-size: 13.5px; color: #0f1835;">Mốc 4 (Sau 8 giờ): Nhắc Lại Giỏ Hàng & Tặng Quà</strong>
                        <span class="smax-badge smax-badge-gray">8 Giờ sau</span>
                      </div>
                      <div style="font-size: 12.5px; color: #475569;">
                        "Đừng bỏ lỡ trang phục yêu thích của bạn! Shop tặng thêm phần quà phụ kiện cho đơn hàng hoàn tất trước 24h."
                      </div>
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

            <!-- Mục 2: MINIGAME TƯƠNG TÁC (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step4_2">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step4_2')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">2. Minigame Tương Tác Kích Cầu (Gamification)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Gửi Vòng quay may mắn, Hộp quà bí mật kèm cơ chế viral tag 2 bạn bè để nhận thêm lượt quay</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral">Gamification</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step4_2', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 2 -->
              <div class="smax-qs-card-body" style="display: none;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
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

                <label style="display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #0f1835;">
                  <input type="checkbox" checked>
                  <span>Cơ chế Viral: <strong>Tag 2 bạn bè vào bài viết</strong> = Tự động tặng thêm +1 lượt quay</span>
                </label>
              </div>
            </div>

          </div>

          <!-- ==================================================================== -->
          <!-- BƯỚC 5: SAU MUA & UPSALE (📦 SAU MUA)                                -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep5Panel" data-step="5">
            
            <!-- Mục 1: WEBVIEW ĐƠN HÀNG (MẶC ĐỊNH: BẬT ON) -->
            <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step5_1">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step5_1')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">1. Webview Xác Nhận & Theo Dõi Hành Trình Đơn Hàng</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Gửi Webview trực quan ngay trong Messenger để khách tra cứu đơn hàng realtime</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-green">Sau Mua</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step5_1', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung mở rộng Mục 1 -->
              <div class="smax-qs-card-body">
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
            </div>

            <!-- Mục 2: UPSALE 7 NGÀY (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step5_2">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step5_2')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">2. Chuỗi Chăm Sóc & Upsale 7 Ngày Sau Mua (Voucher Re-engagement)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tự động gửi tin nhắn cảm ơn, hỏi trải nghiệm, gợi ý mix đồ và tặng voucher mua lại</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral">Upsale Tăng LTV</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step5_2', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 2 -->
              <div class="smax-qs-card-body" style="display: none;">
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

          </div>

          <!-- ==================================================================== -->
          <!-- BƯỚC 6: AI INSIGHT 6 CHIỀU (🧠 XUYÊN SUỐT)                           -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep6Panel" data-step="6">
            
            <!-- Mục 1: AI LEAD INTELLIGENCE 6 CHIỀU (MẶC ĐỊNH: BẬT ON) -->
            <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step6_1">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step6_1')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">1. Phân Tích Insight Phiên Hội Thoại - AI Lead Intelligence (6 Chiều)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">AI tự động phân tích sâu toàn bộ hội thoại để chấm điểm và phân loại khách hàng</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-coral">AI Intelligence</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step6_1', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung mở rộng Mục 1 -->
              <div class="smax-qs-card-body">
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
            </div>

            <!-- Mục 2: META CAPI (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step6_2">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step6_2')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">2. Đồng Bộ Tín Hiệu Chuyển Đổi (Meta CAPI / Dataset)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Tự động bắn sự kiện Lead & Purchase về Trình quản lý quảng cáo Meta để tối ưu CPA</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-blue">Tối Ưu Meta Ads</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step6_2', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 2 -->
              <div class="smax-qs-card-body" style="display: none;">
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

          </div>

          <!-- ==================================================================== -->
          <!-- BƯỚC 7: KIỂM THỬ & KÍCH HOẠT (🚀 KÍCH HOẠT)                         -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep7Panel" data-step="7">
            
            <!-- Mục 1: BẢN ĐỒ HÀNH TRÌNH (MẶC ĐỊNH: BẬT ON) -->
            <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step7_1">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step7_1')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">1. Sơ Đồ Toàn Bộ Luồng Tự Động Hóa (Customer Journey Map)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Kiểm tra trạng thái sẵn sàng của 5 tầng tự động hóa trước khi kích hoạt</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-green">6/6 Sẵn Sàng</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step7_1', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung mở rộng Mục 1 -->
              <div class="smax-qs-card-body">
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
            </div>

            <!-- Mục 2: CHAT SIMULATOR (MẶC ĐỊNH: TẮT OFF - THU GỌN) -->
            <div class="smax-qs-card smax-qs-card-collapsible collapsed" id="qsCard_step7_2">
              <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step7_2')">
                <div class="smax-qs-card-header-left">
                  <div class="smax-qs-card-title">2. Trình Giả Lập Trò Chuyện (Chat Simulator)</div>
                  <div style="font-size: 12px; color: #5d6c7b;">Thử nghiệm tương tác kịch bản tự động trong môi trường mô phỏng</div>
                </div>
                <div class="smax-qs-card-header-right">
                  <span class="smax-badge smax-badge-blue">Thử Nghiệm</span>
                  <label class="smax-switch" onclick="event.stopPropagation();">
                    <input type="checkbox" class="smax-card-toggle-input" onchange="quickSetupApp.toggleCardAccordion('qsCard_step7_2', this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>
              </div>

              <!-- Nội dung thu gọn Mục 2 -->
              <div class="smax-qs-card-body" style="display: none;">
                <div id="qsChatSimulator" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; max-height: 240px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px;">
                  <div style="display: flex; gap: 10px; align-items: flex-start;">
                    <div style="width: 32px; height: 32px; border-radius: 50%; background: #eb6553; color: #ffffff; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">AI</div>
                    <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 10px 14px; font-size: 13px; max-width: 80%; color: #0f1835;">
                      Xin chào bạn! 👋 Em là Trợ lý AI của Shop Thời Trang Smax. Em có thể giúp gì cho mình hôm nay ạ?
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mục 3: Nút Kích Hoạt Toàn Bộ (Master Card) -->
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

        </section>`;

  htmlCode = htmlCode.substring(0, startIdx) + newWizardHtml + '\n\n' + htmlCode.substring(endIdx);
  fs.writeFileSync(htmlPath, htmlCode, 'utf8');
  console.log('src/index.html updated with Progressive Disclosure Accordion Cards for all 7 Steps!');
}

// 3. UPDATE src/js/quick-setup.js to add toggleCardAccordion
const jsPath = path.join(__dirname, '../src/js/quick-setup.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

const accordionMethod = `  // --- PROGRESSIVE DISCLOSURE (CARD ON/OFF ACCORDION) ---
  toggleCardAccordion(cardId, isChecked) {
    const card = document.getElementById(cardId);
    if (!card) return;
    const body = card.querySelector('.smax-qs-card-body');
    const chk = card.querySelector('.smax-card-toggle-input');

    if (typeof isChecked === 'undefined') {
      if (chk) {
        chk.checked = !chk.checked;
        isChecked = chk.checked;
      } else {
        isChecked = card.classList.contains('collapsed');
      }
    } else {
      if (chk) chk.checked = isChecked;
    }

    if (isChecked) {
      card.classList.remove('collapsed');
      if (body) body.style.display = 'block';
      if (typeof tabsApp !== 'undefined') {
        const titleEl = card.querySelector('.smax-qs-card-title');
        const title = titleEl ? titleEl.innerText : 'mục thiết lập';
        tabsApp.showToast(\`Đã bật: \${title}\`);
      }
    } else {
      card.classList.add('collapsed');
      if (body) body.style.display = 'none';
      if (typeof tabsApp !== 'undefined') {
        const titleEl = card.querySelector('.smax-qs-card-title');
        const title = titleEl ? titleEl.innerText : 'mục thiết lập';
        tabsApp.showToast(\`Đã tắt và thu gọn: \${title}\`);
      }
    }
  }

  // --- STEP 1: ADD CHANNEL MODAL (POPUP "THÊM KÊNH" MATCHING OFFICIAL SMAX UI) ---`;

if (!jsCode.includes('toggleCardAccordion(cardId, isChecked)')) {
  jsCode = jsCode.replace('  // --- STEP 1: ADD CHANNEL MODAL (POPUP "THÊM KÊNH" MATCHING OFFICIAL SMAX UI) ---', accordionMethod);
  fs.writeFileSync(jsPath, jsCode, 'utf8');
  console.log('src/js/quick-setup.js updated with toggleCardAccordion method!');
}
