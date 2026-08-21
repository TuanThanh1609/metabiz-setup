const fs = require('fs');
const path = require('path');

// 1. UPDATE src/css/quick-setup.css
const cssPath = path.join(__dirname, '../src/css/quick-setup.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

const addChannelModalStyles = `
/* ==========================================================================
   POPUP MODAL "THÊM KÊNH" (MATCH 1:1 OFFICIAL SMAX DESIGN)
   ========================================================================== */
.smax-ac-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(15, 24, 53, 0.55);
  backdrop-filter: blur(4px);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.smax-ac-modal-card {
  width: 960px;
  max-width: 96vw;
  height: 640px;
  max-height: 90vh;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 12px 36px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: smaxModalFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.smax-ac-modal-header {
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eef2f6;
}

.smax-ac-modal-title {
  font-size: 18px;
  font-weight: 800;
  color: #0f1835;
}

.smax-ac-modal-close-btn {
  background: transparent;
  border: none;
  font-size: 20px;
  color: #64748b;
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.smax-ac-modal-close-btn:hover {
  background: #f1f5f9;
  color: #0f1835;
}

.smax-ac-modal-body {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* Left Sidebar in Add Channel Modal */
.smax-ac-sidebar {
  width: 220px;
  flex-shrink: 0;
  border-right: 1px solid #eef2f6;
  background: #fafbfc;
  padding: 14px 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.smax-ac-sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 500;
  color: #334155;
  cursor: pointer;
  transition: all 0.15s ease;
  user-select: none;
}

.smax-ac-sidebar-item:hover {
  background: #f1f5f9;
  color: #0f1835;
}

.smax-ac-sidebar-item.active {
  background: #fff5f3;
  color: var(--smax-coral, #eb6553);
  font-weight: 700;
}

.smax-ac-section-header {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 14px 0 6px 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.smax-ac-section-header::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 12px;
  background: var(--smax-coral, #eb6553);
  border-radius: 2px;
}

.smax-ac-icon {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  flex-shrink: 0;
}

/* Right Content in Add Channel Modal */
.smax-ac-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 16px 24px;
  background: #ffffff;
}

.smax-ac-search-wrapper {
  position: relative;
  margin-bottom: 18px;
}

.smax-ac-search-input {
  width: 100%;
  padding: 10px 38px 10px 14px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  font-size: 13.5px;
  outline: none;
  transition: all 0.15s ease;
}

.smax-ac-search-input:focus {
  background: #ffffff;
  border-color: var(--smax-coral, #eb6553);
  box-shadow: 0 0 0 3px rgba(235, 101, 83, 0.12);
}

.smax-ac-search-icon {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  pointer-events: none;
}

/* Connect Account Callout */
.smax-ac-connect-banner {
  text-align: center;
  padding: 14px 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.smax-ac-connect-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 9px 22px;
  border-radius: 10px;
  border: 1.5px solid #cbd5e1;
  background: #ffffff;
  font-size: 13.5px;
  font-weight: 700;
  color: #0f1835;
  cursor: pointer;
  transition: all 0.15s ease;
}

.smax-ac-connect-btn:hover {
  background: #f8fafc;
  border-color: #94a3b8;
  box-shadow: 0 2px 6px rgba(0,0,0,0.05);
}

/* Page List Rows */
.smax-ac-page-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.smax-ac-page-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  border-radius: 12px;
  border: 1px solid #f1f5f9;
  background: #ffffff;
  transition: all 0.15s ease;
}

.smax-ac-page-row:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
}

.smax-ac-page-row-left {
  display: flex;
  align-items: center;
  gap: 14px;
}

.smax-ac-page-row-avatar-box {
  position: relative;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
}

.smax-ac-page-row-avatar {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: #0f1835;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 14px;
  border: 1px solid #e2e8f0;
}

.smax-ac-page-row-badge {
  position: absolute;
  right: -3px;
  bottom: -3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #1877f2;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9.5px;
  font-weight: 800;
  border: 1.5px solid #ffffff;
}

.smax-ac-page-row-name {
  font-size: 14px;
  font-weight: 700;
  color: #0f1835;
  margin-bottom: 3px;
}

.smax-ac-page-row-id {
  font-size: 12px;
  color: #2563eb;
  font-family: monospace;
}

.smax-ac-page-row-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.smax-btn-access-chat {
  padding: 7px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  font-size: 12.5px;
  font-weight: 600;
  color: #0f1835;
  cursor: pointer;
  transition: all 0.15s ease;
}

.smax-btn-access-chat:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
}

.smax-btn-access-chat.selected {
  background: #f0fdf4;
  border-color: #86efac;
  color: #15803d;
  font-weight: 700;
}

.smax-btn-row-delete {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #ffffff;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;
}

.smax-btn-row-delete:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #dc2626;
}

/* Center Box in Step 1 */
.smax-qs-channel-center-card {
  background: #ffffff;
  border: 1.5px dashed #cbd5e1;
  border-radius: 16px;
  padding: 36px 24px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all 0.15s ease;
}

.smax-qs-channel-center-card:hover {
  border-color: var(--smax-coral, #eb6553);
  background: #fffdfc;
}

.smax-btn-add-channel-center {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 26px;
  border-radius: 100px;
  background: var(--smax-coral, #eb6553);
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(235, 101, 83, 0.3);
  transition: all 0.15s ease;
}

.smax-btn-add-channel-center:hover {
  background: #d95341;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(235, 101, 83, 0.4);
}
`;

cssCode += addChannelModalStyles;
fs.writeFileSync(cssPath, cssCode, 'utf8');
console.log('src/css/quick-setup.css updated with Add Channel Modal and Center Card styles!');

// 2. UPDATE src/index.html
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

// Replace Step 1 Panel in #quickSetupContentPane
const step1StartTag = `          <!-- BƯỚC 1: KÊNH & THƯƠNG HIỆU (🏠 NỀN TẢNG) -->`;
const step1EndTag = `          <!-- BƯỚC 2: CHÀO ĐÓN & TRỢ LÝ AI GENAI (📥 TRƯỚC MUA) -->`;

const step1StartIdx = htmlCode.indexOf(step1StartTag);
const step1EndIdx = htmlCode.indexOf(step1EndTag);

if (step1StartIdx !== -1 && step1EndIdx !== -1) {
  const newStep1Html = `          <!-- BƯỚC 1: KÊNH & THƯƠNG HIỆU (🏠 NỀN TẢNG) -->
          <div class="smax-qs-step-panel active" id="qsStep1Panel" data-step="1">
            
            <!-- Card 1: KẾT NỐI KÊNH & CHỌN TRANG ÁP DỤNG (BUTTON THÊM KÊNH Ở GIỮA) -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div>
                  <div class="smax-qs-card-title">1. Kết Nối Kênh Nhắn Tin & Chọn Trang (Page) Áp Dụng</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 2px;">
                    Nhấn vào nút "Thêm kênh" để chọn nền tảng (Facebook, Zalo, Instagram...) và chọn các Trang / Fanpage áp dụng kịch bản tự động hóa.
                  </div>
                </div>
                <span class="smax-badge smax-badge-coral" id="qsSelectedPagesCountBadge">Đã chọn 3 Trang</span>
              </div>

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

            <!-- Card 2: Nhận Diện Thương Hiệu & Ngành Hàng -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">2. Nhận Diện Thương Hiệu & Ngành Hàng</div>
                <span class="smax-badge smax-badge-coral">Auto-Presets</span>
              </div>

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
\n`;
  htmlCode = htmlCode.substring(0, step1StartIdx) + newStep1Html + htmlCode.substring(step1EndIdx);
}

// Add the Popup Modal "Thêm Kênh" HTML at the end of modals
const modalAddChannelHtml = `
  <!-- ========================================================================== -->
  <!-- MODAL POPUP: THÊM KÊNH & KẾT NỐI TÀI KHOẢN (KHỚP 100% HÌNH ẢNH SMAX)        -->
  <!-- ========================================================================== -->
  <div class="smax-ac-modal-backdrop" id="qsAddChannelModalBackdrop" style="display: none;">
    <div class="smax-ac-modal-card">
      
      <!-- Modal Header -->
      <div class="smax-ac-modal-header">
        <div class="smax-ac-modal-title">Thêm kênh</div>
        <button class="smax-ac-modal-close-btn" id="btnQsCloseAddChannelModal" onclick="quickSetupApp.closeAddChannelModal()">&times;</button>
      </div>

      <!-- Modal Body: 2 Cột (Left Sidebar Kênh + Right List Pages) -->
      <div class="smax-ac-modal-body">
        
        <!-- Left Sidebar: Danh sách Kênh & Nền tảng -->
        <aside class="smax-ac-sidebar">
          <div class="smax-ac-sidebar-item" id="qsAcItem_all" onclick="quickSetupApp.selectModalChannelCategory('all')">
            <span class="smax-ac-icon" style="background: #e0e7ff; color: #4338ca;">⚏</span>
            <span>Tất cả kênh</span>
          </div>

          <div class="smax-ac-section-header">KÊNH CHAT</div>

          <div class="smax-ac-sidebar-item active" id="qsAcItem_facebook" onclick="quickSetupApp.selectModalChannelCategory('facebook')">
            <span class="smax-ac-icon" style="background: #1877f2; color: #ffffff;">f</span>
            <span>Facebook</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_instagram" onclick="quickSetupApp.selectModalChannelCategory('instagram')">
            <span class="smax-ac-icon" style="background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888); color: #ffffff;">📷</span>
            <span>Instagram</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_whatsapp" onclick="quickSetupApp.selectModalChannelCategory('whatsapp')">
            <span class="smax-ac-icon" style="background: #25d366; color: #ffffff;">📞</span>
            <span>WhatsApp</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_whatsapp_user" onclick="quickSetupApp.selectModalChannelCategory('whatsapp_user')">
            <span class="smax-ac-icon" style="background: #25d366; color: #ffffff;">📞</span>
            <span>WhatsApp User</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_zalo_oa" onclick="quickSetupApp.selectModalChannelCategory('zalo_oa')">
            <span class="smax-ac-icon" style="background: #0068ff; color: #ffffff; font-size: 9px; font-weight: 800;">ZOA</span>
            <span>Zalo OA</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_zalo_user" onclick="quickSetupApp.selectModalChannelCategory('zalo_user')">
            <span class="smax-ac-icon" style="background: #0068ff; color: #ffffff; font-size: 8px; font-weight: 800;">zalo</span>
            <span>Zalo User</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_telegram" onclick="quickSetupApp.selectModalChannelCategory('telegram')">
            <span class="smax-ac-icon" style="background: #229ed9; color: #ffffff;">✈️</span>
            <span>Telegram</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_shopee" onclick="quickSetupApp.selectModalChannelCategory('shopee')">
            <span class="smax-ac-icon" style="background: #ee4d2d; color: #ffffff;">🛍️</span>
            <span>Shopee</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_lazada" onclick="quickSetupApp.selectModalChannelCategory('lazada')">
            <span class="smax-ac-icon" style="background: #0f146d; color: #ffffff;">❤️</span>
            <span>Lazada</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_tiktok_shop" onclick="quickSetupApp.selectModalChannelCategory('tiktok_shop')">
            <span class="smax-ac-icon" style="background: #000000; color: #ffffff;">🛍️</span>
            <span>Tiktok Shop</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_tiktok_user" onclick="quickSetupApp.selectModalChannelCategory('tiktok_user')">
            <span class="smax-ac-icon" style="background: #000000; color: #ffffff;">🎵</span>
            <span>Tiktok User</span>
          </div>

          <div class="smax-ac-sidebar-item" id="qsAcItem_line" onclick="quickSetupApp.selectModalChannelCategory('line')">
            <span class="smax-ac-icon" style="background: #06c755; color: #ffffff;">💬</span>
            <span>Line</span>
          </div>
        </aside>

        <!-- Right Content: Search, Connect Button & Pages List -->
        <main class="smax-ac-content">
          
          <!-- Search Input -->
          <div class="smax-ac-search-wrapper">
            <input type="text" id="qsAddChannelSearchInput" class="smax-ac-search-input" placeholder="Tìm kiếm..." oninput="quickSetupApp.searchModalPages(this.value)">
            <span class="smax-ac-search-icon">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
          </div>

          <!-- Connect Callout Banner -->
          <div class="smax-ac-connect-banner">
            <div style="font-size: 13px; color: #64748b; margin-bottom: 8px;">Bạn muốn thêm page mới ?</div>
            <button class="smax-ac-connect-btn" id="qsBtnConnectAccount" onclick="quickSetupApp.connectAccountAuth()">
              <span id="qsConnectIcon" style="color: #1877f2; font-size: 15px; font-weight: 800;">f</span>
              <span id="qsConnectText">Kết nối với tài khoản Facebook</span>
            </button>
          </div>

          <!-- List of Pages (Rows) -->
          <div class="smax-ac-page-list" id="qsModalPagesListContainer">
            
            <!-- Row 1 -->
            <div class="smax-ac-page-row" data-channel="facebook" data-page-id="fb_1">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar">BL</div>
                  <div class="smax-ac-page-row-badge">f</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury - Thời Trang Nam Cao Cấp</div>
                  <div class="smax-ac-page-row-id">ID: fb645567518632118</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat selected" id="btnPageAction_fb_1" onclick="quickSetupApp.toggleModalPageSelection('fb_1', 'Biluxury - Thời Trang Nam Cao Cấp', 'fb645567518632118', 'facebook')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Row 2 -->
            <div class="smax-ac-page-row" data-channel="facebook" data-page-id="fb_2">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar">BL</div>
                  <div class="smax-ac-page-row-badge">f</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury - Thời Trang Nam</div>
                  <div class="smax-ac-page-row-id">ID: fb106934742500380</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat selected" id="btnPageAction_fb_2" onclick="quickSetupApp.toggleModalPageSelection('fb_2', 'Biluxury - Thời Trang Nam', 'fb106934742500380', 'facebook')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Row 3 -->
            <div class="smax-ac-page-row" data-channel="facebook" data-page-id="fb_3">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar">BL</div>
                  <div class="smax-ac-page-row-badge">f</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury Đô Lương</div>
                  <div class="smax-ac-page-row-id">ID: fb196729230179863</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat" id="btnPageAction_fb_3" onclick="quickSetupApp.toggleModalPageSelection('fb_3', 'Biluxury Đô Lương', 'fb196729230179863', 'facebook')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Row 4 -->
            <div class="smax-ac-page-row" data-channel="facebook" data-page-id="fb_4">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar">BL</div>
                  <div class="smax-ac-page-row-badge">f</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury.vn</div>
                  <div class="smax-ac-page-row-id">ID: fb114070698465045</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat" id="btnPageAction_fb_4" onclick="quickSetupApp.toggleModalPageSelection('fb_4', 'Biluxury.vn', 'fb114070698465045', 'facebook')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Row 5 -->
            <div class="smax-ac-page-row" data-channel="facebook" data-page-id="fb_5">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar" style="background: #991b1b;">11</div>
                  <div class="smax-ac-page-row-badge">f</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury.vn Outlet</div>
                  <div class="smax-ac-page-row-id">ID: fb110138591991285</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat" id="btnPageAction_fb_5" onclick="quickSetupApp.toggleModalPageSelection('fb_5', 'Biluxury.vn Outlet', 'fb110138591991285', 'facebook')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Row 6 -->
            <div class="smax-ac-page-row" data-channel="facebook" data-page-id="fb_6">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar">BL</div>
                  <div class="smax-ac-page-row-badge">f</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury Bà Rịa</div>
                  <div class="smax-ac-page-row-id">ID: fb104564375820317</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat" id="btnPageAction_fb_6" onclick="quickSetupApp.toggleModalPageSelection('fb_6', 'Biluxury Bà Rịa', 'fb104564375820317', 'facebook')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Row 7 -->
            <div class="smax-ac-page-row" data-channel="facebook" data-page-id="fb_7">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar">BL</div>
                  <div class="smax-ac-page-row-badge">f</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">BiLuxury Hiệp Hòa</div>
                  <div class="smax-ac-page-row-id">ID: fb199144813796686</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat" id="btnPageAction_fb_7" onclick="quickSetupApp.toggleModalPageSelection('fb_7', 'BiLuxury Hiệp Hòa', 'fb199144813796686', 'facebook')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Zalo Row 1 -->
            <div class="smax-ac-page-row" data-channel="zalo_oa" data-page-id="zalo_1" style="display: none;">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar" style="background: #0068ff;">ZL</div>
                  <div class="smax-ac-page-row-badge zalo">Z</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury Official (Zalo OA)</div>
                  <div class="smax-ac-page-row-id">ID: zalo998811 (Tích Vàng ⭐)</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat selected" id="btnPageAction_zalo_1" onclick="quickSetupApp.toggleModalPageSelection('zalo_1', 'Biluxury Official (Zalo OA)', 'zalo998811', 'zalo_oa')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

            <!-- Zalo Row 2 -->
            <div class="smax-ac-page-row" data-channel="zalo_oa" data-page-id="zalo_2" style="display: none;">
              <div class="smax-ac-page-row-left">
                <div class="smax-ac-page-row-avatar-box">
                  <div class="smax-ac-page-row-avatar" style="background: #0284c7;">CS</div>
                  <div class="smax-ac-page-row-badge zalo">Z</div>
                </div>
                <div>
                  <div class="smax-ac-page-row-name">Biluxury CSKH & Bảo Hành</div>
                  <div class="smax-ac-page-row-id">ID: zalo998812</div>
                </div>
              </div>
              <div class="smax-ac-page-row-right">
                <button class="smax-btn-access-chat" id="btnPageAction_zalo_2" onclick="quickSetupApp.toggleModalPageSelection('zalo_2', 'Biluxury CSKH & Bảo Hành', 'zalo998812', 'zalo_oa')">
                  Truy cập Chat
                </button>
                <button class="smax-btn-row-delete" onclick="quickSetupApp.removeModalPageRow(this)" title="Xóa">&times;</button>
              </div>
            </div>

          </div>

        </main>

      </div>

    </div>
  </div>
`;

if (!htmlCode.includes('id="qsAddChannelModalBackdrop"')) {
  htmlCode = htmlCode.replace(
    '  <!-- MODAL: CHỌN TRANG FANPAGE KẾT NỐI (Yêu cầu 1) -->',
    modalAddChannelHtml + '\n  <!-- MODAL: CHỌN TRANG FANPAGE KẾT NỐI (Yêu cầu 1) -->'
  );
}

fs.writeFileSync(htmlPath, htmlCode, 'utf8');
console.log('src/index.html updated with Add Channel Modal matching screenshot!');

// 3. UPDATE src/js/quick-setup.js to handle the modal popup
const jsPath = path.join(__dirname, '../src/js/quick-setup.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

// Replace Page Methods with Add Channel Modal logic
const modalMethods = `  // --- STEP 1: ADD CHANNEL MODAL (POPUP "THÊM KÊNH" MATCHING OFFICIAL SMAX UI) ---
  openAddChannelModal() {
    const modal = document.getElementById('qsAddChannelModalBackdrop');
    if (modal) modal.style.display = 'flex';
  }

  closeAddChannelModal() {
    const modal = document.getElementById('qsAddChannelModalBackdrop');
    if (modal) modal.style.display = 'none';
  }

  selectModalChannelCategory(channelKey) {
    document.querySelectorAll('.smax-ac-sidebar-item').forEach(item => {
      item.classList.remove('active');
    });
    const targetItem = document.getElementById('qsAcItem_' + channelKey);
    if (targetItem) targetItem.classList.add('active');

    // Update connect button text
    const connectBtn = document.getElementById('qsBtnConnectAccount');
    const connectIcon = document.getElementById('qsConnectIcon');
    const connectText = document.getElementById('qsConnectText');

    if (channelKey === 'facebook') {
      if (connectIcon) { connectIcon.innerText = 'f'; connectIcon.style.color = '#1877f2'; }
      if (connectText) connectText.innerText = 'Kết nối với tài khoản Facebook';
    } else if (channelKey === 'zalo_oa' || channelKey === 'zalo_user') {
      if (connectIcon) { connectIcon.innerText = 'Z'; connectIcon.style.color = '#0068ff'; }
      if (connectText) connectText.innerText = 'Kết nối với tài khoản Zalo OA';
    } else if (channelKey === 'instagram') {
      if (connectIcon) { connectIcon.innerText = '📷'; connectIcon.style.color = '#dc2743'; }
      if (connectText) connectText.innerText = 'Kết nối với tài khoản Instagram';
    } else if (channelKey === 'whatsapp' || channelKey === 'whatsapp_user') {
      if (connectIcon) { connectIcon.innerText = '📞'; connectIcon.style.color = '#25d366'; }
      if (connectText) connectText.innerText = 'Kết nối với tài khoản WhatsApp Business';
    } else if (channelKey === 'telegram') {
      if (connectIcon) { connectIcon.innerText = '✈️'; connectIcon.style.color = '#229ed9'; }
      if (connectText) connectText.innerText = 'Kết nối Bot Telegram';
    } else if (channelKey === 'shopee') {
      if (connectIcon) { connectIcon.innerText = '🛍️'; connectIcon.style.color = '#ee4d2d'; }
      if (connectText) connectText.innerText = 'Kết nối Gian Hàng Shopee';
    } else if (channelKey === 'tiktok_shop' || channelKey === 'tiktok_user') {
      if (connectIcon) { connectIcon.innerText = '🎵'; connectIcon.style.color = '#000000'; }
      if (connectText) connectText.innerText = 'Kết nối TikTok Shop';
    } else {
      if (connectIcon) { connectIcon.innerText = '⚏'; connectIcon.style.color = '#4338ca'; }
      if (connectText) connectText.innerText = 'Kết nối Kênh Mới';
    }

    // Filter rows in right panel
    document.querySelectorAll('.smax-ac-page-row').forEach(row => {
      const rowChannel = row.getAttribute('data-channel');
      if (channelKey === 'all') {
        row.style.display = 'flex';
      } else {
        row.style.display = rowChannel === channelKey ? 'flex' : 'none';
      }
    });
  }

  searchModalPages(query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('.smax-ac-page-row').forEach(row => {
      const text = row.innerText.toLowerCase();
      row.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  connectAccountAuth() {
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast('Đang kết nối ủy quyền OAuth tài khoản kênh...');
    }
  }

  toggleModalPageSelection(pageId, pageName, pageSubId, channelType) {
    const btn = document.getElementById('btnPageAction_' + pageId);
    const isSelected = this.state.selectedPages.includes(pageId);

    if (isSelected) {
      this.state.selectedPages = this.state.selectedPages.filter(p => p !== pageId);
      if (btn) {
        btn.classList.remove('selected');
        btn.innerText = 'Truy cập Chat';
      }
      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast(\`Đã ngắt kết nối: \${pageName}\`);
      }
    } else {
      this.state.selectedPages.push(pageId);
      if (btn) {
        btn.classList.add('selected');
        btn.innerText = 'Đã chọn ✓';
      }
      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast(\`Đã chọn Trang: \${pageName}\`);
      }
    }

    this.renderConnectedPagesUI();
  }

  removeSelectedPage(pageId) {
    this.state.selectedPages = this.state.selectedPages.filter(p => p !== pageId);
    const btn = document.getElementById('btnPageAction_' + pageId);
    if (btn) {
      btn.classList.remove('selected');
      btn.innerText = 'Truy cập Chat';
    }
    this.renderConnectedPagesUI();
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast('Đã xóa trang khỏi luồng tự động');
    }
  }

  removeModalPageRow(buttonEl) {
    const row = buttonEl.closest('.smax-ac-page-row');
    if (row) {
      const pageId = row.getAttribute('data-page-id');
      this.removeSelectedPage(pageId);
      row.remove();
    }
  }

  renderConnectedPagesUI() {
    const count = this.state.selectedPages.length;
    const badge = document.getElementById('qsSelectedPagesCountBadge');
    if (badge) badge.innerText = \`Đã chọn \${count} Trang\`;

    const summaryText = document.getElementById('qsSelectedPagesText');
    if (summaryText) {
      if (count === 0) {
        summaryText.innerText = 'Chưa chọn Trang nào. Vui lòng nhấn nút "Thêm kênh" để chọn!';
      } else {
        const fbCount = this.state.selectedPages.filter(p => p.startsWith('fb')).length;
        const zaloCount = this.state.selectedPages.filter(p => p.startsWith('zalo')).length;
        summaryText.innerText = \`\${fbCount} Fanpage Facebook và \${zaloCount} Zalo OA\`;
      }
    }

    // Toggle card visibility in Step 1 grid
    const cardFb1 = document.getElementById('qsSelectedCard_fb_1');
    const cardFb2 = document.getElementById('qsSelectedCard_fb_2');
    const cardZalo1 = document.getElementById('qsSelectedCard_zalo_1');
    if (cardFb1) cardFb1.style.display = this.state.selectedPages.includes('fb_1') ? 'flex' : 'none';
    if (cardFb2) cardFb2.style.display = this.state.selectedPages.includes('fb_2') ? 'flex' : 'none';
    if (cardZalo1) cardZalo1.style.display = this.state.selectedPages.includes('zalo_1') ? 'flex' : 'none';
  }
`;

// Replace methods in quick-setup.js
const targetStart = `  // --- STEP 1: CHANNEL & PAGE SELECTION METHODS ---`;
const targetEnd = `  // --- VIEW SWITCHER (SIDEBAR 5 TABS + WIZARD) ---`;

const idx1 = jsCode.indexOf(targetStart);
const idx2 = jsCode.indexOf(targetEnd);

if (idx1 !== -1 && idx2 !== -1) {
  jsCode = jsCode.substring(0, idx1) + modalMethods + '\n' + jsCode.substring(idx2);
  fs.writeFileSync(jsPath, jsCode, 'utf8');
  console.log('src/js/quick-setup.js updated with Add Channel Modal popup methods!');
}
