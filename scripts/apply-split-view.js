const fs = require('fs');
const path = require('path');

// ==========================================================================
// 1. UPDATE CSS (src/css/quick-setup.css)
// ==========================================================================
const cssPath = path.join(__dirname, '../src/css/quick-setup.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

const splitViewStyles = `
/* ==========================================================================
   SPLIT-VIEW 2-COLUMN LAYOUT (SETUP CONFIG + LIVE CHAT PREVIEW)
   ========================================================================== */
.smax-qs-step-2col-layout {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 20px;
  align-items: start;
}

@media (max-width: 1200px) {
  .smax-qs-step-2col-layout {
    grid-template-columns: 1fr;
  }
}

.smax-qs-col-setup {
  min-width: 0;
}

.smax-qs-col-preview {
  position: sticky;
  top: 16px;
  z-index: 10;
}

/* Phone Mockup / Live Simulator Frame */
.smax-qs-phone-card {
  background: #ffffff;
  border: 1.5px solid #0f1835;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(15, 24, 53, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 580px;
  position: relative;
}

/* Header */
.smax-qs-phone-header {
  background: #0f1835;
  color: #ffffff;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

.smax-qs-phone-header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.smax-qs-phone-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: #eb6553;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 13px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.2);
}

.smax-qs-phone-title {
  font-weight: 700;
  font-size: 13px;
  color: #ffffff;
  line-height: 1.3;
}

.smax-qs-phone-status {
  font-size: 11px;
  color: #86efac;
  display: flex;
  align-items: center;
  gap: 4px;
}

.smax-qs-phone-header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.smax-qs-btn-reset-chat {
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 100px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  gap: 4px;
}

.smax-qs-btn-reset-chat:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* Quick Test Action Bar */
.smax-qs-test-bar {
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  padding: 8px 12px;
  flex-shrink: 0;
}

.smax-qs-test-bar-title {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.smax-qs-test-pills-row {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  padding-bottom: 2px;
}

.smax-qs-test-pills-row::-webkit-scrollbar {
  height: 3px;
}

.smax-qs-test-pills-row::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

.smax-qs-test-pill {
  background: #ffffff;
  border: 1px solid #cbd5e1;
  color: #0f1835;
  border-radius: 100px;
  padding: 4px 10px;
  font-size: 11.5px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.smax-qs-test-pill:hover {
  background: #fff5f3;
  border-color: #eb6553;
  color: #eb6553;
  transform: translateY(-1px);
}

.smax-qs-test-pill.active {
  background: #eb6553;
  border-color: #eb6553;
  color: #ffffff;
}

/* Message Thread */
.smax-qs-chat-thread {
  flex: 1;
  padding: 14px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #f8fafc;
}

.smax-qs-chat-thread::-webkit-scrollbar {
  width: 4px;
}

.smax-qs-chat-thread::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
}

/* Chat Bubbles */
.smax-qs-msg-row {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  max-width: 90%;
  animation: smaxFadeSlideDown 0.15s ease;
}

.smax-qs-msg-row.bot {
  align-self: flex-start;
}

.smax-qs-msg-row.user {
  align-self: flex-end;
  flex-direction: row-reverse;
}

.smax-qs-msg-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #eb6553;
  color: #ffffff;
  font-size: 10px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-bottom: 2px;
}

.smax-qs-msg-bubble {
  padding: 8px 12px;
  font-size: 12.5px;
  line-height: 1.45;
  position: relative;
  word-break: break-word;
}

.smax-qs-msg-row.bot .smax-qs-msg-bubble {
  background: #ffffff;
  color: #0f1835;
  border: 1px solid #e2e8f0;
  border-radius: 14px 14px 14px 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.03);
}

.smax-qs-msg-row.user .smax-qs-msg-bubble {
  background: #eb6553;
  color: #ffffff;
  border-radius: 14px 14px 2px 14px;
}

/* Quick Replies Chips inside Chat */
.smax-qs-chat-chips-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.smax-qs-chat-chip {
  background: #f1f5f9;
  border: 1px solid #cbd5e1;
  color: #334155;
  border-radius: 100px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.12s ease;
}

.smax-qs-chat-chip:hover {
  background: #eb6553;
  border-color: #eb6553;
  color: #ffffff;
}

/* Interactive Embedded Elements */
.smax-qs-bubble-card {
  background: #ffffff;
  border: 1px solid #fed7aa;
  border-radius: 12px;
  padding: 10px 12px;
  margin-top: 6px;
  box-shadow: 0 2px 8px rgba(235, 101, 83, 0.08);
}

.smax-qs-bubble-tag-pill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: #dcfce7;
  color: #15803d;
  border: 1px solid #86efac;
  border-radius: 6px;
  padding: 2px 6px;
  font-size: 10.5px;
  font-weight: 700;
}

.smax-qs-bubble-btn {
  background: #eb6553;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 11.5px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 6px;
  transition: all 0.15s ease;
}

.smax-qs-bubble-btn:hover {
  background: #d44d3b;
}

/* Input Bar */
.smax-qs-phone-input-bar {
  background: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.smax-qs-phone-input {
  flex: 1;
  background: #f1f5f9;
  border: 1px solid #e2e8f0;
  border-radius: 100px;
  padding: 8px 14px;
  font-size: 12.5px;
  color: #0f1835;
  outline: none;
  transition: border-color 0.15s ease;
}

.smax-qs-phone-input:focus {
  background: #ffffff;
  border-color: #eb6553;
}

.smax-qs-btn-send {
  background: #eb6553;
  color: #ffffff;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  cursor: pointer;
  flex-shrink: 0;
  transition: all 0.15s ease;
}

.smax-qs-btn-send:hover {
  background: #d44d3b;
  transform: scale(1.05);
}
`;

if (!cssCode.includes('SPLIT-VIEW 2-COLUMN LAYOUT (SETUP CONFIG + LIVE CHAT PREVIEW)')) {
  cssCode += splitViewStyles;
  fs.writeFileSync(cssPath, cssCode, 'utf8');
  console.log('src/css/quick-setup.css updated with Split-View styles!');
}

// ==========================================================================
// 2. UPDATE HTML (src/index.html) - Split-view for Steps 2 -> 7
// ==========================================================================
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

function buildStep2Html() {
  return `          <!-- ==================================================================== -->
          <!-- BƯỚC 2: CHÀO ĐÓN & TRỢ LÝ AI GENAI (📥 TRƯỚC MUA) - SPLIT VIEW        -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep2Panel" data-step="2">
            <div class="smax-qs-step-2col-layout">
              
              <!-- CỘT TRÁI: SETUP CẤU HÌNH PROGRESSIVE DISCLOSURE -->
              <div class="smax-qs-col-setup">
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

                  <div class="smax-qs-card-body">
                    <div class="smax-form-group">
                      <label class="smax-label" style="font-size: 12.5px;">Tin nhắn chào mừng tự động khi khách mở chat lần đầu:</label>
                      <textarea id="qsWelcomeMessage" class="smax-textarea" rows="3" style="font-size: 13px;" oninput="quickSetupApp.syncWelcomePreview(this.value)">Xin chào {{name}}! 👋 Chào mừng bạn đến với Shop Thời Trang Smax. Em là Trợ lý AI có thể tư vấn mẫu mã, chọn size và nhận đơn tự động. Bạn đang tìm trang phục cho dịp nào ạ? 😊</textarea>
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
                  </div>
                </div>
              </div>

              <!-- CỘT PHẢI: LIVE CHAT PREVIEW & TEST SIMULATOR -->
              <div class="smax-qs-col-preview">
                <div class="smax-qs-phone-card" id="qsStep2ChatPreview">
                  <!-- Header -->
                  <div class="smax-qs-phone-header">
                    <div class="smax-qs-phone-header-left">
                      <div class="smax-qs-phone-avatar">AI</div>
                      <div>
                        <div class="smax-qs-phone-title">Shop Thời Trang Smax</div>
                        <div class="smax-qs-phone-status">● Live Test Preview</div>
                      </div>
                    </div>
                    <div class="smax-qs-phone-header-right">
                      <button class="smax-qs-btn-reset-chat" onclick="quickSetupApp.resetStepChat(2)">
                        <span>🔄 Làm mới</span>
                      </button>
                    </div>
                  </div>

                  <!-- Quick Test Actions Bar -->
                  <div class="smax-qs-test-bar">
                    <div class="smax-qs-test-bar-title">
                      <span>⚡ THỬ NGHIỆM TÍNH NĂNG (1-CHẠM):</span>
                    </div>
                    <div class="smax-qs-test-pills-row">
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(2, 'welcome')">👋 Test Chào Mừng</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(2, 'ask_size')">🛍️ Test Hỏi Mẫu/Size</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(2, 'comment_inbox')">💬 Test Comment-to-Inbox</button>
                    </div>
                  </div>

                  <!-- Message Thread -->
                  <div class="smax-qs-chat-thread" id="qsChatThread_step2">
                    <!-- Populated dynamically by quickSetupApp -->
                  </div>

                  <!-- Chat Input -->
                  <div class="smax-qs-phone-input-bar">
                    <input type="text" class="smax-qs-phone-input" id="qsChatInput_step2" placeholder="Nhập tin nhắn chat thử với AI..." onkeydown="if(event.key==='Enter') quickSetupApp.sendChatMessage(2)">
                    <button class="smax-qs-btn-send" onclick="quickSetupApp.sendChatMessage(2)">➤</button>
                  </div>
                </div>
              </div>

            </div>
          </div>`;
}

function buildStep3Html() {
  return `          <!-- ==================================================================== -->
          <!-- BƯỚC 3: LEAD & CHỐT ĐƠN (🛒 TRONG MUA) - SPLIT VIEW                 -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep3Panel" data-step="3">
            <div class="smax-qs-step-2col-layout">
              
              <!-- CỘT TRÁI: SETUP CẤU HÌNH PROGRESSIVE DISCLOSURE -->
              <div class="smax-qs-col-setup">
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

              <!-- CỘT PHẢI: LIVE CHAT PREVIEW & TEST SIMULATOR -->
              <div class="smax-qs-col-preview">
                <div class="smax-qs-phone-card" id="qsStep3ChatPreview">
                  <div class="smax-qs-phone-header">
                    <div class="smax-qs-phone-header-left">
                      <div class="smax-qs-phone-avatar">AI</div>
                      <div>
                        <div class="smax-qs-phone-title">Shop Thời Trang Smax</div>
                        <div class="smax-qs-phone-status">● Live Lead & Order Test</div>
                      </div>
                    </div>
                    <div class="smax-qs-phone-header-right">
                      <button class="smax-qs-btn-reset-chat" onclick="quickSetupApp.resetStepChat(3)">
                        <span>🔄 Làm mới</span>
                      </button>
                    </div>
                  </div>

                  <div class="smax-qs-test-bar">
                    <div class="smax-qs-test-bar-title">
                      <span>⚡ THỬ NGHIỆM TÍNH NĂNG (1-CHẠM):</span>
                    </div>
                    <div class="smax-qs-test-pills-row">
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(3, 'lead_capture')">📞 Test Thu Thập SĐT</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(3, 'create_order')">🛒 Test Chốt Đơn POS</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(3, 'vietqr')">💳 Test Mã VietQR</button>
                    </div>
                  </div>

                  <div class="smax-qs-chat-thread" id="qsChatThread_step3"></div>

                  <div class="smax-qs-phone-input-bar">
                    <input type="text" class="smax-qs-phone-input" id="qsChatInput_step3" placeholder="Nhập SĐT hoặc địa chỉ chat thử..." onkeydown="if(event.key==='Enter') quickSetupApp.sendChatMessage(3)">
                    <button class="smax-qs-btn-send" onclick="quickSetupApp.sendChatMessage(3)">➤</button>
                  </div>
                </div>
              </div>

            </div>
          </div>`;
}

function buildStep4Html() {
  return `          <!-- ==================================================================== -->
          <!-- BƯỚC 4: BÁM ĐUỔI 24H & MINIGAME (🛒 TRONG MUA) - SPLIT VIEW          -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep4Panel" data-step="4">
            <div class="smax-qs-step-2col-layout">
              
              <!-- CỘT TRÁI: SETUP CẤU HÌNH PROGRESSIVE DISCLOSURE -->
              <div class="smax-qs-col-setup">
                <!-- Mục 1: KỊCH BẢN BÁM ĐUỔI TỰ ĐỘNG -->
                <div class="smax-qs-card smax-qs-card-collapsible" id="qsCard_step4_1">
                  <div class="smax-qs-card-header" onclick="quickSetupApp.toggleCardAccordion('qsCard_step4_1')">
                    <div class="smax-qs-card-header-left">
                      <div class="smax-qs-card-title">1. Kịch Bản Bám Đuổi Tự Động (Khi Khách Im Lặng)</div>
                      <div style="font-size: 12px; color: #5d6c7b;">
                        Kích hoạt chuỗi tin nhắn bám đuổi qua kịch bản Smax Automation khi khách hàng chưa phản hồi.
                      </div>
                    </div>
                    <div class="smax-qs-card-header-right">
                      <button class="smax-btn-pill-primary" id="btnQsAddFollowupBtn" style="padding: 6px 16px; font-size: 12px;" onclick="event.stopPropagation(); quickSetupApp.addFollowup();">
                        + Thêm Kịch Bản
                      </button>
                      <label class="smax-switch" onclick="event.stopPropagation();">
                        <input type="checkbox" class="smax-card-toggle-input" checked onchange="quickSetupApp.toggleCardAccordion('qsCard_step4_1', this.checked)">
                        <span class="smax-switch-slider"></span>
                      </label>
                    </div>
                  </div>

                  <div class="smax-qs-card-body">
                    <div class="smax-alert smax-alert-info" style="margin-bottom: 14px;">
                      <div>
                        <strong>Bám đuổi thông minh:</strong> Tự động kích hoạt Block Automation Smax theo từng mốc thời gian khách im lặng. Bạn có thể nhấn <strong>+ Thêm Kịch Bản</strong> hoặc nhấn <strong>&times;</strong> để xóa bớt.
                      </div>
                    </div>

                    <div class="smax-timeline" id="qsFollowupTimelineContainer"></div>
                    <div id="qsFollowupTimeline" style="display: none;"></div>

                    <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 10px; padding: 10px 14px; margin-top: 16px; font-size: 12px; color: #166534;">
                      🛡️ <strong>Cơ chế thoát thông minh (Sequence REMOVE):</strong> Ngay khi khách bấm "Đặt hàng" hoặc để lại số điện thoại / hoàn tất đơn, hệ thống sẽ <strong>tự động ngắt chuỗi bám đuổi ngay lập tức</strong>.
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

              <!-- CỘT PHẢI: LIVE CHAT PREVIEW & TEST SIMULATOR -->
              <div class="smax-qs-col-preview">
                <div class="smax-qs-phone-card" id="qsStep4ChatPreview">
                  <div class="smax-qs-phone-header">
                    <div class="smax-qs-phone-header-left">
                      <div class="smax-qs-phone-avatar">AI</div>
                      <div>
                        <div class="smax-qs-phone-title">Shop Thời Trang Smax</div>
                        <div class="smax-qs-phone-status">● Live Follow-up & Game Test</div>
                      </div>
                    </div>
                    <div class="smax-qs-phone-header-right">
                      <button class="smax-qs-btn-reset-chat" onclick="quickSetupApp.resetStepChat(4)">
                        <span>🔄 Làm mới</span>
                      </button>
                    </div>
                  </div>

                  <div class="smax-qs-test-bar">
                    <div class="smax-qs-test-bar-title">
                      <span>⚡ THỬ NGHIỆM TÍNH NĂNG (1-CHẠM):</span>
                    </div>
                    <div class="smax-qs-test-pills-row">
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(4, 'followup_15m')">⏰ Test Mốc 15p</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(4, 'followup_2h')">⏰ Test Mốc 2h</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(4, 'minigame')">🎡 Test Quay Minigame</button>
                    </div>
                  </div>

                  <div class="smax-qs-chat-thread" id="qsChatThread_step4"></div>

                  <div class="smax-qs-phone-input-bar">
                    <input type="text" class="smax-qs-phone-input" id="qsChatInput_step4" placeholder="Nhập tin nhắn để test ngắt chuỗi..." onkeydown="if(event.key==='Enter') quickSetupApp.sendChatMessage(4)">
                    <button class="smax-qs-btn-send" onclick="quickSetupApp.sendChatMessage(4)">➤</button>
                  </div>
                </div>
              </div>

            </div>
          </div>`;
}

function buildStep5Html() {
  return `          <!-- ==================================================================== -->
          <!-- BƯỚC 5: SAU MUA & UPSALE (📦 SAU MUA) - SPLIT VIEW                  -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep5Panel" data-step="5">
            <div class="smax-qs-step-2col-layout">
              
              <!-- CỘT TRÁI: SETUP CẤU HÌNH PROGRESSIVE DISCLOSURE -->
              <div class="smax-qs-col-setup">
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

                  <div class="smax-qs-card-body">
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

                  <div class="smax-qs-card-body" style="display: none;">
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
                          <strong style="font-size: 13px; color: #eb6553;">Ngày thứ 7 (Re-purchase):</strong> Tặng mã <strong>VIP20</strong> giảm 20% cho đơn hàng tiếp theo.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- CỘT PHẢI: LIVE CHAT PREVIEW & TEST SIMULATOR -->
              <div class="smax-qs-col-preview">
                <div class="smax-qs-phone-card" id="qsStep5ChatPreview">
                  <div class="smax-qs-phone-header">
                    <div class="smax-qs-phone-header-left">
                      <div class="smax-qs-phone-avatar">AI</div>
                      <div>
                        <div class="smax-qs-phone-title">Shop Thời Trang Smax</div>
                        <div class="smax-qs-phone-status">● Live Webview & Upsale Test</div>
                      </div>
                    </div>
                    <div class="smax-qs-phone-header-right">
                      <button class="smax-qs-btn-reset-chat" onclick="quickSetupApp.resetStepChat(5)">
                        <span>🔄 Làm mới</span>
                      </button>
                    </div>
                  </div>

                  <div class="smax-qs-test-bar">
                    <div class="smax-qs-test-bar-title">
                      <span>⚡ THỬ NGHIỆM TÍNH NĂNG (1-CHẠM):</span>
                    </div>
                    <div class="smax-qs-test-pills-row">
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(5, 'webview_order')">📄 Test Webview Đơn Hàng</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(5, 'upsale_day3')">💬 Test Hỏi Trải Nghiệm</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(5, 'upsale_vip20')">🎁 Test Voucher VIP20</button>
                    </div>
                  </div>

                  <div class="smax-qs-chat-thread" id="qsChatThread_step5"></div>

                  <div class="smax-qs-phone-input-bar">
                    <input type="text" class="smax-qs-phone-input" id="qsChatInput_step5" placeholder="Nhập câu hỏi bảo hành, đổi size..." onkeydown="if(event.key==='Enter') quickSetupApp.sendChatMessage(5)">
                    <button class="smax-qs-btn-send" onclick="quickSetupApp.sendChatMessage(5)">➤</button>
                  </div>
                </div>
              </div>

            </div>
          </div>`;
}

function buildStep6Html() {
  return `          <!-- ==================================================================== -->
          <!-- BƯỚC 6: AI INSIGHT 6 CHIỀU (🧠 XUYÊN SUỐT) - SPLIT VIEW             -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep6Panel" data-step="6">
            <div class="smax-qs-step-2col-layout">
              
              <!-- CỘT TRÁI: SETUP CẤU HÌNH PROGRESSIVE DISCLOSURE -->
              <div class="smax-qs-col-setup">
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

                  <div class="smax-qs-card-body">
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 20px;">
                      <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                        <input type="checkbox" id="qsInsightLeadScoring" checked style="margin-top: 2px;">
                        <div>
                          <strong style="font-size: 13px; color: #0f1835;">1. Chấm điểm Leads (Lead Scoring 0-100)</strong>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Đo lường mức độ sẵn sàng mua hàng.</div>
                        </div>
                      </label>

                      <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                        <input type="checkbox" checked style="margin-top: 2px;">
                        <div>
                          <strong style="font-size: 13px; color: #0f1835;">2. Mức độ tiềm năng (Hot / Warm / Cold)</strong>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Phân loại tự động để ưu tiên khách Hot Lead.</div>
                        </div>
                      </label>

                      <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                        <input type="checkbox" checked style="margin-top: 2px;">
                        <div>
                          <strong style="font-size: 13px; color: #0f1835;">3. Sản phẩm quan tâm (Interested Products)</strong>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Trích xuất danh sách SKU, size, màu.</div>
                        </div>
                      </label>

                      <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                        <input type="checkbox" checked style="margin-top: 2px;">
                        <div>
                          <strong style="font-size: 13px; color: #0f1835;">4. Nhu cầu cụ thể (Specific Needs)</strong>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Nhận diện ngữ cảnh mua (đi làm, dự tiệc...).</div>
                        </div>
                      </label>

                      <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                        <input type="checkbox" id="qsInsightObjections" checked style="margin-top: 2px;">
                        <div>
                          <strong style="font-size: 13px; color: #0f1835;">5. Lý do từ chối (Objections Analysis)</strong>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Phát hiện đắn đo: giá cao, phí ship, size...</div>
                        </div>
                      </label>

                      <label style="display: flex; align-items: flex-start; gap: 10px; background: #f8fafc; padding: 12px 14px; border-radius: 10px; border: 1px solid #e2e8f0; cursor: pointer;">
                        <input type="checkbox" checked style="margin-top: 2px;">
                        <div>
                          <strong style="font-size: 13px; color: #0f1835;">6. Kịch bản xử lý từ chối (Objection Handling)</strong>
                          <div style="font-size: 11.5px; color: #64748b; margin-top: 2px;">Gợi ý câu trả lời thuyết phục tức thì.</div>
                        </div>
                      </label>
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

              <!-- CỘT PHẢI: LIVE CHAT PREVIEW & TEST SIMULATOR -->
              <div class="smax-qs-col-preview">
                <div class="smax-qs-phone-card" id="qsStep6ChatPreview">
                  <div class="smax-qs-phone-header">
                    <div class="smax-qs-phone-header-left">
                      <div class="smax-qs-phone-avatar">🧠</div>
                      <div>
                        <div class="smax-qs-phone-title">AI Lead Intelligence</div>
                        <div class="smax-qs-phone-status">● Live Scoring & Insight Test</div>
                      </div>
                    </div>
                    <div class="smax-qs-phone-header-right">
                      <button class="smax-qs-btn-reset-chat" onclick="quickSetupApp.resetStepChat(6)">
                        <span>🔄 Làm mới</span>
                      </button>
                    </div>
                  </div>

                  <div class="smax-qs-test-bar">
                    <div class="smax-qs-test-bar-title">
                      <span>⚡ THỬ NGHIỆM TÍNH NĂNG (1-CHẠM):</span>
                    </div>
                    <div class="smax-qs-test-pills-row">
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(6, 'hot_lead_insight')">🔥 Test Hot Lead (88đ)</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(6, 'objection_insight')">🛡️ Test Xử Lý Từ Chối</button>
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(6, 'meta_capi_sync')">📊 Test Bắn Meta CAPI</button>
                    </div>
                  </div>

                  <div class="smax-qs-chat-thread" id="qsChatThread_step6"></div>

                  <div class="smax-qs-phone-input-bar">
                    <input type="text" class="smax-qs-phone-input" id="qsChatInput_step6" placeholder="Chat thử để AI chấm điểm tiềm năng..." onkeydown="if(event.key==='Enter') quickSetupApp.sendChatMessage(6)">
                    <button class="smax-qs-btn-send" onclick="quickSetupApp.sendChatMessage(6)">➤</button>
                  </div>
                </div>
              </div>

            </div>
          </div>`;
}

function buildStep7Html() {
  return `          <!-- ==================================================================== -->
          <!-- BƯỚC 7: KIỂM THỬ & KÍCH HOẠT (🚀 KÍCH HOẠT) - SPLIT VIEW           -->
          <!-- ==================================================================== -->
          <div class="smax-qs-step-panel" id="qsStep7Panel" data-step="7">
            <div class="smax-qs-step-2col-layout">
              
              <!-- CỘT TRÁI: BẢN ĐỒ HÀNH TRÌNH & NÚT KÍCH HOẠT -->
              <div class="smax-qs-col-setup">
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

                <!-- Mục 2: Nút Kích Hoạt Toàn Bộ (Master Card) -->
                <div class="smax-qs-card" style="text-align: center; padding: 28px 20px; background: linear-gradient(180deg, #ffffff 0%, #fff9f8 100%); border: 1.5px solid #fed7aa; margin-top: 14px;">
                  <div style="font-size: 26px; margin-bottom: 6px;">🎉</div>
                  <h2 style="font-size: 18px; font-weight: 800; color: #0f1835; margin-bottom: 6px;">
                    Bạn Đã Hoàn Tất Toàn Bộ Thiết Lập Tự Động Hóa!
                  </h2>
                  <p style="color: #5d6c7b; font-size: 13px; max-width: 520px; margin: 0 auto 16px;">
                    Nhấn nút bên dưới để đồng bộ và kích hoạt toàn bộ kịch bản tự động chạy xuyên suốt trên tất cả các kênh bán hàng của bạn.
                  </p>

                  <button class="smax-btn-primary-coral" id="qsBtnActivateAll" style="padding: 12px 32px; font-size: 15px; font-weight: 700; border-radius: 100px; margin: 0 auto;" onclick="quickSetupApp.activateAllScenarios()">
                    <span>🚀 KÍCH HOẠT TOÀN BỘ LUỒNG AUTOMATION</span>
                  </button>
                </div>
              </div>

              <!-- CỘT PHẢI: FULL JOURNEY CHAT SIMULATOR -->
              <div class="smax-qs-col-preview">
                <div class="smax-qs-phone-card" id="qsStep7ChatPreview">
                  <div class="smax-qs-phone-header">
                    <div class="smax-qs-phone-header-left">
                      <div class="smax-qs-phone-avatar">🚀</div>
                      <div>
                        <div class="smax-qs-phone-title">Toàn Bộ Hành Trình Tự Động</div>
                        <div class="smax-qs-phone-status">● Live End-to-End Test</div>
                      </div>
                    </div>
                    <div class="smax-qs-phone-header-right">
                      <button class="smax-qs-btn-reset-chat" onclick="quickSetupApp.resetStepChat(7)">
                        <span>🔄 Làm mới</span>
                      </button>
                    </div>
                  </div>

                  <div class="smax-qs-test-bar">
                    <div class="smax-qs-test-bar-title">
                      <span>⚡ THỬ NGHIỆM HÀNH TRÌNH:</span>
                    </div>
                    <div class="smax-qs-test-pills-row">
                      <button class="smax-qs-test-pill" onclick="quickSetupApp.runQuickTest(7, 'full_flow_auto')">✨ Chạy Tự Động Toàn Luồng</button>
                    </div>
                  </div>

                  <div class="smax-qs-chat-thread" id="qsChatThread_step7"></div>

                  <div class="smax-qs-phone-input-bar">
                    <input type="text" class="smax-qs-phone-input" id="qsChatInput_step7" placeholder="Nhập tin nhắn chat thử toàn luồng..." onkeydown="if(event.key==='Enter') quickSetupApp.sendChatMessage(7)">
                    <button class="smax-qs-btn-send" onclick="quickSetupApp.sendChatMessage(7)">➤</button>
                  </div>
                </div>
              </div>

            </div>
          </div>`;
}

const step2Start = `          <!-- ==================================================================== -->\n          <!-- BƯỚC 2: CHÀO ĐÓN & TRỢ LÝ AI GENAI (📥 TRƯỚC MUA)`;
const wizardFooter = `          <!-- Wizard Sticky Footer -->`;

const s2Idx = htmlCode.indexOf(step2Start);
const wFooterIdx = htmlCode.indexOf(wizardFooter);

if (s2Idx !== -1 && wFooterIdx !== -1) {
  const newSteps2to7Html = buildStep2Html() + '\n\n' + buildStep3Html() + '\n\n' + buildStep4Html() + '\n\n' + buildStep5Html() + '\n\n' + buildStep6Html() + '\n\n' + buildStep7Html() + '\n\n';
  htmlCode = htmlCode.substring(0, s2Idx) + newSteps2to7Html + htmlCode.substring(wFooterIdx);
  fs.writeFileSync(htmlPath, htmlCode, 'utf8');
  console.log('src/index.html Steps 2-7 updated with Split-View 2-Column layout!');
} else {
  console.error('Bounds for Steps 2-7 not found in index.html!', { s2Idx, wFooterIdx });
}
