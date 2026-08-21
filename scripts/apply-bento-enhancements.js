const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../src/js/app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. Update agents list with knowledgeSources & activeWorkflows
const targetAgentsListStart = `    // Agents List
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

const replacementAgentsList = `    // Agents List
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
    ];`;

code = code.replace(targetAgentsListStart, replacementAgentsList);

// 2. Update renderAgentsGrid
const oldRenderGridStart = `          <!-- 2x2 Metrics Grid -->
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
        </div>`;

const newRenderGridReplacement = `          <!-- 2x2 Metrics Grid -->
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
              \${(agent.knowledgeSources || ['Smax POS Live', 'Google Sheet']).map(k => \`
                <span class="smax-bento-capsule knowledge" title="Đã nạp vào kho RAG grounding">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                  \${k}
                </span>
              \`).join('')}
            </div>
          </div>

          <!-- Section: Kịch Bản & Tự Động Hóa (Active Automation) -->
          <div class="smax-bento-section" style="margin-bottom: 14px;">
            <div class="smax-bento-section-header">
              <div class="smax-bento-section-title">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                Kịch Bản & Tự Động Hóa
              </div>
              <span style="font-size: 10.5px; color: #eb6553; font-weight: 700;">● \${agent.activeWorkflows ? agent.activeWorkflows.length : 4} Luồng Chạy</span>
            </div>
            <div class="smax-bento-capsules-wrap">
              \${(agent.activeWorkflows || ['Kịch bản bám đuổi', 'Webview Đơn hàng']).map(w => \`
                <span class="smax-bento-capsule workflow" title="Kịch bản tự động đang kích hoạt">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  \${w}
                </span>
              \`).join('')}
            </div>
          </div>
        </div>`;

code = code.replace(oldRenderGridStart, newRenderGridReplacement);

fs.writeFileSync(appPath, code, 'utf8');
console.log('src/js/app.js updated with Knowledge & Workflows in Bento Cards successfully!');
