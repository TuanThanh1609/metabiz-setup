const fs = require('fs');
const path = require('path');

// 1. UPDATE src/index.html
const htmlPath = path.join(__dirname, '../src/index.html');
let htmlCode = fs.readFileSync(htmlPath, 'utf8');

const targetOldCard3 = `            <!-- Card 3: Auto-Reply Comment -->
            <div class="smax-qs-card">
              <div class="smax-qs-card-header">
                <div class="smax-qs-card-title">3. Tự Động Phản Hồi Bình Luận & Ẩn Số Điện Thoại (Comment-to-Inbox)</div>
                <span class="smax-badge smax-badge-gray">Chống Cướp Khách</span>
              </div>

              <div style="display: flex; gap: 24px; margin-bottom: 14px;">
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <span>Tự động <strong>Thích (Like)</strong> bình luận</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <span style="color: #dc2626; font-weight: 600;">Tự động ẨN bình luận chứa SĐT/Email</span>
                </label>
                <label style="display: flex; align-items: center; gap: 8px; font-size: 13px; cursor: pointer;">
                  <input type="checkbox" checked>
                  <span>Tự động <strong>Gửi tin nhắn Inbox</strong> kèm báo giá</span>
                </label>
              </div>

              <div class="smax-form-group" style="margin-bottom: 0;">
                <label class="smax-label" style="font-size: 12px;">Mẫu tin nhắn gửi vào Inbox (Hỗ trợ Spin-syntax ngẫu nhiên tránh spam):</label>
                <textarea class="smax-textarea" rows="2" style="font-size: 12.5px;">Dạ {chào|xin chào|hi} [=GENDER("anh","chị","bạn")] {{name}}, shop đã gửi {bảng giá|thông tin chi tiết sản phẩm|ưu đãi hôm nay} vào hộp thư Messenger rồi ạ! Bạn kiểm tra tin nhắn giúp shop nhé {🥰|✨}</textarea>
              </div>
            </div>`;

const targetNewCard3 = `            <!-- Card 3: AI Tự Động Phản Hồi Bình Luận & Gửi Tin Nhắn Cho KH (Comment-to-Inbox) -->
            <div class="smax-qs-card" id="qsAiCommentCard">
              <div class="smax-qs-card-header">
                <div>
                  <div class="smax-qs-card-title">3. AI Tự Động Phản Hồi Bình Luận & Gửi Tin Nhắn Cho Khách Hàng (AI Comment-to-Inbox)</div>
                  <div style="font-size: 12.5px; color: #5d6c7b; margin-top: 3px;" id="qsAiCommentMechanismNote">
                    AI sẽ đọc nội dung bài post và nội dung khách hàng Comment, để tạo ra câu trả lời và gửi tin nhắn phù hợp
                  </div>
                </div>
                <span class="smax-badge smax-badge-coral">GenAI Đọc Post & Trả Lời</span>
              </div>

              <!-- Danh sách tính năng bật/tắt -->
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

              <!-- Khung mô phỏng cơ chế AI đọc post & trả lời -->
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px 16px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <strong style="font-size: 12.5px; color: #0f1835;">Mô phỏng cơ chế AI đọc bài Post và sinh câu trả lời tự nhiên:</strong>
                  <span class="smax-badge smax-badge-green" style="font-size: 11px;">● Live AI Context Simulator</span>
                </div>
                <div style="font-size: 12px; color: #475569; line-height: 1.6; display: flex; flex-direction: column; gap: 7px;">
                  <div>📌 <strong>Nội dung bài Post trên Fanpage:</strong> <em>"BST Sơ mi lụa Biluxury 2026 - Giảm 20% khi mua từ 2 áo, form Regular Fit tôn dáng..."</em></div>
                  <div>💬 <strong>Khách bình luận dưới bài:</strong> <em>"Áo này có size L màu đen không shop? Giá bao nhiêu vậy?"</em></div>
                  <div style="background: #ffffff; border-left: 3px solid #3b82f6; padding: 7px 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    🤖 <strong>AI Tự động trả lời Comment (Công khai):</strong> <em>"Dạ Biluxury chào bạn! Mẫu sơ mi lụa màu đen bên shop vẫn còn đủ size L ạ. Shop vừa gửi thông tin chi tiết bảng size và ưu đãi giảm 20% vào hộp thư Messenger rồi, bạn kiểm tra tin nhắn giúp shop nhé! 🥰"</em>
                  </div>
                  <div style="background: #ffffff; border-left: 3px solid #10b981; padding: 7px 12px; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.03);">
                    ✉️ <strong>AI Tự động gửi tin nhắn Inbox (Riêng tư):</strong> <em>"Dạ em chào anh/chị! Em gửi thông tin chi tiết áo Sơ mi lụa đen size L giá 399k (giá gốc 499k). Anh/chị cho em xin chiều cao cân nặng để em chọn chuẩn size cho mình nha!"</em>
                  </div>
                </div>
              </div>
            </div>`;

if (htmlCode.includes('3. Tự Động Phản Hồi Bình Luận & Ẩn Số Điện Thoại (Comment-to-Inbox)')) {
  htmlCode = htmlCode.replace(targetOldCard3, targetNewCard3);
  fs.writeFileSync(htmlPath, htmlCode, 'utf8');
  console.log('src/index.html updated with AI Comment-to-Inbox and mechanism note!');
} else {
  console.log('Card 3 string not found directly, checking match...');
}

// 2. UPDATE src/js/quick-setup.js
const jsPath = path.join(__dirname, '../src/js/quick-setup.js');
let jsCode = fs.readFileSync(jsPath, 'utf8');

const oldCommentState = `      commentReply: {
        autoLike: true,
        hidePhone: true,
        autoInbox: true,
        delay: '30_60',
        template: 'Dạ {chào|xin chào|hi} [=GENDER("anh","chị","bạn")] {{name}}, shop đã gửi {bảng giá|thông tin chi tiết sản phẩm|ưu đãi hôm nay} vào hộp thư Messenger rồi ạ! Bạn kiểm tra tin nhắn giúp shop nhé {🥰|✨}'
      },`;

const newCommentState = `      commentReply: {
        useAiReply: true,
        useAiInbox: true,
        autoLike: true,
        hidePhone: true,
        readPostContext: true,
        delay: '30_60',
        mechanismNote: 'AI sẽ đọc nội dung bài post và nội dung khách hàng Comment, để tạo ra câu trả lời và gửi tin nhắn phù hợp'
      },`;

if (jsCode.includes(oldCommentState)) {
  jsCode = jsCode.replace(oldCommentState, newCommentState);
  fs.writeFileSync(jsPath, jsCode, 'utf8');
  console.log('src/js/quick-setup.js updated with AI Comment-to-Inbox state!');
}
