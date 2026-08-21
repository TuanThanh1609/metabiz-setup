/**
 * Smax Meta Business Agent Studio - Application Controller (v8.0)
 * Features:
 * 1. Step 1: Empty state "Bạn chưa kết nối kênh nào" + "+ Kết nối kênh" (Matching Image 1)
 * 2. Stepper: 2-line clean 8-column layout (No horizontal scroll)
 * 3. Step 6: Dynamic Follow-up Timeline with "+ Thêm kịch bản" & "Xóa"
 * 4. Smax.ai Signature Block Selector UI (Matching Image 2)
 */

class SmaxStudioApp {
  constructor() {
    this.currentView = 'dashboard';
    this.currentStep = 1;
    this.totalSteps = 6;
    this.editingAgentId = null;

    // Available Fanpages to connect
    this.availablePages = [
      { id: '102938475618293', name: 'Cửa hàng Thời trang Smax Flagship', platform: 'facebook', color: '#0064e0' },
      { id: '84987654321', name: 'Mỹ phẩm Smax Beauty WhatsApp', platform: 'whatsapp', color: '#25d366' },
      { id: '992837461524312', name: 'Trà Sữa Milky Tea Fanpage', platform: 'facebook', color: '#0064e0' },
      { id: '773625142536475', name: 'Smax Land Bất Động Sản', platform: 'facebook', color: '#0064e0' },
      { id: '554637281920394', name: 'Thẩm Mỹ & Spa Smax Care', platform: 'facebook', color: '#0064e0' }
    ];

    // Standard Smax Automation Blocks (Matching Image 2)
    this.smaxBlocks = [
      'Create Image',
      'Get Row',
      'Messenger Gallery',
      'Messenger Typing',
      'Messenger User Input',
      'Messenger Shipping',
      'Nhắc Chọn Size & Tặng Mã Freeship 25k',
      'Gửi Ảnh Khách Mặc & Mẫu Bán Chạy',
      'Nhắc Ưu Đãi Sắp Hết Hạn Trong Ngày',
      'Gửi Thông Báo Bộ Sưu Tập Mới & Giảm 15%',
      'Vòng Quay May Mắn Trúng Áo 0đ',
      'Mở Hộp Quà Bí Mật'
    ];

    // System Version & Dashboard View State
    this.systemVersion = 'standard';
    this.customSkills = [
      {
        id: 'skill-size-guide',
        title: 'tu-van-chon-size-quan-ao',
        channel: 'all',
        description: 'Kích hoạt khi khách hàng hỏi về bảng kích thước, chiều cao cân nặng hoặc phân vân giữa các size áo/quần.',
        skill: '1. Hỏi khách hàng chiều cao (cm) và cân nặng (kg).\n2. Tra cứu bảng size: Dưới 55kg chọn Size M, từ 55-68kg chọn Size L, trên 68kg chọn Size XL.\n3. Đề xuất size chuẩn kèm cam kết đổi size miễn phí trong 7 ngày.',
        enabled: true
      },
      {
        id: 'skill-guardrails',
        title: 'quy-tac-ung-xu-guardrails',
        channel: 'all',
        description: 'Áp dụng xuyên suốt tất cả các tin nhắn tư vấn và hội thoại với khách hàng.',
        skill: 'Luôn xưng hô Dạ/Mình thân thiện, lịch sự. Tuyệt đối không đề cập hoặc so sánh với các thương hiệu đối thủ. Mức giảm giá tối đa không vượt quá 10%.',
        enabled: true
      }
    ]; // 'advance' | 'standard'
    this.totalSteps = 6;
    this.dashboardViewMode = 'grid'; // 'grid' | 'table'
    this.currentChannelFilter = 'all'; // 'all' | 'active' | 'facebook' | 'whatsapp'
    this.activeQuickChatAgent = null;

    // Agents List
    this.agentsList = [
      {
        id: 'agent-1',
        badgeText: 'FA',
        badgeBg: '#d91b5b',
        name: 'Trợ lý Tư vấn Thời trang Smax',
        subName: 'Thời trang & May mặc',
        channelType: 'facebook',
        channelName: 'Facebook Fanpage Flagship',
        status: 'active',
        csat: '4.8',
        preset: 'fashion',
        totalAiConvs: '646 / 5,153',
        completionRate: '89.4%',
        completionPercent: 89.4,
        completionSub: '349 đơn (1m 15s)',
        buyerIntentCount: '4,158',
        buyerIntentSub: '92% có nhu cầu',
        createdAt: '28/04/2026, 02:59',
        updatedAt: '07/08/2026 16:00',
        creator: 'Tuan Nguyen',
        knowledgeSources: [
          'Smax POS Live (3.2k SP)',
          'Google Sheet (Size & FAQ)',
          'Meta Catalog (850 SP)',
          'Shopee Mall Sync'
        ],
        activeWorkflows: [
          'Bám đuổi 4 mốc (15p, 2h, 22h, 24h)',
          'Webview Haravan & Sapo',
          'Meta CAPI Realtime',
          'Bàn giao CSKH khi có SĐT'
        ],
        icebreakers: ['Tư vấn chọn size áo polo nam', 'Bảng giá khuyến mãi T8/2026', 'Chính sách đổi trả trong 7 ngày', 'Thời gian giao hàng']
      },
      {
        id: 'agent-2',
        badgeText: 'BE',
        badgeBg: '#b41eeb',
        name: 'Chuyên viên Da liễu Smax Beauty',
        subName: 'Mỹ phẩm & Skincare',
        channelType: 'whatsapp',
        channelName: 'WhatsApp Cloud API',
        status: 'active',
        csat: '4.9',
        preset: 'cosmetics',
        totalAiConvs: '1,280 / 1,420',
        completionRate: '94.2%',
        completionPercent: 94.2,
        completionSub: '820 tư vấn da',
        buyerIntentCount: '1,150',
        buyerIntentSub: '88% mua combo',
        createdAt: '05/08/2025, 10:41',
        updatedAt: '21/10/2025 04:08',
        creator: 'Tuan Nguyen',
        knowledgeSources: [
          'Phác đồ trị mụn Sheet (450 Routine)',
          'Kho RAG 50 Thành phần',
          'Catalog Serum B5 & Chống Nắng'
        ],
        activeWorkflows: [
          'Bám đuổi Chăm sóc Da 3 ngày',
          'Webview Gợi ý Routine',
          'AI Lead Scoring (88/100)',
          'Chuyển Bác sĩ khi nặng'
        ],
        icebreakers: ['Tư vấn da dầu mụn nhạy cảm', 'Combo phục hồi Serum B5', 'Cách sử dụng kem chống nắng', 'Đặt lịch soi da miễn phí']
      },
      {
        id: 'agent-3',
        badgeText: 'FB',
        badgeBg: '#c05d78',
        name: 'Trợ lý Đặt Món Trà Sữa Milky',
        subName: 'F&B Trà Sữa & Đồ Uống',
        channelType: 'facebook',
        channelName: 'Fanpage & Instagram Direct',
        status: 'active',
        csat: '4.9',
        preset: 'fnb',
        totalAiConvs: '3,840 / 4,100',
        completionRate: '96.5%',
        completionPercent: 96.5,
        completionSub: '3,200 đơn món',
        buyerIntentCount: '3,750',
        buyerIntentSub: '98% đặt món',
        createdAt: '03/05/2025, 04:57',
        updatedAt: '24/04/2026 15:40',
        creator: 'Tuan Nguyen',
        knowledgeSources: [
          'Menu KiotViet (38 Món & Topping)',
          'Google Sheet Bảng giá & Size',
          'Kho Voucher Mua 2 Tặng 1'
        ],
        activeWorkflows: [
          'Nhắc hoàn tất giỏ sau 15p',
          'Webview Chọn Món (Đường/Đá)',
          'Tự in Bill quầy POS'
        ],
        icebreakers: ['Menu trà sữa trân châu bán chạy', 'Ưu đãi mua 2 tặng 1 hôm nay', 'Đặt giao hàng hỏa tốc', 'Chọn % đường & đá']
      },
      {
        id: 'agent-4',
        badgeText: 'RE',
        badgeBg: '#2563eb',
        name: 'Cố vấn Bất Động Sản Smax Land',
        subName: 'Bất động sản VIP',
        channelType: 'facebook',
        channelName: 'Facebook Messenger VIP',
        status: 'active',
        csat: '4.7',
        preset: 'real_estate',
        totalAiConvs: '890 / 1,050',
        completionRate: '86.8%',
        completionPercent: 86.8,
        completionSub: '410 lịch xem nhà',
        buyerIntentCount: '780',
        buyerIntentSub: '89% Lead nóng',
        createdAt: '26/05/2025, 04:36',
        updatedAt: '13/10/2025 11:59',
        creator: 'Tuan Nguyen',
        knowledgeSources: [
          'Google Drive Layout 2PN-3PN',
          'Bảng Giá & Tiến độ Sheet',
          'Tài liệu Pháp lý & Vay 0%'
        ],
        activeWorkflows: [
          'Nuôi dưỡng Lead VIP 7 ngày',
          'Đặt lịch xem nhà mẫu (Calendar)',
          'Phân bổ Sale khu vực'
        ],
        icebreakers: ['Bảng giá căn hộ 2PN view sông', 'Chính sách vay ngân hàng 0% lãi suất', 'Đặt lịch tham quan nhà mẫu', 'Tiến độ bàn giao dự án']
      },
      {
        id: 'agent-5',
        badgeText: 'SP',
        badgeBg: '#059669',
        name: 'Trợ lý Tư vấn Làm Đẹp Smax Care',
        subName: 'Thẩm mỹ & Spa',
        channelType: 'whatsapp',
        channelName: 'WhatsApp & Multi-channel',
        status: 'active',
        csat: '4.8',
        preset: 'spa_clinic',
        totalAiConvs: '520 / 600',
        completionRate: '91.0%',
        completionPercent: 91.0,
        completionSub: '380 booking khám',
        buyerIntentCount: '490',
        buyerIntentSub: '94% đặt hẹn',
        createdAt: '12/06/2025, 08:20',
        updatedAt: '02/08/2026 09:15',
        creator: 'Tuan Nguyen',
        knowledgeSources: [
          'Bảng Giá Hifu & Trẻ hóa',
          'Lịch trực Bác sĩ tuần này',
          'Google Sheet Phòng khám'
        ],
        activeWorkflows: [
          'Nhắc lịch hẹn 24h & 2h',
          'Webview Đặt Lịch & Chọn Bác sĩ',
          'Đồng bộ CRM Khách VIP'
        ],
        icebreakers: ['Liệu trình nâng cơ Hifu Gold', 'Bảng giá triệt lông & trẻ hóa', 'Đặt lịch hẹn cuối tuần', 'Bác sĩ chuyên khoa tư vấn']
      }
    ];

    // Core Agent State
    this.state = {
      selectedPreset: 'fashion',
      channel: {
        connected: false, // Default false until page selected (Matching Image 1)
        type: 'facebook_page',
        name: 'Cửa hàng Thời trang Smax Flagship',
        pageId: '102938475618293',
        color: '#0064e0',
        permissions: {
          pages_messaging: true,
          messaging_handovers: true
        }
      },
      businessProfile: {
        businessName: 'Cửa hàng Thời trang Smax',
        category: 'Thời trang nam nữ & Phụ kiện',
        businessBio: 'Thương hiệu thời trang thiết kế trẻ trung, hỗ trợ đổi size miễn phí trong 7 ngày.'
      },
      persona: {
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        roleTitle: 'Chuyên viên tư vấn phong cách & Chọn size',
        tone: 'friendly_trendy',
        greetingStyle: 'shop_ban',
        primaryLanguage: 'vi',
        autoTranslate: true,
        firstContact: {
          welcomeMessage: 'Dạ Shop chào bạn! Shop có thể hỗ trợ bạn chọn mẫu áo quần nào hôm nay ạ?',
          icebreakers: []
        },
        guardrails: {
          dos: [],
          donts: [],
          maxDiscountPercent: 20,
          competitorPolicy: '',
          systemPrompt: ''
        }
      },
      knowledge: {
        syncCatalog: false,
        urls: [],
        sheets: [],
        driveFolders: [],
        shopeeLinks: [],
        faqs: [],
        files: ['Bang-gia-va-chinh-sach-2026.pdf', 'Quy-trinh-doi-tra-7ngay.docx']
      },
      skills: {
        leadExtraction: true,
        orderCreation: true,
        orderTracking: true,
        promoRecommendation: true
      },
      // Dynamic Followups Array (Yêu cầu 3)
      followupList: [
        {
          id: 'fu-1',
          delayLabel: 'Mốc 1: Sau 15 phút im lặng',
          badgeText: 'Nhắc Size & Freeship',
          windowTag: 'Trong 24 giờ đầu',
          block: 'Nhắc Chọn Size & Tặng Mã Freeship 25k',
          message: 'Dạ shop thấy bạn đang quan tâm mẫu áo polo, shop tặng bạn mã FREESHIP25K áp dụng ngay hôm nay nha!'
        },
        {
          id: 'fu-2',
          delayLabel: 'Mốc 2: Sau 2 giờ im lặng',
          badgeText: 'Gửi ảnh khách mặc',
          windowTag: 'Trong 24 giờ đầu',
          block: 'Gửi Ảnh Khách Mặc & Mẫu Bán Chạy',
          message: 'Mẫu này đang là sản phẩm bán chạy nhất tuần này ạ! Shop gửi bạn thêm ảnh khách mặc thực tế để bạn tham khảo nhé.'
        },
        {
          id: 'fu-3',
          delayLabel: 'Mốc 3: Sau 22 giờ',
          badgeText: 'Cảnh báo hết hạn',
          windowTag: 'Trước khi hết 24h',
          block: 'Nhắc Ưu Đãi Sắp Hết Hạn Trong Ngày',
          message: 'Ưu đãi freeship của bạn sắp hết hạn trong 2 tiếng nữa. Bạn có muốn shop giữ hàng cho bạn không ạ?'
        },
        {
          id: 'fu-4',
          delayLabel: 'Mốc 4: Sau 24 giờ (Gửi tin tiếp thị)',
          badgeText: 'Tiếp thị lại',
          windowTag: 'Kênh Facebook Marketing',
          block: 'Gửi Thông Báo Bộ Sưu Tập Mới & Giảm 15%',
          message: 'Shop vừa ra mắt Bộ Sưu Tập Mùa Hè mới cực đẹp và tặng riêng bạn ưu đãi 15%!'
        }
      ],
      gamification: {
        enabled: true,
        gameType: 'lucky_wheel',
        gameName: 'Vòng Quay May Mắn Trúng Áo 0đ',
        reward: 'Mã giảm 15% hoặc Áo thun 0đ',
        block: 'Vòng Quay May Mắn Trúng Áo 0đ'
      },
      handover: {
        onLead: 'Gắn nhãn [Khách Tiềm Năng] + Báo ngay cho nhân viên bán hàng',
        onOrder: 'Tự động tạo đơn hàng trên phần mềm Smax POS và gửi mã QR thanh toán',
        onHuman: 'Chuyển cuộc trò chuyện cho nhân viên trực fanpage',
        autoResumeMinutes: 5
      },
      // Kịch bản Webview Xác nhận đơn (Bước 7)
      webviewOrder: {
        enabled: true,
        type: 'review_order', // 'review_order' or 'order_tracking'
        platform: 'haravan',
        orderAttribute: 'order_code',
        showButton: true,
        sendDataset: false,
        sendBlockOnSelect: false,
        setAttributeOnSelect: false
      },
      // Đồng bộ Tín hiệu Meta CAPI / Dataset (Bước 7)
      metaCapi: {
        enabled: true,
        datasetId: 'dataset_main',
        triggerMode: 'auto_realtime',
        events: {
          lead: true,
          purchase: true
        }
      },
      // Phân tích Lead Insight 6 Chiều (Bước 7)
      aiInsight: {
        enabled: true,
        leadScoring: true,
        interestedProducts: true,
        specificNeeds: true,
        objections: true,
        objectionHandling: true,
        storageTarget: 'smax_tables_and_crm'
      },
      // Cài đặt Đối tượng & Lên lịch phản hồi (Bước 8)
      audienceSettings: {
        target: 'ad_clickers', // 'all', 'first_time', 'ad_clickers', 'team_only'
        adCampaign: 'all_click_to_messenger'
      },
      scheduleSettings: {
        mode: 'always', // 'always', 'custom'
        activeDays: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ Nhật'],
        startTime: '08:00',
        endTime: '22:00'
      }
    };

    this.init();
  }

  init() {
    this.renderAgentsGrid();
    this.renderTableRows();
    this.applyPreset('fashion');

    this.bindDashboardEvents();
    this.bindNavigationEvents();
    this.bindPresetCards();
    this.bindStep1ChannelEvents();
    this.bindStep2Inputs();
    this.bindStep3Inputs();
    this.bindStep4KnowledgeInputs();
    this.bindStep5SkillsInputs();
    this.bindStep6FollowupInputs();
    this.bindStep7SpecialInputs();
    this.bindStep8Playground();
    this.bindModalEvents();
    this.bindGlobalClick();
  }

  bindGlobalClick() {
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.smax-block-picker-wrapper')) {
        this.closeAllBlockDropdowns();
      }
    });
  }

  // --- Modal Popup Management ---
  openWizardModal() {
    const backdrop = document.getElementById('wizardModalBackdrop');
    if (backdrop) {
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeWizard() {
    const backdrop = document.getElementById('wizardModalBackdrop');
    if (backdrop) {
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
    this.renderAgentsGrid();
    this.renderTableRows();
  }

  openCreateWizard() {
    this.editingAgentId = null;
    this.state.channel.connected = false;
    this.applyIndustryPreset('fashion');
    const titleEl = document.getElementById('wizardModeTitle');
    if (titleEl) {
      titleEl.innerText = 'Tạo Mới Meta Business Agent';
    }

    // Ensure correct stepper visible
    const stepperAdvance = document.getElementById('stepperAdvance');
    const stepperStandard = document.getElementById('stepperStandard');
    if (stepperAdvance) stepperAdvance.style.display = this.systemVersion === 'advance' ? 'grid' : 'none';
    if (stepperStandard) stepperStandard.style.display = this.systemVersion === 'standard' ? 'grid' : 'none';

    this.renderStep1ChannelView();
    this.goToStep(1);
    this.openWizardModal();
  }

  openEditWizard(agentId) {
    const agent = this.agentsList.find(a => a.id === agentId);
    if (!agent) return;

    this.editingAgentId = agentId;
    this.state.channel.connected = true;
    this.state.channel.name = agent.subName.split('•')[1]?.trim() || 'Cửa hàng Thời trang Smax Flagship';
    this.applyIndustryPreset(agent.preset || 'fashion');
    this.state.persona.agentName = agent.name;
    const nameInput = document.getElementById('inputAgentName');
    if (nameInput) nameInput.value = agent.name;

    const titleEl = document.getElementById('wizardModeTitle');
    if (titleEl) {
      const modeSuffix = '';
      titleEl.innerText = `Chỉnh Sửa: ${agent.name}`;
    }

    const stepperAdvance = document.getElementById('stepperAdvance');
    const stepperStandard = document.getElementById('stepperStandard');
    if (stepperAdvance) stepperAdvance.style.display = this.systemVersion === 'advance' ? 'grid' : 'none';
    if (stepperStandard) stepperStandard.style.display = this.systemVersion === 'standard' ? 'grid' : 'none';

    this.renderStep1ChannelView();
    this.goToStep(1);
    this.openWizardModal();
  }

  deleteAgent(agentId) {
    const agent = this.agentsList.find(a => a.id === agentId);
    if (!agent) return;

    if (confirm(`Bạn có chắc chắn muốn xóa: "${agent.name}"?`)) {
      this.agentsList = this.agentsList.filter(a => a.id !== agentId);
      this.renderTableRows();
    }
  }

  bindDashboardEvents() {
    document.getElementById('btnCreateNewAgent')?.addEventListener('click', () => this.openCreateWizard());
    document.getElementById('btnCloseWizardModal')?.addEventListener('click', () => this.closeWizard());
    document.getElementById('btnCancelWizard')?.addEventListener('click', () => this.closeWizard());

    const backdrop = document.getElementById('wizardModalBackdrop');
    backdrop?.addEventListener('click', (e) => {
      if (e.target === backdrop) this.closeWizard();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeWizard();
        this.closeSyncModal();
        this.closeMindmapModal();
        this.closePageSelectModal();
      }
    });

    const searchInput = document.getElementById('agentSearchInput');
    searchInput?.addEventListener('input', (e) => {
      this.filterTable(e.target.value);
    });
  }

  // --- MODULE SWITCHER (META BUSINESS AGENT VS QUICK SETUP) ---
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

  // --- MODULE SWITCHER (META BUSINESS AGENT VS QUICK SETUP) ---
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
    this.currentView = viewId;
    
    // Toggle active on view sections
    document.querySelectorAll('.smax-view-section').forEach(sec => {
      sec.classList.remove('active');
    });
    const targetSection = document.getElementById(viewId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Toggle active on sidebar menu items
    document.querySelectorAll('.smax-sidebar-item').forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('data-view') === viewId) {
        item.classList.add('active');
      }
    });

    // Initialize specific view charts if needed
    if (viewId === 'aiLogView' && window.tabsApp) {
      setTimeout(() => window.tabsApp.initTab2Chart(), 60);
    } else if (viewId === 'analyticsReportsView' && window.tabsApp) {
      setTimeout(() => window.tabsApp.initTab4Charts(), 60);
    } else if (viewId === 'leadsManagementView' && window.tabsApp) {
      setTimeout(() => window.tabsApp.initTab5Chart(), 60);
    } else if (viewId === 'ordersManagementView' && window.tabsApp) {
      setTimeout(() => window.tabsApp.initTab6Chart(), 60);
    }
  }

  // --- TOPBAR: SYSTEM VERSION SWITCHER (STANDARD VS ADVANCE) ---
  setSystemVersion(version) {
    this.switchModule('metaAgent');
    this.systemVersion = version; // 'standard' | 'advance'
    this.totalSteps = version === 'standard' ? 6 : 8;

    // 1. Update Topbar Active Links
    const linkStandard = document.getElementById('topMenuMetaStandard');
    const linkAdvance = document.getElementById('topMenuMetaAdvance');
    if (linkStandard) linkStandard.classList.toggle('active', version === 'standard');
    if (linkAdvance) linkAdvance.classList.toggle('active', version === 'advance');

    // 2. Update Sidebar & Pane Titles
    const sidebarTitle = document.querySelector('.smax-sidebar-title');
    const paneTitle = document.querySelector('.smax-pane-title');
    const wizardSubTitle = document.getElementById('wizardModeSubTitle');

    const versionLabel = version === 'standard' ? 'Meta Business Agent Standard' : 'Meta Business Agent Advance';
    if (sidebarTitle) sidebarTitle.innerText = versionLabel;
    if (paneTitle) paneTitle.innerText = versionLabel;
    if (wizardSubTitle) {
      wizardSubTitle.innerText = version === 'standard' 
        ? 'Thiết lập trợ lý AI tinh gọn chuẩn Meta (6 bước đơn giản, nhanh chóng)'
        : 'Thiết lập trợ lý AI tiếp đón và tự động hóa quy trình bán hàng trên Facebook & WhatsApp';
    }

    // 3. Switch Stepper Layouts
    const stepperAdvance = document.getElementById('stepperAdvance');
    const stepperStandard = document.getElementById('stepperStandard');
    if (stepperAdvance) stepperAdvance.style.display = version === 'advance' ? 'grid' : 'none';
    if (stepperStandard) stepperStandard.style.display = version === 'standard' ? 'grid' : 'none';

    // 4. Toast Notification
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(`Đã chuyển sang ${versionLabel} (${version === 'standard' ? '6 bước tinh gọn' : '8 bước nâng cao'})`);
    }

    // 5. Re-render views
    this.renderAgentsGrid();
    this.renderTableRows();
  }

  // --- DASHBOARD: VIEW SWITCHER & FILTERING ---
  switchDashboardViewMode(mode) {
    this.dashboardViewMode = mode;
    const btnGrid = document.getElementById('btnViewModeGrid');
    const btnTable = document.getElementById('btnViewModeTable');
    const gridContainer = document.getElementById('agentsGridContainer');
    const tableContainer = document.getElementById('agentsTableContainer');

    if (btnGrid) btnGrid.classList.toggle('active', mode === 'grid');
    if (btnTable) btnTable.classList.toggle('active', mode === 'table');

    if (gridContainer) gridContainer.style.display = mode === 'grid' ? 'grid' : 'none';
    if (tableContainer) tableContainer.style.display = mode === 'table' ? 'block' : 'none';
  }

  filterAgentsByChannel(filter) {
    this.currentChannelFilter = filter;
    
    // Update active pill UI
    document.querySelectorAll('.smax-filter-pill[data-agent-filter]').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-agent-filter') === filter);
    });

    const searchQ = (document.getElementById('agentSearchInput')?.value || '').toLowerCase().trim();
    this.applyAgentFilters(searchQ, filter);
  }

  filterTable(query) {
    const q = query.toLowerCase().trim();
    this.applyAgentFilters(q, this.currentChannelFilter);
  }

  applyAgentFilters(query = '', channelFilter = 'all') {
    let filtered = this.agentsList.filter(agent => {
      // Channel / status filter
      if (channelFilter === 'active' && agent.status !== 'active') return false;
      if (channelFilter === 'facebook' && agent.channelType !== 'facebook') return false;
      if (channelFilter === 'whatsapp' && agent.channelType !== 'whatsapp') return false;

      // Text search
      if (query) {
        const matchName = agent.name.toLowerCase().includes(query);
        const matchSub = (agent.subName || '').toLowerCase().includes(query);
        const matchChannel = (agent.channelName || '').toLowerCase().includes(query);
        return matchName || matchSub || matchChannel;
      }
      return true;
    });

    this.renderAgentsGrid(filtered);
    this.renderTableRows(filtered);
  }

  renderAgentsGrid(dataToRender = null) {
    const container = document.getElementById('agentsGridContainer');
    if (!container) return;

    const list = dataToRender !== null ? dataToRender : this.agentsList;
    container.innerHTML = '';

    if (list.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; background: #fff; border: 1px solid #e8ecf2; border-radius: 16px; padding: 48px; text-align: center; color: #787b83;">
          <div style="font-size: 14px; font-weight: 600; color: #0f1835; margin-bottom: 4px;">Không tìm thấy trợ lý Meta Business Agent nào</div>
          <div style="font-size: 12.5px;">Vui lòng thử từ khóa khác hoặc bấm nút "+ Tạo mới Meta Business Agent" ở góc trên.</div>
        </div>
      `;
      return;
    }

    list.forEach(agent => {
      const card = document.createElement('div');
      card.className = 'smax-agent-bento-card';

      // Channel Tag
      let channelTagClass = agent.channelType || 'facebook';
      let channelTagText = agent.channelName || 'Facebook Fanpage';

      const isChecked = agent.status === 'active' ? 'checked' : '';
      const statusText = agent.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng';

      card.innerHTML = `
        <div>
          <!-- Header -->
          <div class="smax-bento-header">
            <div class="smax-bento-header-left">
              <div class="smax-bento-avatar" style="background: ${agent.badgeBg};">
                ${agent.badgeText}
              </div>
              <div>
                <div class="smax-bento-name">${agent.name}</div>
                <div class="smax-bento-tags">
                  <span class="smax-channel-tag ${channelTagClass}">${channelTagText}</span>
                  <span style="font-size: 11.5px; color: #787b83;">• ${agent.subName}</span>
                </div>
              </div>
            </div>
            <div class="smax-bento-status-wrap">
              <span class="smax-live-pulse-dot" style="background: ${agent.status === 'active' ? '#10b981' : '#94a3b8'};"></span>
              <label class="smax-switch" title="${statusText}">
                <input type="checkbox" ${isChecked} onchange="app.toggleAgentStatus('${agent.id}', this.checked)">
                <span class="smax-switch-slider"></span>
              </label>
            </div>
          </div>

          <!-- 2x2 Metrics Grid -->
          <div class="smax-bento-metrics-grid">
            <!-- Metric 1: Total Conversations -->
            <div class="smax-bento-metric-box">
              <div class="smax-bento-metric-label">Hội thoại với AI</div>
              <div class="smax-bento-metric-val" style="color: #1877f2;">
                <span>${agent.totalAiConvs}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div class="smax-bento-metric-sub">Tự động 24/7</div>
            </div>

            <!-- Metric 2: Completion Rate -->
            <div class="smax-bento-metric-box">
              <div class="smax-bento-metric-label">Tỷ lệ hoàn thành</div>
              <div class="smax-bento-metric-val" style="color: #10b981;">
                <span>${agent.completionRate}</span>
                <span style="font-size: 11.5px; font-weight: 600; color: #10b981;">↗ Tốt</span>
              </div>
              <div class="smax-progress-bar-wrap">
                <div class="smax-progress-bar-fill" style="width: ${agent.completionPercent || 89}%; background: #10b981;"></div>
              </div>
              <div class="smax-bento-metric-sub">${agent.completionSub}</div>
            </div>

            <!-- Metric 3: Buyer Intent -->
            <div class="smax-bento-metric-box">
              <div class="smax-bento-metric-label">Leads Tiềm Năng</div>
              <div class="smax-bento-metric-val" style="color: #eb6553;">
                <span>${agent.buyerIntentCount}</span>
                <span style="font-size: 11px; color: #eb6553; font-weight: 700;">88/100</span>
              </div>
              <div class="smax-bento-metric-sub">${agent.buyerIntentSub}</div>
            </div>

            <!-- Metric 4: CSAT Rating -->
            <div class="smax-bento-metric-box">
              <div class="smax-bento-metric-label">Độ Hài Lòng (CSAT)</div>
              <div class="smax-bento-metric-val" style="color: #f59e0b;">
                <span>${agent.csat || '4.8'} / 5.0</span>
                <span style="color: #f59e0b; font-size: 13px;">★★★★★</span>
              </div>
              <div class="smax-bento-metric-sub">Đánh giá xuất sắc</div>
            </div>
          </div>

          <!-- Section: Nguồn Tri Thức Đã Nạp (RAG Grounding) -->
          <div class="smax-bento-section">
            <div class="smax-bento-section-header">
              <div class="smax-bento-section-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
                Nguồn Tri Thức Đã Nạp
              </div>
              <span style="font-size: 10.5px; color: #10b981; font-weight: 700;">● Live Sync</span>
            </div>
            <div class="smax-bento-capsules-wrap">
              ${(agent.knowledgeSources || ['Smax POS Live', 'Google Sheet']).map(k => `
                <span class="smax-bento-capsule knowledge" title="Đã nạp vào kho RAG grounding">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                  ${k}
                </span>
              `).join('')}
            </div>
          </div>

          <!-- Section: Kịch Bản & Tự Động Hóa (Active Automation) -->
          <div class="smax-bento-section" style="margin-bottom: 14px;">
            <div class="smax-bento-section-header">
              <div class="smax-bento-section-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                Kịch Bản & Tự Động Hóa
              </div>
              <span style="font-size: 10.5px; color: #eb6553; font-weight: 700;">● ${agent.activeWorkflows ? agent.activeWorkflows.length : 4} Luồng Chạy</span>
            </div>
            <div class="smax-bento-capsules-wrap">
              ${(agent.activeWorkflows || ['Kịch bản bám đuổi', 'Webview Đơn hàng']).map(w => `
                <span class="smax-bento-capsule workflow" title="Kịch bản tự động đang kích hoạt">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ${w}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Footer Action Bar -->
        <div class="smax-bento-footer">
          <button class="smax-btn-test-chat" onclick="app.openQuickChatDrawer('${agent.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Chat Thử
          </button>

          <div class="smax-bento-actions-right">
            <button class="smax-action-icon-btn" title="Xem Thống Kê & Báo Cáo" onclick="app.switchView('analyticsReportsView')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </button>
            <button class="smax-action-icon-btn" title="Chỉnh sửa cấu hình" onclick="app.openEditWizard('${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="smax-action-icon-btn btn-delete" title="Xóa trợ lý" onclick="app.deleteAgent('${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  renderTableRows(dataToRender = null) {
    const tbody = document.getElementById('agentTableBody');
    if (!tbody) return;

    const list = dataToRender !== null ? dataToRender : this.agentsList;
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px; color: #787b83;">
            Không tìm thấy trợ lý Meta Business Agent nào.
          </td>
        </tr>
      `;
      return;
    }

    list.forEach((agent, idx) => {
      const tr = document.createElement('tr');
      const isChecked = agent.status === 'active' ? 'checked' : '';
      const channelTagClass = agent.channelType || 'facebook';

      tr.innerHTML = `
        <td style="font-weight: 500; text-align: center; color: #0a1317;">${idx + 1}</td>
        <td>
          <div class="smax-agent-title-cell">
            <div class="smax-agent-badge-icon" style="background: ${agent.badgeBg};">
              ${agent.badgeText}
            </div>
            <div>
              <div class="smax-agent-name-text">${agent.name}</div>
              <div style="font-size: 11.5px; color: #5d6c7b; margin-top: 2px; display: flex; align-items: center; gap: 6px;">
                <span class="smax-channel-tag ${channelTagClass}">${agent.channelName}</span>
              </div>
            </div>
          </div>
        </td>
        <td style="text-align: center;">
          <label class="smax-switch">
            <input type="checkbox" ${isChecked} onchange="app.toggleAgentStatus('${agent.id}', this.checked)">
            <span class="smax-switch-slider"></span>
          </label>
        </td>
        <td style="font-weight: 700; color: #1877f2; font-size: 13.5px;">${agent.totalAiConvs}</td>
        <td>
          <div style="display: flex; align-items: center; justify-content: space-between; font-weight: 700; color: #10b981; font-size: 13px;">
            <span>${agent.completionRate}</span>
            <span style="font-size: 11px; color: #64748b; font-weight: normal;">${agent.completionSub}</span>
          </div>
          <div class="smax-progress-bar-wrap">
            <div class="smax-progress-bar-fill" style="width: ${agent.completionPercent || 89}%; background: #10b981;"></div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #eb6553; font-size: 13.5px;">${agent.buyerIntentCount}</div>
          <div style="font-size: 11px; color: #787b83;">${agent.buyerIntentSub}</div>
        </td>
        <td style="font-size: 12px; color: #64748b; white-space: nowrap;">${agent.updatedAt}</td>
        <td>
          <div class="smax-creator-cell">
            <div style="width: 22px; height: 22px; border-radius: 50%; background: #0f1835; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">T</div>
            <span style="font-size: 12px; font-weight: 500; color: #1c1e21;">${agent.creator}</span>
          </div>
        </td>
        <td>
          <div class="smax-action-buttons">
            <button class="smax-table-action-btn btn-chat" title="Chat Thử" onclick="app.openQuickChatDrawer('${agent.id}')">
              Chat
            </button>
            <button class="smax-action-icon-btn" title="Chỉnh sửa" onclick="app.openEditWizard('${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="smax-action-icon-btn btn-delete" title="Xóa" onclick="app.deleteAgent('${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  toggleAgentStatus(agentId, isChecked) {
    const agent = this.agentsList.find(a => a.id === agentId);
    if (!agent) return;
    agent.status = isChecked ? 'active' : 'paused';
    
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(`Đã ${isChecked ? 'kích hoạt' : 'tạm dừng'} ${agent.name}!`);
    }

    // Refresh both views
    this.renderAgentsGrid();
    this.renderTableRows();
  }

  // --- QUICK TEST CHAT DRAWER FOR LIVE AGENT TESTING ---
  openQuickChatDrawer(agentId) {
    const agent = this.agentsList.find(a => a.id === agentId);
    if (!agent) return;

    this.activeQuickChatAgent = agent;
    const drawer = document.getElementById('quickChatDrawer');
    const backdrop = document.getElementById('quickChatDrawerBackdrop');
    const avatarEl = document.getElementById('quickChatAvatar');
    const nameEl = document.getElementById('quickChatAgentName');
    const channelEl = document.getElementById('quickChatChannelTag');
    const messagesEl = document.getElementById('quickChatMessagesContainer');
    const icebreakersEl = document.getElementById('quickChatIcebreakers');
    const inputEl = document.getElementById('quickChatInput');

    if (avatarEl) {
      avatarEl.style.background = agent.badgeBg;
      avatarEl.innerText = agent.badgeText;
    }
    if (nameEl) nameEl.innerText = agent.name;
    if (channelEl) channelEl.innerText = agent.channelName;

    // Load initial greeting
    if (messagesEl) {
      messagesEl.innerHTML = `
        <div style="align-self: flex-start; max-width: 85%; background: #ffffff; border: 1px solid #e8ecf2; border-radius: 14px 14px 14px 2px; padding: 12px 16px; font-size: 13px; color: #0f1835; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
          <div style="font-weight: 700; font-size: 11.5px; color: #eb6553; margin-bottom: 4px;">${agent.name}</div>
          Chào bạn! Mình là Trợ lý AI sẵn sàng hỗ trợ tư vấn và đặt hàng cho bạn 24/7. Bạn đang quan tâm đến sản phẩm hoặc dịch vụ nào của bên mình ạ?
        </div>
      `;
    }

    // Render Icebreakers
    if (icebreakersEl) {
      icebreakersEl.innerHTML = '';
      (agent.icebreakers || ['Bảng giá mới nhất', 'Tư vấn sản phẩm', 'Chính sách bảo hành']).forEach(text => {
        const chip = document.createElement('button');
        chip.className = 'smax-btn-pill-secondary';
        chip.style.cssText = 'padding: 4px 10px; font-size: 11.5px; border-radius: 100px; cursor: pointer;';
        chip.innerText = text;
        chip.onclick = () => this.sendQuickChatMessage(text);
        icebreakersEl.appendChild(chip);
      });
    }

    if (drawer) drawer.classList.add('active');
    if (backdrop) backdrop.classList.add('active');
    if (inputEl) {
      inputEl.value = '';
      setTimeout(() => inputEl.focus(), 300);
    }
  }

  closeQuickChatDrawer() {
    const drawer = document.getElementById('quickChatDrawer');
    const backdrop = document.getElementById('quickChatDrawerBackdrop');
    if (drawer) drawer.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    this.activeQuickChatAgent = null;
  }

  sendQuickChatMessage(customMsg = null) {
    const inputEl = document.getElementById('quickChatInput');
    const messagesEl = document.getElementById('quickChatMessagesContainer');
    const text = customMsg || (inputEl?.value || '').trim();
    if (!text || !messagesEl) return;

    if (inputEl && !customMsg) inputEl.value = '';

    // Append User message
    const userBubble = document.createElement('div');
    userBubble.style.cssText = 'align-self: flex-end; max-width: 80%; background: #eb6553; color: #ffffff; border-radius: 14px 14px 2px 14px; padding: 10px 14px; font-size: 13px; font-weight: 500; box-shadow: 0 2px 6px rgba(235,101,83,0.25);';
    userBubble.innerText = text;
    messagesEl.appendChild(userBubble);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    // Simulate AI typing and response
    setTimeout(() => {
      const aiBubble = document.createElement('div');
      aiBubble.style.cssText = 'align-self: flex-start; max-width: 85%; background: #ffffff; border: 1px solid #e8ecf2; border-radius: 14px 14px 14px 2px; padding: 12px 16px; font-size: 13px; color: #0f1835; box-shadow: 0 2px 6px rgba(0,0,0,0.04);';
      
      const agent = this.activeQuickChatAgent;
      let reply = '';

      // Check if user query matches any Few-Shot trained override
      let trainedMatch = null;
      if (typeof tabsApp !== 'undefined' && tabsApp.responseCorrectionsList) {
        trainedMatch = tabsApp.responseCorrectionsList.find(c => 
          c.status === 'active' && 
          c.agentId === (agent?.id || 'agent-1') && 
          text.toLowerCase().includes(c.userQuery.toLowerCase().slice(0, 15))
        );
      }

      if (trainedMatch) {
        reply = trainedMatch.idealAnswer;
      } else if (text.toLowerCase().includes('size') || text.toLowerCase().includes('áo')) {
        reply = 'Dạ mẫu Áo polo nam classic cotton bên em có đủ size M (50-60kg), L (60-70kg), XL (70-80kg). Bạn cho mình xin chiều cao và cân nặng để mình chọn size vừa vặn nhất cho bạn nhé!';
      } else if (text.toLowerCase().includes('giá') || text.toLowerCase().includes('khuyến mãi') || text.toLowerCase().includes('freeship')) {
        reply = 'Dạ hiện tại shop đang có chương trình khuyến mãi tháng 8: Giảm ngay 15% cho đơn từ 2 sản phẩm và tặng mã Freeship 25k ạ!';
      } else if (text.toLowerCase().includes('da') || text.toLowerCase().includes('mụn') || text.toLowerCase().includes('serum')) {
        reply = 'Dạ Serum B5 phục hồi rau má 30ml bên em chiết xuất 100% tự nhiên, dịu nhẹ cho mọi loại da, đặc biệt là da dầu mụn và nhạy cảm. Giá ưu đãi hôm nay là 450.000₫/chai ạ!';
      } else {
        reply = `Dạ em đã ghi nhận thông tin về "${text}". Trợ lý AI ${agent ? agent.name : ''} đã đối chiếu tài liệu kho tri thức RAG và sẵn sàng hỗ trợ bạn ngay ạ! Bạn có cần em tạo đơn hàng hoặc gửi ảnh chi tiết không ạ?`;
      }

      const encodedQuery = encodeURIComponent(text);
      const encodedReply = encodeURIComponent(reply);
      const targetAgentId = agent?.id || 'agent-1';

      aiBubble.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-weight: 700; font-size: 11.5px; color: #eb6553;">${agent ? agent.name : 'Trợ lý AI'}</span>
          ${trainedMatch ? '<span style="font-size: 10px; font-weight: 700; color: #15803d; background: #dcfce7; padding: 1px 6px; border-radius: 100px;">✓ Câu đã huấn luyện</span>' : ''}
        </div>
        <div>${reply}</div>
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #e2e8f0; display: flex; justify-content: flex-end;">
          <button class="smax-btn-teach-chip" onclick="app.openQuickTeachFromDrawer('${encodedQuery}', '${encodedReply}', '${targetAgentId}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <span>Sửa câu này / Dạy AI</span>
          </button>
        </div>
      `;
      messagesEl.appendChild(aiBubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 450);
  }

  // --- TEACH AI FROM QUICK CHAT DRAWER & PLAYGROUND ---
  openQuickTeachFromDrawer(encodedQuery, encodedReply, agentId) {
    const query = decodeURIComponent(encodedQuery || '');
    const reply = decodeURIComponent(encodedReply || '');

    if (typeof tabsApp !== 'undefined') {
      tabsApp.openTeachAiModal(null, null);
      const selectAgent = document.getElementById('selectTeachAgent');
      const textareaQuery = document.getElementById('textareaTeachUserQuery');
      const displayWrong = document.getElementById('displayTeachWrongAnswer');
      const groupWrong = document.getElementById('teachWrongAnswerGroup');
      const textareaIdeal = document.getElementById('textareaTeachIdealAnswer');

      if (selectAgent) selectAgent.value = agentId || 'agent-1';
      if (textareaQuery) textareaQuery.value = query;
      if (displayWrong) displayWrong.innerText = reply;
      if (groupWrong) groupWrong.style.display = 'block';
      if (textareaIdeal) {
        textareaIdeal.value = reply;
        textareaIdeal.focus();
      }
    }
  }

  openQuickTeachFromPlayground(encodedQuery, encodedReply) {
    this.openQuickTeachFromDrawer(encodedQuery, encodedReply, 'agent-1');
  }

  // --- Step 1: Channel Connection Management (Image 1) ---
  bindStep1ChannelEvents() {
    document.getElementById('btnOpenConnectChannelModal')?.addEventListener('click', () => {
      this.openPageSelectModal();
    });
    document.getElementById('btnChangeConnectedChannel')?.addEventListener('click', () => {
      this.openPageSelectModal();
    });
    document.getElementById('btnClosePageSelectModal')?.addEventListener('click', () => {
      this.closePageSelectModal();
    });
  }

  renderStep1ChannelView() {
    const emptyBox = document.getElementById('boxEmptyChannel');
    const connectedBox = document.getElementById('boxConnectedChannel');
    const nameEl = document.getElementById('connectedChannelNameDisplay');
    const idEl = document.getElementById('connectedChannelIdDisplay');
    const iconEl = document.getElementById('connectedChannelIconDisplay');

    if (this.state.channel.connected) {
      if (emptyBox) emptyBox.style.display = 'none';
      if (connectedBox) connectedBox.style.display = 'block';
      if (nameEl) nameEl.innerText = this.state.channel.name;
      if (idEl) idEl.innerText = `Mã trang: ${this.state.channel.pageId}`;
      if (iconEl) {
        iconEl.innerText = this.state.channel.icon || 'f';
        iconEl.style.background = this.state.channel.color || '#0064e0';
      }
    } else {
      if (emptyBox) emptyBox.style.display = 'block';
      if (connectedBox) connectedBox.style.display = 'none';
    }
  }

  openPageSelectModal() {
    const modal = document.getElementById('pageSelectModal');
    const list = document.getElementById('pageSelectListContainer');
    if (!modal || !list) return;

    list.innerHTML = '';
    this.availablePages.forEach(p => {
      const item = document.createElement('div');
      item.className = 'smax-pos-item';
      item.onclick = () => this.selectPageToConnect(p);
      item.innerHTML = `
        <div class="smax-pos-item-left">
          <div class="smax-pos-logo" style="background: ${p.color};">${p.icon}</div>
          <div>
            <div class="smax-pos-name">${p.name}</div>
            <div style="font-size: 11.5px; color: #5d6c7b;">Mã trang: ${p.id}</div>
          </div>
        </div>
        <button class="smax-btn-pill-primary" style="padding: 6px 16px; font-size: 12px;">Ủy quyền</button>
      `;
      list.appendChild(item);
    });

    modal.classList.add('active');
  }

  closePageSelectModal() {
    document.getElementById('pageSelectModal')?.classList.remove('active');
  }

  selectPageToConnect(pageObj) {
    this.state.channel.connected = true;
    this.state.channel.name = pageObj.name;
    this.state.channel.pageId = pageObj.id;
    this.state.channel.icon = pageObj.icon;
    this.state.channel.color = pageObj.color;

    this.renderStep1ChannelView();
    this.closePageSelectModal();
  }

  // --- Preset Application ---
  applyPreset(presetKey) {
    const preset = window.INDUSTRY_PRESETS[presetKey];
    if (!preset) return;

    this.state.selectedPreset = presetKey;
    this.state.businessProfile = JSON.parse(JSON.stringify(preset.businessProfile || {}));
    this.state.persona = JSON.parse(JSON.stringify(preset.persona || {}));
    this.state.knowledge.urls = [...(preset.knowledge?.sampleUrls || [])];
    this.state.knowledge.sheets = JSON.parse(JSON.stringify(preset.knowledge?.sheets || []));
    this.state.knowledge.driveFolders = JSON.parse(JSON.stringify(preset.knowledge?.driveFolders || []));
    this.state.knowledge.shopeeLinks = JSON.parse(JSON.stringify(preset.knowledge?.shopeeLinks || []));
    this.state.knowledge.faqs = [...(preset.knowledge?.faqs || [])];
    this.state.skills = { ...preset.skills };
    this.state.gamification = JSON.parse(JSON.stringify(preset.gamification || {}));
    this.state.handover = JSON.parse(JSON.stringify(preset.handover || {}));

    // BƯỚC 6: Tự động đồng bộ Kịch bản bám đuổi theo Template ngành hàng đã chọn ở Bước 2
    if (preset.followups) {
      const fu = preset.followups;
      this.state.followupList = [
        {
          id: 'fu-1',
          delayLabel: 'Mốc 1: Sau 15 phút im lặng',
          badgeText: fu.step1?.label || '15 phút',
          windowTag: 'Trong 24 giờ đầu',
          block: fu.step1?.block || 'Gửi ưu đãi 15 phút',
          message: fu.step1?.message || ''
        },
        {
          id: 'fu-2',
          delayLabel: 'Mốc 2: Sau 2 giờ im lặng',
          badgeText: fu.step2?.label || '2 giờ',
          windowTag: 'Trong 24 giờ đầu',
          block: fu.step2?.block || 'Gửi thông tin hình ảnh & feedback',
          message: fu.step2?.message || ''
        },
        {
          id: 'fu-3',
          delayLabel: 'Mốc 3: Sau 22 giờ',
          badgeText: fu.step3?.label || '22 giờ',
          windowTag: 'Trước khi hết 24h',
          block: fu.step3?.block || 'Nhắc ưu đãi sắp hết hạn trong ngày',
          message: fu.step3?.message || ''
        },
        {
          id: 'fu-4',
          delayLabel: 'Mốc 4: Sau 24 giờ (Gửi tin tiếp thị)',
          badgeText: fu.outside24h?.label || 'Sau 24 giờ',
          windowTag: fu.outside24h?.channel === 'facebook_message' ? 'Kênh Facebook Marketing' : 'Tin nhắn tiếp thị',
          block: fu.outside24h?.block || 'Gửi thông báo chương trình mới',
          message: fu.outside24h?.message || (fu.outside24h?.topic ? `Gửi thông báo ưu đãi: ${fu.outside24h.topic}` : 'Thông báo chương trình mới')
        }
      ];
    }

    // BƯỚC 7: Cập nhật danh sách Block Automation tương ứng ngành hàng
    const dynamicBlocks = new Set([
      this.state.handover.onLead,
      this.state.handover.onOrder,
      this.state.handover.onHuman,
      preset.followups?.step1?.block,
      preset.followups?.step2?.block,
      preset.followups?.step3?.block,
      preset.followups?.outside24h?.block,
      'Gắn nhãn [Khách Tiềm Năng] + Báo ngay cho nhân viên bán hàng',
      'Tự động tạo đơn hàng trên phần mềm Smax POS và gửi mã QR thanh toán',
      'Chuyển cuộc trò chuyện cho nhân viên trực fanpage',
      'Messenger Shipping',
      'Create Image',
      'Messenger User Input',
      'Đồng bộ dataset'
    ].filter(Boolean));
    this.smaxBlocks = Array.from(dynamicBlocks);

    // Cập nhật Live Previews (Webview & AI Insight) theo Template
    this.updateIndustryLivePreviews(presetKey);

    this.populateAllSteps();

    document.querySelectorAll('.smax-preset-card').forEach(card => {
      card.classList.toggle('active', card.dataset.preset === presetKey);
    });
  }

  updateIndustryLivePreviews(presetKey) {
    const previewData = {
      fashion: {
        customer: { name: 'Lê Văn An', phone: '0987654321', address: 'Số 01, phường Trần Hưng Đạo, quận Hoàn Kiếm, TP. Hà Nội' },
        products: [
          { name: 'Áo polo nam', variant: 'Size: L', qty: 'x1', price: '250.000 đ' },
          { name: 'Áo khoác nam', variant: 'Size: XL', qty: 'x1', price: '350.000 đ' }
        ],
        insight: {
          scoreText: '88/100 (Hot Lead)',
          product: 'Áo Polo Nam Oxford (Size L - Trắng)',
          needs: 'Cần nhận gấp trước thứ 6 đi công tác, yêu cầu form ôm vừa vặn',
          objection: 'Chê phí ship 35.000đ hơi cao so với sàn',
          script: '"Dạ riêng hôm nay shop hỗ trợ mã Freeship 0đ cho anh An và cam kết đổi size miễn phí tận nhà ạ!"'
        }
      },
      cosmetics: {
        customer: { name: 'Nguyễn Thu Hà', phone: '0912345678', address: '120 Hai Bà Trưng, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh' },
        products: [
          { name: 'Serum B5 Phục Hồi Rau Má (30ml)', variant: 'Dung tích: 30ml', qty: 'x1', price: '450.000 đ' },
          { name: 'Kem Chống Nắng Phổ Rộng SPF50+', variant: 'Tuýp: 50ml', qty: 'x1', price: '320.000 đ' }
        ],
        insight: {
          scoreText: '92/100 (Hot Lead)',
          product: 'Bộ Combo Serum Trị Mụn & Phục Hồi B5 Smax Beauty',
          needs: 'Da dầu mụn ẩn, nhạy cảm, cần liệu trình lành tính không kích ứng',
          objection: 'Phân vân sợ bị đẩy mụn nhiều hoặc bong tróc da',
          script: '"Dạ sản phẩm cam kết hoàn tiền 100% nếu kích ứng trong 7 ngày và có bác sĩ đồng hành 1:1 suốt liệu trình ạ!"'
        }
      },
      fnb: {
        customer: { name: 'Trần Hoàng Long', phone: '0938123456', address: 'Tòa nhà Landmark 81, P. 22, Q. Bình Thạnh, TP. Hồ Chí Minh' },
        products: [
          { name: 'Trà Sữa Trân Châu Hoàng Kim', variant: 'Size L - 50% Đường, 70% Đá', qty: 'x2', price: '110.000 đ' },
          { name: 'Bánh Mì Nướng Phô Mai Chảy', variant: 'Nóng giòn', qty: 'x1', price: '45.000 đ' }
        ],
        insight: {
          scoreText: '85/100 (Hot Lead)',
          product: 'Combo 4 Ly Trà Sữa Nướng Full Topping + 2 Bánh Phô Mai',
          needs: 'Giao gấp trước 15:30 cho buổi họp phòng Marketing 8 người',
          objection: 'Hỏi có được giảm giá thêm khi đặt từ 4 ly trở lên không',
          script: '"Dạ quán hỗ trợ miễn phí ship toàn bộ và tặng thêm 1 phần trân châu hoàng kim cho đơn của bạn ngay nhé!"'
        }
      },
      real_estate: {
        customer: { name: 'Phạm Minh Tuấn', phone: '0909888999', address: 'Khu Đô Thị Sala, P. An Lợi Đông, TP. Thủ Đức' },
        products: [
          { name: 'Phiếu Giữ Chỗ Căn Hộ 2PN #A18-06', variant: 'Tầng 18 View Sông Smax Land', qty: 'x1', price: '50.000.000 đ' }
        ],
        insight: {
          scoreText: '95/100 (VIP Lead)',
          product: 'Căn hộ 2PN 72m2 Tầng 18 View Sông Smax Land',
          needs: 'Mua đầu tư lâu dài, tài chính sẵn 1.5 tỷ, cần gói vay 0% lãi suất 24 tháng',
          objection: 'Lăn tăn về thời hạn bàn giao sổ hồng và tiến độ thi công',
          script: '"Dạ dự án đã cất nóc vượt tiến độ 2 tháng và Vietcombank bảo lãnh 100% hợp đồng mua bán ạ!"'
        }
      },
      spa_clinic: {
        customer: { name: 'Đặng Mỹ Linh', phone: '0977665544', address: '45 Lê Duẩn, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh' },
        products: [
          { name: 'Phiếu Đặt Hẹn Liệu Trình Hifu Gold', variant: 'Gói Trẻ Hóa VIP 2026', qty: 'x1', price: '1.500.000 đ' }
        ],
        insight: {
          scoreText: '90/100 (Hot Lead)',
          product: 'Liệu Trình Nâng Cơ Trẻ Hóa Da Hifu Gold 2026',
          needs: 'Xóa nếp nhăn đuôi mắt và rãnh cười trước đám cưới em gái tuần sau',
          objection: 'Sợ đau và lo phải kiêng cữ nghỉ dưỡng nhiều ngày',
          script: '"Dạ công nghệ sóng siêu âm vi điểm hoàn toàn êm ái, làm xong da căng bóng đi tiệc ngay không cần nghỉ dưỡng ạ!"'
        }
      }
    };

    const data = previewData[presetKey] || previewData.fashion;

    // Update Webview Customer
    const elCustName = document.getElementById('webviewCustomerName');
    const elCustPhone = document.getElementById('webviewCustomerPhone');
    const elCustAddr = document.getElementById('webviewCustomerAddress');
    if (elCustName) elCustName.innerText = data.customer.name;
    if (elCustPhone) elCustPhone.innerText = data.customer.phone;
    if (elCustAddr) elCustAddr.innerText = data.customer.address;

    // Update Webview Products
    const prodListEl = document.getElementById('webviewProductsList');
    if (prodListEl) {
      prodListEl.innerHTML = data.products.map(p => `
        <div class="smax-webview-item-card">
          <div class="smax-webview-item-left">
            <div class="smax-webview-thumb">${p.icon}</div>
            <div>
              <strong style="font-size: 12px; color: #0a1317;">${p.name}</strong>
              <div style="font-size: 11px; color: #5d6c7b;">${p.variant}</div>
            </div>
          </div>
          <div style="text-align: right;">
            <div style="font-size: 11px; color: #5d6c7b;">${p.qty}</div>
            <strong style="font-size: 12px; color: #eb6553;">${p.price}</strong>
          </div>
        </div>
      `).join('');
    }

    // Update Lead Insight Card
    const insightCard = document.getElementById('previewLeadInsightCard');
    if (insightCard) {
      insightCard.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid #334155; padding-bottom: 10px; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <strong style="font-size: 13px; font-family: var(--font-heading); color: #f8fafc;">Live AI Lead Insight</strong>
          </div>
          <span style="background: #10b981; color: #ffffff; font-size: 10.5px; font-weight: 700; padding: 2px 8px; border-radius: 100px;">
            ${data.insight.scoreText}
          </span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px; font-size: 12px;">
          <div style="background: #1e293b; padding: 8px 10px; border-radius: 8px;">
            <div style="color: #94a3b8; font-size: 10.5px; text-transform: uppercase;">Sản phẩm quan tâm:</div>
            <strong style="color: #38bdf8;">${data.insight.product}</strong>
          </div>

          <div style="background: #1e293b; padding: 8px 10px; border-radius: 8px;">
            <div style="color: #94a3b8; font-size: 10.5px; text-transform: uppercase;">Nhu cầu cụ thể:</div>
            <span style="color: #e2e8f0;">${data.insight.needs}</span>
          </div>

          <div style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); padding: 8px 10px; border-radius: 8px;">
            <div style="color: #fca5a5; font-size: 10.5px; text-transform: uppercase;">Lý do từ chối / Đắn đo:</div>
            <span style="color: #fecaca; font-weight: 500;">${data.insight.objection}</span>
          </div>

          <div style="background: rgba(235, 101, 83, 0.2); border: 1px solid #eb6553; padding: 8px 10px; border-radius: 8px;">
            <div style="color: #fed7aa; font-size: 10.5px; text-transform: uppercase;">Đề xuất xử lý từ chối:</div>
            <span style="color: #ffffff; font-weight: 600;">${data.insight.script}</span>
          </div>
        </div>
      `;
    }
  }

  populateAllSteps() {
    const bp = this.state.businessProfile;
    const p = this.state.persona;

    this.renderStep1ChannelView();

    // Step 2: Tính cách AI
    const elBizName = document.getElementById('inputBusinessName');
    const elCat = document.getElementById('inputCategory');
    const elBio = document.getElementById('textareaBusinessBio');
    const elAgentName = document.getElementById('inputAgentName');
    const elRoleTitle = document.getElementById('inputRoleTitle');
    const elTone = document.getElementById('selectTone');
    const elGreeting = document.getElementById('selectGreeting');
    const elWelcome = document.getElementById('textareaWelcomeMsg');
    const chkAutoTrans = document.getElementById('chkAutoTranslate');

    if (elBizName) elBizName.value = bp.businessName || '';
    if (elCat) elCat.value = bp.category || '';
    if (elBio) elBio.value = bp.businessBio || '';
    if (elAgentName) elAgentName.value = p.agentName || '';
    if (elRoleTitle) elRoleTitle.value = p.roleTitle || '';
    if (elTone) elTone.value = p.tone || 'friendly_trendy';
    if (elGreeting) elGreeting.value = p.greetingStyle || 'shop_ban';
    if (elWelcome) elWelcome.value = p.firstContact?.welcomeMessage || '';
    if (chkAutoTrans) chkAutoTrans.checked = p.autoTranslate !== false;

    this.renderIcebreakers();

    // Step 3: Guardrails
    this.renderDos();
    this.renderDonts();
    const elMaxDisc = document.getElementById('inputMaxDiscount');
    const elCompPolicy = document.getElementById('inputCompetitorPolicy');
    const elSystemPrompt = document.getElementById('textareaSystemPrompt');

    if (elMaxDisc) elMaxDisc.value = p.guardrails?.maxDiscountPercent || 20;
    if (elCompPolicy) elCompPolicy.value = p.guardrails?.competitorPolicy || '';
    if (elSystemPrompt) elSystemPrompt.value = p.guardrails?.systemPrompt || '';

    // Step 4: Knowledge
    this.renderKnowledgeSources();
    this.renderFaqs();

    // Step 5: Skills
    this.renderSkillsToggles();

    // Step 6: Follow-up Timeline
    this.renderFollowupsTimeline();

    // Step 7: Special UI & Block Pickers
    this.renderSpecialUI();

    // Step 8: Playground Chips
    this.renderPlaygroundChips();
  }

  // --- Step 2: Icebreakers ---
  renderIcebreakers() {
    const container = document.getElementById('icebreakerListContainer');
    if (!container) return;

    container.innerHTML = '';
    const icebreakers = this.state.persona.firstContact?.icebreakers || [];
    icebreakers.forEach((ib, idx) => {
      const item = document.createElement('div');
      item.className = 'smax-icebreaker-item';
      item.innerHTML = `
        <span>${ib.text}</span>
        <span class="remove-btn" onclick="app.removeIcebreaker(${idx})">&times;</span>
      `;
      container.appendChild(item);
    });
  }

  addIcebreaker() {
    const input = document.getElementById('inputNewIcebreaker');
    if (!input || !input.value.trim()) return;
    if (!this.state.persona.firstContact.icebreakers) this.state.persona.firstContact.icebreakers = [];
    this.state.persona.firstContact.icebreakers.push({
      text: input.value.trim(),
      payload: `ICEBREAKER_${Date.now()}`
    });
    input.value = '';
    this.renderIcebreakers();
    this.renderPlaygroundChips();
  }

  removeIcebreaker(index) {
    this.state.persona.firstContact.icebreakers.splice(index, 1);
    this.renderIcebreakers();
    this.renderPlaygroundChips();
  }

  // --- Step 3: Dos & Donts ---
  renderDos() {
    const container = document.getElementById('dosContainer');
    if (!container) return;

    container.innerHTML = '';
    const dos = this.state.persona.guardrails?.dos || [];
    dos.forEach((itemText, idx) => {
      const pill = document.createElement('div');
      pill.className = 'smax-guardrail-pill';
      pill.innerHTML = `
        <span style="color: #198754; font-weight: 600;">${itemText}</span>
        <span class="remove-btn" onclick="app.removeDo(${idx})">&times;</span>
      `;
      container.appendChild(pill);
    });
  }

  addDo() {
    const input = document.getElementById('inputNewDo');
    if (!input || !input.value.trim()) return;
    if (!this.state.persona.guardrails.dos) this.state.persona.guardrails.dos = [];
    this.state.persona.guardrails.dos.push(input.value.trim());
    input.value = '';
    this.renderDos();
  }

  removeDo(index) {
    this.state.persona.guardrails.dos.splice(index, 1);
    this.renderDos();
  }

  renderDonts() {
    const container = document.getElementById('dontsContainer');
    if (!container) return;

    container.innerHTML = '';
    const donts = this.state.persona.guardrails?.donts || [];
    donts.forEach((itemText, idx) => {
      const pill = document.createElement('div');
      pill.className = 'smax-guardrail-pill';
      pill.style.borderColor = '#fca5a5';
      pill.innerHTML = `
        <span style="color: #991b1b; font-weight: 600;">${itemText}</span>
        <span class="remove-btn" onclick="app.removeDont(${idx})">&times;</span>
      `;
      container.appendChild(pill);
    });
  }

  addDont() {
    const input = document.getElementById('inputNewDont');
    if (!input || !input.value.trim()) return;
    if (!this.state.persona.guardrails.donts) this.state.persona.guardrails.donts = [];
    this.state.persona.guardrails.donts.push(input.value.trim());
    input.value = '';
    this.renderDonts();
  }

  removeDont(index) {
    this.state.persona.guardrails.donts.splice(index, 1);
    this.renderDonts();
  }

  // --- Step 4: Knowledge Hub (Accordion Toggles & POS Platforms) ---
  toggleKbSource(sourceKey) {
    const chk = document.getElementById(`chkToggle${sourceKey}`);
    if (chk) {
      chk.checked = !chk.checked;
      this.updateKbSourceDisplay(sourceKey, chk.checked);
    }
  }

  updateKbSourceDisplay(sourceKey, isChecked) {
    const content = document.getElementById(`contentSource${sourceKey}`);
    const box = document.getElementById(`boxSource${sourceKey}`);
    if (content) {
      content.style.display = isChecked ? 'block' : 'none';
    }
    if (box) {
      box.classList.toggle('active', isChecked);
    }
  }

  setPosMode(mode) {
    const btnCatalog = document.getElementById('btnPosCatalogMode');
    const btnSheet = document.getElementById('btnPosSheetMode');
    if (btnCatalog && btnSheet) {
      btnCatalog.classList.toggle('active', mode === 'catalog');
      btnCatalog.innerHTML = mode === 'catalog' ? 'Đồng bộ sản phẩm lên Catalog' : 'Đồng bộ sản phẩm lên Catalog';
      btnSheet.classList.toggle('active', mode === 'sheet');
      btnSheet.innerHTML = mode === 'sheet' ? 'Đồng bộ sản phẩm lên Google Sheet' : 'Đồng bộ sản phẩm lên Google Sheet';
    }
  }

  switchPosTab(tabName) {
    const tabEcom = document.getElementById('tabEcomPos');
    const tabFnb = document.getElementById('tabFnbPos');
    const gridEcom = document.getElementById('gridEcomPos');
    const gridFnb = document.getElementById('gridFnbPos');

    if (tabEcom && tabFnb) {
      tabEcom.classList.toggle('active', tabName === 'ecom');
      tabFnb.classList.toggle('active', tabName === 'fnb');
    }
    if (gridEcom && gridFnb) {
      gridEcom.style.display = tabName === 'ecom' ? 'grid' : 'none';
      gridFnb.style.display = tabName === 'fnb' ? 'grid' : 'none';
    }
  }

  selectPosPlatform(platformName) {
    alert(`Đã chọn kết nối với nền tảng POS: ${platformName}.\nHệ thống đang thiết lập đồng bộ sản phẩm, danh mục và tồn kho sang Meta Business Agent.`);
  }

  renderKnowledgeSources() {
    // 1. Google Sheets
    const sheetContainer = document.getElementById('sheetListContainer');
    if (sheetContainer) {
      sheetContainer.innerHTML = '';
      this.state.knowledge.sheets.forEach((s, idx) => {
        const item = document.createElement('div');
        item.className = 'smax-url-item';
        item.innerHTML = `
          <div><strong>${s.name}</strong><div style="font-size: 11.5px; color: #5d6c7b;">${s.url}</div></div>
          <button class="smax-btn-pill-ghost" style="color: #dc3545; border-color: #fca5a5; padding: 4px 12px;" onclick="app.removeSheet(${idx})">Xóa</button>
        `;
        sheetContainer.appendChild(item);
      });
    }

    // 2. Google Drive
    const driveContainer = document.getElementById('driveListContainer');
    if (driveContainer) {
      driveContainer.innerHTML = '';
      this.state.knowledge.driveFolders.forEach((d, idx) => {
        const item = document.createElement('div');
        item.className = 'smax-url-item';
        item.innerHTML = `
          <div><strong>${d.name}</strong><div style="font-size: 11.5px; color: #5d6c7b;">${d.url}</div></div>
          <button class="smax-btn-pill-ghost" style="color: #dc3545; border-color: #fca5a5; padding: 4px 12px;" onclick="app.removeDrive(${idx})">Xóa</button>
        `;
        driveContainer.appendChild(item);
      });
    }

    // 3. Shopee Links
    const shopeeContainer = document.getElementById('shopeeListContainer');
    if (shopeeContainer) {
      shopeeContainer.innerHTML = '';
      this.state.knowledge.shopeeLinks.forEach((sh, idx) => {
        const item = document.createElement('div');
        item.className = 'smax-url-item';
        item.innerHTML = `
          <div><strong>${sh.name}</strong><div style="font-size: 11.5px; color: #5d6c7b;">${sh.url}</div></div>
          <button class="smax-btn-pill-ghost" style="color: #dc3545; border-color: #fca5a5; padding: 4px 12px;" onclick="app.removeShopee(${idx})">Xóa</button>
        `;
        shopeeContainer.appendChild(item);
      });
    }

    // 4. Website URLs
    const urlContainer = document.getElementById('urlListContainer');
    if (urlContainer) {
      urlContainer.innerHTML = '';
      this.state.knowledge.urls.forEach((url, idx) => {
        const item = document.createElement('div');
        item.className = 'smax-url-item';
        item.innerHTML = `
          <div style="word-break: break-all;">${url}</div>
          <button class="smax-btn-pill-ghost" style="color: #dc3545; border-color: #fca5a5; padding: 4px 12px;" onclick="app.removeUrl(${idx})">Xóa</button>
        `;
        urlContainer.appendChild(item);
      });
    }
  }

  addSheet() {
    const input = document.getElementById('inputNewSheet');
    if (!input || !input.value.trim()) return;
    this.state.knowledge.sheets.push({
      name: 'Google Sheet Dữ liệu mới',
      url: input.value.trim()
    });
    input.value = '';
    this.renderKnowledgeSources();
  }

  removeSheet(index) {
    this.state.knowledge.sheets.splice(index, 1);
    this.renderKnowledgeSources();
  }

  addDrive() {
    const input = document.getElementById('inputNewDrive');
    if (!input || !input.value.trim()) return;
    this.state.knowledge.driveFolders.push({
      name: 'Thư mục Google Drive mới',
      url: input.value.trim()
    });
    input.value = '';
    this.renderKnowledgeSources();
  }

  removeDrive(index) {
    this.state.knowledge.driveFolders.splice(index, 1);
    this.renderKnowledgeSources();
  }

  addShopee() {
    const input = document.getElementById('inputNewShopee');
    if (!input || !input.value.trim()) return;
    this.state.knowledge.shopeeLinks.push({
      name: 'Gian hàng Shopee đồng bộ',
      url: input.value.trim()
    });
    input.value = '';
    this.renderKnowledgeSources();
  }

  removeShopee(index) {
    this.state.knowledge.shopeeLinks.splice(index, 1);
    this.renderKnowledgeSources();
  }

  addUrl() {
    const input = document.getElementById('inputNewUrl');
    if (!input || !input.value.trim()) return;
    this.state.knowledge.urls.push(input.value.trim());
    input.value = '';
    this.renderKnowledgeSources();
  }

  removeUrl(index) {
    this.state.knowledge.urls.splice(index, 1);
    this.renderKnowledgeSources();
  }

  renderFaqs() {
    const container = document.getElementById('faqListContainer');
    if (!container) return;

    container.innerHTML = '';
    this.state.knowledge.faqs.forEach((faq, idx) => {
      const item = document.createElement('div');
      item.className = 'smax-perm-item';
      item.style.flexDirection = 'column';
      item.style.alignItems = 'flex-start';
      item.innerHTML = `
        <div style="display: flex; width: 100%; justify-content: space-between; align-items: center;">
          <strong style="color: #0a1317;">Hỏi: ${faq.q}</strong>
          <button class="smax-btn-pill-ghost" style="color: #dc3545; border-color: #fca5a5; padding: 2px 10px; font-size: 11px;" onclick="app.removeFaq(${idx})">Xóa</button>
        </div>
        <div style="color: #5d6c7b; margin-top: 4px; font-size: 12.5px;">Đáp: ${faq.a}</div>
      `;
      container.appendChild(item);
    });
  }

  addFaq() {
    const q = document.getElementById('inputFaqQ');
    const a = document.getElementById('inputFaqA');
    if (!q || !a || !q.value.trim() || !a.value.trim()) return;

    this.state.knowledge.faqs.push({ q: q.value.trim(), a: a.value.trim() });
    q.value = '';
    a.value = '';
    this.renderFaqs();
  }

  removeFaq(index) {
    this.state.knowledge.faqs.splice(index, 1);
    this.renderFaqs();
  }

  // --- Step 5: Skills Toggles ---
  renderSkillsToggles() {
    const s = this.state.skills;
    const chkLead = document.getElementById('skillLead');
    const chkOrder = document.getElementById('skillOrder');
    const chkTrack = document.getElementById('skillTrack');
    const chkPromo = document.getElementById('skillPromo');

    if (chkLead) chkLead.checked = s.leadExtraction;
    if (chkOrder) chkOrder.checked = s.orderCreation;
    if (chkTrack) chkTrack.checked = s.orderTracking;
    if (chkPromo) chkPromo.checked = s.promoRecommendation;
  }

  // --- Step 6: Dynamic Follow-up Timeline & Smax Block Picker (Yêu cầu 3 & 4) ---
  renderFollowupsTimeline() {
    const container = document.getElementById('followupTimelineContainer');
    if (!container) return;

    container.innerHTML = '';
    this.state.followupList.forEach((fu, idx) => {
      const stepEl = document.createElement('div');
      stepEl.className = 'smax-timeline-step';
      stepEl.innerHTML = `
        <div class="smax-timeline-header">
          <div class="smax-timeline-delay">
            <span>${fu.delayLabel}</span>
            <span class="smax-badge smax-badge-blue">${fu.badgeText}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="color: #5d6c7b; font-size: 12px;">${fu.windowTag}</span>
            <button class="smax-timeline-remove-btn" title="Xóa kịch bản này" onclick="app.removeFollowup(${idx})">&times;</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-top: 8px;">
          <div>
            <label class="smax-label" style="font-size: 12.5px; font-weight: 700; color: #0f1835; margin-bottom: 6px; display: flex; align-items: center; gap: 5px;">
              <span>Kịch bản Smax Automation:</span>
              <span style="font-size: 13px; color: #64748b; cursor: help;" title="Kịch bản Smax Automation tự động kích hoạt gửi tin bám đuổi">ⓘ</span>
            </label>
            ${this.renderBlockPickerHtml(`fu-block-${idx}`, fu.block, `app.updateFollowupBlock(${idx}, 'VALUE')`)}
          </div>
          <div>
            <label class="smax-label" style="font-size: 12.5px; font-weight: 700; color: #0f1835; margin-bottom: 6px;">
              Nội dung gửi cho khách:
            </label>
            <input type="text" class="smax-input" style="height: 42px;" value="${fu.message}" oninput="app.updateFollowupMsg(${idx}, this.value)">
          </div>
        </div>
      `;
      container.appendChild(stepEl);
    });
  }

  addFollowup() {
    const nextNum = this.state.followupList.length + 1;
    this.state.followupList.push({
      id: `fu-${Date.now()}`,
      delayLabel: `Mốc ${nextNum}: Sau ${nextNum * 2} giờ`,
      badgeText: 'Nhắc khách quay lại',
      windowTag: 'Kịch bản tùy chỉnh',
      block: 'Đã Lên Đơn_Mời Follow OA',
      message: 'Shop vẫn đang giữ ưu đãi riêng cho bạn. Bạn có muốn shop tư vấn thêm không ạ?'
    });
    this.renderFollowupsTimeline();
  }

  removeFollowup(index) {
    if (this.state.followupList.length <= 1) {
      alert('Bạn cần giữ lại ít nhất 1 kịch bản bám đuổi.');
      return;
    }
    this.state.followupList.splice(index, 1);
    this.renderFollowupsTimeline();
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
    }
  }

  // --- Smax Block Picker Helper (Khớp 100% Hình 1 & Hình 2) ---
  renderBlockPickerHtml(pickerId, selectedValue, onSelectCode, options = {}) {
    const isFb = selectedValue && (selectedValue.toLowerCase().includes('dataset') || selectedValue.toLowerCase().includes('facebook'));
    
    // Icon SVG: Facebook Blue 'f' circle or Web Globe ''
    const iconHtml = isFb ? 
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` :
      `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;

    const listItems = this.smaxBlocks.map(b => {
      const isSel = b === selectedValue ? 'selected' : '';
      const isBlockFb = b.toLowerCase().includes('dataset') || b.toLowerCase().includes('facebook');
      const itemIcon = isBlockFb ? 
        `<svg width="16" height="16" viewBox="0 0 24 24" fill="#1877f2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` :
        `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>`;

      const execCode = onSelectCode.replace('VALUE', b.replace(/'/g, "\\'"));
      return `
        <div class="smax-block-dropdown-item ${isSel}" onclick="${execCode}; app.closeAllBlockDropdowns();">
          <span class="smax-block-item-icon">${itemIcon}</span>
          <span class="smax-block-item-text">${b}</span>
        </div>
      `;
    }).join('');

    const clearCode = onSelectCode.replace('VALUE', '');

    return `
      <div class="smax-block-picker-wrapper" id="wrapper-${pickerId}">
        <div class="smax-block-selector-row">
          <!-- Thanh chọn block chính (Hình 1) -->
          <div class="smax-block-selected-bar" onclick="app.toggleBlockDropdown('${pickerId}')">
            <div class="smax-block-selected-left">
              <span class="smax-block-channel-icon">${iconHtml}</span>
              <span class="smax-block-selected-name">${selectedValue || 'Chọn Block Automation...'}</span>
            </div>
            <div class="smax-block-selected-right">
              ${selectedValue ? `<span class="smax-block-clear-btn" title="Bỏ chọn block" onclick="event.stopPropagation(); ${clearCode}; app.closeAllBlockDropdowns();">&times;</span>` : ''}
              <span class="smax-block-arrow-btn" id="arrow-${pickerId}">▾</span>
            </div>
          </div>

          <!-- Nút Edit Pencil hình vuông bên cạnh (Hình 1 & Hình 2) -->
          <button class="smax-block-edit-btn" title="Chỉnh sửa kịch bản trong Flow Builder" onclick="event.stopPropagation(); alert('Mở Flow Builder Smax để chỉnh sửa block: ' + '${selectedValue || 'Chưa chọn'}');">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f1835" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 20h9"></path>
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
            </svg>
          </button>
        </div>

        <!-- Menu Dropdown (Hình 2) -->
        <div class="smax-block-dropdown-menu" id="dropdown-${pickerId}">
          <div class="smax-block-dropdown-list">
            ${listItems}
          </div>
          <div class="smax-block-dropdown-footer">
            <button class="smax-block-add-new-btn" onclick="app.addNewCustomBlock('${pickerId}')">
              + Thêm mới
            </button>
          </div>
        </div>
      </div>
    `;
  }

  toggleBlockDropdown(pickerId) {
    const dd = document.getElementById(`dropdown-${pickerId}`);
    const arrow = document.getElementById(`arrow-${pickerId}`);
    const bar = document.querySelector(`#wrapper-${pickerId} .smax-block-selected-bar`);
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
    this.renderSpecialUI();
  }

  // --- Step 7: Special UI (Games, Webview, Handover) ---
  renderSpecialUI() {
    const g = this.state.gamification;
    const h = this.state.handover;

    const chkGame = document.getElementById('chkGamification');
    const selectGame = document.getElementById('selectGameType');
    const inputReward = document.getElementById('inputGameReward');
    const inputResume = document.getElementById('inputResumeMinutes');

    if (chkGame) chkGame.checked = g.enabled;
    if (selectGame) selectGame.value = g.gameType || 'lucky_wheel';
    if (inputReward) inputReward.value = g.reward || '';
    if (inputResume) inputResume.value = h.autoResumeMinutes;

    // Render Smax Block Pickers for Handover Triggers (3 sự kiện chuẩn)
    const leadPickerBox = document.getElementById('handoverLeadBlockPicker');
    if (leadPickerBox) {
      leadPickerBox.innerHTML = this.renderBlockPickerHtml('lead-handover', h.onLead, "app.setHandoverBlock('onLead', 'VALUE')");
    }

    const orderPickerBox = document.getElementById('handoverOrderBlockPicker');
    if (orderPickerBox) {
      orderPickerBox.innerHTML = this.renderBlockPickerHtml('order-handover', h.onOrder, "app.setHandoverBlock('onOrder', 'VALUE')");
    }

    const humanPickerBox = document.getElementById('handoverHumanBlockPicker');
    if (humanPickerBox) {
      humanPickerBox.innerHTML = this.renderBlockPickerHtml('human-handover', h.onHuman, "app.setHandoverBlock('onHuman', 'VALUE')");
    }
  }

  setHandoverBlock(key, value) {
    this.state.handover[key] = value;
    this.renderSpecialUI();
  }

  // --- Step 8: Playground Chips & Chat ---
  renderPlaygroundChips() {
    const container = document.getElementById('playgroundChipsContainer');
    if (!container) return;

    const icebreakers = this.state.persona.firstContact?.icebreakers || [];
    let chipsHtml = '';

    icebreakers.forEach(ib => {
      chipsHtml += `<button class="smax-chip-btn" onclick="app.sendChatMessage('${ib.text}')">${ib.text}</button>`;
    });

    chipsHtml += `
      <button class="smax-chip-btn" onclick="app.simulateFollowupAction('15_min')">Thử kịch bản bám đuổi 15 phút</button>
      <button class="smax-chip-btn" onclick="app.simulateFollowupAction('2_hours')">Thử kịch bản bám đuổi 2 giờ</button>
      <button class="smax-chip-btn" onclick="app.simulateGamificationAction()">Tặng Vòng Quay May Mắn</button>
      <button class="smax-chip-btn" onclick="app.sendChatMessage('Cho mình gặp trực tiếp nhân viên tư vấn')">Yêu cầu gặp nhân viên</button>
    `;

    container.innerHTML = chipsHtml;
  }

  bindStep8Playground() {
    const input = document.getElementById('chatInput');
    const btnSend = document.getElementById('btnSendChat');
    const btnReset = document.getElementById('btnResetChat');

    btnSend?.addEventListener('click', () => this.sendChatMessage());
    input?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendChatMessage();
    });

    btnReset?.addEventListener('click', () => {
      window.metaAgentSimulator.resetSession();
      const msgBox = document.getElementById('chatMessages');
      if (msgBox) msgBox.innerHTML = '';
      this.initPlaygroundIfEmpty();
      this.updateInspectorUI({
        activeOwner: 'Trợ lý AI (Lễ tân)',
        intent: 'Chào hỏi ban đầu',
        handoverAction: null,
        extractedEntities: {
          customerName: null,
          phone: null,
          address: null,
          items: [],
          voucher: null
        },
        tokenUsage: { totalTokens: 1420, estimatedCostUSD: '0.0021', estimatedCostVND: 53 }
      });
    });
  }

  initPlaygroundIfEmpty() {
    const msgBox = document.getElementById('chatMessages');
    if (msgBox && msgBox.children.length === 0) {
      const welcome = this.state.persona.firstContact?.welcomeMessage || `Dạ ${this.state.persona.agentName} xin chào bạn! Mình có thể giúp gì cho bạn hôm nay ạ?`;
      this.appendMessage('bot', welcome);
    }
  }

  sendChatMessage(customText = null) {
    const input = document.getElementById('chatInput');
    const text = customText || input?.value?.trim();
    if (!text) return;

    if (!customText && input) input.value = '';

    this.appendMessage('user', text);
    this.showTypingIndicator();

    setTimeout(() => {
      this.removeTypingIndicator();
      const result = window.metaAgentSimulator.processUserMessage(text, this.state);
      this.appendMessage('bot', result.botReply);
      this.updateInspectorUI(result);
    }, 600);
  }

  simulateFollowupAction(stepKey) {
    this.showTypingIndicator();
    setTimeout(() => {
      this.removeTypingIndicator();
      const fuResult = window.metaAgentSimulator.triggerFollowUp(stepKey, this.state);
      if (!fuResult) return;

      const formattedMsg = `<strong>[Kịch bản bám đuổi tự động]</strong> (${fuResult.channelLabel})<br>-> <em>${fuResult.blockName}</em><br><br>${fuResult.message}`;
      this.appendMessage('bot', formattedMsg);

      this.updateInspectorUI({
        activeOwner: fuResult.activeOwner,
        intent: 'Tự động gửi tin nhắn bám đuổi',
        handoverAction: fuResult.handoverAction,
        extractedEntities: window.metaAgentSimulator.extractedEntities,
        tokenUsage: {
          totalTokens: window.metaAgentSimulator.tokenCount,
          estimatedCostUSD: ((window.metaAgentSimulator.tokenCount / 1000) * 0.0015).toFixed(4),
          estimatedCostVND: Math.round((window.metaAgentSimulator.tokenCount / 1000) * 0.0015 * 25400)
        }
      });
    }, 500);
  }

  simulateGamificationAction() {
    this.showTypingIndicator();
    setTimeout(() => {
      this.removeTypingIndicator();
      const gResult = window.metaAgentSimulator.triggerGamification(this.state);

      this.appendMessage('bot', gResult.message);
      this.updateInspectorUI({
        activeOwner: gResult.activeOwner,
        intent: 'Tặng trò chơi may mắn',
        handoverAction: {
          trigger: 'Kích hoạt trò chơi nhận quà',
          targetBlock: `Trò chơi: ${gResult.gameName}`,
          resumeTag: 'Sau khi khách chơi xong, AI tiếp tục phục vụ'
        },
        extractedEntities: window.metaAgentSimulator.extractedEntities,
        tokenUsage: {
          totalTokens: window.metaAgentSimulator.tokenCount,
          estimatedCostUSD: ((window.metaAgentSimulator.tokenCount / 1000) * 0.0015).toFixed(4),
          estimatedCostVND: Math.round((window.metaAgentSimulator.tokenCount / 1000) * 0.0015 * 25400)
        }
      });
    }, 500);
  }

  appendMessage(sender, text) {
    const msgBox = document.getElementById('chatMessages');
    if (!msgBox) return;

    const row = document.createElement('div');
    row.className = `smax-msg-row ${sender}`;
    let teachBtnHtml = '';
    if (sender === 'bot') {
      const lastUserMsg = window.metaAgentSimulator?.lastUserMessage || 'Câu hỏi khách hàng';
      const encQ = encodeURIComponent(lastUserMsg);
      const encR = encodeURIComponent(text);
      teachBtnHtml = `
        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed rgba(0,0,0,0.08); display: flex; justify-content: flex-end;">
          <button class="smax-btn-teach-chip" onclick="app.openQuickTeachFromPlayground('${encQ}', '${encR}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <span>Sửa câu này / Dạy AI</span>
          </button>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="smax-msg-bubble">
        ${text.replace(/\n/g, '<br>')}
        <div class="smax-msg-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        ${teachBtnHtml}
      </div>
    `;
    msgBox.appendChild(row);
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  showTypingIndicator() {
    const msgBox = document.getElementById('chatMessages');
    if (!msgBox) return;

    const typing = document.createElement('div');
    typing.id = 'typingBubble';
    typing.className = 'smax-msg-row bot';
    typing.innerHTML = `
      <div class="smax-typing-bubble">
        <div class="smax-typing-dot"></div>
        <div class="smax-typing-dot"></div>
        <div class="smax-typing-dot"></div>
      </div>
    `;
    msgBox.appendChild(typing);
    msgBox.scrollTop = msgBox.scrollHeight;
  }

  removeTypingIndicator() {
    document.getElementById('typingBubble')?.remove();
  }

  updateInspectorUI(result) {
    const elOwner = document.getElementById('inspectorOwner');
    if (elOwner) elOwner.innerText = result.activeOwner;

    const elIntent = document.getElementById('inspectorIntent');
    if (elIntent) {
      elIntent.innerText = result.intent;
      elIntent.className = 'smax-badge smax-badge-blue';
    }

    const e = result.extractedEntities;
    const elPhone = document.getElementById('inspectPhone');
    const elAddr = document.getElementById('inspectAddress');
    const elItems = document.getElementById('inspectItems');
    const elVoucher = document.getElementById('inspectVoucher');

    if (elPhone) elPhone.innerText = e.phone || '—';
    if (elAddr) elAddr.innerText = e.address || '—';
    if (elItems) elItems.innerText = e.items?.length > 0 ? e.items.map(i => `${i.name} (Số lượng: ${i.qty})`).join(', ') : '—';
    if (elVoucher) elVoucher.innerText = e.voucher || '—';

    const triggerBox = document.getElementById('inspectorTriggerBox');
    if (triggerBox) {
      if (result.handoverAction) {
        triggerBox.className = 'smax-handover-status-box passed';
        triggerBox.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <strong style="color: #0064e0; font-size: 13px;">Kích hoạt: ${result.handoverAction.trigger}</strong>
            <span class="smax-badge smax-badge-success">Đã thực hiện</span>
          </div>
          <div style="font-size: 12px; color: #1c1e21; margin-top: 4px;">
            -> <strong>Hành động thực thi:</strong> ${result.handoverAction.targetBlock}<br>
            -> <strong>Ghi chú:</strong> ${result.handoverAction.resumeTag}
          </div>
        `;
      } else {
        triggerBox.className = 'smax-handover-status-box';
        triggerBox.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <strong style="color: #5d6c7b; font-size: 13px;">Trợ lý AI đang tư vấn trực tiếp</strong>
            <span class="smax-badge smax-badge-neutral">Bình thường</span>
          </div>
          <div style="font-size: 12px; color: #5d6c7b; margin-top: 4px;">
            Trợ lý tự động trả lời dựa trên thư viện kiến thức. Kịch bản bám đuổi sẽ tự động kích hoạt nếu khách im lặng.
          </div>
        `;
      }
    }
  }

  // --- Step Navigation ---
  bindNavigationEvents() {
    document.getElementById('btnPrevStep')?.addEventListener('click', () => this.prevStep());
    document.getElementById('btnNextStep')?.addEventListener('click', () => this.nextStep());

    document.querySelectorAll('.smax-step-item').forEach(stepBtn => {
      stepBtn.addEventListener('click', () => {
        const stepNum = parseInt(stepBtn.dataset.step, 10);
        if (stepNum) this.goToStep(stepNum);
      });
    });

    // Close block dropdown on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.smax-block-picker-wrapper')) {
        this.closeAllBlockDropdowns();
      }
    });
  }

  bindPresetCards() {
    const chkToggle = document.getElementById('chkUsePresetTemplate');
    const wrapper = document.getElementById('presetSectionWrapper');

    chkToggle?.addEventListener('change', (e) => {
      if (wrapper) {
        wrapper.style.display = e.target.checked ? 'block' : 'none';
      }
    });

    document.querySelectorAll('.smax-preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const presetKey = card.dataset.preset;
        if (presetKey) this.applyPreset(presetKey);
      });
    });
  }

  bindStep2Inputs() {
    document.getElementById('btnAddIcebreaker')?.addEventListener('click', () => this.addIcebreaker());
    document.getElementById('inputNewIcebreaker')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addIcebreaker();
    });

    document.getElementById('inputBusinessName')?.addEventListener('input', (e) => {
      this.state.businessProfile.businessName = e.target.value;
    });
    document.getElementById('inputCategory')?.addEventListener('input', (e) => {
      this.state.businessProfile.category = e.target.value;
    });
    document.getElementById('textareaBusinessBio')?.addEventListener('input', (e) => {
      this.state.businessProfile.businessBio = e.target.value;
    });
    document.getElementById('inputAgentName')?.addEventListener('input', (e) => {
      this.state.persona.agentName = e.target.value;
      const display = document.getElementById('liveAgentNameDisplay');
      if (display) display.innerText = e.target.value;
    });
    document.getElementById('inputRoleTitle')?.addEventListener('input', (e) => {
      this.state.persona.roleTitle = e.target.value;
    });
    document.getElementById('selectTone')?.addEventListener('change', (e) => {
      this.state.persona.tone = e.target.value;
    });
    document.getElementById('selectGreeting')?.addEventListener('change', (e) => {
      this.state.persona.greetingStyle = e.target.value;
    });
    document.getElementById('textareaWelcomeMsg')?.addEventListener('input', (e) => {
      this.state.persona.firstContact.welcomeMessage = e.target.value;
    });
    document.getElementById('chkAutoTranslate')?.addEventListener('change', (e) => {
      this.state.persona.autoTranslate = e.target.checked;
    });
  }

  bindStep3Inputs() {
    document.getElementById('btnAddDo')?.addEventListener('click', () => this.addDo());
    document.getElementById('inputNewDo')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addDo();
    });

    document.getElementById('btnAddDont')?.addEventListener('click', () => this.addDont());
    document.getElementById('inputNewDont')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addDont();
    });

    document.getElementById('inputMaxDiscount')?.addEventListener('input', (e) => {
      this.state.persona.guardrails.maxDiscountPercent = parseInt(e.target.value, 10) || 0;
    });
    document.getElementById('inputCompetitorPolicy')?.addEventListener('input', (e) => {
      this.state.persona.guardrails.competitorPolicy = e.target.value;
    });
    document.getElementById('textareaSystemPrompt')?.addEventListener('input', (e) => {
      this.state.persona.guardrails.systemPrompt = e.target.value;
    });
  }

  bindStep4KnowledgeInputs() {
    ['Pos', 'Sheet', 'Drive', 'Shopee', 'Web', 'Docs', 'Faq'].forEach(key => {
      const chk = document.getElementById(`chkToggle${key}`);
      chk?.addEventListener('change', (e) => {
        this.updateKbSourceDisplay(key, e.target.checked);
      });
    });

    document.getElementById('btnAddSheet')?.addEventListener('click', () => this.addSheet());
    document.getElementById('btnAddDrive')?.addEventListener('click', () => this.addDrive());
    document.getElementById('btnAddShopee')?.addEventListener('click', () => this.addShopee());
    document.getElementById('btnAddUrl')?.addEventListener('click', () => this.addUrl());
    document.getElementById('btnAddFaq')?.addEventListener('click', () => this.addFaq());

    document.getElementById('inputNewUrl')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.addUrl();
    });
  }

  bindStep5SkillsInputs() {
    document.getElementById('skillLead')?.addEventListener('change', (e) => {
      this.state.skills.leadExtraction = e.target.checked;
    });
    document.getElementById('skillOrder')?.addEventListener('change', (e) => {
      this.state.skills.orderCreation = e.target.checked;
    });
    document.getElementById('skillTrack')?.addEventListener('change', (e) => {
      this.state.skills.orderTracking = e.target.checked;
    });
    document.getElementById('skillPromo')?.addEventListener('change', (e) => {
      this.state.skills.promoRecommendation = e.target.checked;
    });
  }

  bindStep6FollowupInputs() {
    document.getElementById('btnAddFollowupBtn')?.addEventListener('click', () => this.addFollowup());
  }

  bindStep7SpecialInputs() {
    document.getElementById('chkGamification')?.addEventListener('change', (e) => {
      this.state.gamification.enabled = e.target.checked;
    });
    document.getElementById('selectGameType')?.addEventListener('change', (e) => {
      this.state.gamification.gameType = e.target.value;
    });
    document.getElementById('inputGameReward')?.addEventListener('input', (e) => {
      this.state.gamification.reward = e.target.value;
    });
    document.getElementById('inputResumeMinutes')?.addEventListener('input', (e) => {
      this.state.handover.autoResumeMinutes = parseInt(e.target.value, 10) || 5;
    });
  }

  goToStep(stepNumber) {
    if (stepNumber < 1 || stepNumber > this.totalSteps) return;
    this.currentStep = stepNumber;
    this.renderStep(stepNumber);
  }

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.goToStep(this.currentStep + 1);
    } else {
      this.openSyncModal();
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.goToStep(this.currentStep - 1);
    }
  }

  renderStep(stepNumber) {
    const isStandard = this.systemVersion === 'standard';
    const activeStepper = document.getElementById('wizardStepper') || document.getElementById('stepperStandard');
    
    // Update active on current visible stepper
    if (activeStepper) {
      activeStepper.querySelectorAll('.smax-step-item').forEach(item => {
        const step = parseInt(item.dataset.step, 10);
        item.classList.toggle('active', step === stepNumber);
        item.classList.toggle('completed', step < stepNumber);
      });
    }

    // Determine actual panel to activate
    let targetPanelStep = stepNumber;
    if (stepNumber === 6) {
      targetPanelStep = 8; // Step 6 maps to Playground & Publish panel
    }

    // Toggle Standard vs Advance container in Step 5
    const stdContainer = document.getElementById('step5StandardContainer');
    const advContainer = document.getElementById('step5AdvanceContainer');
    if (stdContainer) stdContainer.style.display = isStandard ? 'block' : 'none';
    if (advContainer) advContainer.style.display = !isStandard ? 'block' : 'none';

    document.querySelectorAll('.smax-step-panel').forEach(panel => {
      const step = parseInt(panel.dataset.step, 10);
      panel.classList.toggle('active', step === targetPanelStep);
    });

    if (stepNumber === 4) {
      this.renderCustomSkillsList();
    }

    const btnPrev = document.getElementById('btnPrevStep');
    const btnNext = document.getElementById('btnNextStep');

    if (btnPrev) btnPrev.style.display = stepNumber === 1 ? 'none' : 'inline-flex';
    if (btnNext) {
      if (stepNumber === this.totalSteps) {
        btnNext.innerHTML = '<span>Lưu & Kích Hoạt Lên Trang</span>';
        btnNext.className = 'smax-btn-pill-primary';
      } else {
        btnNext.innerHTML = '<span>Tiếp tục</span> <span>&rarr;</span>';
        btnNext.className = 'smax-btn-pill-primary';
      }
    }

    const elCounter = document.getElementById('wizardStepCounter');
    if (elCounter) elCounter.innerText = `Bước ${stepNumber} / ${this.totalSteps}`;

    document.querySelector('.smax-wizard-modal-body')?.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetPanelStep === 8) {
      this.initPlaygroundIfEmpty();
    }
  }

  // --- Modal Events ---
  bindModalEvents() {
    document.getElementById('btnCloseModal')?.addEventListener('click', () => this.closeSyncModal());
    document.getElementById('btnExportJson')?.addEventListener('click', () => this.exportJsonPayload());
    document.getElementById('btnOpenMindmap')?.addEventListener('click', () => this.openMindmapModal());
    document.getElementById('btnCloseMindmap')?.addEventListener('click', () => this.closeMindmapModal());
  }

  openSyncModal() {
    const modal = document.getElementById('syncModal');
    if (modal) modal.classList.add('active');

    const jsonViewer = document.getElementById('jsonPayloadViewer');
    if (jsonViewer) {
      jsonViewer.textContent = JSON.stringify(this.generateExportPayload(), null, 2);
    }
  }

  closeSyncModal() {
    document.getElementById('syncModal')?.classList.remove('active');
  }

  openMindmapModal() {
    const modal = document.getElementById('mindmapModal');
    if (modal) modal.classList.add('active');
  }

  closeMindmapModal() {
    document.getElementById('mindmapModal')?.classList.remove('active');
  }

  // --- Step 7: Game & Webview Methods (Yêu cầu mới) ---
  toggleGameSection(enabled) {
    this.state.gamification.enabled = enabled;
    const container = document.getElementById('gameSettingsContainer');
    if (container) container.style.display = enabled ? 'block' : 'none';
  }

  updateGamePreview(gameType) {
    this.state.gamification.gameType = gameType;
    const titleEl = document.getElementById('gamePreviewTitle');
    const wheel = document.getElementById('wheelAnimationContainer');
    if (gameType === 'lucky_wheel') {
      if (titleEl) titleEl.innerText = 'VÒNG QUAY MAY MẮN';
      if (wheel) {
        wheel.style.borderRadius = '50%';
        wheel.style.background = 'conic-gradient(#ef4444 0% 25%, #3b82f6 25% 50%, #10b981 50% 75%, #f59e0b 75% 100%)';
        wheel.innerHTML = '<div class="smax-wheel-pointer"></div><div style="font-size: 18px; font-weight: 900; color: #fff;"></div>';
      }
    } else if (gameType === 'open_gift') {
      if (titleEl) titleEl.innerText = 'MỞ HỘP QUÀ BÍ MẬT';
      if (wheel) {
        wheel.style.borderRadius = '16px';
        wheel.style.background = 'linear-gradient(135deg, #ec4899, #8b5cf6)';
        wheel.innerHTML = '<div style="font-size: 32px;"></div>';
      }
    } else {
      if (titleEl) titleEl.innerText = 'GHÉP TRANH TRÚNG QUÀ';
      if (wheel) {
        wheel.style.borderRadius = '16px';
        wheel.style.background = 'linear-gradient(135deg, #10b981, #06b6d4)';
        wheel.innerHTML = '<div style="font-size: 28px;"></div>';
      }
    }
  }

  updateGameRewardText(text) {
    this.state.gamification.reward = text;
  }

  spinTestWheel() {
    const wheel = document.getElementById('wheelAnimationContainer');
    if (!wheel) return;
    const randomDeg = 1440 + Math.floor(Math.random() * 360);
    wheel.style.transform = `rotate(${randomDeg}deg)`;
    setTimeout(() => {
      alert(`Chúc mừng! Bạn đã trúng thưởng: "${this.state.gamification.reward || 'Mã giảm 15%'}"!`);
      wheel.style.transform = 'rotate(0deg)';
    }, 1600);
  }

  toggleWebviewSection(enabled) {
    this.state.webviewOrder.enabled = enabled;
    const container = document.getElementById('webviewSettingsContainer');
    if (container) container.style.display = enabled ? 'block' : 'none';
  }

  updateWebviewPreviewType(type) {
    this.state.webviewOrder.type = type;
    const titleEl = document.getElementById('previewWebviewHeaderTitle');
    const submitBtn = document.getElementById('btnWebviewPreviewSubmit');
    if (type === 'order_tracking') {
      if (titleEl) titleEl.innerText = 'Hành trình đơn hàng';
      if (submitBtn) submitBtn.innerText = 'Xem chi tiết giao hàng';
    } else {
      if (titleEl) titleEl.innerText = 'Đơn hàng';
      if (submitBtn) submitBtn.innerText = 'Submit';
    }
  }

  // --- Step 7: Meta CAPI & AI Insight Methods (Mới) ---
  toggleCapiSection(enabled) {
    this.state.metaCapi.enabled = enabled;
    const container = document.getElementById('capiSettingsContainer');
    if (container) container.style.display = enabled ? 'block' : 'none';
  }

  toggleInsightSection(enabled) {
    this.state.aiInsight.enabled = enabled;
    const container = document.getElementById('insightSettingsContainer');
    if (container) container.style.display = enabled ? 'block' : 'none';
  }

  // --- Step 5 Standard Skills Methods ---
  toggleStdFollowup(enabled) {
    const box = document.getElementById('stdFollowupSettingsBox');
    if (box) box.style.display = enabled ? 'block' : 'none';
  }

  toggleStdHandoff(enabled) {
    const box = document.getElementById('stdHandoffSettingsBox');
    if (box) box.style.display = enabled ? 'block' : 'none';
  }

  updateStdFollowupCharCount() {
    const textarea = document.getElementById('textareaStdFollowupMsg');
    const counter = document.getElementById('stdFollowupCharCount');
    if (textarea && counter) {
      counter.innerText = `${textarea.value.length}/500`;
    }
  }

  // --- Step 8: Audience & Schedule Control Methods (Khớp hình đính kèm) ---
  setAudienceTarget(targetKey) {
    this.state.audienceSettings.target = targetKey;
    const options = [
      { key: 'all', id: 'audienceOptionAll' },
      { key: 'first_time', id: 'audienceOptionFirstTime' },
      { key: 'ad_clickers', id: 'audienceOptionAdClickers' },
      { key: 'team_only', id: 'audienceOptionTeamOnly' }
    ];

    options.forEach(opt => {
      const el = document.getElementById(opt.id);
      if (el) el.classList.toggle('selected', opt.key === targetKey);
    });

    const subSelect = document.getElementById('audienceAdCampaignSelector');
    if (subSelect) {
      subSelect.style.display = targetKey === 'ad_clickers' ? 'block' : 'none';
    }
  }

  setAdCampaign(campaignVal) {
    this.state.audienceSettings.adCampaign = campaignVal;
  }

  setScheduleMode(modeVal) {
    this.state.scheduleSettings.mode = modeVal;
    const detailBox = document.getElementById('customScheduleDetailBox');
    if (detailBox) {
      detailBox.style.display = modeVal === 'custom' ? 'flex' : 'none';
    }
  }

  generateExportPayload() {
    return {
      phien_ban: '8.3.0',
      nen_tang: 'Meta Business Agent Platform & Smax.ai Enterprise',
      thoi_gian_cap_nhat: new Date().toLocaleString('vi-VN'),
      kenh_ket_noi: {
        trang_thai: this.state.channel.connected ? 'da_ket_noi' : 'chua_ket_noi',
        ten_kenh: this.state.channel.name,
        ma_trang_fanpage: this.state.channel.pageId
      },
      cau_hinh_tro_ly: {
        thong_tin_doanh_nghiep: this.state.businessProfile,
        tinh_cach_va_giao_tiep: this.state.persona,
        chu_de_nen_tranh_va_tuy_chinh: this.state.persona.guardrails,
        thu_vien_kien_thuc: {
          dong_bo_kho_hang_pos: this.state.knowledge.syncCatalog,
          danh_sach_google_sheet: this.state.knowledge.sheets,
          thu_muc_google_drive: this.state.knowledge.driveFolders,
          gian_hang_shopee: this.state.knowledge.shopeeLinks,
          trang_web: this.state.knowledge.urls,
          cau_hoi_thuong_gap: this.state.knowledge.faqs
        },
        ky_nang_tu_dong: this.state.skills,
        danh_sach_kich_ban_bam_duoi: this.state.followupList,
        kich_ban_dac_biet: {
          tro_choi_may_man: this.state.gamification,
          gui_webview_xac_nhan_don: this.state.webviewOrder,
          dong_bo_meta_capi: this.state.metaCapi,
          phan_tich_lead_insight_6_chieu: this.state.aiInsight,
          phan_quyen_va_chuyen_giao: this.state.handover
        },
        cai_dat_doi_tuong_va_khung_gio: {
          doi_tuong_phan_hoi: this.state.audienceSettings,
          khung_gio_hoat_dong: this.state.scheduleSettings
        }
      }
    };
  }

  exportJsonPayload() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.generateExportPayload(), null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = dataStr;
    downloadAnchor.download = `smax_agent_mindmap_${Date.now()}.json`;
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }

  
  // --- META SKILLS LIBRARY (30 PRESETS FROM 01.MD) ---
  openSkillsLibraryModal(selectedIndustry = 'all') {
    this.currentLibIndustry = selectedIndustry;
    this.currentLibSearch = '';

    const searchInput = document.getElementById('skillsLibSearchInput');
    if (searchInput) searchInput.value = '';

    this.updateSkillsLibPillsUI(selectedIndustry);
    this.renderSkillsLibraryCards();

    const backdrop = document.getElementById('skillsLibraryModalBackdrop');
    if (backdrop) backdrop.style.display = 'flex';
  }

  closeSkillsLibraryModal() {
    const backdrop = document.getElementById('skillsLibraryModalBackdrop');
    if (backdrop) backdrop.style.display = 'none';
  }

  updateSkillsLibPillsUI(industryKey) {
    document.querySelectorAll('.smax-lib-pill').forEach(btn => {
      const isMatch = btn.dataset.industry === industryKey;
      btn.style.background = isMatch ? '#ea580c' : '#f8fafc';
      btn.style.color = isMatch ? '#ffffff' : '#334155';
      btn.style.borderColor = isMatch ? '#ea580c' : '#e2e8f0';
    });
  }

  filterSkillsLibraryByIndustry(industryKey) {
    this.currentLibIndustry = industryKey;
    this.updateSkillsLibPillsUI(industryKey);
    this.renderSkillsLibraryCards();
  }

  filterSkillsLibraryBySearch(searchQuery) {
    this.currentLibSearch = (searchQuery || '').trim().toLowerCase();
    this.renderSkillsLibraryCards();
  }

    renderSkillsLibraryCards() {
    const container = document.getElementById('skillsLibraryCardsContainer');
    const countEl = document.getElementById('skillsLibCountText');
    if (!container) return;

    const lib = window.META_SKILLS_LIBRARY || {};
    const industryNames = {
      fashion: { name: 'Thời Trang & May Mặc', color: '#ea580c', bg: '#fff7ed' },
      cosmetics: { name: 'Mỹ Phẩm & Làm Đẹp', color: '#db2777', bg: '#fdf2f8' },
      fnb: { name: 'F&B Ẩm Thực & Nhà Hàng', color: '#d97706', bg: '#fffbeb' },
      real_estate: { name: 'Bất Động Sản & Nhà Đất', color: '#0284c7', bg: '#f0f9ff' },
      spa_clinic: { name: 'Spa & Thẩm Mỹ Viện', color: '#7c3aed', bg: '#f5f3ff' }
    };

    let items = [];
    const targetIndustries = this.currentLibIndustry === 'all' 
      ? Object.keys(lib) 
      : [this.currentLibIndustry];

    targetIndustries.forEach(indKey => {
      const skills = lib[indKey] || [];
      skills.forEach(s => {
        items.push({ ...s, industryKey: indKey, industryMeta: industryNames[indKey] });
      });
    });

    if (this.currentLibSearch) {
      items = items.filter(item => {
        const text = (item.name + ' ' + item.title + ' ' + item.description + ' ' + item.skill).toLowerCase();
        return text.includes(this.currentLibSearch);
      });
    }

    if (countEl) {
      countEl.innerText = `${items.length} Kỹ năng phù hợp`;
    }

    if (items.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; padding: 40px 20px; text-align: center; color: #8c9ba5; font-size: 14px; background: #fff; border: 1px dashed #cbd5e1; border-radius: 12px;">Không tìm thấy kỹ năng nào phù hợp với từ khóa "<strong>' + this.currentLibSearch + '</strong>".</div>';
      return;
    }

    container.innerHTML = items.map(item => {
      const meta = item.industryMeta || { name: 'Chung', color: '#ea580c', bg: '#fff7ed' };
      return `
        <div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 18px 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: all 0.2s ease;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; margin-bottom: 12px;">
            <div>
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
                <span style="background: ${meta.bg}; color: ${meta.color}; font-size: 11.5px; font-weight: 700; padding: 3px 8px; border-radius: 6px; border: 1px solid ${meta.color}30;">
                  ${meta.name}
                </span>
                <strong style="font-size: 14.5px; color: #0f1835;">${item.name}</strong>
              </div>
              <code style="font-size: 12.5px; color: #9a3412; background: #ffedd5; padding: 2px 8px; border-radius: 4px; font-weight: 600;">title: ${item.title}</code>
            </div>

            <button type="button" class="smax-btn-primary-coral" onclick="app.useLibrarySkill('${item.industryKey}', '${item.title}')" style="padding: 7px 16px; font-size: 12.5px; border-radius: 6px; font-weight: 600; cursor: pointer; white-space: nowrap;">
              Áp Dụng Vào Form
            </button>
          </div>

          <!-- Description / Trigger context -->
          <div style="font-size: 12.5px; color: #334155; margin-bottom: 10px; line-height: 1.45; background: #f8fafc; padding: 10px 14px; border-radius: 8px; border-left: 3px solid ${meta.color};">
            <strong style="color: #0f1835;">Khi nào AI kích hoạt (description):</strong> ${item.description}
          </div>

          <!-- Skill Directives -->
          <div style="font-size: 12px; color: #475569; background: #ffffff; border: 1px solid #e6ebef; padding: 12px 14px; border-radius: 8px; font-family: inherit; line-height: 1.55; white-space: pre-line; max-height: 160px; overflow-y: auto;">
            ${item.skill}
          </div>
        </div>
      `;
    }).join('');
  }

  useLibrarySkill(industryKey, skillTitle) {
    const lib = window.META_SKILLS_LIBRARY || {};
    const skills = lib[industryKey] || [];
    const item = skills.find(s => s.title === skillTitle);
    if (!item) return;

    // 1. Ensure Skill Modal is open
    this.openAddSkillModal();

    // 2. Populate fields in the Skill Modal
    document.getElementById('skillInputTitle').value = item.title;
    document.getElementById('skillSelectChannel').value = item.channel || 'all';
    document.getElementById('skillInputDescription').value = item.description;
    document.getElementById('skillInputContent').value = item.skill;

    // 3. Close the Library Modal
    this.closeSkillsLibraryModal();

    // 4. Toast notification
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(`✨ Đã nạp kịch bản kỹ năng: "${item.name}" vào form tạo!`);
    }
  }


  
  // --- STEP 5: CONNECTORS & TOOLS MANAGEMENT ---
  switchConnectorSubtab(tabKey) {
    this.currentConnectorSubtab = tabKey;
    const btnExplore = document.getElementById('subtabExploreConnectors');
    const btnConnected = document.getElementById('subtabConnectedConnectors');

    if (btnExplore && btnConnected) {
      btnExplore.style.color = tabKey === 'explore' ? '#ea580c' : '#5d6c7b';
      btnExplore.style.fontWeight = tabKey === 'explore' ? '600' : '500';
      btnExplore.style.borderBottom = tabKey === 'explore' ? '2px solid #ea580c' : '2px solid transparent';

      btnConnected.style.color = tabKey === 'connected' ? '#ea580c' : '#5d6c7b';
      btnConnected.style.fontWeight = tabKey === 'connected' ? '600' : '500';
      btnConnected.style.borderBottom = tabKey === 'connected' ? '2px solid #ea580c' : '2px solid transparent';
    }

    if (tabKey === 'connected') {
      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast('Hiển thị 3 hệ thống đang hoạt động: Smax Commerce, VietQR Payment Hub, Google Sheet Sync');
      }
    }
  }

  selectConnectorCategory(catKey) {
    this.currentConnectorCategory = catKey;
    const catList = document.getElementById('connectorCategoryList');
    if (catList) {
      catList.querySelectorAll('.smax-cat-item').forEach(btn => {
        const isMatch = btn.getAttribute('onclick')?.includes(catKey);
        btn.style.background = isMatch ? '#f8fafc' : 'transparent';
        btn.style.fontWeight = isMatch ? '600' : 'normal';
        btn.style.color = isMatch ? '#0f1835' : '#475569';
      });
    }

    const titleMap = {
      recommended: 'Khuyên dùng',
      ecommerce: 'Thương mại điện tử',
      pos: 'Quản lý bán hàng (POS)',
      inventory: 'Quản lý kho',
      crm: 'CRM & Khách hàng',
      booking: 'Đặt lịch & Dịch vụ',
      payment: 'Thanh toán',
      custom_api: 'Custom API'
    };

    const titleEl = document.getElementById('connectorSectionTitle');
    if (titleEl) {
      titleEl.innerText = titleMap[catKey] || 'Tất cả hệ thống';
    }

    this.filterConnectors();
  }

  filterConnectors() {
    const searchVal = (document.getElementById('connectorSearchInput')?.value || '').trim().toLowerCase();
    const typeVal = document.getElementById('connectorTypeSelect')?.value || 'all';
    
    document.querySelectorAll('.smax-connector-card').forEach(card => {
      const text = card.innerText.toLowerCase();
      let match = true;
      if (searchVal && !text.includes(searchVal)) match = false;
      card.style.display = match ? 'flex' : 'none';
    });
  }

  setConnectorView(viewMode) {
    this.currentConnectorView = viewMode;
    const grid = document.getElementById('connectorCardsGrid');
    if (!grid) return;

    if (viewMode === 'list') {
      grid.style.gridTemplateColumns = '1fr';
    } else {
      grid.style.gridTemplateColumns = 'repeat(3, 1fr)';
    }

    document.querySelectorAll('.smax-view-btn').forEach(btn => {
      const isGrid = btn.getAttribute('onclick')?.includes('grid');
      const active = (viewMode === 'grid' && isGrid) || (viewMode === 'list' && !isGrid);
      btn.style.background = active ? '#ffffff' : 'transparent';
      btn.style.color = active ? '#0f1835' : '#64748b';
    });
  }

  toggleConnector(connectorKey) {
    const names = {
      kiotviet: 'KiotViet POS & Kho',
      shopify: 'Shopify Store',
      pos365: 'POS365',
      odoo: 'Odoo ERP',
      haravan: 'Haravan Omnichannel'
    };
    const name = names[connectorKey] || connectorKey;
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(`✓ Đã kết nối thành công hệ thống: ${name}! AI có thể gọi action tra cứu dữ liệu ngay.`);
    }
  }


  // --- Step 2 & 4: Industry Templates & Skills Management ---
  toggleIndustryTemplatesSection(show) {
    const grid = document.getElementById('industryTemplatesGrid');
    if (grid) {
      grid.style.display = show ? 'grid' : 'none';
    }
  }

    getIndustrySkills(presetKey) {
    const lib = window.META_SKILLS_LIBRARY || {};
    const list = lib[presetKey] || lib.fashion || [];
    // Return first 3 skills enabled by default
    return list.slice(0, 3).map(item => ({
      id: 'skill-' + item.title,
      title: item.title,
      name: item.name,
      channel: item.channel || 'all',
      description: item.description,
      skill: item.skill,
      enabled: true
    }));
  }

  applyIndustryPreset(presetKey) {
    const presetData = {
      fashion: {
        name: 'Thời trang & May mặc',
        businessName: 'Cửa hàng Thời trang Smax Flagship',
        hours: '08:00 - 22:00 hàng ngày',
        desc: 'Thương hiệu thời trang nam nữ thiết kế trẻ trung, chất liệu cao cấp, hỗ trợ đổi size miễn phí trong 7 ngày trên toàn quốc.',
        contact: 'Hotline: 1900 6868 | Email: cskh@smax.vn | CSKH Zalo: 0988.123.456',
        payments: 'Chuyển khoản quét mã VietQR tự động, Tiền mặt khi nhận hàng (COD), Thẻ tín dụng quốc tế Visa/Master',
        returnPolicy: 'Đổi trả miễn phí trong vòng 7 ngày nếu lỗi từ nhà sản xuất. Hỗ trợ đổi size trong 3 ngày đầu tiên. Sản phẩm đổi trả phải còn nguyên tem mác.',
        shipping: 'Miễn phí vận chuyển toàn quốc cho tất cả đơn hàng từ 500.000₫. Giao nhanh 2h đối với nội thành Hà Nội & TP.HCM. Thời gian giao hàng liên tỉnh 2-3 ngày.'
      },
      cosmetics: {
        name: 'Mỹ phẩm & Làm đẹp',
        businessName: 'Smax Beauty & Cosmetics',
        hours: '08:30 - 21:30 hàng ngày',
        desc: 'Phân phối mỹ phẩm chính hãng Hàn Quốc, Nhật Bản và dược mỹ phẩm chăm sóc da chuyên sâu chuẩn y khoa.',
        contact: 'Hotline: 1900 8989 | Email: beauty@smax.vn | Tư vấn da liễu: 0977.654.321',
        payments: 'Chuyển khoản VietQR, Tiền mặt COD khi nhận hàng, Thẻ tín dụng Visa/Master',
        returnPolicy: 'Đổi trả trong vòng 7 ngày nếu sản phẩm gây kích ứng da có xác nhận y tế hoặc bao bì lỗi do vận chuyển.',
        shipping: 'Freeship toàn quốc đơn từ 300.000₫. Tặng kèm bộ kit mẫu thử minisize cho mỗi đơn hàng.'
      },
      fnb: {
        name: 'F&B - Ẩm thực & Nhà hàng',
        businessName: 'Nhà Hàng & Cafe Smax Bistro',
        hours: '07:00 - 23:00 hàng ngày',
        desc: 'Hệ thống nhà hàng ẩm thực Á - Âu hiện đại, không gian ấm cúng, phục vụ đặt bàn và giao món nóng tận nơi.',
        contact: 'Hotline đặt bàn: 1900 2233 | Email: booking@smaxbistro.vn | Quản lý: 0966.333.444',
        payments: 'Quét mã VietQR tại bàn, Tiền mặt, Ví Momo/ZaloPay, Thẻ POS ngân hàng',
        returnPolicy: 'Cam kết hoàn tiền 100% hoặc đổi món mới ngay lập tức nếu chất lượng món ăn không đạt yêu cầu.',
        shipping: 'Giao nóng trong vòng 30 phút bán kính 5km. Miễn phí giao hàng cho hóa đơn từ 200.000₫.'
      },
      real_estate: {
        name: 'Bất động sản & Nhà đất',
        businessName: 'Smax Real Estate & Property',
        hours: '08:00 - 20:00 (Tư vấn trực tuyến 24/7)',
        desc: 'Tư vấn đầu tư, mua bán và cho thuê căn hộ chung cư cao cấp, biệt thự nghỉ dưỡng và shophouse thương mại.',
        contact: 'Hotline chuyên viên: 0988.888.999 | Email: batdongsan@smax.vn | VP: Tòa Landmark 81',
        payments: 'Chuyển khoản tài khoản chủ đầu tư, Đặt cọc giữ chỗ qua VietQR, Hỗ trợ vay ngân hàng 0% lãi suất',
        returnPolicy: 'Chính sách hoàn cọc linh hoạt theo hợp đồng nguyên tắc trong vòng 7 ngày làm việc.',
        shipping: 'Hỗ trợ xe đưa đón khách hàng tham quan nhà mẫu và dự án thực tế hoàn toàn miễn phí.'
      },
      spa_clinic: {
        name: 'Spa & Thẩm mỹ viện',
        businessName: 'Smax Beauty Spa & Wellness Clinic',
        hours: '09:00 - 21:00 (Từ Thứ 2 đến Chủ nhật)',
        desc: 'Viện chăm sóc da chuẩn y khoa, trị liệu thư giãn chuyên sâu và trẻ hóa thẩm mỹ công nghệ cao.',
        contact: 'Hotline đặt lịch hẹn: 1900 5566 | Email: spa@smax.vn | Zalo đặt hẹn: 0911.222.333',
        payments: 'Chuyển khoản VietQR, Thẻ tín dụng trả góp 0%, Tiền mặt tại quầy lễ tân',
        returnPolicy: 'Cam kết hiệu quả điều trị bằng văn bản. Hoàn tiền 100% nếu không đạt kết quả theo đúng phác đồ.',
        shipping: 'Dịch vụ thực hiện tại cơ sở. Tặng Voucher 200.000₫ cho khách hàng đặt lịch hẹn online trước.'
      }
    };

    const data = presetData[presetKey];
    if (!data) return;

    // 1. Update UI selection cards in Step 2
    document.querySelectorAll('.smax-industry-preset-card').forEach(card => {
      const isMatch = card.dataset.preset === presetKey;
      card.classList.toggle('active', isMatch);
      card.style.border = isMatch ? '2px solid #ea580c' : '1px solid #e6ebef';
      card.style.boxShadow = isMatch ? '0 2px 4px rgba(234,88,12,0.1)' : 'none';
      const badge = card.querySelector('.smax-preset-badge');
      if (badge) badge.style.display = isMatch ? 'block' : 'none';
    });

    // 2. Populate Step 2 input fields
    const elName = document.getElementById('step2BusinessName');
    const elHours = document.getElementById('step2HoursOfOperation');
    const elDesc = document.getElementById('step2BusinessDescription');
    const elContact = document.getElementById('step2ContactInfo');
    const elPayments = document.getElementById('step2PaymentMethods');
    const elReturn = document.getElementById('step2ReturnPolicy');
    const elShipping = document.getElementById('step2DeliveryInfo');

    if (elName) elName.value = data.businessName;
    if (elHours) elHours.value = data.hours;
    if (elDesc) elDesc.value = data.desc;
    if (elContact) elContact.value = data.contact;
    if (elPayments) elPayments.value = data.payments;
    if (elReturn) elReturn.value = data.returnPolicy;
    if (elShipping) elShipping.value = data.shipping;

    // 3. Automatically sync 3 Custom Skills for Step 4 according to industry
    this.customSkills = this.getIndustrySkills(presetKey);
    this.renderCustomSkillsList();

    // 4. Also apply underlying AI state preset
    this.applyPreset(presetKey);

    // 5. Toast notification
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast('✨ Đã áp dụng mẫu kịch bản & 3 Kỹ Năng ngành: ' + data.name + '!');
    }
  }

  // --- CUSTOM META SKILLS API MANAGEMENT ---
  renderCustomSkillsList() {
    const container = document.getElementById('customSkillsListContainer');
    if (!container) return;

    if (!this.customSkills || this.customSkills.length === 0) {
      container.innerHTML = '<div style="padding: 16px; text-align: center; color: #8c9ba5; font-size: 13px; background: #fff; border: 1px dashed #cbd5e1; border-radius: 8px;">Chưa có Kỹ Năng tùy chỉnh nào. Bấm <strong>+ Thêm Kỹ Năng Mới</strong> để tạo!</div>';
      return;
    }

    const channelLabels = {
      all: 'Tất cả kênh',
      messenger: 'Facebook Messenger',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      webchat: 'Webchat'
    };

    container.innerHTML = this.customSkills.map(s => `
      <div style="background: #ffffff; border: 1px solid ${s.enabled ? '#fed7aa' : '#e2e8f0'}; border-radius: 10px; padding: 12px 16px; box-shadow: 0 1px 2px rgba(0,0,0,0.02); transition: all 0.2s ease;">
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 12px; margin-bottom: 6px;">
          <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
            <code style="font-size: 12.5px; font-weight: 700; color: #9a3412; background: #ffedd5; padding: 2px 8px; border-radius: 4px;">${s.title}</code>
            ${s.name ? `<strong style="font-size: 13px; color: #0f1835;">${s.name}</strong>` : ''}
            <span style="font-size: 11px; color: #475569; background: #f1f5f9; padding: 2px 6px; border-radius: 4px;">${channelLabels[s.channel] || 'Tất cả'}</span>
            ${s.enabled ? '<span style="font-size: 11px; color: #16a34a; font-weight: 600;">● Đang bật</span>' : '<span style="font-size: 11px; color: #94a3b8;">○ Đã tắt</span>'}
          </div>
          
          <div style="display: flex; align-items: center; gap: 8px;">
            <button type="button" onclick="app.openEditSkillModal('${s.id}')" title="Chỉnh sửa kỹ năng" style="background: none; border: none; cursor: pointer; color: #0284c7; font-size: 12px; font-weight: 600; padding: 3px 6px; border-radius: 4px;">
              Sửa
            </button>
            <button type="button" onclick="app.deleteSkill('${s.id}')" title="Xóa kỹ năng" style="background: none; border: none; cursor: pointer; color: #e11d48; font-size: 12px; font-weight: 600; padding: 3px 6px; border-radius: 4px;">
              Xóa
            </button>
            <label class="smax-switch" style="margin-left: 2px;">
              <input type="checkbox" ${s.enabled ? 'checked' : ''} onchange="app.toggleSkillStatus('${s.id}', this.checked)">
              <span class="smax-switch-slider"></span>
            </label>
          </div>
        </div>

        <div style="font-size: 12px; color: #334155; margin-bottom: 6px; line-height: 1.4;">
          <strong style="color: #0f1835;">Điều kiện kích hoạt:</strong> ${s.description}
        </div>
        <div style="font-size: 11.5px; color: #475569; background: #f8fafc; border: 1px solid #e2e8f0; border-left: 3px solid #cbd5e1; padding: 8px 12px; border-radius: 6px; font-family: inherit; line-height: 1.45; white-space: pre-line; max-height: 90px; overflow-y: auto; scrollbar-width: thin;">
          ${s.skill}
        </div>
      </div>
    `).join('');
  }

  openAddSkillModal() {
    document.getElementById('skillModalTitle').innerText = 'Tạo Kỹ Năng Mới Cho AI (Agent Skill)';
    document.getElementById('skillModalEditingId').value = '';
    document.getElementById('skillInputTitle').value = '';
    document.getElementById('skillSelectChannel').value = 'all';
    document.getElementById('skillInputDescription').value = '';
    document.getElementById('skillInputContent').value = '';
    
    const backdrop = document.getElementById('skillModalBackdrop');
    if (backdrop) backdrop.style.display = 'flex';
  }

  openEditSkillModal(skillId) {
    const s = this.customSkills.find(item => item.id === skillId);
    if (!s) return;

    document.getElementById('skillModalTitle').innerText = 'Chỉnh Sửa Kỹ Năng AI: ' + s.title;
    document.getElementById('skillModalEditingId').value = s.id;
    document.getElementById('skillInputTitle').value = s.title;
    document.getElementById('skillSelectChannel').value = s.channel || 'all';
    document.getElementById('skillInputDescription').value = s.description || '';
    document.getElementById('skillInputContent').value = s.skill || '';

    const backdrop = document.getElementById('skillModalBackdrop');
    if (backdrop) backdrop.style.display = 'flex';
  }

  closeSkillModal() {
    const backdrop = document.getElementById('skillModalBackdrop');
    if (backdrop) backdrop.style.display = 'none';
  }

  saveSkill() {
    const editingId = document.getElementById('skillModalEditingId').value;
    let title = document.getElementById('skillInputTitle').value.trim();
    const channel = document.getElementById('skillSelectChannel').value;
    const description = document.getElementById('skillInputDescription').value.trim();
    const skillContent = document.getElementById('skillInputContent').value.trim();

    if (!title) {
      alert('Vui lòng nhập Mã định danh kỹ năng (title)!');
      document.getElementById('skillInputTitle').focus();
      return;
    }

    // Format title: lowercase, replace spaces with hyphens
    title = title.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

    if (!description) {
      alert('Vui lòng nhập Ngữ cảnh / Điều kiện kích hoạt kỹ năng!');
      document.getElementById('skillInputDescription').focus();
      return;
    }

    if (!skillContent) {
      alert('Vui lòng nhập Nội dung chỉ thị & Kịch bản thực thi cho AI!');
      document.getElementById('skillInputContent').focus();
      return;
    }

    if (editingId) {
      const idx = this.customSkills.findIndex(s => s.id === editingId);
      if (idx !== -1) {
        this.customSkills[idx].title = title;
        this.customSkills[idx].channel = channel;
        this.customSkills[idx].description = description;
        this.customSkills[idx].skill = skillContent;
      }
      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast(`✓ Đã cập nhật kỹ năng: ${title}`);
      }
    } else {
      const newSkill = {
        id: 'skill-' + Date.now(),
        title: title,
        channel: channel,
        description: description,
        skill: skillContent,
        enabled: true
      };
      this.customSkills.unshift(newSkill);
      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast(`✓ Đã tạo mới kỹ năng: ${title}`);
      }
    }

    this.renderCustomSkillsList();
    this.closeSkillModal();
  }

  deleteSkill(skillId) {
    const s = this.customSkills.find(item => item.id === skillId);
    if (!s) return;

    if (confirm(`Bạn có chắc chắn muốn xóa kỹ năng: "${s.title}"?`)) {
      this.customSkills = this.customSkills.filter(item => item.id !== skillId);
      this.renderCustomSkillsList();
      if (typeof tabsApp !== 'undefined') {
        tabsApp.showToast(`Đã xóa kỹ năng: ${s.title}`);
      }
    }
  }

  toggleSkillStatus(skillId, isEnabled) {
    const s = this.customSkills.find(item => item.id === skillId);
    if (!s) return;
    s.enabled = isEnabled;
    this.renderCustomSkillsList();
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(`Đã ${isEnabled ? 'bật' : 'tắt'} kỹ năng: ${s.title}`);
    }
  }
}

// Global app instance
window.app = new SmaxStudioApp();
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if (window.app && !window.app.initialized) {
        window.app.init();
      }
    });
  } else {
    if (window.app && !window.app.initialized) {
      window.app.init();
    }
  }
}
