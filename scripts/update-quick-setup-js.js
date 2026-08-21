const fs = require('fs');
const path = require('path');

const jsPath = path.join(__dirname, '../src/js/quick-setup.js');

const jsContent = `/* ==========================================================================
   SMAX QUICK SETUP MANAGER (ONBOARDING AUTOMATION WIZARD & MONITORING)
   ========================================================================== */

class QuickSetupManager {
  constructor() {
    this.currentStep = 1;
    this.totalSteps = 7;
    this.currentView = 'qsWizardView'; // 'qsWizardView' | 'qsOverviewView' | 'qsScenarioLogView' | 'qsConversionView' | 'qsAiInsightView' | 'qsChannelManageView'
    this.charts = {};

    this.smaxBlocks = [
      'Gửi mã Miễn Phí Vận Chuyển 25k',
      'Gửi ảnh khách mặc thực tế & Mẫu bán chạy',
      'Nhắc ưu đãi sắp hết hạn trong ngày',
      'Gửi thông báo Bộ sưu tập mới & Giảm 15%',
      'Tặng Voucher 50k & Bảng hướng dẫn chăm sóc da',
      'Gửi kết quả cải thiện thực tế sau 14 ngày',
      'Nhắc lịch hẹn tư vấn cùng Chuyên viên Da liễu',
      'Tặng Voucher Mua 1 Tặng 1 Topping Trân Châu',
      'Nhắc đơn đang chờ - Giao nhanh trong 20 phút',
      'Gửi Bảng giá chi tiết & Chính sách chiết khấu 5%',
      'Gửi Video 360 độ Nhà mẫu & Tiến độ thi công thực tế',
      'Gắn nhãn [Khách Tiềm Năng] + Báo ngay cho nhân viên bán hàng',
      'Tự động tạo đơn hàng trên phần mềm Smax POS và gửi mã QR thanh toán',
      'Chuyển cuộc trò chuyện cho nhân viên trực fanpage',
      'Messenger Shipping',
      'Create Image',
      'Messenger User Input',
      'Đồng bộ dataset'
    ];

    this.state = {
      brandName: 'Shop Thời Trang Smax',
      industry: 'fashion',
      channels: ['fb_messenger', 'zalo_oa'],
      selectedPages: ['fb_1', 'fb_2', 'zalo_1'],
      dataSource: 'none',
      welcome: {
        message: 'Xin chào {{name}}! 👋 Chào mừng bạn đến với Shop Thời Trang Smax. Em là Trợ lý AI có thể tư vấn mẫu mã, chọn size và nhận đơn tự động. Bạn đang tìm trang phục cho dịp nào ạ? 😊',
        quickReplies: ['🛍️ Xem BST Mới', '📏 Tư vấn chọn size', '🏷️ Bảng giá & Ưu đãi', '📞 Gặp nhân viên'],
        fallback: 'Dạ em chưa hiểu rõ ý mình lắm 😊 Bạn có thể chọn các nút gợi ý bên dưới hoặc để lại câu hỏi chi tiết hơn để em hỗ trợ nhé!'
      },
      genAi: {
        provider: 'openai',
        apiKey: 'sk-proj-smax-ai-demo-key-2026',
        skillProfile: 'sales_support',
        intentions: {
          ask_price: true,
          order_create: true,
          shipping: true,
          complaint: true,
          cancel_order: true
        }
      },
      commentReply: {
        useAiReply: true,
        useAiInbox: true,
        autoLike: true,
        hidePhone: true,
        readPostContext: true,
        delay: '30_60',
        mechanismNote: 'AI sẽ đọc nội dung bài post và nội dung khách hàng Comment, để tạo ra câu trả lời và gửi tin nhắn phù hợp'
      },
      leadCapture: {
        phone: true,
        email: true,
        fullName: true,
        address: true,
        birthday: false
      },
      autoOrder: {
        enabled: true,
        posPlatform: 'kiotviet',
        posApiKey: 'kiotviet-pos-sync-key-8899'
      },
      payment: {
        enabled: true,
        bank: 'vietcombank',
        accountName: 'NGUYEN VAN A',
        accountNumber: '1029384756'
      },
      followupList: [
        {
          id: 'qs-fu-1',
          delayLabel: 'Mốc 1: Sau 15 phút',
          badgeText: '15 phút',
          windowTag: 'Kênh Facebook Messenger / Miễn phí trong 24h',
          block: 'Gửi mã Miễn Phí Vận Chuyển 25k',
          message: 'Dạ shop thấy bạn đang quan tâm mẫu áo polo, shop tặng bạn mã FREESHIP25K áp dụng ngay hôm nay nha!'
        },
        {
          id: 'qs-fu-2',
          delayLabel: 'Mốc 2: Sau 2 giờ',
          badgeText: '2 giờ',
          windowTag: 'Kênh Facebook Messenger / Miễn phí trong 24h',
          block: 'Gửi ảnh khách mặc thực tế & Mẫu bán chạy',
          message: 'Mẫu này đang là sản phẩm bán chạy nhất tuần này ạ! Shop gửi bạn thêm ảnh khách mặc thực tế để bạn tham khảo nhé.'
        },
        {
          id: 'qs-fu-3',
          delayLabel: 'Mốc 3: Sau 22 giờ',
          badgeText: '22 giờ',
          windowTag: 'Trước khi hết 24h',
          block: 'Nhắc ưu đãi sắp hết hạn trong ngày',
          message: 'Ưu đãi freeship của bạn sắp hết hạn trong 2 tiếng nữa. Bạn có muốn shop giữ hàng cho bạn không ạ?'
        },
        {
          id: 'qs-fu-4',
          delayLabel: 'Mốc 4: Sau 24 giờ (Gửi tin tiếp thị)',
          badgeText: 'Sau 24 giờ',
          windowTag: 'Kênh Facebook Marketing',
          block: 'Gửi thông báo Bộ sưu tập mới & Giảm 15%',
          message: 'Gửi thông báo ưu đãi: Bộ Sưu Tập Mới & Ưu Đãi Mùa Hè'
        }
      ],
      minigame: {
        type: 'lucky_wheel',
        reward: 'voucher_15',
        winRate: '70',
        viralTag: true
      },
      webview: {
        orderConfirm: true,
        orderTracking: true
      },
      upsale: {
        enabled: true,
        channel: 'extension',
        safeHours: '9_20',
        steps: [
          { time: '0d', label: 'Ngay khi nhận hàng', title: 'Cảm Ơn & Khảo Sát Hài Lòng', desc: 'Gửi thư cảm ơn + hướng dẫn bảo quản trang phục + form đánh giá CSAT.' },
          { time: '3d', label: 'Ngày thứ 3', title: 'Hỏi Thăm Trải Nghiệm Mặc Đồ', desc: 'Hỏi xem sản phẩm mặc có vừa vặn không, có cần hỗ trợ đổi size miễn phí không.' },
          { time: '5d', label: 'Ngày thứ 5', title: 'Gợi Ý Sản Phẩm Phối Kèm (Cross-sell)', desc: 'Gửi album gợi ý mix & match: Quần jean / Giày sneaker phối cùng áo đã mua.' },
          { time: '7d', label: 'Ngày thứ 7', title: 'Voucher VIP Mua Lại (Re-purchase)', desc: 'Tặng mã VIP20 giảm 20% cho đơn hàng tiếp theo (Hiệu lực 7 ngày).' }
        ]
      },
      aiInsight: {
        leadScoring: true,
        scoreThreshold: '70',
        potentialTier: true,
        interestedProducts: true,
        specificNeeds: true,
        objections: true,
        objectionHandling: true
      },
      metaCapi: {
        enabled: true,
        datasetId: 'dataset_984729104812',
        eventLead: true,
        eventPurchase: true,
        eventAddToCart: true
      }
    };
  }

  init() {
    this.renderStep(this.currentStep);
    this.renderFollowupsTimeline();
    this.initEventListeners();
    for (let s = 2; s <= 7; s++) {
      this.initStepChatSimulator(s);
    }
  }

  initEventListeners() {
    // Industry select change
    const indSelect = document.getElementById('qsIndustrySelect');
    if (indSelect) {
      indSelect.addEventListener('change', (e) => {
        this.selectIndustry(e.target.value);
      });
    }

    // Minigame Type Change
    const miniSelect = document.getElementById('qsMinigameType');
    if (miniSelect) {
      miniSelect.addEventListener('change', (e) => {
        this.state.minigame.type = e.target.value;
      });
    }

    // Close block dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.smax-block-picker-wrapper')) {
        this.closeAllBlockDropdowns();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllBlockDropdowns();
        this.closeAddChannelModal();
      }
    });
  }

  // --- PROGRESSIVE DISCLOSURE (CARD ON/OFF ACCORDION) ---
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

  // --- STEP 1: ADD CHANNEL MODAL (POPUP "THÊM KÊNH" MATCHING OFFICIAL SMAX UI) ---
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
        btn.innerText = 'Thêm kênh';
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
      btn.innerText = 'Thêm kênh';
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

  // --- STEP 4: DYNAMIC FOLLOW-UP TIMELINE ---
  renderFollowupsTimeline() {
    const container = document.getElementById('qsFollowupTimelineContainer');
    if (!container) return;

    container.innerHTML = '';
    this.state.followupList.forEach((fu, idx) => {
      const stepEl = document.createElement('div');
      stepEl.className = 'smax-timeline-step';
      stepEl.innerHTML = \`
        <div class="smax-timeline-header">
          <div class="smax-timeline-delay">
            <span>\${fu.delayLabel}</span>
            <span class="smax-badge smax-badge-blue">\${fu.badgeText}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #5d6c7b; font-size: 12px;">\${fu.windowTag}</span>
            <button class="smax-timeline-remove-btn" title="Xóa kịch bản này" onclick="quickSetupApp.removeFollowup(\${idx})">&times;</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px;">
          <div>
            <label class="smax-label" style="font-size: 12.5px; font-weight: 700; color: #0f1835; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
              <span>Kịch bản Smax Automation:</span>
              <span style="font-size: 13px; color: #64748b; cursor: help;" title="Kịch bản Smax Automation tự động kích hoạt gửi tin bám đuổi">ⓘ</span>
            </label>
            \${this.renderBlockPickerHtml(\`qs-fu-block-\${idx}\`, fu.block, \`quickSetupApp.updateFollowupBlock(\${idx}, 'VALUE')\`)}
          </div>
          <div>
            <label class="smax-label" style="font-size: 12.5px; font-weight: 700; color: #0f1835; margin-bottom: 6px;">
              Nội dung gửi cho khách:
            </label>
            <input type="text" class="smax-input" style="height: 42px;" value="\${fu.message}" oninput="quickSetupApp.updateFollowupMsg(\${idx}, this.value)">
          </div>
        </div>
      \`;
      container.appendChild(stepEl);
    });
  }

  addFollowup() {
    const nextNum = this.state.followupList.length + 1;
    this.state.followupList.push({
      id: \`qs-fu-\${Date.now()}\`,
      delayLabel: \`Mốc \${nextNum}: Sau \${nextNum * 2} giờ\`,
      badgeText: 'Nhắc khách quay lại',
      windowTag: 'Kịch bản tùy chỉnh',
      block: 'Gửi mã Miễn Phí Vận Chuyển 25k',
      message: 'Shop vẫn đang giữ ưu đãi riêng cho bạn. Bạn có muốn shop tư vấn thêm không ạ?'
    });
    this.renderFollowupsTimeline();
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(\`Đã thêm Mốc \${nextNum} vào chuỗi bám đuổi\`);
    }
  }

  removeFollowup(index) {
    if (this.state.followupList.length <= 1) {
      alert('Bạn cần giữ lại ít nhất 1 kịch bản bám đuổi.');
      return;
    }
    this.state.followupList.splice(index, 1);
    this.renderFollowupsTimeline();
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast('Đã xóa bớt 1 mốc bám đuổi');
    }
  }

  updateFollowupMsg(index, val) {
    if (this.state.followupList[index]) {
      this.state.followupList[index].message = val;
    }
  }

  updateFollowupBlock(index, blockName) {
    if (this.state.followupList[index]) {
      this.state.followupList[index].block = blockName;
      this.renderFollowupsTimeline();
      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast(\`Đã chọn Block Automation: \${blockName}\`);
      }
    }
  }

  // --- SMAX BLOCK PICKER HELPER ---
  renderBlockPickerHtml(pickerId, selectedValue, onSelectCode, options = {}) {
    const isFb = selectedValue && (selectedValue.toLowerCase().includes('dataset') || selectedValue.toLowerCase().includes('facebook'));
    
    const iconHtml = isFb ? 
      \`<svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>\` :
      \`<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>\`;

    const listItems = this.smaxBlocks.map(b => {
      const isSel = b === selectedValue ? 'selected' : '';
      const isBlockFb = b.toLowerCase().includes('dataset') || b.toLowerCase().includes('facebook');
      const itemIcon = isBlockFb ? 
        \`<svg width="16" height="16" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>\` :
        \`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>\`;

      const execCode = onSelectCode.replace('VALUE', b.replace(/'/g, "\\\\\\'"));
      return \`
        <div class="smax-block-dropdown-item \${isSel}" onclick="\${execCode}; quickSetupApp.closeAllBlockDropdowns();">
          <span class="smax-block-item-icon">\${itemIcon}</span>
          <span class="smax-block-item-text">\${b}</span>
        </div>
      \`;
    }).join('');

    const clearCode = onSelectCode.replace('VALUE', '');

    return \`
      <div class="smax-block-picker-wrapper" id="wrapper-\${pickerId}">
        <div class="smax-block-selector-row">
          <div class="smax-block-selected-bar" onclick="quickSetupApp.toggleBlockDropdown('\${pickerId}')">
            <div class="smax-block-selected-left">
              <span class="smax-block-channel-icon">\${iconHtml}</span>
              <span class="smax-block-selected-name">\${selectedValue || 'Chọn Block Automation...'}</span>
            </div>
            <div class="smax-block-selected-right">
              \${selectedValue ? \`<span class="smax-block-clear-btn" title="Bỏ chọn block" onclick="event.stopPropagation(); \${clearCode}; quickSetupApp.closeAllBlockDropdowns();">&times;</span>\` : ''}
              <span class="smax-block-arrow-btn" id="arrow-\${pickerId}">▾</span>
            </div>
          </div>

          <button class="smax-block-edit-btn" title="Chỉnh sửa kịch bản trong Flow Builder" onclick="event.stopPropagation(); alert('Mở Flow Builder Smax để chỉnh sửa block: ' + '\${selectedValue || 'Chưa chọn'}');">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f1835" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        </div>

        <div class="smax-block-dropdown-menu" id="dropdown-\${pickerId}">
          <div class="smax-block-dropdown-list">
            \${listItems}
          </div>
          <div class="smax-block-dropdown-footer">
            <button class="smax-block-add-new-btn" onclick="quickSetupApp.addNewCustomBlock('\${pickerId}')">
              + Thêm mới
            </button>
          </div>
        </div>
      </div>
    \`;
  }

  toggleBlockDropdown(pickerId) {
    const dd = document.getElementById(\`dropdown-\${pickerId}\`);
    const arrow = document.getElementById(\`arrow-\${pickerId}\`);
    const bar = document.querySelector(\`#wrapper-\${pickerId} .smax-block-selected-bar\`);
    if (!dd) return;
    const wasActive = dd.classList.contains('active');
    this.closeAllBlockDropdowns();
    if (!wasActive) {
      dd.classList.add('active');
      if (arrow) arrow.innerText = '▴';
      if (bar) bar.classList.add('opened');
    }
  }

  closeAllBlockDropdowns() {
    document.querySelectorAll('.smax-block-dropdown-menu').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.smax-block-arrow-btn').forEach(el => el.innerText = '▾');
    document.querySelectorAll('.smax-block-selected-bar').forEach(el => el.classList.remove('opened'));
  }

  addNewCustomBlock(pickerId) {
    const newName = prompt('Nhập tên Block Automation Smax mới:');
    if (!newName || !newName.trim()) return;
    this.smaxBlocks.push(newName.trim());
    this.closeAllBlockDropdowns();
    this.renderFollowupsTimeline();
  }

  // ==========================================================================
  // --- LIVE CHAT SIMULATOR ENGINE (SPLIT-VIEW TEST PREVIEWS FOR STEPS 2-7) ---
  // ==========================================================================
  initStepChatSimulator(stepNumber) {
    const thread = document.getElementById(\`qsChatThread_step\${stepNumber}\`);
    if (!thread) return;

    if (stepNumber === 2) {
      const welcomeText = this.state.welcome.message.replace('{{name}}', 'Lê Văn An');
      thread.innerHTML = \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <div id="qsWelcomeBubbleText">\${welcomeText}</div>
            <div class="smax-qs-chat-chips-row">
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(2, 'ask_size')">🛍️ Xem BST Mới</span>
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(2, 'ask_size')">📏 Tư vấn chọn size</span>
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(2, 'ask_price')">🏷️ Bảng giá & Ưu đãi</span>
            </div>
          </div>
        </div>
      \`;
    } else if (stepNumber === 3) {
      thread.innerHTML = \`
        <div class="smax-qs-msg-row user">
          <div class="smax-qs-msg-bubble">Áo Polo Nam Oxford màu xanh navy size L giá 350k có giao gấp trong hôm nay không bạn?</div>
        </div>
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            Dạ còn sẵn hàng và có thể ship hỏa tốc hôm nay ạ! Bạn cho em xin <strong>Số điện thoại</strong> và <strong>Địa chỉ nhận hàng</strong> để em tạo đơn KiotViet ngay nhé! 😊
            <div class="smax-qs-chat-chips-row">
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(3, 'lead_capture')">📞 Gửi SĐT: 0912.345.678</span>
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(3, 'create_order')">🛒 Chốt 1 áo size L</span>
            </div>
          </div>
        </div>
      \`;
    } else if (stepNumber === 4) {
      thread.innerHTML = \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            ⏱️ <strong>Mô phỏng timeline bám đuổi tự động (24H Window):</strong>
            <div style="font-size: 11.5px; color: #64748b; margin-top: 4px;">Khách hàng ngưng phản hồi sau khi xem báo giá. Kịch bản bám đuổi kích hoạt:</div>
          </div>
        </div>
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <span class="smax-badge smax-badge-blue" style="font-size: 10px; margin-bottom: 4px; display: inline-block;">Mốc 1 • Sau 15 phút</span>
            <div>Dạ shop thấy bạn đang quan tâm mẫu áo polo, shop tặng bạn mã <strong>FREESHIP25K</strong> áp dụng ngay hôm nay nha!</div>
            <div class="smax-qs-chat-chips-row">
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(4, 'followup_2h')">⏰ Test Mốc 2 (Sau 2h)</span>
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(4, 'minigame')">🎡 Chơi Vòng Quay May Mắn</span>
            </div>
          </div>
        </div>
      \`;
    } else if (stepNumber === 5) {
      thread.innerHTML = \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            🎉 Cảm ơn anh An đã đặt hàng tại Biluxury! Đơn hàng <strong>#123456789</strong> đã được chuyển sang bộ phận đóng gói.
            
            <div class="smax-qs-bubble-card">
              <div style="font-weight: 700; color: #0f1835; font-size: 12px; margin-bottom: 4px;">📦 Hóa Đơn & Hành Trình Đơn Hàng</div>
              <div style="font-size: 11px; color: #64748b;">• Áo Polo Nam Oxford (x1) - 350.000₫</div>
              <div style="font-size: 11px; color: #10b981; font-weight: 700; margin-top: 2px;">● Trạng thái: Đang giao hàng (GHN)</div>
              <button class="smax-qs-bubble-btn" onclick="quickSetupApp.runQuickTest(5, 'webview_order')">
                🔍 Xem Webview Đơn Hàng
              </button>
            </div>

            <div class="smax-qs-chat-chips-row">
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(5, 'upsale_day3')">💬 Ngày 3: Hỏi trải nghiệm</span>
              <span class="smax-qs-chat-chip" onclick="quickSetupApp.runQuickTest(5, 'upsale_vip20')">🎁 Ngày 7: Tặng Voucher VIP20</span>
            </div>
          </div>
        </div>
      \`;
    } else if (stepNumber === 6) {
      thread.innerHTML = \`
        <div class="smax-qs-msg-row user">
          <div class="smax-qs-msg-bubble">Cho mình hỏi áo polo nam màu xanh navy size L giặt có bị co rút vải không shop? Phí ship 35k hơi cao nhỉ?</div>
        </div>
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            Dạ chất vải Oxford 100% cotton cao cấp đã qua xử lý co nhiệt nên giặt máy thoải mái không bị co rút hay xù lông ạ! Riêng hôm nay em hỗ trợ mã Freeship 0đ cho mình luôn nha.

            <div class="smax-qs-bubble-card" style="background: #fffdfb; border-color: #fca5a5;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <strong style="font-size: 11.5px; color: #9a3412;">🧠 AI Lead Intelligence</strong>
                <span class="smax-badge smax-badge-coral" style="font-size: 10px;">88/100 🔥 Hot Lead</span>
              </div>
              <div style="font-size: 11px; color: #475569; display: flex; flex-direction: column; gap: 3px;">
                <div>• <strong>SP:</strong> Áo Polo Nam Oxford (Size L, Navy)</div>
                <div>• <strong>Đắn đo:</strong> Phí ship 35k & Sợ co rút vải</div>
                <div>• <strong>Xử lý:</strong> Cam kết vải + Tặng mã Freeship 0đ</div>
              </div>
            </div>
          </div>
        </div>
      \`;
    } else if (stepNumber === 7) {
      thread.innerHTML = \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">🚀</div>
          <div class="smax-qs-msg-bubble">
            🚀 <strong>Sẵn sàng kích hoạt toàn bộ 5 chặng hành trình:</strong>
            <div style="font-size: 11.5px; color: #64748b; margin-top: 3px;">Bạn có thể click nút bên dưới để mô phỏng tự động luồng chạy xuyên suốt từ Tiếp cận ➔ Chốt đơn ➔ Chăm sóc sau mua!</div>
          </div>
        </div>
      \`;
    }
  }

  runQuickTest(stepNumber, testType) {
    const thread = document.getElementById(\`qsChatThread_step\${stepNumber}\`);
    if (!thread) return;

    if (testType === 'welcome') {
      const welcomeText = this.state.welcome.message.replace('{{name}}', 'Lê Văn An');
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <div>\${welcomeText}</div>
          </div>
        </div>
      \`;
    } else if (testType === 'ask_size' || testType === 'ask_price') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row user">
          <div class="smax-qs-msg-bubble">Mình cao 1m72 nặng 68kg thì mặc size gì vừa vặn shop? Giá bao nhiêu?</div>
        </div>
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            Dạ với chiều cao 1m72 và cân nặng 68kg, anh mặc <strong>Size L</strong> phom Regular Fit là chuẩn đẹp và tôn dáng nhất ạ! Mẫu Polo Oxford cao cấp hiện đang có giá ưu đãi <strong>350.000₫</strong> (giá gốc 450.000₫). Anh có muốn em giữ 1 áo size L màu xanh navy cho mình không ạ? 😊
          </div>
        </div>
      \`;
    } else if (testType === 'comment_inbox') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <div style="font-size: 11px; color: #64748b; margin-bottom: 4px;">💬 <strong>Khách comment dưới bài post Fanpage:</strong> <em>"Có size L màu đen ko shop?"</em></div>
            <div style="background: #f1f5f9; padding: 6px 8px; border-radius: 6px; font-size: 11px; margin-bottom: 6px;">
              🤖 <strong>AI trả lời Comment (Công khai):</strong> "Dạ Biluxury còn đủ size L ạ. Em vừa gửi bảng size và ưu đãi qua Messenger rồi, anh kiểm tra tin nhắn giúp shop nhé!"
            </div>
            <div>✉️ <strong>AI gửi tin nhắn Messenger (Riêng tư):</strong> "Dạ em chào anh An! Em gửi thông tin áo sơ mi lụa đen size L giá 399k. Anh gửi em xin địa chỉ để em ship ngay nhé!"</div>
          </div>
        </div>
      \`;
    } else if (testType === 'lead_capture') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row user">
          <div class="smax-qs-msg-bubble">Số điện thoại của mình là 0987654321, gửi về số 12 Tràng Tiền, Hà Nội nhé</div>
        </div>
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <div style="display: flex; gap: 4px; margin-bottom: 4px;">
              <span class="smax-qs-bubble-tag-pill">✓ Bóc tách SĐT: 0987.654.321</span>
              <span class="smax-qs-bubble-tag-pill">🏷️ Tag: [Lead Nóng]</span>
            </div>
            Dạ em đã lưu thông tin của anh An: SĐT <strong>0987.654.321</strong> và địa chỉ <strong>12 Tràng Tiền, Hà Nội</strong> rồi ạ!
          </div>
        </div>
      \`;
    } else if (testType === 'create_order') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <span class="smax-badge smax-badge-green" style="font-size: 10px; margin-bottom: 4px; display: inline-block;">● Đã đồng bộ KiotViet POS</span>
            <div style="font-weight: 700; color: #0f1835;">Đơn Hàng #123456789 Đã Được Khởi Tạo</div>
            <div style="font-size: 11.5px; color: #475569; margin-top: 4px;">
              • 01 Áo Polo Nam Oxford (Size L - Xanh Navy)<br>
              • Tổng thanh toán: <strong>350.000₫</strong> (Freeship 0đ)
            </div>
          </div>
        </div>
      \`;
    } else if (testType === 'vietqr') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <div>Dạ anh có thể quét mã VietQR bên dưới để thanh toán nhanh 350.000₫ ạ:</div>
            <div class="smax-qs-bubble-card" style="text-align: center;">
              <div style="font-size: 11px; color: #64748b; font-weight: 700;">VIETCOMBANK • 1029384756</div>
              <div style="font-size: 32px; margin: 4px 0;">📲</div>
              <div style="font-size: 12px; font-weight: 800; color: #eb6553;">350.000 VNĐ</div>
              <div style="font-size: 10px; color: #64748b;">Nội dung: DH123456789</div>
            </div>
          </div>
        </div>
      \`;
    } else if (testType === 'followup_15m' || testType === 'followup_2h') {
      const label = testType === 'followup_15m' ? 'Mốc 1 • Sau 15 phút' : 'Mốc 2 • Sau 2 giờ';
      const msg = testType === 'followup_15m' ? 
        'Dạ shop thấy bạn đang quan tâm mẫu áo polo, shop tặng bạn mã FREESHIP25K áp dụng ngay hôm nay nha!' :
        'Mẫu này đang là sản phẩm bán chạy nhất tuần này ạ! Shop gửi bạn thêm album ảnh khách mặc thực tế để bạn tham khảo nhé.';
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <span class="smax-badge smax-badge-coral" style="font-size: 10px; margin-bottom: 4px; display: inline-block;">\${label}</span>
            <div>\${msg}</div>
          </div>
        </div>
      \`;
    } else if (testType === 'minigame') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            🎁 Chúc mừng bạn nhận được <strong>01 lượt quay Vòng Quay May Mắn</strong> từ Biluxury!
            <div class="smax-qs-bubble-card" style="text-align: center; background: #fffbf0; border-color: #fcd34d;">
              <div style="font-size: 11px; font-weight: 700; color: #b45309;">🎡 VÒNG QUAY MAY MẮN (70% TRÚNG QUÀ)</div>
              <div style="font-size: 30px; margin: 4px 0;">🎯</div>
              <button class="smax-qs-bubble-btn" style="background: #f59e0b;" onclick="quickSetupApp.spinMiniWheel(\${stepNumber})">
                Quay Thử Nhận Quà Ngay
              </button>
            </div>
          </div>
        </div>
      \`;
    } else if (testType === 'webview_order') {
      if (typeof app !== 'undefined' && app.openReceiptModal) {
        app.openReceiptModal('#123456789');
      } else {
        alert('Mở Webview Biên Lai Xác Nhận Đơn Hàng #123456789: Khách hàng Lê Văn An, SP Áo Polo Nam Oxford (x1), Tổng tiền: 350.000₫.');
      }
    } else if (testType === 'upsale_day3' || testType === 'upsale_vip20') {
      const msg = testType === 'upsale_day3' ?
        'Dạ anh An ơi, áo polo đợt trước anh mặc có vừa vặn và ưng ý không ạ? Nếu cần hỗ trợ đổi size thì nhắn em hỗ trợ đổi miễn phí tận nhà nha!' :
        '🎁 Biluxury gửi tặng anh An mã VIP20 giảm 20% cho đơn hàng tiếp theo (hiệu lực trong 7 ngày tới) để tri ân khách hàng thân thiết ạ!';
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <div>\${msg}</div>
          </div>
        </div>
      \`;
    } else if (testType === 'hot_lead_insight' || testType === 'objection_insight') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">🧠</div>
          <div class="smax-qs-msg-bubble">
            <div class="smax-qs-bubble-card" style="background: #ffffff; border-color: #fed7aa;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
                <strong style="font-size: 11.5px; color: #9a3412;">AI Lead Scoring: 92/100 (Hot Lead)</strong>
                <span class="smax-badge smax-badge-coral" style="font-size: 10px;">Ưu tiên CSKH</span>
              </div>
              <div style="font-size: 11px; color: #475569;">• Nhu cầu: Mua áo dự tiệc cuối tuần<br>• Giải pháp: Đề xuất combo Áo + Quần âu tặng cà vạt</div>
            </div>
          </div>
        </div>
      \`;
    } else if (testType === 'meta_capi_sync') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">📊</div>
          <div class="smax-qs-msg-bubble">
            <span class="smax-badge smax-badge-blue" style="font-size: 10px; margin-bottom: 3px; display: inline-block;">Meta Conversions API</span>
            <div style="font-size: 11.5px; color: #1e293b;">
              ✅ Đã bắn sự kiện <strong>Lead (SĐT: 0987***)</strong> và <strong>Purchase (Giá trị: 350.000₫)</strong> về Dataset ID: <em>dataset_984729104812</em>.
            </div>
          </div>
        </div>
      \`;
    } else if (testType === 'full_flow_auto') {
      thread.innerHTML += \`
        <div class="smax-qs-msg-row user">
          <div class="smax-qs-msg-bubble">Em ơi tư vấn giúp anh mẫu áo polo nam nhé</div>
        </div>
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">Dạ Biluxury chào anh! Shop có dòng Polo Oxford thoáng mát giá 350k. Anh cho em xin chiều cao cân nặng để em chọn size nhé!</div>
        </div>
        <div class="smax-qs-msg-row user">
          <div class="smax-qs-msg-bubble">Anh 1m73 67kg, ship về 18 Hai Bà Trưng Hà Nội, SĐT 0912345678</div>
        </div>
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">
            <span class="smax-badge smax-badge-green" style="font-size: 10px; margin-bottom: 3px; display: inline-block;">● Đã lên đơn #123456789 & Bắn Meta CAPI</span>
            <div>Dạ đơn hàng Polo Size L đã được khởi tạo và gửi mã VietQR thanh toán 350k ạ. Cảm ơn anh An!</div>
          </div>
        </div>
      \`;
    }

    thread.scrollTop = thread.scrollHeight;
  }

  sendChatMessage(stepNumber) {
    const input = document.getElementById(\`qsChatInput_step\${stepNumber}\`);
    const thread = document.getElementById(\`qsChatThread_step\${stepNumber}\`);
    if (!input || !thread || !input.value.trim()) return;

    const userText = input.value.trim();
    input.value = '';

    // Append user message
    thread.innerHTML += \`
      <div class="smax-qs-msg-row user">
        <div class="smax-qs-msg-bubble">\${userText}</div>
      </div>
    \`;
    thread.scrollTop = thread.scrollHeight;

    // Simulate AI response
    setTimeout(() => {
      let botResponse = 'Dạ em là Trợ lý AI của Biluxury. Em đã ghi nhận câu hỏi của mình và có thể tư vấn mẫu, lấy size, nhận đơn hoặc chuyển chuyên viên tư vấn ngay ạ! 😊';
      const low = userText.toLowerCase();
      if (low.includes('giá') || low.includes('bao nhiêu')) {
        botResponse = 'Dạ sản phẩm bên shop đang có giá ưu đãi từ 250.000₫ - 350.000₫ kèm freeship cho đơn hàng từ 2 sản phẩm ạ!';
      } else if (low.includes('size') || low.includes('kg') || low.includes('m7') || low.includes('m6')) {
        botResponse = 'Dạ với vóc dáng của bạn, mặc size L hoặc XL là chuẩn phom thoải mái nhất ạ! Bạn có muốn shop giữ hàng cho mình không?';
      } else if (low.includes('09') || low.includes('08') || low.includes('03') || low.includes('07')) {
        botResponse = 'Dạ em đã bóc tách số điện thoại và địa chỉ giao hàng của mình rồi ạ. Em tiến hành lên đơn ngay cho mình nha!';
      }

      thread.innerHTML += \`
        <div class="smax-qs-msg-row bot">
          <div class="smax-qs-msg-avatar">AI</div>
          <div class="smax-qs-msg-bubble">\${botResponse}</div>
        </div>
      \`;
      thread.scrollTop = thread.scrollHeight;
    }, 400);
  }

  resetStepChat(stepNumber) {
    this.initStepChatSimulator(stepNumber);
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(\`Đã làm mới khung chat thử nghiệm Bước \${stepNumber}\`);
    }
  }

  spinMiniWheel(stepNumber) {
    const thread = document.getElementById(\`qsChatThread_step\${stepNumber}\`);
    if (!thread) return;

    thread.innerHTML += \`
      <div class="smax-qs-msg-row bot">
        <div class="smax-qs-msg-avatar">🎉</div>
        <div class="smax-qs-msg-bubble" style="background: #ecfdf5; border-color: #6ee7b7;">
          🎉 <strong>CHÚC MỪNG BẠN ĐÃ TRÚNG THƯỞNG:</strong><br>
          Mã voucher <strong>SALE15</strong> giảm 15% toàn bộ đơn hàng! Mã đã được tự động áp dụng vào giỏ hàng.
        </div>
      </div>
    \`;
    thread.scrollTop = thread.scrollHeight;
  }

  syncWelcomePreview(newText) {
    const el = document.getElementById('qsWelcomeBubbleText');
    if (el) {
      el.innerText = newText.replace('{{name}}', 'Lê Văn An');
    }
  }

  // --- VIEW SWITCHER (SIDEBAR 5 TABS + WIZARD) ---
  switchQsView(viewId) {
    this.currentView = viewId;

    document.querySelectorAll('.smax-qs-view-section').forEach(sec => {
      sec.classList.remove('active');
    });
    const target = document.getElementById(viewId);
    if (target) target.classList.add('active');

    document.querySelectorAll('.smax-qs-sidebar-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      }
    });

    if (viewId === 'qsOverviewView') {
      setTimeout(() => this.initOverviewCharts(), 50);
    } else if (viewId === 'qsScenarioLogView') {
      setTimeout(() => this.initLogCharts(), 50);
    } else if (viewId === 'qsConversionView') {
      setTimeout(() => this.initConversionCharts(), 50);
    } else if (viewId === 'qsAiInsightView') {
      setTimeout(() => this.initInsightCharts(), 50);
    }
  }

  // --- WIZARD STEP NAVIGATION ---
  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    this.currentStep = stepNumber;
    this.renderStep(stepNumber);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    } else {
      this.activateAllScenarios();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }

  renderStep(stepNumber) {
    document.querySelectorAll('.smax-qs-step-item').forEach(btn => {
      const step = parseInt(btn.getAttribute('data-step'), 10);
      btn.classList.remove('active');
      if (step === stepNumber) {
        btn.classList.add('active');
      }
      btn.classList.toggle('completed', step < stepNumber);
    });

    document.querySelectorAll('.smax-qs-step-panel').forEach(panel => {
      const step = parseInt(panel.getAttribute('data-step'), 10);
      panel.classList.toggle('active', step === stepNumber);
    });

    const btnPrev = document.getElementById('qsBtnPrevStep');
    const btnNext = document.getElementById('qsBtnNextStep');
    if (btnPrev) {
      btnPrev.style.visibility = stepNumber === 1 ? 'hidden' : 'visible';
    }
    if (btnNext) {
      if (stepNumber === this.totalSteps) {
        btnNext.innerHTML = '<span>🚀 Kích Hoạt Toàn Bộ Luồng</span>';
        btnNext.className = 'smax-btn-primary-coral';
      } else {
        btnNext.innerHTML = \`<span>Tiếp tục (Bước \${stepNumber + 1}/\${this.totalSteps}) →</span>\`;
        btnNext.className = 'smax-btn-primary-coral';
      }
    }

    if (stepNumber >= 2 && stepNumber <= 7) {
      this.initStepChatSimulator(stepNumber);
    }

    if (stepNumber === 4) {
      this.renderFollowupsTimeline();
    }

    const pane = document.getElementById('quickSetupContentPane');
    if (pane) pane.scrollTop = 0;
  }

  // --- INDUSTRY PRESET AUTO-SYNC ---
  selectIndustry(industryKey) {
    this.state.industry = industryKey;
    const welcomeMsg = document.getElementById('qsWelcomeMessage');
    const brandInput = document.getElementById('qsBrandName');

    const presets = window.INDUSTRY_PRESETS || {};
    const p = presets[industryKey];

    if (p) {
      if (brandInput) brandInput.value = p.businessProfile?.businessName || '';
      if (welcomeMsg) welcomeMsg.value = p.persona?.firstContact?.welcomeMessage || '';

      if (p.followups) {
        const fu = p.followups;
        this.state.followupList = [
          {
            id: 'qs-fu-1',
            delayLabel: 'Mốc 1: Sau 15 phút',
            badgeText: fu.step1?.label || '15 phút',
            windowTag: 'Kênh Facebook Messenger / Miễn phí trong 24h',
            block: fu.step1?.block || 'Gửi mã Miễn Phí Vận Chuyển 25k',
            message: fu.step1?.message || ''
          },
          {
            id: 'qs-fu-2',
            delayLabel: 'Mốc 2: Sau 2 giờ',
            badgeText: fu.step2?.label || '2 giờ',
            windowTag: 'Kênh Facebook Messenger / Miễn phí trong 24h',
            block: fu.step2?.block || 'Gửi ảnh khách mặc thực tế & Mẫu bán chạy',
            message: fu.step2?.message || ''
          },
          {
            id: 'qs-fu-3',
            delayLabel: 'Mốc 3: Sau 22 giờ',
            badgeText: fu.step3?.label || '22 giờ',
            windowTag: 'Trước khi hết 24h',
            block: fu.step3?.block || 'Nhắc ưu đãi sắp hết hạn trong ngày',
            message: fu.step3?.message || ''
          },
          {
            id: 'qs-fu-4',
            delayLabel: 'Mốc 4: Sau 24 giờ (Gửi tin tiếp thị)',
            badgeText: fu.outside24h?.label || 'Sau 24 giờ',
            windowTag: fu.outside24h?.channel === 'facebook_message' ? 'Kênh Facebook Marketing' : 'Tin nhắn tiếp thị',
            block: fu.outside24h?.block || 'Gửi thông báo chương trình mới',
            message: fu.outside24h?.message || (fu.outside24h?.topic ? \`Gửi thông báo ưu đãi: \${fu.outside24h.topic}\` : 'Thông báo chương trình mới')
          }
        ];
      }
    } else {
      if (industryKey === 'fashion') {
        if (brandInput) brandInput.value = 'Shop Thời Trang Smax';
        if (welcomeMsg) welcomeMsg.value = 'Xin chào {{name}}! 👋 Chào mừng bạn đến với Shop Thời Trang Smax. Em là Trợ lý AI có thể tư vấn mẫu mã, chọn size và nhận đơn tự động. Bạn đang tìm trang phục cho dịp nào ạ? 😊';
      }
    }

    this.renderFollowupsTimeline();
    for (let s = 2; s <= 7; s++) {
      this.initStepChatSimulator(s);
    }

    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(\`Đã áp dụng bộ kịch bản bám đuổi mẫu cho ngành: \${industryKey.toUpperCase()}\`);
    }
  }

  // --- ACTIVATE ALL SCENARIOS ---
  activateAllScenarios() {
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast('🎉 CHÚC MỪNG! Toàn bộ 6 kịch bản Tự Động Hóa & AI Insight đã được kích hoạt thành công!', 5000);
    }
    setTimeout(() => {
      this.switchQsView('qsOverviewView');
    }, 1000);
  }

  // --- CHART RENDERING METHODS (CHART.JS) ---
  initOverviewCharts() {}

  initLogCharts() {
    const ctx = document.getElementById('qsLogHourlyChart');
    if (!ctx) return;
    if (this.charts.logChart) this.charts.logChart.destroy();

    this.charts.logChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['00h', '02h', '04h', '06h', '08h', '10h', '12h', '14h', '16h', '18h', '20h', '22h'],
        datasets: [
          {
            label: 'Trigger Trước mua',
            data: [12, 5, 2, 8, 45, 88, 110, 95, 120, 145, 130, 60],
            backgroundColor: '#3b82f6',
            borderRadius: 4
          },
          {
            label: 'Trigger Trong mua',
            data: [5, 2, 1, 3, 20, 48, 65, 52, 70, 92, 85, 30],
            backgroundColor: '#eb6553',
            borderRadius: 4
          },
          {
            label: 'Trigger Sau mua',
            data: [2, 0, 0, 1, 10, 22, 30, 28, 35, 45, 40, 15],
            backgroundColor: '#10b981',
            borderRadius: 4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
        },
        scales: {
          x: { stacked: true, grid: { display: false } },
          y: { stacked: true, grid: { color: '#f1f5f9' } }
        }
      }
    });
  }

  initConversionCharts() {
    const ctx = document.getElementById('qsTrendChart');
    if (!ctx) return;
    if (this.charts.trendChart) this.charts.trendChart.destroy();

    this.charts.trendChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['01/08', '04/08', '07/08', '10/08', '13/08', '16/08', '18/08'],
        datasets: [
          {
            label: 'Số Leads thu thập',
            data: [45, 62, 78, 95, 110, 142, 168],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Số đơn hàng chốt',
            data: [15, 22, 28, 36, 45, 58, 72],
            borderColor: '#eb6553',
            backgroundColor: 'rgba(235, 101, 83, 0.1)',
            fill: true,
            tension: 0.3
          },
          {
            label: 'Khách mua lại (Upsale 7d)',
            data: [3, 6, 9, 12, 16, 21, 28],
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } }
        },
        scales: {
          y: { grid: { color: '#f1f5f9' } },
          x: { grid: { display: false } }
        }
      }
    });
  }

  initInsightCharts() {
    const ctx = document.getElementById('qsLeadScoreDonut');
    if (!ctx) return;
    if (this.charts.donutChart) this.charts.donutChart.destroy();

    this.charts.donutChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['🔥 Hot Lead (≥70 điểm)', '⚡ Warm Lead (40-69 điểm)', '❄️ Cold Lead (<40 điểm)'],
        datasets: [{
          data: [234, 189, 133],
          backgroundColor: ['#ef4444', '#f59e0b', '#3b82f6'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 11.5 } } }
        }
      }
    });
  }
}

// Global initialization
window.quickSetupApp = new QuickSetupManager();
`;

fs.writeFileSync(jsPath, jsContent, 'utf8');
console.log('src/js/quick-setup.js updated with interactive chat simulator engine!');
