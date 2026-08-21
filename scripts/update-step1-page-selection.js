const fs = require('fs');
const path = require('path');

// 1. UPDATE src/css/quick-setup.css
const cssPath = path.join(__dirname, '../src/css/quick-setup.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

const newPageSelectionStyles = `
/* Page Selection Styles (Step 1) */
.smax-qs-pages-filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.smax-qs-page-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 14px;
}

.smax-qs-page-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border-radius: 12px;
  border: 1.5px solid #e2e8f0;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.16s ease;
  position: relative;
}

.smax-qs-page-card:hover {
  border-color: #cbd5e1;
  background: #f8fafc;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
}

.smax-qs-page-card.selected {
  border-color: var(--smax-coral, #eb6553);
  background: #fff9f8;
  box-shadow: 0 2px 8px rgba(235, 101, 83, 0.08);
}

.smax-qs-page-avatar-wrapper {
  position: relative;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
}

.smax-qs-page-avatar {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  object-fit: cover;
  background: #0f1835;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.smax-qs-page-platform-badge {
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
  font-size: 9px;
  font-weight: 800;
  border: 1.5px solid #ffffff;
}

.smax-qs-page-platform-badge.zalo {
  background: #0068ff;
}

.smax-qs-page-info {
  flex: 1;
  min-width: 0;
}

.smax-qs-page-name {
  font-size: 13.5px;
  font-weight: 700;
  color: #0f1835;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 3px;
}

.smax-qs-page-meta {
  font-size: 11.5px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.smax-qs-page-card input[type="checkbox"] {
  accent-color: var(--smax-coral, #eb6553);
  width: 18px;
  height: 18px;
  margin-top: 2px;
  cursor: pointer;
}

.smax-qs-page-summary-box {
  background: #f0fdf4;
  border: 1px solid #86efac;
  border-radius: 10px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12.5px;
  color: #166534;
}

@media (max-width: 1024px) {
  .smax-qs-page-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .smax-qs-page-grid {
    grid-template-columns: 1fr;
  }
}
`;

if (!cssCode.includes('.smax-qs-page-card')) {
  cssCode += newPageSelectionStyles;
  fs.writeFileSync(cssPath, cssCode, 'utf8');
  console.log('src/css/quick-setup.css updated with Page Selection styling!');
}

// 2. UPDATE src/index.html Step 1 Panel
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

const oldStep1Panel = `          <!-- BƯỚC 1: KÊNH & THƯƠNG HIỆU (🏠 NỀN TẢNG) -->
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
            </div>`;

const newStep1Panel = `          <!-- BƯỚC 1: KÊNH & THƯƠNG HIỆU (🏠 NỀN TẢNG) -->
          <div class="smax-qs-step-panel active" id="qsStep1Panel" data-step="1">
            
            <!-- Card 1: Chọn Kênh Bán Hàng -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div>
                  <div class="smax-qs-card-title">1. Chọn Nền Tảng Kênh Nhắn Tin (Channels)</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 2px;">
                    Chọn các kênh bạn muốn tích hợp tự động hóa. Sau đó tích chọn các Fanpage / Trang cụ thể ở mục bên dưới.
                  </div>
                </div>
                <span class="smax-badge smax-badge-blue">Đa Kênh Omnichannel</span>
              </div>

              <div class="smax-qs-channels-grid" id="qsChannelsGrid">
                <label class="smax-qs-channel-card selected" onclick="quickSetupApp.toggleChannel('fb_messenger', event)">
                  <input type="checkbox" id="chkQsChannelFb" checked>
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Facebook Messenger</strong>
                    <div style="font-size: 11px; color: #10b981;">● 3 Fanpage khả dụng</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card selected" onclick="quickSetupApp.toggleChannel('zalo_oa', event)">
                  <input type="checkbox" id="chkQsChannelZalo" checked>
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Zalo Official Account</strong>
                    <div style="font-size: 11px; color: #10b981;">● 2 Zalo OA khả dụng</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card" onclick="quickSetupApp.toggleChannel('instagram', event)">
                  <input type="checkbox" id="chkQsChannelInsta">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Instagram Direct</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card" onclick="quickSetupApp.toggleChannel('tiktok', event)">
                  <input type="checkbox" id="chkQsChannelTiktok">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">TikTok Shop Chat</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card" onclick="quickSetupApp.toggleChannel('shopee', event)">
                  <input type="checkbox" id="chkQsChannelShopee">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Shopee Chat</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card" onclick="quickSetupApp.toggleChannel('telegram', event)">
                  <input type="checkbox" id="chkQsChannelTelegram">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Telegram Bot</strong>
                    <div style="font-size: 11px; color: #64748b;">Sẵn sàng kết nối</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card" onclick="quickSetupApp.toggleChannel('whatsapp', event)">
                  <input type="checkbox" id="chkQsChannelWhatsapp">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">WhatsApp Business</strong>
                    <div style="font-size: 11px; color: #64748b;">Cloud API</div>
                  </div>
                </label>
                <label class="smax-qs-channel-card" onclick="quickSetupApp.toggleChannel('website', event)">
                  <input type="checkbox" id="chkQsChannelWebsite">
                  <div>
                    <strong style="font-size: 13px; color: #0f1835;">Livechat Website</strong>
                    <div style="font-size: 11px; color: #64748b;">Widget nhúng Web</div>
                  </div>
                </label>
              </div>
            </div>

            <!-- Card 2 (MỚI): CHỌN TRANG (PAGE) ÁP DỤNG KỊCH BẢN TỰ ĐỘNG HÓA -->
            <div class="smax-qs-card" id="qsPageSelectionCard">
              <div class="smax-qs-card-header">
                <div>
                  <div class="smax-qs-card-title">2. Chọn Trang (Page / Fanpage / Zalo OA) Áp Dụng Kịch Bản</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 2px;">
                    Tích chọn các Fanpage hoặc Zalo OA cụ thể bạn muốn kích hoạt luồng tự động bán hàng & CSKH này.
                  </div>
                </div>
                <span class="smax-badge smax-badge-coral" id="qsSelectedPagesCountBadge">Đã chọn 3 Trang</span>
              </div>

              <!-- Thanh lọc và tìm kiếm Page -->
              <div class="smax-qs-pages-filter-bar">
                <div style="display: flex; align-items: center; gap: 8px; flex: 1; max-width: 380px;">
                  <div class="smax-search-box" style="width: 100%;">
                    <input type="text" id="qsPageSearchInput" class="smax-search-input" placeholder="Tìm kiếm Fanpage / OA theo tên hoặc ID..." oninput="quickSetupApp.searchPages(this.value)">
                    <span class="smax-search-icon"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#787b83" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></span>
                  </div>
                </div>

                <div style="display: flex; align-items: center; gap: 8px;">
                  <button class="smax-btn-pill-secondary active" id="btnFilterPageAll" onclick="quickSetupApp.filterPageCategory('all')" style="padding: 5px 12px; font-size: 12px;">Tất cả (5)</button>
                  <button class="smax-btn-pill-secondary" id="btnFilterPageFb" onclick="quickSetupApp.filterPageCategory('fb')" style="padding: 5px 12px; font-size: 12px;">Facebook (3)</button>
                  <button class="smax-btn-pill-secondary" id="btnFilterPageZalo" onclick="quickSetupApp.filterPageCategory('zalo')" style="padding: 5px 12px; font-size: 12px;">Zalo OA (2)</button>
                  <button class="smax-btn-sm" style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 6px; padding: 5px 10px; font-size: 12px; cursor: pointer;" onclick="quickSetupApp.toggleSelectAllPages()">
                    <span id="labelSelectAllPages">✓ Chọn tất cả</span>
                  </button>
                  <button class="smax-btn-sm" style="background: #fff5f3; border: 1px solid #fed7aa; color: #eb6553; border-radius: 6px; padding: 5px 10px; font-size: 12px; font-weight: 600; cursor: pointer;" onclick="tabsApp.showToast('Mở cửa sổ ủy quyền Meta / Zalo để kết nối Page mới...')">
                    + Kết nối Fanpage mới
                  </button>
                </div>
              </div>

              <!-- Lưới Danh Sách Các Page Khả Dụng -->
              <div class="smax-qs-page-grid" id="qsPagesGridContainer">
                
                <!-- Page 1: FB Flagship -->
                <div class="smax-qs-page-card selected" id="pageCard_fb_1" onclick="quickSetupApp.togglePageSelection('fb_1', event)">
                  <input type="checkbox" id="chkPage_fb_1" checked onclick="event.stopPropagation(); quickSetupApp.togglePageSelection('fb_1')">
                  <div class="smax-qs-page-avatar-wrapper">
                    <div class="smax-qs-page-avatar" style="background: #0f1835;">FA</div>
                    <div class="smax-qs-page-platform-badge">f</div>
                  </div>
                  <div class="smax-qs-page-info">
                    <div class="smax-qs-page-name" title="Shop Thời Trang Smax - Flagship Store">Shop Thời Trang Smax - Flagship</div>
                    <div class="smax-qs-page-meta">
                      <span>ID: 102938472910</span>
                      <span>•</span>
                      <span style="color: #10b981; font-weight: 600;">45.2K Follows</span>
                    </div>
                    <div style="font-size: 11px; color: #3b82f6; margin-top: 3px; font-weight: 500;">
                      🛡️ Quản trị viên (Admin)
                    </div>
                  </div>
                </div>

                <!-- Page 2: FB Outlet -->
                <div class="smax-qs-page-card selected" id="pageCard_fb_2" onclick="quickSetupApp.togglePageSelection('fb_2', event)">
                  <input type="checkbox" id="chkPage_fb_2" checked onclick="event.stopPropagation(); quickSetupApp.togglePageSelection('fb_2')">
                  <div class="smax-qs-page-avatar-wrapper">
                    <div class="smax-qs-page-avatar" style="background: #eb6553;">OT</div>
                    <div class="smax-qs-page-platform-badge">f</div>
                  </div>
                  <div class="smax-qs-page-info">
                    <div class="smax-qs-page-name" title="Smax Fashion Outlet - Xả Kho Giá Tốt">Smax Fashion Outlet - Xả Kho</div>
                    <div class="smax-qs-page-meta">
                      <span>ID: 102938472911</span>
                      <span>•</span>
                      <span style="color: #10b981; font-weight: 600;">18.5K Follows</span>
                    </div>
                    <div style="font-size: 11px; color: #3b82f6; margin-top: 3px; font-weight: 500;">
                      🛡️ Quản trị viên (Admin)
                    </div>
                  </div>
                </div>

                <!-- Page 3: FB Beauty -->
                <div class="smax-qs-page-card" id="pageCard_fb_3" onclick="quickSetupApp.togglePageSelection('fb_3', event)">
                  <input type="checkbox" id="chkPage_fb_3" onclick="event.stopPropagation(); quickSetupApp.togglePageSelection('fb_3')">
                  <div class="smax-qs-page-avatar-wrapper">
                    <div class="smax-qs-page-avatar" style="background: #8b5cf6;">BE</div>
                    <div class="smax-qs-page-platform-badge">f</div>
                  </div>
                  <div class="smax-qs-page-info">
                    <div class="smax-qs-page-name" title="Smax Beauty & Cosmetics Store">Smax Beauty & Cosmetics</div>
                    <div class="smax-qs-page-meta">
                      <span>ID: 102938472912</span>
                      <span>•</span>
                      <span>32.1K Follows</span>
                    </div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 3px;">
                      Biên tập viên (Editor)
                    </div>
                  </div>
                </div>

                <!-- Page 4: Zalo OA Official -->
                <div class="smax-qs-page-card selected" id="pageCard_zalo_1" onclick="quickSetupApp.togglePageSelection('zalo_1', event)">
                  <input type="checkbox" id="chkPage_zalo_1" checked onclick="event.stopPropagation(); quickSetupApp.togglePageSelection('zalo_1')">
                  <div class="smax-qs-page-avatar-wrapper">
                    <div class="smax-qs-page-avatar" style="background: #0068ff;">ZL</div>
                    <div class="smax-qs-page-platform-badge zalo">Z</div>
                  </div>
                  <div class="smax-qs-page-info">
                    <div class="smax-qs-page-name" title="Shop Thời Trang Smax Official (Zalo OA)">Smax Thời Trang Official</div>
                    <div class="smax-qs-page-meta">
                      <span>OA ID: zalo_998811</span>
                      <span>•</span>
                      <span style="color: #f59e0b; font-weight: 700;">Tích Vàng ⭐</span>
                    </div>
                    <div style="font-size: 11px; color: #10b981; margin-top: 3px; font-weight: 500;">
                      ● Đã xác thực Doanh Nghiệp
                    </div>
                  </div>
                </div>

                <!-- Page 5: Zalo OA Care -->
                <div class="smax-qs-page-card" id="pageCard_zalo_2" onclick="quickSetupApp.togglePageSelection('zalo_2', event)">
                  <input type="checkbox" id="chkPage_zalo_2" onclick="event.stopPropagation(); quickSetupApp.togglePageSelection('zalo_2')">
                  <div class="smax-qs-page-avatar-wrapper">
                    <div class="smax-qs-page-avatar" style="background: #0284c7;">CS</div>
                    <div class="smax-qs-page-platform-badge zalo">Z</div>
                  </div>
                  <div class="smax-qs-page-info">
                    <div class="smax-qs-page-name" title="Smax CSKH & Hỗ Trợ Đổi Trả">Smax CSKH & Đổi Trả</div>
                    <div class="smax-qs-page-meta">
                      <span>OA ID: zalo_998812</span>
                      <span>•</span>
                      <span>OA CSKH</span>
                    </div>
                    <div style="font-size: 11px; color: #64748b; margin-top: 3px;">
                      Sẵn sàng kết nối
                    </div>
                  </div>
                </div>

              </div>

              <!-- Summary bar -->
              <div class="smax-qs-page-summary-box" id="qsPageSummaryBox">
                <div>
                  🎯 <strong>Đang áp dụng cho:</strong> <span id="qsSelectedPagesText">2 Fanpage Facebook (Flagship, Outlet) và 1 Zalo OA (Official)</span>.
                </div>
                <div style="font-size: 11.5px; opacity: 0.9;">
                  Khách nhắn tin vào bất kỳ Trang nào đã chọn ở trên đều sẽ được tự động tiếp đón!
                </div>
              </div>
            </div>`;

htmlCode = htmlCode.replace(oldStep1Panel, newStep1Panel);
fs.writeFileSync(htmlPath, htmlCode, 'utf8');
console.log('src/index.html updated with Step 1 Page Selection Card & Filters!');

// 3. UPDATE src/js/quick-setup.js to handle Page Selection logic
const appJsPath = path.join(__dirname, '../src/js/quick-setup.js');
let qsJsCode = fs.readFileSync(appJsPath, 'utf8');

const stateTarget = `    this.state = {
      brandName: 'Shop Thời Trang Smax',
      industry: 'fashion',
      channels: ['fb_messenger', 'zalo_oa'],`;

const stateReplacement = `    this.state = {
      brandName: 'Shop Thời Trang Smax',
      industry: 'fashion',
      channels: ['fb_messenger', 'zalo_oa'],
      selectedPages: ['fb_1', 'fb_2', 'zalo_1'],`;

qsJsCode = qsJsCode.replace(stateTarget, stateReplacement);

// Add Page Selection Methods to QuickSetupManager
const methodsTarget = `  // --- VIEW SWITCHER (SIDEBAR 5 TABS + WIZARD) ---`;

const pageMethods = `  // --- STEP 1: CHANNEL & PAGE SELECTION METHODS ---
  toggleChannel(channelKey, event) {
    if (event && event.target && event.target.tagName === 'INPUT') return;
    const chk = document.getElementById('chkQsChannel' + this.capitalize(channelKey));
    if (chk) {
      chk.checked = !chk.checked;
      this.updateChannelCardUI(channelKey, chk.checked);
    }
  }

  capitalize(str) {
    if (str === 'fb_messenger') return 'Fb';
    if (str === 'zalo_oa') return 'Zalo';
    if (str === 'instagram') return 'Insta';
    if (str === 'tiktok') return 'Tiktok';
    if (str === 'shopee') return 'Shopee';
    if (str === 'telegram') return 'Telegram';
    if (str === 'whatsapp') return 'Whatsapp';
    if (str === 'website') return 'Website';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  updateChannelCardUI(channelKey, isChecked) {
    if (isChecked) {
      if (!this.state.channels.includes(channelKey)) this.state.channels.push(channelKey);
    } else {
      this.state.channels = this.state.channels.filter(c => c !== channelKey);
    }
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(\`Đã \${isChecked ? 'bật' : 'tắt'} kênh: \${channelKey.toUpperCase()}\`);
    }
  }

  togglePageSelection(pageId, event) {
    if (event && event.target && event.target.tagName === 'INPUT') {
      // Checkbox click will trigger natural check change
    } else {
      const chk = document.getElementById('chkPage_' + pageId);
      if (chk) chk.checked = !chk.checked;
    }

    const isSelected = document.getElementById('chkPage_' + pageId)?.checked;
    const card = document.getElementById('pageCard_' + pageId);
    if (card) card.classList.toggle('selected', !!isSelected);

    if (isSelected) {
      if (!this.state.selectedPages.includes(pageId)) this.state.selectedPages.push(pageId);
    } else {
      this.state.selectedPages = this.state.selectedPages.filter(p => p !== pageId);
    }

    this.updatePagesSummaryUI();
  }

  updatePagesSummaryUI() {
    const count = this.state.selectedPages.length;
    const badge = document.getElementById('qsSelectedPagesCountBadge');
    if (badge) badge.innerText = \`Đã chọn \${count} Trang\`;

    const summaryText = document.getElementById('qsSelectedPagesText');
    if (summaryText) {
      if (count === 0) {
        summaryText.innerText = 'Chưa chọn Trang nào. Vui lòng tích chọn ít nhất 1 Trang!';
      } else {
        const fbCount = this.state.selectedPages.filter(p => p.startsWith('fb')).length;
        const zaloCount = this.state.selectedPages.filter(p => p.startsWith('zalo')).length;
        summaryText.innerText = \`\${fbCount} Fanpage Facebook và \${zaloCount} Zalo OA\`;
      }
    }
  }

  filterPageCategory(category) {
    document.querySelectorAll('.smax-qs-pages-filter-bar button').forEach(btn => {
      btn.classList.remove('active');
    });
    if (category === 'all') document.getElementById('btnFilterPageAll')?.classList.add('active');
    if (category === 'fb') document.getElementById('btnFilterPageFb')?.classList.add('active');
    if (category === 'zalo') document.getElementById('btnFilterPageZalo')?.classList.add('active');

    document.querySelectorAll('.smax-qs-page-card').forEach(card => {
      if (category === 'all') {
        card.style.display = 'flex';
      } else if (category === 'fb') {
        card.style.display = card.id.includes('fb') ? 'flex' : 'none';
      } else if (category === 'zalo') {
        card.style.display = card.id.includes('zalo') ? 'flex' : 'none';
      }
    });
  }

  searchPages(query) {
    const q = (query || '').toLowerCase().trim();
    document.querySelectorAll('.smax-qs-page-card').forEach(card => {
      const text = card.innerText.toLowerCase();
      card.style.display = text.includes(q) ? 'flex' : 'none';
    });
  }

  toggleSelectAllPages() {
    const allCards = document.querySelectorAll('.smax-qs-page-card');
    const allChecked = this.state.selectedPages.length === allCards.length;

    allCards.forEach(card => {
      const id = card.id.replace('pageCard_', '');
      const chk = document.getElementById('chkPage_' + id);
      if (chk) chk.checked = !allChecked;
      card.classList.toggle('selected', !allChecked);
    });

    if (!allChecked) {
      this.state.selectedPages = Array.from(allCards).map(c => c.id.replace('pageCard_', ''));
      document.getElementById('labelSelectAllPages').innerText = '✕ Bỏ chọn tất cả';
    } else {
      this.state.selectedPages = [];
      document.getElementById('labelSelectAllPages').innerText = '✓ Chọn tất cả';
    }

    this.updatePagesSummaryUI();
  }

  // --- VIEW SWITCHER (SIDEBAR 5 TABS + WIZARD) ---`;

qsJsCode = qsJsCode.replace(methodsTarget, pageMethods);
fs.writeFileSync(appJsPath, qsJsCode, 'utf8');
console.log('src/js/quick-setup.js updated with Page Selection logic!');
