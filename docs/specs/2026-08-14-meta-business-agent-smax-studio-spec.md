# Spec: Meta Business Agent Setup Studio (Smax.AI Embedded UI)

## 1. Objective & Value Proposition

### 1.1. Mục tiêu
Xây dựng giao diện **Meta Business Agent Setup Studio** nhúng trực tiếp trên nền tảng Smax.AI, cho phép doanh nghiệp cấu hình, huấn luyện, kiểm thử và đồng bộ Meta Business AI (Llama-based Agent) cho Messenger / Instagram / WhatsApp ngay trên Smax mà không cần phải truy cập Meta Business Suite hay Meta Developers.

### 1.2. Điểm nhấn & Ưu thế vượt trội so với Meta Business Suite

| Tiêu chí | Meta Business Suite (Gốc) | Smax Meta Agent Studio (Giải pháp của ta) |
| :--- | :--- | :--- |
| **Quy trình cài đặt** | Phân mảnh qua 4-5 giao diện (Meta Business Suite, Commerce Manager, WABA Manager, Developer App). | **1-Stop Wizard duy nhất**: Persona, Knowledge, Catalog, Automation trên một luồng liền mạch. |
| **Đồng bộ Tồn kho & Giá** | Catalog tĩnh, không tự cập nhật tồn kho realtime theo phần mềm bán hàng tại VN. | **Live Sync Đa kênh**: Kết nối tự động dữ liệu sản phẩm, giá, tồn kho từ Smax POS, KiotViet, Sapo, Nhanh.vn, Haravan. |
| **Xử lý sau tư vấn (Handover)** | Chỉ dừng lại ở việc đẩy về Meta Inbox cho người trực. | **Visual Handover Protocol**: Tự động tạo đơn hàng POS, bắn thông báo Telegram/Zalo cho sale, gắn nhãn Lead, chăm sóc tự động ngoài 24h. |
| **Mẫu ngành hàng (Presets)** | Nhập prompt thủ công từ đầu, dễ sai sót. | **1-Click Industry Presets**: Bộ template chuẩn cho Thời trang, Mỹ phẩm, F&B, Bất động sản, Spa/Nha khoa (tự điền persona, guardrails, entity schema). |
| **Môi trường Test & Debug** | Test rời rạc trên app hoặc webview hạn chế. | **Interactive Simulator & Entity Inspector**: Test chat trực tiếp, xem AI bóc tách thực thể (SĐT, Giỏ hàng, Địa chỉ) và mô phỏng kích hoạt Trigger Smax. |
| **Quản trị chi phí** | Khó dự toán token tiêu thụ của Meta. | **Token Cost Estimator**: Ước tính chi phí token Meta dựa trên dung lượng Knowledge Base và lưu lượng tin nhắn dự kiến. |

---

## 2. Tech Stack & Design System

* **Framework UI (Ver 1 Prototype)**: HTML5, Modern Vanilla CSS / Web Components (Zero external UI heavy dependencies, pure performance, iframe-friendly).
* **Design System**: Chuẩn **Smax.ai Design System** (Trích xuất từ `design-analysis.json`):
  * **Brand Primary (Dark Navy)**: `#0f1835` (rgb(15, 24, 53))
  * **Accent Color (Smax Coral)**: `#fa6e5b` (rgb(250, 110, 91))
  * **Secondary Brand Blue**: `#4277ff` / `#0a2c58`
  * **Canvas Background**: `#f4f6fa`
  * **Card / Panel Background**: `#ffffff`
  * **Borders**: `#dadee5`, `#e8ecf2`
  * **Typography**: Font family `Roboto, -apple-system, sans-serif`
  * **Status Colors**: Success `#4ade80`, Warning `#f59e0b`, Error `#ef4444`

---

## 3. Kiến trúc luồng Setup 6 bước chi tiết (Wizard Flow)

```
┌────────────────────────────────────────────────────────────────────────┐
│                        SMAX META AGENT STUDIO                          │
├────────────────────────────────────────────────────────────────────────┤
│ [1. Kênh]  ➔  [2. Persona]  ➔  [3. Knowledge]  ➔  [4. Skills]  ➔  [5. Handover]  ➔  [6. Test & Sync] │
└────────────────────────────────────────────────────────────────────────┘
```

### Bước 1: 🏢 Chọn Kênh & Xác thực Meta (Channel & Identity)
* Chọn Fanpage / WhatsApp WABA đã liên kết trên Smax.
* Checklist trạng thái API Permissions (`pages_messaging`, `messaging_handovers`, `whatsapp_business_messaging`).
* Tích hợp Meta Ad Account & Credit Line token billing.

### Bước 2: 🤖 Persona, Tone & Brand Voice
* Chọn **Industry Preset** (Thời trang / Mỹ phẩm / F&B / Dịch vụ / BĐS / Khác).
* Tên Agent, Vai trò đại diện.
* Giọng điệu (Thân thiện, Năng động, Lịch sự, Chuyên gia).
* Quy tắc xưng hô (*Shop - Bạn*, *Em - Anh/Chị*, *Mình - Cậu*).
* **AI Guardrails (Hàng rào an toàn)**: Thiết lập các điều cấm kỵ (không tranh cãi, không bàn luận ngoài phạm vi, không hứa hẹn sai chính sách).

### Bước 3: 📚 Knowledge Base Hub (Nạp tri thức thông minh)
* **Website / URL Crawl**: Nhập link website/bài viết $\rightarrow$ Tự động crawl và tạo index vectors.
* **Tài liệu & FAQs**: Kéo thả file PDF, DOCX, Bảng giá, Quy định đổi trả.
* **Smax POS / ERP Catalog Sync**: Bật công tắc đồng bộ sản phẩm trực tiếp từ Smax POS / KiotViet / Sapo.
* **Custom Q&A Rules**: Thêm các cặp câu hỏi - câu trả lời trọng điểm.

### Bước 4: ⚡ Skills & Smart Connectors (Kỹ năng hành động)
* **Kỹ năng 1: Thu thập Lead (Lead Qualifier)** $\rightarrow$ Tự bóc tách Họ tên, SĐT, Email, Nhu cầu.
* **Kỹ năng 2: Tư vấn & Chốt đơn (Order Assistant)** $\rightarrow$ Bóc tách Sản phẩm, Phân loại SKU, Số lượng, Địa chỉ giao hàng.
* **Kỹ năng 3: Tra cứu đơn hàng (Order Tracking)** $\rightarrow$ Khách gửi mã đơn $\rightarrow$ Tra cứu trạng thái từ Smax POS realtime.
* **Kỹ năng 4: Tư vấn khuyến mãi (Promotion Finder)** $\rightarrow$ Tự gợi ý mã voucher hợp lệ.

### Bước 5: 🔄 Handover Protocol & Automation Flow (Bàn giao với Smax)
* **Quy tắc chuyển giao (`pass_thread_control`)**:
  * Khi phát hiện Lead $\rightarrow$ Chạy Block Smax: *Gắn Tag Lead + Bắn tin Telegram Sale*.
  * Khi phát hiện Đơn hàng $\rightarrow$ Chạy Block Smax: *Tạo đơn nháp Smax POS + Gửi QR chuyển khoản*.
  * Khi khách bấm/yêu cầu "Gặp tư vấn viên" $\rightarrow$ Chạy Block Smax: *Phân công nhân viên trực Livechat*.
* **Quy tắc hoàn trả quyền (`Meta Business AI Active`)**:
  * Cấu hình thời gian tự động trả lại quyền cho Meta AI sau khi kịch bản kết thúc hoặc sau khoảng nghỉ (VD: 5 phút không tương tác).

### Bước 6: 🧪 Test Playground & 1-Click Publish
* **Live Chat Simulator**: Khung chat thử nghiệm trực tiếp 2 bên:
  * Bên trái: Cửa sổ chat mô phỏng khách hàng.
  * Bên phải: **Entity & Logic Inspector** (Hiển thị Realtime JSON Payload, Intent nhận diện, Entities trích xuất, và Trigger Smax được kích hoạt).
* **Token Cost Estimator**: Hiển thị dự toán token Meta sử dụng.
* **1-Click Sync**: Nút xuất bản đồng bộ sang Meta Graph API + Tạo tự động Triggers & Blocks trên Smax.

---

## 4. Project Structure (Ver 1)

```
d:/vibe-coding/metaBizAI - Smax/
├── docs/
│   └── specs/
│       └── 2026-08-14-meta-business-agent-smax-studio-spec.md
├── src/
│   ├── index.html            # Main SPA Entrypoint
│   ├── css/
│   │   ├── smax-theme.css    # Smax Design System Tokens & Base Styles
│   │   ├── wizard.css        # Stepper & Form Layouts
│   │   └── playground.css    # Interactive Chat & Entity Inspector
│   └── js/
│       ├── app.js            # Main Controller & State Management
│       ├── presets.js        # Industry Templates (Fashion, Cosmetics, F&B, etc.)
│       ├── simulator.js      # Mock AI Reasoning & Entity Extraction Engine
│       └── smax-bridge.js    # PostMessage & Smax Partner API Integration
├── package.json
└── README.md
```

---

## 5. Boundaries & Quy tắc thực hiện

* **Always**:
  * Tuân thủ 100% token màu sắc, typography và spacing trong `design-analysis.json`.
  * Đảm bảo giao diện co giãn tốt (Responsive) và có thể nhúng mượt mà trong iframe/Webview của Smax.
  * Hỗ trợ tương tác trực quan (chuyển step mượt, chọn preset tự điền form, chat test sinh động).
* **Ask first**:
  * Khi bổ sung thêm các bước ngoài luồng 6 bước chuẩn.
  * Khi tích hợp thêm các thư viện bên thứ 3 ngoài vanilla stack.
* **Never**:
  * Sử dụng màu sắc lạc quẻ (như tím đậm viền neon) trái ngược với phong cách clean Smax Navy & Coral.
  * Giả định thiếu thông tin thực tế của Meta Business Agent API.

---

## 6. Success Criteria

1. Giao diện prototype chạy mượt mà ngay trên browser qua `npm run dev` hoặc `npx serve` / live server.
2. Hoàn chỉnh trọn vẹn cả 6 bước cấu hình với đầy đủ form fields, presets và toggle switches.
3. Tab **Test Playground** cho phép gõ tin nhắn thử nghiệm (VD: "Tôi muốn mua áo sơ mi trắng size L ship về 123 Cầu Giấy SĐT 0987654321") và hiển thị trực quan việc trích xuất thực thể cùng kịch bản Smax kích hoạt.
4. Có nút "Xem cấu hình JSON / Export API Payload" để sẵn sàng tích hợp với Smax Partner API & Meta API.
