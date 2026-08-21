const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../src/js/app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Update constructor with dashboard view mode & agents data
const oldConstructorTarget = `    // Agents List
    this.agentsList = [
      {
        id: 'agent-1',
        badgeText: 'FA',
        badgeBg: '#d411d0',
        name: 'Trợ lý Tư vấn Thời trang Smax',
        subName: 'Thời trang & May mặc • Fanpage Smax Flagship',
        preset: 'fashion',
        totalAiConvs: '646 / 5,153',
        completionRate: '89.4%',
        completionSub: '349 đơn (1m 15s)',
        buyerIntentCount: '4,158',
        buyerIntentSub: '92% có nhu cầu',
        createdAt: '28/04/2026, 02:59',
        updatedAt: '07/08/2026 16:00',
        creator: 'Tuan Nguyen'
      },
      {
        id: 'agent-2',
        badgeText: 'BE',
        badgeBg: '#b41eeb',
        name: 'Chuyên viên Da liễu Smax Beauty',
        subName: 'Mỹ phẩm & Skincare • WhatsApp Cloud API',
        preset: 'cosmetics',
        totalAiConvs: '1,280 / 1,420',
        completionRate: '94.2%',
        completionSub: '820 tư vấn da',
        buyerIntentCount: '1,150',
        buyerIntentSub: '88% mua combo',
        createdAt: '05/08/2025, 10:41',
        updatedAt: '21/10/2025 04:08',
        creator: 'Tuan Nguyen'
      },
      {
        id: 'agent-3',
        badgeText: 'FB',
        badgeBg: '#c05d78',
        name: 'Trợ lý Đặt Món Trà Sữa Milky',
        subName: 'F&B Trà Sữa & Đồ Uống • Instagram Direct',
        preset: 'fnb',
        totalAiConvs: '3,840 / 4,100',
        completionRate: '96.5%',
        completionSub: '3,200 đơn món',
        buyerIntentCount: '3,750',
        buyerIntentSub: '98% đặt món',
        createdAt: '03/05/2025, 04:57',
        updatedAt: '24/04/2026 15:40',
        creator: 'Tuan Nguyen'
      },
      {
        id: 'agent-4',
        badgeText: 'RE',
        badgeBg: '#2563eb',
        name: 'Cố vấn Bất Động Sản Smax Land',
        subName: 'Bất động sản VIP • Facebook Messenger',
        preset: 'real_estate',
        totalAiConvs: '890 / 1,050',
        completionRate: '86.8%',
        completionSub: '410 lịch xem nhà',
        buyerIntentCount: '780',
        buyerIntentSub: '89% Lead nóng',
        createdAt: '26/05/2025, 04:36',
        updatedAt: '13/10/2025 11:59',
        creator: 'Tuan Nguyen'
      },
      {
        id: 'agent-5',
        badgeText: 'SP',
        badgeBg: '#059669',
        name: 'Trợ lý Tư vấn Làm Đẹp Smax Care',
        subName: 'Thẩm mỹ & Spa • Multi-channel Direct',
        preset: 'spa_clinic',
        totalAiConvs: '520 / 600',
        completionRate: '91.0%',
        completionSub: '380 booking khám',
        buyerIntentCount: '490',
        buyerIntentSub: '94% đặt hẹn',
        createdAt: '12/06/2025, 08:20',
        updatedAt: '02/08/2026 09:15',
        creator: 'Tuan Nguyen'
      }
    ];`;

const newConstructorReplacement = `    // Dashboard View State
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
        icebreakers: ['Liệu trình nâng cơ Hifu Gold', 'Bảng giá triệt lông & trẻ hóa', 'Đặt lịch hẹn cuối tuần', 'Bác sĩ chuyên khoa tư vấn']
      }
    ];`;

code = code.replace(oldConstructorTarget, newConstructorReplacement);

// 2. Update renderTableRows and add Bento Grid & Quick Test Chat methods
const oldRenderTableRowsTarget = `  renderTableRows(dataToRender = null) {
    const tbody = document.getElementById('agentTableBody');
    if (!tbody) return;

    const list = dataToRender || this.agentsList;
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = \`
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px; color: #787b83;">
            Không tìm thấy trợ lý Meta Business Agent nào.
          </td>
        </tr>
      \`;
      return;
    }

    list.forEach((agent, idx) => {
      const tr = document.createElement('tr');
      tr.innerHTML = \`
        <td style="font-weight: 500; text-align: center; color: #0a1317;">\${idx + 1}</td>
        <td>
          <div class="smax-agent-title-cell">
            <div class="smax-agent-badge-icon" style="background: \${agent.badgeBg};">
              \${agent.badgeText}
            </div>
            <div>
              <div class="smax-agent-name-text">\${agent.name}</div>
              <div style="font-size: 11.5px; color: #5d6c7b; margin-top: 1px;">\${agent.subName}</div>
            </div>
          </div>
        </td>
        <td style="font-weight: 700; color: #0064e0; font-size: 13.5px;">\${agent.totalAiConvs}</td>
        <td>
          <div style="font-weight: 700; color: #31a24c; font-size: 13.5px;">\${agent.completionRate}</div>
          <div style="font-size: 11px; color: #5d6c7b;">\${agent.completionSub}</div>
        </td>
        <td>
          <div style="font-weight: 700; color: #a121ce; font-size: 13.5px;">\${agent.buyerIntentCount}</div>
          <div style="font-size: 11px; color: #5d6c7b;">\${agent.buyerIntentSub}</div>
        </td>
        <td style="font-size: 12px; color: #1c1e21;">\${agent.createdAt}</td>
        <td style="font-size: 12px; color: #1c1e21;">\${agent.updatedAt}</td>
        <td>
          <div class="smax-creator-cell">
            <div style="width: 22px; height: 22px; border-radius: 50%; background: #0f1835; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 10px;"></div>
            <span style="font-size: 12px; font-weight: 500; color: #1c1e21;">\${agent.creator}</span>
          </div>
        </td>
        <td>
          <div class="smax-action-buttons">
            <button class="smax-action-icon-btn" title="Chỉnh sửa" onclick="app.openEditWizard('\${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="smax-action-icon-btn btn-delete" title="Xóa" onclick="app.deleteAgent('\${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </td>
      \`;
      tbody.appendChild(tr);
    });
  }

  filterTable(query) {
    const q = query.toLowerCase().trim();
    if (!q) {
      this.renderTableRows();
      return;
    }
    const filtered = this.agentsList.filter(a => 
      a.name.toLowerCase().includes(q) || (a.subName && a.subName.toLowerCase().includes(q))
    );
    this.renderTableRows(filtered);
  }`;

const newRenderTableRowsReplacement = `  // --- DASHBOARD: VIEW SWITCHER & FILTERING ---
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
      container.innerHTML = \`
        <div style="grid-column: 1 / -1; background: #fff; border: 1px solid #e8ecf2; border-radius: 16px; padding: 48px; text-align: center; color: #787b83;">
          <div style="font-size: 14px; font-weight: 600; color: #0f1835; margin-bottom: 4px;">Không tìm thấy trợ lý Meta Business Agent nào</div>
          <div style="font-size: 12.5px;">Vui lòng thử từ khóa khác hoặc bấm nút "+ Tạo mới Meta Business Agent" ở góc trên.</div>
        </div>
      \`;
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

      card.innerHTML = \`
        <div>
          <!-- Header -->
          <div class="smax-bento-header">
            <div class="smax-bento-header-left">
              <div class="smax-bento-avatar" style="background: \${agent.badgeBg};">
                \${agent.badgeText}
              </div>
              <div>
                <div class="smax-bento-name">\${agent.name}</div>
                <div class="smax-bento-tags">
                  <span class="smax-channel-tag \${channelTagClass}">\${channelTagText}</span>
                  <span style="font-size: 11.5px; color: #787b83;">• \${agent.subName}</span>
                </div>
              </div>
            </div>
            <div class="smax-bento-status-wrap">
              <span class="smax-live-pulse-dot" style="background: \${agent.status === 'active' ? '#10b981' : '#94a3b8'};"></span>
              <label class="smax-switch" title="\${statusText}">
                <input type="checkbox" \${isChecked} onchange="app.toggleAgentStatus('\${agent.id}', this.checked)">
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
                <span>\${agent.totalAiConvs}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <div class="smax-bento-metric-sub">Tự động 24/7</div>
            </div>

            <!-- Metric 2: Completion Rate -->
            <div class="smax-bento-metric-box">
              <div class="smax-bento-metric-label">Tỷ lệ hoàn thành</div>
              <div class="smax-bento-metric-val" style="color: #10b981;">
                <span>\${agent.completionRate}</span>
                <span style="font-size: 11.5px; font-weight: 600; color: #10b981;">↗ Tốt</span>
              </div>
              <div class="smax-progress-bar-wrap">
                <div class="smax-progress-bar-fill" style="width: \${agent.completionPercent || 89}%; background: #10b981;"></div>
              </div>
              <div class="smax-bento-metric-sub">\${agent.completionSub}</div>
            </div>

            <!-- Metric 3: Buyer Intent -->
            <div class="smax-bento-metric-box">
              <div class="smax-bento-metric-label">Leads Tiềm Năng</div>
              <div class="smax-bento-metric-val" style="color: #eb6553;">
                <span>\${agent.buyerIntentCount}</span>
                <span style="font-size: 11px; color: #eb6553; font-weight: 700;">88/100</span>
              </div>
              <div class="smax-bento-metric-sub">\${agent.buyerIntentSub}</div>
            </div>

            <!-- Metric 4: CSAT Rating -->
            <div class="smax-bento-metric-box">
              <div class="smax-bento-metric-label">Độ Hài Lòng (CSAT)</div>
              <div class="smax-bento-metric-val" style="color: #f59e0b;">
                <span>\${agent.csat || '4.8'} / 5.0</span>
                <span style="color: #f59e0b; font-size: 13px;">★★★★★</span>
              </div>
              <div class="smax-bento-metric-sub">Đánh giá xuất sắc</div>
            </div>
          </div>
        </div>

        <!-- Footer Action Bar -->
        <div class="smax-bento-footer">
          <button class="smax-btn-test-chat" onclick="app.openQuickChatDrawer('\${agent.id}')">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
            Chat Thử
          </button>

          <div class="smax-bento-actions-right">
            <button class="smax-action-icon-btn" title="Xem Thống Kê & Báo Cáo" onclick="app.switchView('analyticsReportsView')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
            </button>
            <button class="smax-action-icon-btn" title="Chỉnh sửa cấu hình" onclick="app.openEditWizard('\${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="smax-action-icon-btn btn-delete" title="Xóa trợ lý" onclick="app.deleteAgent('\${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </div>
      \`;

      container.appendChild(card);
    });
  }

  renderTableRows(dataToRender = null) {
    const tbody = document.getElementById('agentTableBody');
    if (!tbody) return;

    const list = dataToRender !== null ? dataToRender : this.agentsList;
    tbody.innerHTML = '';

    if (list.length === 0) {
      tbody.innerHTML = \`
        <tr>
          <td colspan="9" style="text-align: center; padding: 40px; color: #787b83;">
            Không tìm thấy trợ lý Meta Business Agent nào.
          </td>
        </tr>
      \`;
      return;
    }

    list.forEach((agent, idx) => {
      const tr = document.createElement('tr');
      const isChecked = agent.status === 'active' ? 'checked' : '';
      const channelTagClass = agent.channelType || 'facebook';

      tr.innerHTML = \`
        <td style="font-weight: 500; text-align: center; color: #0a1317;">\${idx + 1}</td>
        <td>
          <div class="smax-agent-title-cell">
            <div class="smax-agent-badge-icon" style="background: \${agent.badgeBg};">
              \${agent.badgeText}
            </div>
            <div>
              <div class="smax-agent-name-text">\${agent.name}</div>
              <div style="font-size: 11.5px; color: #5d6c7b; margin-top: 2px; display: flex; align-items: center; gap: 6px;">
                <span class="smax-channel-tag \${channelTagClass}">\${agent.channelName}</span>
              </div>
            </div>
          </div>
        </td>
        <td style="text-align: center;">
          <label class="smax-switch">
            <input type="checkbox" \${isChecked} onchange="app.toggleAgentStatus('\${agent.id}', this.checked)">
            <span class="smax-switch-slider"></span>
          </label>
        </td>
        <td style="font-weight: 700; color: #1877f2; font-size: 13.5px;">\${agent.totalAiConvs}</td>
        <td>
          <div style="display: flex; align-items: center; justify-content: space-between; font-weight: 700; color: #10b981; font-size: 13px;">
            <span>\${agent.completionRate}</span>
            <span style="font-size: 11px; color: #64748b; font-weight: normal;">\${agent.completionSub}</span>
          </div>
          <div class="smax-progress-bar-wrap">
            <div class="smax-progress-bar-fill" style="width: \${agent.completionPercent || 89}%; background: #10b981;"></div>
          </div>
        </td>
        <td>
          <div style="font-weight: 700; color: #eb6553; font-size: 13.5px;">\${agent.buyerIntentCount}</div>
          <div style="font-size: 11px; color: #787b83;">\${agent.buyerIntentSub}</div>
        </td>
        <td style="font-size: 12px; color: #64748b; white-space: nowrap;">\${agent.updatedAt}</td>
        <td>
          <div class="smax-creator-cell">
            <div style="width: 22px; height: 22px; border-radius: 50%; background: #0f1835; color: #fff; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold;">T</div>
            <span style="font-size: 12px; font-weight: 500; color: #1c1e21;">\${agent.creator}</span>
          </div>
        </td>
        <td>
          <div class="smax-action-buttons">
            <button class="smax-table-action-btn btn-chat" title="Chat Thử" onclick="app.openQuickChatDrawer('\${agent.id}')">
              Chat
            </button>
            <button class="smax-action-icon-btn" title="Chỉnh sửa" onclick="app.openEditWizard('\${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="smax-action-icon-btn btn-delete" title="Xóa" onclick="app.deleteAgent('\${agent.id}')">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          </div>
        </td>
      \`;
      tbody.appendChild(tr);
    });
  }

  toggleAgentStatus(agentId, isChecked) {
    const agent = this.agentsList.find(a => a.id === agentId);
    if (!agent) return;
    agent.status = isChecked ? 'active' : 'paused';
    
    if (typeof tabsApp !== 'undefined') {
      tabsApp.showToast(\`Đã \${isChecked ? 'kích hoạt' : 'tạm dừng'} \${agent.name}!\`);
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
      messagesEl.innerHTML = \`
        <div style="align-self: flex-start; max-width: 85%; background: #ffffff; border: 1px solid #e8ecf2; border-radius: 14px 14px 14px 2px; padding: 12px 16px; font-size: 13px; color: #0f1835; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
          <div style="font-weight: 700; font-size: 11.5px; color: #eb6553; margin-bottom: 4px;">\${agent.name}</div>
          Chào bạn! Mình là Trợ lý AI sẵn sàng hỗ trợ tư vấn và đặt hàng cho bạn 24/7. Bạn đang quan tâm đến sản phẩm hoặc dịch vụ nào của bên mình ạ?
        </div>
      \`;
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
      if (text.toLowerCase().includes('size') || text.toLowerCase().includes('áo')) {
        reply = 'Dạ mẫu Áo polo nam classic cotton bên em có đủ size M (50-60kg), L (60-70kg), XL (70-80kg). Bạn cho mình xin chiều cao và cân nặng để mình chọn size vừa vặn nhất cho bạn nhé!';
      } else if (text.toLowerCase().includes('giá') || text.toLowerCase().includes('khuyến mãi')) {
        reply = 'Dạ hiện tại shop đang có chương trình khuyến mãi tháng 8: Giảm ngay 15% cho đơn từ 2 sản phẩm và tặng mã Freeship 25k ạ!';
      } else if (text.toLowerCase().includes('da') || text.toLowerCase().includes('mụn') || text.toLowerCase().includes('serum')) {
        reply = 'Dạ Serum B5 phục hồi rau má 30ml bên em chiết xuất 100% tự nhiên, dịu nhẹ cho mọi loại da, đặc biệt là da dầu mụn và nhạy cảm. Giá ưu đãi hôm nay là 450.000₫/chai ạ!';
      } else {
        reply = \`Dạ em đã ghi nhận thông tin về "\${text}". Trợ lý AI \${agent ? agent.name : ''} đã đối chiếu tài liệu kho tri thức RAG và sẵn sàng hỗ trợ bạn ngay ạ! Bạn có cần em tạo đơn hàng hoặc gửi ảnh chi tiết không ạ?\`;
      }

      aiBubble.innerHTML = \`
        <div style="font-weight: 700; font-size: 11.5px; color: #eb6553; margin-bottom: 4px;">\${agent ? agent.name : 'Trợ lý AI'}</div>
        \${reply}
      \`;
      messagesEl.appendChild(aiBubble);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 450);
  }`;

code = code.replace(oldRenderTableRowsTarget, newRenderTableRowsReplacement);

// 3. Update init to render both Grid and Table
code = code.replace('this.renderTableRows();\n    this.applyPreset(\'fashion\');', 'this.renderAgentsGrid();\n    this.renderTableRows();\n    this.applyPreset(\'fashion\');');
code = code.replace('this.renderTableRows();\n  }', 'this.renderAgentsGrid();\n    this.renderTableRows();\n  }');

fs.writeFileSync(appPath, code, 'utf8');
console.log('src/js/app.js updated with Bento Grid, View Switcher & Quick Test Chat Drawer successfully!');
