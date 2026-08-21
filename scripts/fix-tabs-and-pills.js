const fs = require('fs');
const path = require('path');

// 1. UPDATE src/js/tabs.js
const tabsPath = path.join(__dirname, '../src/js/tabs.js');
let tabsCode = fs.readFileSync(tabsPath, 'utf8');

// Ensure filterLogByCategory updates active class
const filterLogTarget = `  filterLogByCategory(category) {
    if (category === 'all') {
      this.renderLogTable(this.logData);
      return;
    }`;

const filterLogReplacement = `  filterLogByCategory(category) {
    document.querySelectorAll('.smax-log-filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-filter') === category);
    });

    if (category === 'all') {
      this.renderLogTable(this.logData);
      return;
    }`;

tabsCode = tabsCode.replace(filterLogTarget, filterLogReplacement);

// Add the complete Few-Shot & Teach AI methods right before closeWebviewReceiptModal
const closeWebviewTarget = `  closeWebviewReceiptModal() {
    const backdrop = document.getElementById('webviewReceiptModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }`;

const methodsToAdd = `  closeWebviewReceiptModal() {
    const backdrop = document.getElementById('webviewReceiptModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  // ==========================================================================
  // TAB 3: FEW-SHOT Q&A OVERRIDES (HUẤN LUYỆN & HIỆU CHỈNH CÂU TRẢ LỜI)
  // ==========================================================================
  renderCorrectionsTable(dataToRender = null) {
    const tbody = document.getElementById('correctionsTableBody');
    if (!tbody) return;

    const data = dataToRender || this.responseCorrectionsList;
    tbody.innerHTML = '';

    // Update mini stats
    const totalEl = document.getElementById('statTotalCorrections');
    const activeEl = document.getElementById('statActiveCorrections');
    const logEl = document.getElementById('statLogCorrections');
    if (totalEl) totalEl.innerText = \`\${this.responseCorrectionsList.length} cặp\`;
    if (activeEl) {
      const activeCount = this.responseCorrectionsList.filter(c => c.status === 'active').length;
      activeEl.innerText = \`\${activeCount} cặp (\${Math.round(activeCount / (this.responseCorrectionsList.length || 1) * 100)}%)\`;
    }
    if (logEl) {
      const logCount = this.responseCorrectionsList.filter(c => c.source === 'log').length;
      logEl.innerText = \`\${logCount} cặp\`;
    }

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 24px; color: #94a3b8;">Không tìm thấy câu hỏi huấn luyện nào phù hợp.</td></tr>';
      return;
    }

    data.forEach(item => {
      const tr = document.createElement('tr');
      const isChecked = item.status === 'active' ? 'checked' : '';

      let sourceBadge = '';
      if (item.source === 'log') {
        sourceBadge = \`<span style="background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 100px; border: 1px solid #bfdbfe;">Log #\${item.sourceLogId || ''}</span>\`;
      } else {
        sourceBadge = '<span style="background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px;">Nhập tay</span>';
      }

      tr.innerHTML = \`
        <td>
          <div style="font-weight: 700; color: #0f1835; font-size: 13px; margin-bottom: 2px;">\${item.userQuery}</div>
          \${item.ruleNote ? \`<div style="font-size: 11.5px; color: #64748b; font-style: italic;">Quy tắc: \${item.ruleNote}</div>\` : ''}
        </td>
        <td>
          <div style="font-size: 12.5px; color: #064e3b; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 8px 12px; border-radius: 8px; line-height: 1.45;">
            \${item.idealAnswer}
          </div>
        </td>
        <td>
          <span style="font-weight: 600; color: #334155; font-size: 12px;">\${item.agentName}</span>
        </td>
        <td>\${sourceBadge}</td>
        <td style="text-align: center;">
          <label class="smax-switch" style="transform: scale(0.85); margin: 0 auto;">
            <input type="checkbox" \${isChecked} onchange="tabsApp.toggleCorrectionStatus('\${item.id}')">
            <span class="smax-slider"></span>
          </label>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
            <button class="smax-icon-btn" title="Chỉnh sửa câu trả lời" onclick="tabsApp.openEditCorrectionModal('\${item.id}')" style="width: 28px; height: 28px; border: 1px solid #e2e8f0; background: #ffffff;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="smax-icon-btn" title="Xóa" onclick="tabsApp.deleteCorrection('\${item.id}')" style="width: 28px; height: 28px; border: 1px solid #e2e8f0; background: #ffffff;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      \`;

      tbody.appendChild(tr);
    });
  }

  toggleCorrectionStatus(id) {
    const item = this.responseCorrectionsList.find(c => c.id === id);
    if (!item) return;
    item.status = item.status === 'active' ? 'inactive' : 'active';
    this.renderCorrectionsTable();
    this.showToast(\`Đã \${item.status === 'active' ? 'bật' : 'tắt'} áp dụng câu trả lời huấn luyện!\`);
  }

  deleteCorrection(id) {
    const item = this.responseCorrectionsList.find(c => c.id === id);
    if (!item) return;
    if (confirm(\`Bạn có chắc muốn xóa câu trả lời huấn luyện cho: "\${item.userQuery}"?\`)) {
      this.responseCorrectionsList = this.responseCorrectionsList.filter(c => c.id !== id);
      this.renderCorrectionsTable();
      this.showToast('Đã xóa câu hỏi huấn luyện thành công!');
    }
  }

  filterCorrectionsByAgent(agentId) {
    if (agentId === 'all') {
      this.renderCorrectionsTable(this.responseCorrectionsList);
      return;
    }
    const filtered = this.responseCorrectionsList.filter(c => c.agentId === agentId);
    this.renderCorrectionsTable(filtered);
  }

  filterCorrectionsTable(query) {
    if (!query) {
      this.renderCorrectionsTable(this.responseCorrectionsList);
      return;
    }
    const q = query.toLowerCase();
    const filtered = this.responseCorrectionsList.filter(c => {
      return (c.userQuery || '').toLowerCase().includes(q) ||
             (c.idealAnswer || '').toLowerCase().includes(q) ||
             (c.agentName || '').toLowerCase().includes(q) ||
             (c.ruleNote || '').toLowerCase().includes(q);
    });
    this.renderCorrectionsTable(filtered);
  }

  // ==========================================================================
  // TEACH AI MODAL (HUMAN-IN-THE-LOOP FEEDBACK)
  // ==========================================================================
  openTeachAiModal(logId, correctionId = null) {
    const backdrop = document.getElementById('teachAiModalBackdrop');
    if (!backdrop) return;

    const inputLogId = document.getElementById('inputTeachLogId');
    const inputCorrId = document.getElementById('inputTeachCorrectionId');
    const selectAgent = document.getElementById('selectTeachAgent');
    const textareaQuery = document.getElementById('textareaTeachUserQuery');
    const displayWrong = document.getElementById('displayTeachWrongAnswer');
    const groupWrong = document.getElementById('teachWrongAnswerGroup');
    const textareaIdeal = document.getElementById('textareaTeachIdealAnswer');
    const inputRule = document.getElementById('inputTeachRuleNote');

    if (inputLogId) inputLogId.value = logId || '';
    if (inputCorrId) inputCorrId.value = correctionId || '';

    if (logId) {
      const log = this.logData.find(l => l.id === logId);
      if (log) {
        if (selectAgent) selectAgent.value = log.agentId || 'agent-1';
        if (textareaQuery) textareaQuery.value = log.userQuery || log.summary || '';
        if (displayWrong) displayWrong.innerText = log.aiAnswer || log.summary || '';
        if (groupWrong) groupWrong.style.display = 'block';
        if (textareaIdeal) textareaIdeal.value = log.idealAnswer || log.trainedCorrection || '';
        if (inputRule) inputRule.value = log.ruleNote || '';
      }
    } else if (correctionId) {
      const item = this.responseCorrectionsList.find(c => c.id === correctionId);
      if (item) {
        if (selectAgent) selectAgent.value = item.agentId || 'agent-1';
        if (textareaQuery) textareaQuery.value = item.userQuery || '';
        if (groupWrong) groupWrong.style.display = 'none';
        if (textareaIdeal) textareaIdeal.value = item.idealAnswer || '';
        if (inputRule) inputRule.value = item.ruleNote || '';
      }
    } else {
      // Add new manual correction
      if (selectAgent) selectAgent.value = 'agent-1';
      if (textareaQuery) textareaQuery.value = '';
      if (groupWrong) groupWrong.style.display = 'none';
      if (textareaIdeal) textareaIdeal.value = '';
      if (inputRule) inputRule.value = '';
    }

    backdrop.classList.add('active');
  }

  openAddCorrectionModal() {
    this.openTeachAiModal(null, null);
  }

  openEditCorrectionModal(id) {
    this.openTeachAiModal(null, id);
  }

  closeTeachAiModal() {
    document.getElementById('teachAiModalBackdrop')?.classList.remove('active');
  }

  saveTeachAiCorrection() {
    const logId = document.getElementById('inputTeachLogId')?.value;
    const corrId = document.getElementById('inputTeachCorrectionId')?.value;
    const agentId = document.getElementById('selectTeachAgent')?.value || 'agent-1';
    const query = document.getElementById('textareaTeachUserQuery')?.value.trim();
    const ideal = document.getElementById('textareaTeachIdealAnswer')?.value.trim();
    const rule = document.getElementById('inputTeachRuleNote')?.value.trim();
    const saveToTab3 = document.getElementById('chkTeachSaveToTab3')?.checked;

    if (!query) {
      alert('Vui lòng nhập câu hỏi / tình huống của khách hàng!');
      return;
    }
    if (!ideal) {
      alert('Vui lòng nhập câu trả lời chuẩn mong muốn (Ground Truth)!');
      return;
    }

    const agentNames = {
      'agent-1': 'Trợ lý Tư vấn Thời trang Smax',
      'agent-2': 'Chuyên viên Da liễu Smax',
      'agent-3': 'Trợ lý Đặt Món Trà Sữa',
      'agent-4': 'Chuyên viên Bất Động Sản',
      'agent-5': 'Trợ lý Thẩm Mỹ & Spa'
    };

    // 1. If originated from a log row in Tab 2, update that log row
    if (logId) {
      const log = this.logData.find(l => l.id === logId);
      if (log) {
        log.isTrained = true;
        log.idealAnswer = ideal;
        log.ruleNote = rule;
        log.trainedCorrection = ideal;
      }
      this.renderLogTable();
    }

    // 2. Add or update in responseCorrectionsList (Tab 3)
    if (saveToTab3) {
      if (corrId) {
        const item = this.responseCorrectionsList.find(c => c.id === corrId);
        if (item) {
          item.agentId = agentId;
          item.agentName = agentNames[agentId] || 'Trợ lý AI';
          item.userQuery = query;
          item.idealAnswer = ideal;
          item.ruleNote = rule;
        }
      } else {
        const newCorr = {
          id: 'cor-' + Date.now().toString().slice(-4),
          agentId: agentId,
          agentName: agentNames[agentId] || 'Trợ lý AI',
          userQuery: query,
          idealAnswer: ideal,
          ruleNote: rule,
          source: logId ? 'log' : 'manual',
          sourceLogId: logId || undefined,
          status: 'active',
          createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          createdBy: 'tuannt160990'
        };
        this.responseCorrectionsList.unshift(newCorr);
      }
      this.renderCorrectionsTable();
    }

    this.closeTeachAiModal();
    this.showToast('Đã lưu & huấn luyện câu trả lời chuẩn cho AI thành công!');
  }`;

tabsCode = tabsCode.replace(closeWebviewTarget, methodsToAdd);
fs.writeFileSync(tabsPath, tabsCode, 'utf8');
console.log('src/js/tabs.js successfully updated with all methods!');

// 2. UPDATE src/index.html with inline onclicks for filter pills
const indexPath = path.join(__dirname, '../src/index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const logPillsTarget = `          <div class="smax-log-filter-pills">
            <button class="smax-log-filter-pill active" data-filter="all">Tổng quan <span class="pill-count">11.506</span></button>
            <button class="smax-log-filter-pill" data-filter="unresolved">Chưa xử lý <span class="pill-count">1.506</span></button>
            <button class="smax-log-filter-pill" data-filter="closed">Đã chốt đơn <span class="pill-count">976</span></button>
            <button class="smax-log-filter-pill" data-filter="difficult">Câu hỏi khó <span class="pill-count">333</span></button>
            <button class="smax-log-filter-pill" data-filter="unhappy">Khách không hài lòng <span class="pill-count">196</span></button>
            <button class="smax-log-filter-pill" data-filter="handover">Cần người can thiệp <span class="pill-count">1.117</span></button>
            <button class="smax-log-filter-pill" data-filter="error">AI trả lời lỗi <span class="pill-count">178</span></button>
            <button class="smax-log-filter-pill" data-filter="processed">Đã xử lý <span class="pill-count">4.912</span></button>
          </div>`;

const logPillsReplacement = `          <div class="smax-log-filter-pills">
            <button class="smax-log-filter-pill active" data-filter="all" onclick="tabsApp.filterLogByCategory('all')">Tổng quan <span class="pill-count">11.506</span></button>
            <button class="smax-log-filter-pill" data-filter="unresolved" onclick="tabsApp.filterLogByCategory('unresolved')">Chưa xử lý <span class="pill-count">1.506</span></button>
            <button class="smax-log-filter-pill" data-filter="closed" onclick="tabsApp.filterLogByCategory('closed')">Đã chốt đơn <span class="pill-count">976</span></button>
            <button class="smax-log-filter-pill" data-filter="difficult" onclick="tabsApp.filterLogByCategory('difficult')">Câu hỏi khó <span class="pill-count">333</span></button>
            <button class="smax-log-filter-pill" data-filter="unhappy" onclick="tabsApp.filterLogByCategory('unhappy')">Khách không hài lòng <span class="pill-count">196</span></button>
            <button class="smax-log-filter-pill" data-filter="handover" onclick="tabsApp.filterLogByCategory('handover')">Cần người can thiệp <span class="pill-count">1.117</span></button>
            <button class="smax-log-filter-pill" data-filter="error" onclick="tabsApp.filterLogByCategory('error')">AI trả lời lỗi <span class="pill-count">178</span></button>
            <button class="smax-log-filter-pill" data-filter="processed" onclick="tabsApp.filterLogByCategory('processed')">Đã xử lý <span class="pill-count">4.912</span></button>
          </div>`;

indexHtml = indexHtml.replace(logPillsTarget, logPillsReplacement);
fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('src/index.html updated with inline onclicks for Tab 2 filter pills!');
