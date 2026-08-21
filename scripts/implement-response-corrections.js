const fs = require('fs');
const path = require('path');

// 1. UPDATE src/index.html
const indexPath = path.join(__dirname, '../src/index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// A. Update Tab 2 table header with HÀNH ĐỘNG
const logTheadTarget = `                    <th>TÓM TẮT VẤN ĐỀ</th>
                    <th style="width: 95px;">NGÀY</th>
                  </tr>`;

const logTheadReplacement = `                    <th>TÓM TẮT VẤN ĐỀ</th>
                    <th style="width: 95px;">NGÀY</th>
                    <th style="width: 140px; text-align: center;">HÀNH ĐỘNG</th>
                  </tr>`;

indexHtml = indexHtml.replace(logTheadTarget, logTheadReplacement);

// B. Update Tab 3 to add Khối 4 (Few-Shot Q&A Overrides)
const tab3Khối3EndTarget = `                    <button class="smax-btn-primary-coral" style="padding: 6px 14px; font-size: 12px;" onclick="tabsApp.showToast('Đã lưu chính sách đối thủ cạnh tranh!')">Lưu thay đổi</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>`;

const tab3Khối4Html = `                    <button class="smax-btn-primary-coral" style="padding: 6px 14px; font-size: 12px;" onclick="tabsApp.showToast('Đã lưu chính sách đối thủ cạnh tranh!')">Lưu thay đổi</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Khối 4: Bộ Hiệu Chỉnh Câu Trả Lời & Huấn Luyện Thực Tế (Few-Shot Q&A Overrides) -->
            <div class="smax-section-box">
              <div class="smax-section-header" style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                  <div class="smax-section-title">Huấn Luyện & Hiệu Chỉnh Câu Trả Lời Thực Tế (Few-Shot Q&A Overrides)</div>
                  <div class="smax-section-desc">Cơ chế nạp câu trả lời chuẩn (Ground Truth) khi AI trả lời sai từ log hội thoại hoặc tình huống đặc thù chuẩn Meta Business Agent.</div>
                </div>
                <button class="smax-btn-primary-coral" onclick="tabsApp.openAddCorrectionModal()">
                  <span>+</span> Thêm cặp câu hỏi - đáp mới
                </button>
              </div>

              <!-- Mini summary stats -->
              <div style="display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 16px;">
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 8px 14px; font-size: 12px; display: flex; align-items: center; gap: 8px;">
                  <span style="color: #64748b;">Tổng cặp đã huấn luyện:</span>
                  <strong style="color: #0f1835; font-size: 13px;" id="statTotalCorrections">6 cặp</strong>
                </div>
                <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 8px 14px; font-size: 12px; display: flex; align-items: center; gap: 8px;">
                  <span style="color: #166534;">Đang áp dụng:</span>
                  <strong style="color: #15803d; font-size: 13px;" id="statActiveCorrections">6 cặp (100%)</strong>
                </div>
                <div style="background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 8px 14px; font-size: 12px; display: flex; align-items: center; gap: 8px;">
                  <span style="color: #1e40af;">Trích xuất từ Log AI:</span>
                  <strong style="color: #2563eb; font-size: 13px;" id="statLogCorrections">4 cặp</strong>
                </div>
              </div>

              <!-- Search Bar & Filter -->
              <div style="display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 14px;">
                <div style="position: relative; flex: 1; max-width: 420px;">
                  <input type="text" id="correctionsTableSearchInput" class="smax-input" placeholder="Tìm theo câu hỏi khách, câu trả lời chuẩn, tên Agent..." style="width: 100%; font-size: 12.5px; padding: 7px 12px 7px 32px; border-radius: 8px;">
                  <svg style="position: absolute; left: 10px; top: 9px; color: #94a3b8;" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <select class="smax-select" id="selectCorrectionAgentFilter" onchange="tabsApp.filterCorrectionsByAgent(this.value)" style="font-size: 12px; padding: 6px 12px;">
                  <option value="all">Tất cả Trợ lý AI</option>
                  <option value="agent-1">Trợ lý Thời trang Smax</option>
                  <option value="agent-2">Chuyên viên Da liễu Smax</option>
                  <option value="agent-3">Trợ lý Đặt Món Trà Sữa</option>
                  <option value="agent-4">Chuyên viên BĐS</option>
                  <option value="agent-5">Trợ lý Thẩm Mỹ & Spa</option>
                </select>
              </div>

              <!-- Table -->
              <div style="overflow-x: auto; border: 1px solid #e8ecf2; border-radius: 10px;">
                <table class="smax-data-table" id="correctionsTable" style="margin: 0;">
                  <thead>
                    <tr>
                      <th style="width: 250px;">CÂU HỎI / TÌNH HUỐNG KHÁCH HỎI</th>
                      <th>CÂU TRẢ LỜI CHUẨN ĐÃ HUẤN LUYỆN (GROUND TRUTH)</th>
                      <th style="width: 180px;">TRỢ LÝ AI</th>
                      <th style="width: 130px;">NGUỒN GỐC</th>
                      <th style="width: 105px; text-align: center;">TRẠNG THÁI</th>
                      <th style="width: 100px; text-align: center;">HÀNH ĐỘNG</th>
                    </tr>
                  </thead>
                  <tbody id="correctionsTableBody">
                    <!-- Dynamically populated by tabs.js -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>`;

indexHtml = indexHtml.replace(tab3Khối3EndTarget, tab3Khối4Html);

// C. Add Teach AI Modal Backdrop before </body>
const teachModalHtml = `
  <!-- ========================================================================== -->
  <!-- MODAL HUẤN LUYỆN & HIỆU CHỈNH CÂU TRẢ LỜI AI (FEW-SHOT OVERRIDES)          -->
  <!-- ========================================================================== -->
  <div class="smax-modal-backdrop" id="teachAiModalBackdrop">
    <div class="smax-modal" style="max-width: 680px; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.25);">
      <div class="smax-modal-header" style="border-bottom: 1px solid #e8ecf2; padding: 18px 24px; background: #ffffff; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <div style="font-family: var(--font-heading); font-size: 17px; font-weight: 800; color: #0f1835; display: flex; align-items: center; gap: 8px;">
            <span>Huấn Luyện & Hiệu Chỉnh Câu Trả Lời AI</span>
            <span style="font-size: 11px; font-weight: 700; background: #e0e7ff; color: #3730a3; padding: 2px 8px; border-radius: 100px;">Meta Standard</span>
          </div>
          <div style="font-size: 12px; color: #64748b; margin-top: 3px;">
            Dạy cho AI câu trả lời chuẩn (Ground Truth) để ghi nhớ vĩnh viễn và không lặp lại lỗi sai trong tương lai.
          </div>
        </div>
        <button class="smax-modal-close-btn" onclick="tabsApp.closeTeachAiModal()" style="border: none; background: #f1f5f9; border-radius: 50%; width: 32px; height: 32px; font-size: 18px; cursor: pointer;">&times;</button>
      </div>

      <div class="smax-modal-body" style="padding: 20px 24px; max-height: 75vh; overflow-y: auto; background: #ffffff;">
        <input type="hidden" id="inputTeachLogId">
        <input type="hidden" id="inputTeachCorrectionId">

        <!-- Chọn Agent -->
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: #0f1835; margin-bottom: 5px;">
            Trợ lý AI áp dụng:
          </label>
          <select class="smax-select" id="selectTeachAgent" style="width: 100%; font-size: 12.5px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1;">
            <option value="agent-1">Trợ lý Tư vấn Thời trang Smax (Facebook Flagship)</option>
            <option value="agent-2">Chuyên viên Da liễu Smax (WhatsApp Cloud API)</option>
            <option value="agent-3">Trợ lý Đặt Món Trà Sữa (Facebook Fanpage)</option>
            <option value="agent-4">Chuyên viên Bất Động Sản (Facebook Ads)</option>
            <option value="agent-5">Trợ lý Thẩm Mỹ & Spa (WhatsApp VIP)</option>
          </select>
        </div>

        <!-- Câu hỏi của khách -->
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: #0f1835; margin-bottom: 5px;">
            Câu hỏi / Tình huống của khách hàng (Trigger Query): <span style="color: #eb6553;">*</span>
          </label>
          <textarea id="textareaTeachUserQuery" class="smax-textarea" style="width: 100%; min-height: 55px; font-size: 12.5px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1;" placeholder="Nhập câu hỏi hoặc tình huống của khách..."></textarea>
        </div>

        <!-- Câu trả lời sai trước đó (nếu có) -->
        <div id="teachWrongAnswerGroup" style="margin-bottom: 14px;">
          <label style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 700; color: #dc2626; margin-bottom: 5px;">
            <span>Câu trả lời sai / chưa chuẩn của AI trước đó:</span>
            <span style="font-size: 10.5px; font-weight: 600; background: #fee2e2; color: #991b1b; padding: 2px 8px; border-radius: 100px;">Cần khắc phục</span>
          </label>
          <div id="displayTeachWrongAnswer" style="background: #fef2f2; border: 1px dashed #fca5a5; border-radius: 8px; padding: 9px 12px; font-size: 12px; color: #991b1b; line-height: 1.5;">
            Dạ bên em freeship toàn quốc mọi đơn ạ.
          </div>
        </div>

        <!-- Câu trả lời chuẩn Ground Truth -->
        <div style="margin-bottom: 14px;">
          <label style="display: flex; align-items: center; justify-content: space-between; font-size: 12px; font-weight: 700; color: #166534; margin-bottom: 5px;">
            <span>Câu trả lời chuẩn mong muốn (Ground Truth Response): <span style="color: #eb6553;">*</span></span>
            <span style="font-size: 10.5px; font-weight: 600; background: #dcfce7; color: #15803d; padding: 2px 8px; border-radius: 100px;">AI sẽ học câu này</span>
          </label>
          <textarea id="textareaTeachIdealAnswer" class="smax-textarea" style="width: 100%; min-height: 80px; font-size: 12.5px; padding: 9px 12px; border-radius: 8px; border: 1.5px solid #10b981; background: #f0fdf4; color: #064e3b; line-height: 1.5;" placeholder="Nhập câu trả lời chuẩn mẫu mà bạn muốn AI trả lời..."></textarea>
        </div>

        <!-- Quy tắc ghi nhớ / Lời dặn -->
        <div style="margin-bottom: 14px;">
          <label style="display: block; font-size: 12px; font-weight: 700; color: #0f1835; margin-bottom: 5px;">
            Quy tắc ghi nhớ / Lời dặn bổ sung cho AI (Tùy chọn):
          </label>
          <input type="text" id="inputTeachRuleNote" class="smax-input" style="width: 100%; font-size: 12.5px; padding: 8px 12px; border-radius: 8px; border: 1px solid #cbd5e1;" placeholder="VD: Chỉ miễn phí ship cho đơn từ 500k trở lên. Dưới 500k phí ship 25k.">
        </div>

        <!-- Tùy chọn lưu -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 10px 14px;">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #334155; cursor: pointer; margin: 0;">
            <input type="checkbox" id="chkTeachSaveToTab3" checked style="accent-color: #eb6553; width: 15px; height: 15px;">
            <span>Tự động đồng bộ vào <strong>Kho Tri Thức Tab 3</strong> làm Few-Shot Q&A Overrides vĩnh viễn</span>
          </label>
        </div>
      </div>

      <div class="smax-modal-footer" style="padding: 14px 24px; border-top: 1px solid #e8ecf2; background: #fafafa; display: flex; align-items: center; justify-content: flex-end; gap: 10px;">
        <button class="smax-btn-pill-secondary" onclick="tabsApp.closeTeachAiModal()" style="padding: 6px 16px; font-size: 12.5px;">Hủy bỏ</button>
        <button class="smax-btn-pill-primary" onclick="tabsApp.saveTeachAiCorrection()" style="padding: 6px 18px; font-size: 12.5px; font-weight: 700;">
          <span>Lưu & Huấn Luyện Tức Thì</span>
        </button>
      </div>
    </div>
  </div>
`;

indexHtml = indexHtml.replace('</body>', teachModalHtml + '\n</body>');

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('src/index.html updated successfully with Tab 2, Tab 3 Khối 4 and Teach AI Modal!');
