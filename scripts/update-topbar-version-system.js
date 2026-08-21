const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../src/js/app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Add systemVersion to constructor
const constructorStateTarget = `    // Dashboard View State
    this.dashboardViewMode = 'grid'; // 'grid' | 'table'
    this.currentChannelFilter = 'all'; // 'all' | 'active' | 'facebook' | 'whatsapp'
    this.activeQuickChatAgent = null;`;

const constructorStateReplacement = `    // System Version & Dashboard View State
    this.systemVersion = 'advance'; // 'advance' | 'standard'
    this.totalSteps = 8;
    this.dashboardViewMode = 'grid'; // 'grid' | 'table'
    this.currentChannelFilter = 'all'; // 'all' | 'active' | 'facebook' | 'whatsapp'
    this.activeQuickChatAgent = null;`;

code = code.replace(constructorStateTarget, constructorStateReplacement);

// 2. Add setSystemVersion method
const switchDashboardTarget = `  // --- DASHBOARD: VIEW SWITCHER & FILTERING ---
  switchDashboardViewMode(mode) {`;

const switchDashboardReplacement = `  // --- TOPBAR: SYSTEM VERSION SWITCHER (STANDARD VS ADVANCE) ---
  setSystemVersion(version) {
    this.systemVersion = version; // 'standard' | 'advance'
    this.totalSteps = version === 'standard' ? 5 : 8;

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
        ? 'Thiết lập trợ lý AI tinh gọn chuẩn Meta (5 bước đơn giản, nhanh chóng)'
        : 'Thiết lập trợ lý AI tiếp đón và tự động hóa quy trình bán hàng trên Facebook & WhatsApp';
    }

    // 3. Switch Stepper Layouts
    const stepperAdvance = document.getElementById('stepperAdvance');
    const stepperStandard = document.getElementById('stepperStandard');
    if (stepperAdvance) stepperAdvance.style.display = version === 'advance' ? 'grid' : 'none';
    if (stepperStandard) stepperStandard.style.display = version === 'standard' ? 'grid' : 'none';

    // 4. Toast Notification
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(\`Đã chuyển sang \${versionLabel} (\${version === 'standard' ? '5 bước tinh gọn' : '8 bước nâng cao'})\`);
    }

    // 5. Re-render views
    this.renderAgentsGrid();
    this.renderTableRows();
  }

  // --- DASHBOARD: VIEW SWITCHER & FILTERING ---
  switchDashboardViewMode(mode) {`;

code = code.replace(switchDashboardTarget, switchDashboardReplacement);

// 3. Update openCreateWizard and openEditWizard
const openCreateWizardTarget = `  openCreateWizard() {
    this.editingAgentId = null;
    this.state.channel.connected = false; // Reset to empty state matching Image 1
    this.applyPreset('fashion');
    const titleEl = document.getElementById('wizardModeTitle');
    if (titleEl) titleEl.innerText = 'Tạo Mới Trợ Lý Meta Business Agent';
    this.renderStep1ChannelView();
    this.goToStep(1);
    this.openWizardModal();
  }`;

const openCreateWizardReplacement = `  openCreateWizard() {
    this.editingAgentId = null;
    this.state.channel.connected = false;
    this.applyPreset('fashion');
    const titleEl = document.getElementById('wizardModeTitle');
    if (titleEl) {
      titleEl.innerText = this.systemVersion === 'standard'
        ? 'Tạo Mới Meta Business Agent (Bản Standard - 5 Bước)'
        : 'Tạo Mới Meta Business Agent (Bản Advance - 8 Bước)';
    }

    // Ensure correct stepper visible
    const stepperAdvance = document.getElementById('stepperAdvance');
    const stepperStandard = document.getElementById('stepperStandard');
    if (stepperAdvance) stepperAdvance.style.display = this.systemVersion === 'advance' ? 'grid' : 'none';
    if (stepperStandard) stepperStandard.style.display = this.systemVersion === 'standard' ? 'grid' : 'none';

    this.renderStep1ChannelView();
    this.goToStep(1);
    this.openWizardModal();
  }`;

code = code.replace(openCreateWizardTarget, openCreateWizardReplacement);

// 4. Update renderStep to support mapped 5-step standard vs 8-step advance
const renderStepTarget = `  renderStep(stepNumber) {
    document.querySelectorAll('.smax-step-item').forEach(item => {
      const step = parseInt(item.dataset.step, 10);
      item.classList.toggle('active', step === stepNumber);
      item.classList.toggle('completed', step < stepNumber);
    });

    document.querySelectorAll('.smax-step-panel').forEach(panel => {
      const step = parseInt(panel.dataset.step, 10);
      panel.classList.toggle('active', step === stepNumber);
    });

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
    if (elCounter) elCounter.innerText = \`Bước \${stepNumber} / \${this.totalSteps}\`;

    document.querySelector('.smax-wizard-modal-body')?.scrollTo({ top: 0, behavior: 'smooth' });

    if (stepNumber === 8) {
      this.initPlaygroundIfEmpty();
    }
  }`;

const renderStepReplacement = `  renderStep(stepNumber) {
    const isStandard = this.systemVersion === 'standard';
    const activeStepper = isStandard ? document.getElementById('stepperStandard') : document.getElementById('stepperAdvance');
    
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
    if (isStandard && stepNumber === 5) {
      targetPanelStep = 8; // Step 5 in standard maps to Panel 8 (Playground & Publish)
    }

    document.querySelectorAll('.smax-step-panel').forEach(panel => {
      const step = parseInt(panel.dataset.step, 10);
      panel.classList.toggle('active', step === targetPanelStep);
    });

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
    if (elCounter) elCounter.innerText = \`Bước \${stepNumber} / \${this.totalSteps}\`;

    document.querySelector('.smax-wizard-modal-body')?.scrollTo({ top: 0, behavior: 'smooth' });

    if (targetPanelStep === 8) {
      this.initPlaygroundIfEmpty();
    }
  }`;

code = code.replace(renderStepTarget, renderStepReplacement);

fs.writeFileSync(appPath, code, 'utf8');
console.log('src/js/app.js updated with Topbar System Version Switcher and Dynamic 5-step Standard / 8-step Advance Stepper successfully!');
