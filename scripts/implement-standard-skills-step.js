const fs = require('fs');
const path = require('path');

// 1. UPDATE src/css/wizard.css
const cssPath = path.join(__dirname, '../src/css/wizard.css');
let cssCode = fs.readFileSync(cssPath, 'utf8');

const stepperColsTarget = `.smax-stepper.smax-stepper-5-cols {
  grid-template-columns: repeat(5, 1fr);
}`;

const stepperColsReplacement = `.smax-stepper.smax-stepper-5-cols {
  grid-template-columns: repeat(5, 1fr);
}

.smax-stepper.smax-stepper-6-cols {
  grid-template-columns: repeat(6, 1fr);
}`;

cssCode = cssCode.replace(stepperColsTarget, stepperColsReplacement);
fs.writeFileSync(cssPath, cssCode, 'utf8');
console.log('src/css/wizard.css updated with .smax-stepper-6-cols!');

// 2. UPDATE src/index.html
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

// A. Update stepperStandard to 6 columns
const stepperStandardTarget = `          <!-- Stepper 5 Bước (Standard Mode - Tinh gọn chuẩn Meta) -->
          <div class="smax-stepper smax-stepper-5-cols" id="stepperStandard" style="display: none;">
            <button class="smax-step-item active" data-step="1" onclick="app.goToStep(1)">
              <span class="smax-step-top-line">Bước 1</span>
              <span class="smax-step-title-line">Kênh & Danh tính</span>
            </button>
            <button class="smax-step-item" data-step="2" onclick="app.goToStep(2)">
              <span class="smax-step-top-line">Bước 2</span>
              <span class="smax-step-title-line">Tính cách của AI</span>
            </button>
            <button class="smax-step-item" data-step="3" onclick="app.goToStep(3)">
              <span class="smax-step-top-line">Bước 3</span>
              <span class="smax-step-title-line">Thư viện kiến thức</span>
            </button>
            <button class="smax-step-item" data-step="4" onclick="app.goToStep(4)">
              <span class="smax-step-top-line">Bước 4</span>
              <span class="smax-step-title-line">Quy tắc & Giới hạn</span>
            </button>
            <button class="smax-step-item" data-step="5" onclick="app.goToStep(5)">
              <span class="smax-step-top-line">Bước 5</span>
              <span class="smax-step-title-line">Thử nghiệm & Xuất bản</span>
            </button>
          </div>`;

const stepperStandardReplacement = `          <!-- Stepper 6 Bước (Standard Mode - Tinh gọn chuẩn Meta) -->
          <div class="smax-stepper smax-stepper-6-cols" id="stepperStandard" style="display: none;">
            <button class="smax-step-item active" data-step="1" onclick="app.goToStep(1)">
              <span class="smax-step-top-line">Bước 1</span>
              <span class="smax-step-title-line">Kênh & Danh tính</span>
            </button>
            <button class="smax-step-item" data-step="2" onclick="app.goToStep(2)">
              <span class="smax-step-top-line">Bước 2</span>
              <span class="smax-step-title-line">Tính cách của AI</span>
            </button>
            <button class="smax-step-item" data-step="3" onclick="app.goToStep(3)">
              <span class="smax-step-top-line">Bước 3</span>
              <span class="smax-step-title-line">Thư viện kiến thức</span>
            </button>
            <button class="smax-step-item" data-step="4" onclick="app.goToStep(4)">
              <span class="smax-step-top-line">Bước 4</span>
              <span class="smax-step-title-line">Quy tắc & Giới hạn</span>
            </button>
            <button class="smax-step-item" data-step="5" onclick="app.goToStep(5)">
              <span class="smax-step-top-line">Bước 5</span>
              <span class="smax-step-title-line">Kỹ năng</span>
            </button>
            <button class="smax-step-item" data-step="6" onclick="app.goToStep(6)">
              <span class="smax-step-top-line">Bước 6</span>
              <span class="smax-step-title-line">Thử nghiệm & Xuất bản</span>
            </button>
          </div>`;

htmlCode = htmlCode.replace(stepperStandardTarget, stepperStandardReplacement);

// B. Update Step 5 Panel to have Standard Skills and Advance Skills
const step5PanelTarget = `          <!-- BƯỚC 5: KỸ NĂNG -->
          <section class="smax-step-panel" data-step="5">
            <div class="smax-card">
              <div class="smax-card-header">
                <div class="smax-card-title">Bước 5: Các Kỹ Năng Tự Động Của AI</div>
                <span class="smax-badge smax-badge-blue">Tự động nhận diện</span>
              </div>

              <p style="color: #5d6c7b; font-size: 13.5px; margin-bottom: 16px;">
                Bật các kỹ năng thông minh để trợ lý AI tự động bóc tách số điện thoại, địa chỉ và hỗ trợ tạo đơn hàng nhanh chóng khi trò chuyện.
              </p>

              <!-- Skill 1: Thu thập Lead -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">1. Tự động lấy Số điện thoại & Khách hàng tiềm năng</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Khi khách để lại số điện thoại hoặc email, AI sẽ tự động ghi nhận và chuyển cho đội ngũ bán hàng liên hệ.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillLead" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Skill 2: Chốt đơn hàng -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">2. Tự động lên Đơn hàng khi khách chốt mua</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Tự nhận diện mẫu mã, kích cỡ, số lượng, họ tên và địa chỉ nhận hàng để chuẩn bị đơn hàng ngay lập tức.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillOrder" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Skill 3: Tra cứu đơn hàng -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">3. Tra cứu Tình trạng Đơn hàng & Vận chuyển</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Khi khách hỏi đơn hàng của mình đã gửi chưa, AI sẽ tự tra cứu và thông báo trạng thái giao hàng cho khách.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillTrack" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Skill 4: Gợi ý mã giảm giá -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">4. Tự động Gợi ý Mã Giảm Giá & Quà tặng</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Tự động gợi ý mã miễn phí vận chuyển hoặc giảm giá khi đơn hàng của khách đạt điều kiện ưu đãi.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillPromo" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

            </div>
          </section>`;

const step5PanelReplacement = `          <!-- BƯỚC 5: KỸ NĂNG -->
          <section class="smax-step-panel" data-step="5">
            
            <!-- GIAO DIỆN STANDARD MODE (4 KỸ NĂNG TINH GỌN CHUẨN META) -->
            <div id="step5StandardContainer" class="smax-card" style="display: none;">
              <div class="smax-card-header">
                <div>
                  <div class="smax-card-title">Bước 5: Kỹ Năng Tự Động Hóa Của AI (Standard)</div>
                  <div style="font-size: 13px; color: #5d6c7b; margin-top: 2px;">
                    Thiết lập các kỹ năng tiếp đón, bám đuổi và chốt đơn tinh gọn chuẩn Meta Business Agent
                  </div>
                </div>
                <span class="smax-badge smax-badge-coral">Meta Standard</span>
              </div>

              <!-- Kỹ năng 1: Thu thập Lead -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">1. Tự động lấy Số điện thoại & Khách hàng tiềm năng</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Khi khách để lại số điện thoại hoặc email trong cuộc trò chuyện, AI sẽ tự động trích xuất, gắn nhãn Lead tiềm năng và lưu trữ thông tin.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="stdSkillLead" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Kỹ năng 2: Chốt đơn hàng -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">2. Tự động lên Đơn hàng khi khách chốt mua</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Tự động nhận diện sản phẩm khách chọn, kích cỡ/số lượng, họ tên và địa chỉ nhận hàng để chuẩn bị đơn hàng ngay lập tức.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="stdSkillOrder" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Kỹ năng 3: Bám đuổi khách hàng (Giới hạn tối đa 8 tiếng + Nội dung) -->
              <div class="smax-skill-item" style="flex-direction: column; align-items: stretch; gap: 12px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <strong style="font-size: 14.5px; color: #0a1317;">3. Gửi Tin Nhắn Bám Đuổi Khách Hàng (Follow-up Reminders)</strong>
                    <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                      Tự động gửi 01 tin nhắn nhắc nhở và kích cầu khi khách hàng ngưng tương tác trong khung giờ quy định (Tối đa 8 tiếng theo chính sách Meta).
                    </p>
                  </div>
                  <label class="smax-switch">
                    <input type="checkbox" id="stdSkillFollowup" checked onchange="app.toggleStdFollowup(this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>

                <!-- Khung cấu hình bám đuổi khi bật ON -->
                <div id="stdFollowupSettingsBox" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 4px;">
                  <div style="display: grid; grid-template-columns: 240px 1fr; gap: 16px; align-items: flex-start;">
                    <div class="smax-form-group" style="margin-bottom: 0;">
                      <label class="smax-label" style="font-size: 12px;">
                        Khung thời gian gửi tin nhắn (Tối đa 8h):
                      </label>
                      <select id="selectStdFollowupTime" class="smax-select" style="font-size: 13px;">
                        <option value="15m">Sau 15 phút không phản hồi</option>
                        <option value="30m">Sau 30 phút không phản hồi</option>
                        <option value="1h">Sau 1 giờ không phản hồi</option>
                        <option value="2h" selected>Sau 2 giờ không phản hồi (Khuyên dùng)</option>
                        <option value="4h">Sau 4 giờ không phản hồi</option>
                        <option value="6h">Sau 6 giờ không phản hồi</option>
                        <option value="8h">Sau 8 giờ không phản hồi (Tối đa Meta)</option>
                      </select>
                      <div style="font-size: 11px; color: #64748b; margin-top: 5px;">
                        🛡️ Tuân thủ chính sách gửi tin nhắn bám đuổi của Meta (Tối đa 8h).
                      </div>
                    </div>

                    <div class="smax-form-group" style="margin-bottom: 0;">
                      <label class="smax-label" style="font-size: 12px;">
                        Nội dung tin nhắn bám đuổi (Message Template):
                      </label>
                      <textarea id="textareaStdFollowupMsg" class="smax-textarea" rows="3" style="font-size: 12.5px; line-height: 1.5;" placeholder="Nhập nội dung tin nhắn bám đuổi khách...">Dạ shop thấy mình đang quan tâm đến sản phẩm bên em. Hiện shop đang có ưu đãi Freeship và giảm 15% trong hôm nay, bạn có cần mình tư vấn thêm gì không ạ? 😊</textarea>
                      <div style="font-size: 11px; color: #64748b; margin-top: 4px; display: flex; justify-content: space-between;">
                        <span>Gợi ý: Nhắc nhẹ về ưu đãi giảm giá hoặc hỗ trợ giải đáp thắc mắc.</span>
                        <span id="stdFollowupCharCount">168/500</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Kỹ năng 4: Chuyển quyền khi khách cần gặp nhân viên -->
              <div class="smax-skill-item" style="flex-direction: column; align-items: stretch; gap: 12px;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <strong style="font-size: 14.5px; color: #0a1317;">4. Chuyển Quyền Khi Khách Hàng Cần Gặp Nhân Viên (Human Handoff)</strong>
                    <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                      Khi khách yêu cầu gặp người thật hoặc hỏi vấn đề phức tạp ngoài phạm vi, AI sẽ tự động bàn giao cuộc trò chuyện cho nhân viên và tạm dừng AI.
                    </p>
                  </div>
                  <label class="smax-switch">
                    <input type="checkbox" id="stdSkillHandoff" checked onchange="app.toggleStdHandoff(this.checked)">
                    <span class="smax-switch-slider"></span>
                  </label>
                </div>

                <!-- Cấu hình hẹn giờ AI phục vụ lại -->
                <div id="stdHandoffSettingsBox" style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px; margin-top: 4px;">
                  <div style="display: flex; align-items: center; gap: 16px;">
                    <label class="smax-label" style="font-size: 12px; margin-bottom: 0; white-space: nowrap;">
                      Hẹn giờ AI tự động phục vụ trở lại sau khi bàn giao:
                    </label>
                    <select id="selectStdHandoffResume" class="smax-select" style="max-width: 260px; font-size: 12.5px;">
                      <option value="5" selected>Sau 5 phút (Khuyên dùng)</option>
                      <option value="15">Sau 15 phút</option>
                      <option value="30">Sau 30 phút</option>
                      <option value="60">Sau 1 giờ</option>
                      <option value="0">Không tự động (Chờ nhân viên đóng ca)</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            <!-- GIAO DIỆN ADVANCE MODE (CÁC KỸ NĂNG NÂNG CAO) -->
            <div id="step5AdvanceContainer" class="smax-card">
              <div class="smax-card-header">
                <div class="smax-card-title">Bước 5: Các Kỹ Năng Tự Động Của AI (Advance)</div>
                <span class="smax-badge smax-badge-blue">Tự động nhận diện</span>
              </div>

              <p style="color: #5d6c7b; font-size: 13.5px; margin-bottom: 16px;">
                Bật các kỹ năng thông minh để trợ lý AI tự động bóc tách số điện thoại, địa chỉ và hỗ trợ tạo đơn hàng nhanh chóng khi trò chuyện.
              </p>

              <!-- Skill 1: Thu thập Lead -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">1. Tự động lấy Số điện thoại & Khách hàng tiềm năng</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Khi khách để lại số điện thoại hoặc email, AI sẽ tự động ghi nhận và chuyển cho đội ngũ bán hàng liên hệ.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillLead" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Skill 2: Chốt đơn hàng -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">2. Tự động lên Đơn hàng khi khách chốt mua</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Tự nhận diện mẫu mã, kích cỡ, số lượng, họ tên và địa chỉ nhận hàng để chuẩn bị đơn hàng ngay lập tức.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillOrder" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Skill 3: Tra cứu đơn hàng -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">3. Tra cứu Tình trạng Đơn hàng & Vận chuyển</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Khi khách hỏi đơn hàng của mình đã gửi chưa, AI sẽ tự tra cứu và thông báo trạng thái giao hàng cho khách.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillTrack" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

              <!-- Skill 4: Gợi ý mã giảm giá -->
              <div class="smax-skill-item">
                <div>
                  <strong style="font-size: 14.5px; color: #0a1317;">4. Tự động Gợi ý Mã Giảm Giá & Quà tặng</strong>
                  <p style="color: #5d6c7b; font-size: 12.5px; margin-top: 2px;">
                    Tự động gợi ý mã miễn phí vận chuyển hoặc giảm giá khi đơn hàng của khách đạt điều kiện ưu đãi.
                  </p>
                </div>
                <label class="smax-switch">
                  <input type="checkbox" id="skillPromo" checked>
                  <span class="smax-switch-slider"></span>
                </label>
              </div>

            </div>
          </section>`;

htmlCode = htmlCode.replace(step5PanelTarget, step5PanelReplacement);
fs.writeFileSync(htmlPath, htmlCode, 'utf8');
console.log('src/index.html updated with 6-step Stepper and Step 5 Standard Skills UI!');

// 3. UPDATE src/js/app.js
const appPath = path.join(__dirname, '../src/js/app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

// A. Update setSystemVersion to set totalSteps = 6 for standard
const setSysVerTarget = `  setSystemVersion(version) {
    this.systemVersion = version; // 'standard' | 'advance'
    this.totalSteps = version === 'standard' ? 5 : 8;`;

const setSysVerReplacement = `  setSystemVersion(version) {
    this.systemVersion = version; // 'standard' | 'advance'
    this.totalSteps = version === 'standard' ? 6 : 8;`;

appCode = appCode.replace(setSysVerTarget, setSysVerReplacement);

// B. Update versionLabel toast notification
const toastVerTarget = `tabsApp.showToast(\`Đã chuyển sang \${versionLabel} (\${version === 'standard' ? '5 bước tinh gọn' : '8 bước nâng cao'})\`);`;
const toastVerReplacement = `tabsApp.showToast(\`Đã chuyển sang \${versionLabel} (\${version === 'standard' ? '6 bước tinh gọn' : '8 bước nâng cao'})\`);`;
appCode = appCode.replace(toastVerTarget, toastVerReplacement);

// C. Update renderStep mapping for 6-step standard
const renderStepTarget = `    // Determine actual panel to activate
    let targetPanelStep = stepNumber;
    if (isStandard && stepNumber === 5) {
      targetPanelStep = 8; // Step 5 in standard maps to Panel 8 (Playground & Publish)
    }`;

const renderStepReplacement = `    // Determine actual panel to activate
    let targetPanelStep = stepNumber;
    if (isStandard) {
      if (stepNumber === 5) {
        targetPanelStep = 5; // Step 5 in standard shows Panel 5 (Standard Skills)
      } else if (stepNumber === 6) {
        targetPanelStep = 8; // Step 6 in standard maps to Panel 8 (Playground & Publish)
      }
    }

    // Toggle Standard vs Advance container in Step 5
    const stdContainer = document.getElementById('step5StandardContainer');
    const advContainer = document.getElementById('step5AdvanceContainer');
    if (stdContainer) stdContainer.style.display = isStandard ? 'block' : 'none';
    if (advContainer) advContainer.style.display = !isStandard ? 'block' : 'none';`;

appCode = appCode.replace(renderStepTarget, renderStepReplacement);

// D. Add Standard skills methods (toggleStdFollowup, toggleStdHandoff, update preset text)
const bindStep8Target = `  // --- Step 8: Audience & Schedule Control Methods (Khớp hình đính kèm) ---`;

const stdSkillsMethods = `  // --- Step 5 Standard Skills Methods ---
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
      counter.innerText = \`\${textarea.value.length}/500\`;
    }
  }

  // --- Step 8: Audience & Schedule Control Methods (Khớp hình đính kèm) ---`;

appCode = appCode.replace(bindStep8Target, stdSkillsMethods);

// E. In applyIndustryPreset, update default follow-up message for standard mode
const presetApplyTarget = `    // 2. Persona State
    this.state.persona.tone = preset.tone;`;

const presetApplyReplacement = `    // Update Standard Followup Text based on industry
    const stdFollowupMsg = document.getElementById('textareaStdFollowupMsg');
    if (stdFollowupMsg) {
      if (presetKey === 'fashion') {
        stdFollowupMsg.value = 'Dạ shop thấy mình đang quan tâm đến mẫu trang phục này. Hiện shop đang có ưu đãi giảm 15% và freeship trong hôm nay, bạn có cần mình tư vấn chọn size vừa vặn nhất không ạ? 😊';
      } else if (presetKey === 'cosmetics') {
        stdFollowupMsg.value = 'Dạ em thấy mình đang tìm hiểu về liệu trình chăm sóc da. Hiện tại shop đang có ưu đãi tặng mẫu thử Serum B5 và voucher 50k, mình có muốn em giữ ưu đãi này cho mình không ạ? 🌸';
      } else if (presetKey === 'fnb') {
        stdFollowupMsg.value = 'Dạ bạn đã chọn được món trà sữa yêu thích chưa ạ? Hiện quán đang có mã freeship 25k cho đơn đặt liền tay, bạn cần quán giao ngay không ạ? 🧋';
      } else if (presetKey === 'real_estate') {
        stdFollowupMsg.value = 'Dạ em thấy anh/chị đang quan tâm đến dự án. Bên em đang có chính sách chiết khấu 5% đợt 1 và bảng giá chi tiết, em gửi qua Zalo/tin nhắn cho anh/chị tham khảo nhé! 🏢';
      } else if (presetKey === 'spa_clinic') {
        stdFollowupMsg.value = 'Dạ em thấy mình đang quan tâm đến gói chăm sóc da/làm đẹp. Hôm nay viện thẩm mỹ đang có suất ưu đãi giảm 30% cho khách đặt lịch trước, mình có muốn em giữ chỗ khung giờ đẹp không ạ? ✨';
      }
      this.updateStdFollowupCharCount();
    }

    // 2. Persona State
    this.state.persona.tone = preset.tone;`;

appCode = appCode.replace(presetApplyTarget, presetApplyReplacement);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('src/js/app.js updated successfully with 6-step standard workflow and standard skills methods!');
