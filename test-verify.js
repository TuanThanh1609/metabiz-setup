const fs = require('fs');
const path = require('path');

console.log('--- RUNNING 8-STEP CLEAN NO-CODE SMAX LAYOUT VERIFICATION ---');

// 1. Check file existence
const requiredFiles = [
  'package.json',
  'vercel.json',
  'src/index.html',
  'src/css/smax-theme.css',
  'src/css/wizard.css',
  'src/css/playground.css',
  'src/css/tabs.css',
  'src/js/presets.js',
  'src/js/smax-bridge.js',
  'src/js/simulator.js',
  'src/js/tabs.js',
  'src/js/app.js'
];

let allExist = true;
requiredFiles.forEach(f => {
  const fullPath = path.join(__dirname, f);
  if (fs.existsSync(fullPath)) {
    console.log(`[PASS] File exists: ${f} (${fs.statSync(fullPath).size} bytes)`);
  } else {
    console.error(`[FAIL] Missing file: ${f}`);
    allExist = false;
  }
});

// 2. Validate HTML contains all 8 clean steps
const htmlContent = fs.readFileSync(path.join(__dirname, 'src/index.html'), 'utf8');
const steps = [
  'Kênh & Kết nối',
  'Tính cách của AI',
  'Thư viện kiến thức',
  'Chủ đề nên tránh & Tùy chỉnh',
  'Kỹ năng',
  'Kịch bản bám đuổi',
  'Kịch bản đặc biệt',
  'Thử nghiệm & Xuất bản'
];

steps.forEach((st, idx) => {
  if (htmlContent.includes(st)) {
    console.log(`[PASS] Step ${idx + 1}: ${st} found in HTML`);
  } else {
    console.error(`[FAIL] Missing Step ${idx + 1}: ${st}`);
    allExist = false;
  }
});

// 3. Validate Google Sheet, Google Drive, Shopee, POS Grid, 85% Modal, Smax Block Selector & Channel Connect
const sources = [
  'Tích hợp dữ liệu từ Google Sheet',
  'Tích hợp tài liệu & Ảnh từ Google Drive',
  'Đồng bộ trực tiếp từ Gian hàng Shopee qua Link',
  'chkUsePresetTemplate',
  'presetSectionWrapper',
  'chkTogglePos',
  'gridEcomPos',
  'KiotViet',
  'Haravan',
  'Shopify',
  'WooCommerce',
  'wizardModalBackdrop',
  'wizardModal',
  'btnCloseWizardModal',
  'smax-step-top-line',
  'smax-step-title-line',
  'boxEmptyChannel',
  'btnOpenConnectChannelModal',
  'btnAddFollowupBtn',
  'followupTimelineContainer',
  'audienceOptionAll',
  'audienceOptionFirstTime',
  'audienceOptionAdClickers',
  'audienceOptionTeamOnly',
  'selectScheduleMode',
  'customScheduleDetailBox',
  'selectGameType',
  'gamePreviewBox',
  'chkWebviewOrder',
  'selectWebviewType',
  'selectWebviewPosPlatform',
  'smax-webview-mockup-frame',
  'btnWebviewPreviewSubmit',
  'chkMetaCapiSync',
  'selectMetaDatasetId',
  'chkEventLead',
  'chkEventPurchase',
  'chkAiInsight',
  'chkInsightLeadScoring',
  'chkInsightInterestedProducts',
  'chkInsightSpecificNeeds',
  'chkInsightObjections',
  'chkInsightObjectionHandling',
  'previewLeadInsightCard',
  'handoverLeadBlockPicker',
  // Tab 2: Log Kiểm Soát AI
  'aiLogView',
  'Log Kiểm Soát AI',
  'aiLogTrendChart',
  'logTableSearchInput',
  'aiLogTableBody',
  'LEAD SCORING',
  // Tab 3: Kho Tri Thức & Meta Catalog
  'knowledgeCatalogView',
  'Kho Tri Thức & Meta Catalog',
  'knowledgeSourcesTableBody',
  'catalogProductsTableBody',
  'Brand Guardrails',
  // Tab 4: Thống Kê & Báo Cáo
  'analyticsReportsView',
  'Thống Kê & Báo Cáo Chuyển Đổi',
  'capiTrendChart',
  'leadScoreDonutChart',
  'analyticsFanpageTableBody',
  // Tab 5: Quản Lý Leads
  'leadsManagementView',
  'Quản Lý Leads & Khách Hàng Tiềm Năng',
  'leadsTrendChart',
  'leadsTableSearchInput',
  'leadsTableBody',
  // Tab 6: Quản Lý Đơn Hàng
  'ordersManagementView',
  'Quản Lý Đơn Hàng & POS Sync',
  'ordersTrendChart',
  'ordersTableSearchInput',
  'ordersTableBody',
  'webviewReceiptModalBackdrop',
  'receiptModalOrderId',
  'receiptModalCustomerName',
  'receiptModalTotal',
  // Tab 1 Modern Bento Grid & Quick Test Chat Drawer
  'agentsGridContainer',
  'agentsTableContainer',
  'btnViewModeGrid',
  'btnViewModeTable',
  'quickChatDrawer',
  'quickChatInput',
  // Topbar Version Switcher & Dual Stepper
  'topMenuMetaStandard',
  'topMenuMetaAdvance',
  'stepperAdvance',
  'stepperStandard',
  // Human-in-the-loop Teach AI & Few-Shot Q&A Overrides (3 Touchpoints)
  'teachAiModalBackdrop',
  'correctionsTableBody',
  'statTotalCorrections',
  'statActiveCorrections',
  'statLogCorrections',
  'correctionsTableSearchInput',
  'textareaTeachIdealAnswer',
  // Standard 6-Step Flow & Standard Skills Step
  'smax-stepper-6-cols',
  'step5StandardContainer',
  'stdSkillLead',
  'stdSkillOrder',
  'stdSkillFollowup',
  'selectStdFollowupTime',
  'textareaStdFollowupMsg',
  'stdSkillHandoff',
  'selectStdHandoffResume',
  // Quick Setup Step 2 AI Comment Mechanism Note
  'AI sẽ đọc nội dung bài post và nội dung khách hàng Comment, để tạo ra câu trả lời và gửi tin nhắn phù hợp',
  // Quick Setup Onboarding Module & Customer Journey (7 Steps & 5 Sidebar Tabs)
  'quick-setup.css',
  'js/quick-setup.js',
  'topMenuQuickSetup',
  'quickSetupSidebar',
  'quickSetupContentPane',
  'qsWizardView',
  'qsStepperContainer',
  'qsStep1Panel',
  'qsBrandName',
  'qsIndustrySelect',
  // Step 1: Add Channel Centered Button & Modal Popup (Matching Image)
  'btnQsOpenAddChannelModal',
  'qsAddChannelModalBackdrop',
  'btnQsCloseAddChannelModal',
  'qsAcItem_facebook',
  'qsAcItem_instagram',
  'qsAcItem_whatsapp',
  'qsAcItem_zalo_oa',
  'qsAddChannelSearchInput',
  'qsBtnConnectAccount',
  'qsModalPagesListContainer',
  'qsSelectedPagesSection',
  'qsConnectedPagesGrid',
  'qsSelectedPagesCountBadge',
  'qsPageSummaryBox',
  'qsStep2Panel',
  'qsWelcomeMessage',
  'qsGenAiProvider',
  'qsGenAiApiKey',
  // Step 2: AI Comment-to-Inbox Card & Note
  'qsAiCommentCard',
  'qsAiCommentMechanismNote',
  'chkQsAiCommentReply',
  'chkQsAiCommentInbox',
  'qsStep3Panel',
  'qsSkillLeadCapture',
  'qsSkillAutoOrder',
  'qsPosProvider',
  'qsStep4Panel',
  'qsFollowupTimeline',
  'qsMinigameType',
  'qsStep5Panel',
  'qsWebviewOrderConfirm',
  'qsUpsaleTimeline',
  'qsStep6Panel',
  'qsInsightLeadScoring',
  'qsInsightObjections',
  'qsMetaCapiToggle',
  'qsStep7Panel',
  'qsJourneyMap',
  'qsChatSimulator',
  'qsBtnActivateAll',
  'qsOverviewView',
  'qsScenarioLogView',
  'qsLogHourlyChart',
  'qsConversionView',
  'qsTrendChart',
  'qsAiInsightView',
  'qsLeadScoreDonut',
  'qsChannelManageView'
];

sources.forEach(src => {
  if (htmlContent.includes(src)) {
    console.log(`[PASS] UI element / keyword: ${src}`);
  } else {
    console.error(`[FAIL] Missing UI element / keyword: ${src}`);
    allExist = false;
  }
});

// 4. Validate Presets
const presetsContent = fs.readFileSync(path.join(__dirname, 'src/js/presets.js'), 'utf8');
const window = {};
eval(presetsContent);
const presets = window.INDUSTRY_PRESETS;

if (Object.keys(presets).length === 5) {
  console.log(`[PASS] All 5 Industry Presets loaded with clean Vietnamese.`);
} else {
  console.error(`[FAIL] Expected 5 presets, found:`, Object.keys(presets).length);
  allExist = false;
}

// 5. Simulator test
const simContent = fs.readFileSync(path.join(__dirname, 'src/js/simulator.js'), 'utf8');
eval(simContent);
const sim = window.metaAgentSimulator;

sim.resetSession();
const chatRes = sim.processUserMessage("Mình muốn đặt áo polo size XL ship về 45 Cầu Giấy HN sđt 0912345678", { persona: presets.fashion.persona, handover: presets.fashion.handover });
if (chatRes.intent === 'Tự động tạo đơn hàng' && chatRes.extractedEntities.phone === '0912345678') {
  console.log(`[PASS] Chat Simulator friendly pure Vietnamese order flow working.`);
} else {
  console.error(`[FAIL] Chat Simulator failed:`, chatRes);
  allExist = false;
}

if (allExist) {
  console.log('--- ALL 8-STEP CLEAN CHECKS PASSED (100%) ---');
  process.exit(0);
} else {
  console.error('--- SOME CHECKS FAILED ---');
  process.exit(1);
}
