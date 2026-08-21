# Spec: Quick Setup — Module Hướng dẫn Kích hoạt Automation Smax theo Hành trình Khách hàng

> **Ngày tạo:** 2026-08-18  
> **Phiên bản:** v1.0  
> **Trạng thái:** Draft — Chờ User review  

---

## Objective

### Vấn đề
User mới trên Smax không biết phải bắt đầu từ đâu để kích hoạt các kịch bản **Tự động bán hàng & Chăm sóc khách hàng**. Hiện tại, việc thiết lập Trigger, Block, Sequence, GenAI, Minigame, Webview, AI Insight... đều nằm rải rác trong nhiều module khác nhau (Bot-Auto, Khách hàng, Extend Modules). User phải tự mò hướng dẫn và ghép nối các phần lại với nhau.

### Giải pháp
Xây dựng module **"Quick Setup"** — một giao diện Wizard hướng dẫn từng bước, dẫn dắt user thiết lập **1 luồng Automation hoàn chỉnh xuyên suốt toàn bộ hành trình khách hàng** (Trước mua → Trong mua → Sau mua), kết hợp AI Insight đa chiều. Sau khi hoàn tất, user có 1 hệ thống automation chạy end-to-end.

### User Story
> Là một **Chủ cửa hàng online mới sử dụng Smax**, tôi muốn **được hướng dẫn từng bước để kích hoạt tự động hóa bán hàng và chăm sóc khách hàng**, để **chatbot, bám đuổi, minigame, webview đơn hàng, AI Insight đều chạy xuyên suốt mà tôi không cần phải tự mò cách thiết lập từng phần riêng lẻ**.

### Success Criteria
1. User mới có thể hoàn thành Quick Setup trong **< 15 phút**.
2. Sau khi hoàn tất, **tất cả 6 kịch bản tự động hóa** (Welcome → GenAI → Lead → Bám đuổi + Minigame → Webview Đơn hàng + Upsale → AI Insight) **được bật và chạy ngay**.
3. User có thể **giám sát hiệu quả luồng automation** qua 5 tab Sidebar riêng biệt.
4. **Giao diện nhất quán** với design system Smax hiện có (Roboto, color palette Navy/Coral #eb6553, card system, toggle switches...).
5. Tương thích với luồng Meta Business Agent Standard/Advance đã có — không can thiệp lẫn nhau.

---

## Assumptions

```
ASSUMPTIONS:
1. Quick Setup là module PROTOTYPE UI (No-Code HTML/CSS/JS) — tương tự luồng Meta Business Agent đã xây.
2. Không có backend thật — tất cả dữ liệu là mock/demo data.
3. Module Quick Setup hoạt động độc lập: Sidebar riêng, Content Area riêng, KHÔNG dùng chung với Meta Business Agent.
4. Khi click "Quick Setup" trên Topbar → chuyển toàn bộ Sidebar + Content Area sang giao diện Quick Setup.
5. Khi click lại "Meta Business Agent Standard/Advance" → trở về giao diện Meta Business Agent như cũ.
6. Codebase vẫn là static HTML/CSS/JS, deploy trên Vercel.
→ Correct me now or I'll proceed with these.
```

---

## Tech Stack

| Layer | Công nghệ | Phiên bản |
|-------|-----------|-----------|
| Markup | HTML5 (Single Page) | — |
| Styling | CSS3 (Custom Design System, BEM-like) | — |
| Logic | Vanilla JavaScript (ES6+ Classes) | — |
| Fonts | Google Fonts: Roboto (300–900) | — |
| Deploy | Vercel (Static Hosting) | — |
| Testing | Node.js script (test-verify.js) | — |

---

## Commands

```bash
# Development (chạy local)
npx serve src -l 3000

# Test verification
node test-verify.js

# Deploy production
npx vercel --prod --yes
```

---

## Project Structure

```
src/
├── index.html           → Single HTML file (thêm Quick Setup sections)
├── css/
│   ├── smax-theme.css   → Design tokens, layout, sidebar, topbar
│   ├── wizard.css        → Wizard modal, stepper, step panels
│   ├── playground.css    → Chat simulator
│   ├── tabs.css          → Tab views (Log, Tri thức, Thống kê, Leads, Đơn hàng)
│   └── quick-setup.css   → [MỚI] CSS cho Quick Setup module
├── js/
│   ├── app.js            → Main app class (SmaxApp)
│   ├── presets.js         → Industry presets data
│   ├── simulator.js       → Chat simulator logic
│   ├── smax-bridge.js     → Bridge events
│   ├── tabs.js            → TabsManager class
│   └── quick-setup.js    → [MỚI] QuickSetupManager class
scripts/                   → Build/migration scripts
test-verify.js             → Assertion-based test suite
```

---

## Thiết Kế Chi Tiết Module Quick Setup

### 1. Topbar Integration

Thêm menu item **"Quick Setup"** ngay sau "Meta Business Agent Advance" trên Topbar:

```html
<!-- Topbar Menu -->
<ul class="smax-menu-links">
  <li><a href="#" class="smax-menu-item">Bảng tin</a></li>
  <li><a href="#" class="smax-menu-item">Nhắn tin</a></li>
  <li><a href="#" class="smax-menu-item">Bot-auto</a></li>
  <li><a href="#" class="smax-menu-item">Khách hàng</a></li>
  <li><a href="#" class="smax-menu-item" id="topMenuMetaStandard">Meta Business Agent Standard</a></li>
  <li><a href="#" class="smax-menu-item" id="topMenuMetaAdvance">Meta Business Agent Advance</a></li>
  <!-- MỚI -->
  <li><a href="#" class="smax-menu-item" id="topMenuQuickSetup" onclick="app.switchModule('quickSetup'); return false;">
    🚀 Quick Setup
  </a></li>
</ul>
```

**Hành vi `app.switchModule('quickSetup')`:**
- Ẩn toàn bộ Sidebar cũ (`.smax-sidebar` hiện tại) + Content Area cũ (`.smax-content-pane` hiện tại)
- Hiện Sidebar Quick Setup (`#quickSetupSidebar`) + Content Area Quick Setup (`#quickSetupContentPane`)
- Highlight menu "Quick Setup" trên Topbar, remove active từ Standard/Advance
- Toast: "Đã chuyển sang Quick Setup — Hướng dẫn kích hoạt Automation"

**Hành vi quay lại Meta Business Agent:**
- Khi click "Standard" hoặc "Advance" → ẩn Quick Setup, hiện lại Sidebar + Content cũ

---

### 2. Layout Tổng Thể Quick Setup

```
┌──────────────────────────────────────────────────────────────────────────────┐
│  TOPBAR  [...] [Standard] [Advance] [🚀 Quick Setup ✓]                     │
├──────────────┬───────────────────────────────────────────────────────────────┤
│              │                                                              │
│  SIDEBAR     │  CONTENT AREA (Quick Setup)                                  │
│  Quick Setup │                                                              │
│              │  ┌──────────────────────────────────────────────────────┐    │
│  📊 Tổng quan│  │  WIZARD STEPPER (7 BƯỚC)                            │    │
│  📋 Log      │  │  [1. Kênh] [2. GenAI] [3. Lead] [4. Bám đuổi]     │    │
│  📈 Chuyển   │  │  [5. Sau mua] [6. AI Insight] [7. Kích hoạt]      │    │
│     đổi      │  ├──────────────────────────────────────────────────────┤    │
│  🧠 AI       │  │                                                      │    │
│     Insight  │  │  STEP PANEL CONTENT                                  │    │
│  ⚙️ Kênh &   │  │  (Thay đổi theo bước đang active)                   │    │
│     Kịch bản │  │                                                      │    │
│              │  ├──────────────────────────────────────────────────────┤    │
│              │  │  [← Quay lại]              [Tiếp tục →]             │    │
│              │  └──────────────────────────────────────────────────────┘    │
│              │                                                              │
├──────────────┴───────────────────────────────────────────────────────────────┤
```

**Đặc điểm:**
- Wizard **KHÔNG phải Modal** mà là **inline trong Content Area** (khác với Meta Business Agent dùng Modal)
- Stepper nằm ngay đầu Content Area, nội dung bước hiển thị bên dưới
- Footer cố định có nút "Quay lại" và "Tiếp tục"
- Sidebar luôn hiển thị 5 tab giám sát bên trái

---

### 3. Wizard 7 Bước — Thiết Kế Chi Tiết Từng Bước

---

#### Bước 1: Kết nối Kênh & Nhận diện Thương hiệu (🏠 Nền tảng)

**Stepper Label:** `Bước 1 — Kênh & Thương hiệu`

**Panel chứa 3 cards:**

**Card 1 — Kết nối Kênh Bán hàng:**
- Grid checkbox 8 kênh: Facebook Messenger ✅, Zalo OA ✅, Instagram DM, TikTok Shop, Shopee Chat, Telegram, WhatsApp Business, Livechat Website
- Bảng trạng thái kênh đã kết nối: Fanpage name + trạng thái (✅ Đã kết nối / ⚠️ Chưa kết nối + nút [Kết nối ngay])

**Card 2 — Nhận diện Thương hiệu & Ngành hàng:**
- Input text: Tên thương hiệu
- Dropdown ngành hàng: Thời trang, Mỹ phẩm, F&B, Bất động sản, Spa, Giáo dục, Khác
- Ghi chú: Chọn đúng ngành hàng sẽ giúp hệ thống tự đề xuất kịch bản phù hợp

**Card 3 — Nguồn Dữ liệu Sản phẩm (Tùy chọn):**
- Radio buttons: Google Sheet, Google Drive, Link Shopee, Bỏ qua (mặc định)

**State data:** `channels[]`, `brandName`, `industry`, `dataSource`

---

#### Bước 2: Chào đón & Trợ lý AI Thông minh GenAI (📥 Trước mua)

**Stepper Label:** `Bước 2 — Chào đón & Trợ lý AI`

**Panel chứa 3 cards:**

**Card 1 — Kịch bản Chào mừng (Welcome Bot):**
- Textarea tin nhắn chào mừng (pre-filled theo industry preset, chèn `{{name}}`)
- Danh sách nút Quick Replies (thêm/xóa): [Xem bảng giá] [Sản phẩm mới] [Liên hệ tư vấn]
- Textarea tin nhắn mặc định (Default Fallback)

**Card 2 — Kết nối Trợ lý AI GenAI:**
- Radio buttons LLM: OpenAI ChatGPT (mặc định), Google Gemini, Anthropic Claude, DeepSeek, Groq
- Input API Key (password field + toggle show)
- Dropdown vai trò AI (Chat Sales Support, Product Consulting, Marketing & CSKH, Customer Data)
- Nạp Knowledge Base: Upload files + Link Google Drive + Google Sheet. Danh sách đã nạp.
- AI Intentions (checkboxes + editable): Hỏi giá→AI trả lời, Đặt hàng→Thu thập Lead, Hỏi vận chuyển→Chính sách ship, Khiếu nại→Chuyển nhân viên, Hủy đơn→Hướng dẫn quy trình. Nút [+ Thêm ý định tùy chỉnh]

**Card 3 — Auto-Reply Bình luận:**
- 3 toggle switches: Tự động Like, Tự động Ẩn SĐT/Email (chống cướp khách), Tự động gửi inbox
- Textarea tin nhắn inbox (spin-syntax xoay vòng với `{variant1|variant2}` và `{{name}}`)
- Dropdown thời gian chờ: 30-60 giây ngẫu nhiên (mặc định), 10-30s, 60-120s

**State data:** `welcomeMessage`, `quickReplies[]`, `fallbackMessage`, `genAI.*`, `commentReply.*`

---

#### Bước 3: Thu thập Lead, Chốt Đơn & Thanh toán (🛒 Trong mua)

**Stepper Label:** `Bước 3 — Lead & Chốt đơn`

**Panel chứa 3 cards:**

**Card 1 — Thu thập Thông tin Khách hàng (Lead Capture):**
- 5 toggle switches: SĐT ✅, Email ✅, Họ tên ✅, Địa chỉ ✅, Ngày sinh ⚪
- Bảng quy tắc gắn Tag tự động (4 dòng preset + nút thêm):
  - Có SĐT/Email → Tag [Lead nóng] [Mới tiếp cận]
  - Hỏi giá → Tag [Đã báo giá]
  - Chốt đơn → Tag [Đã chốt đơn] [Khách mua]
  - Từ chối → Tag [Từ chối] [Cần bám đuổi]

**Card 2 — Tự động Tạo Đơn hàng từ Chat:**
- Toggle ON/OFF: Bật tự động tạo đơn
- Radio buttons POS: Không tích hợp (mặc định), KiotViet, Haravan, Sapo, Nhanh.vn, Shopify, WooCommerce
- Input API Key POS (conditional, chỉ hiện khi chọn POS)

**Card 3 — Thanh toán Tự động (Payment Hub):**
- Toggle ON/OFF: Tự động tạo mã QR thanh toán
- Dropdown ngân hàng + Input tên TK + Input số TK
- Ghi chú: Tự động xác nhận khi khách chuyển khoản thành công

**State data:** `leadCapture.*`, `autoOrder.*`, `payment.*`

---

#### Bước 4: Bám đuổi 24h & Minigame Kích cầu (🛒 Trong mua)

**Stepper Label:** `Bước 4 — Bám đuổi & Minigame`

**Panel chứa 1 card lớn:**

**Card — Chuỗi Bám đuổi Trong 24h (Follow-up Sequence):**
- Ghi chú: Tận dụng "Cửa sổ vàng 24h" của Meta gửi tin miễn phí
- Timeline dọc 5 bước (kéo-thả, thêm/xóa):
  1. **Ngay lập tức (0s):** Gửi Voucher ưu đãi (textarea nội dung, pre-filled theo industry)
  2. **Sau 1 giờ:** Social Proof — Ảnh/Video feedback khách cũ (textarea + upload ảnh)
  3. **Sau 3 giờ:** Urgency — "Chỉ còn 2 SP cuối trong kho" (textarea)
  4. **Sau 8 giờ:** **MINIGAME KÍCH CẦU** — Dropdown loại game (Lucky Wheel / Mở quà / Quiz), cấu hình phần thưởng (Voucher 15%, Freeship, Quà tặng), tỷ lệ trúng (dropdown 70%/50%/30%), toggle viral (Tag 2 bạn = +1 lượt quay), nút [Cấu hình Minigame ▸]
  5. **Sau 20 giờ:** Last Chance — Nhắc mã sắp hết hạn + nút [Đặt hàng ngay] [Chat nhân viên]
- Nút [+ Thêm bước bám đuổi] [🗑️ Xóa bước]
- Khối "Cơ chế ngắt tự động": Khi khách chốt đơn → Sequence REMOVE tức thì

**State data:** `followupSequence.steps[]`, `minigame.*`

---

#### Bước 5: Webview Đơn hàng, CSKH & Upsale 7 Ngày (📦 Sau mua)

**Stepper Label:** `Bước 5 — Sau mua & Upsale`

**Panel chứa 2 cards:**

**Card 1 — Webview Đơn hàng (Xác nhận & Hành trình):**
- Toggle ON/OFF: Gửi Webview Xác nhận đơn hàng (Mã đơn, SP, SL, Tổng tiền, nút Xác nhận)
- Toggle ON/OFF: Gửi Webview Hành trình đơn hàng (Tracking realtime: Xác nhận → Đóng gói → Giao vận chuyển → Đang giao → Đã giao)
- Trạng thái POS (đồng bộ từ Bước 3): ✅ KiotViet — Đã kết nối
- Live Preview: Phone Mockup Frame hiển thị Webview mẫu (tên KH, mã đơn, SP, giá, nút Submit)

**Card 2 — Chuỗi Upsale 7 Ngày Sau Mua:**
- Toggle ON/OFF: Bật chuỗi upsale
- Timeline dọc 4 mốc:
  1. **Ngay khi giao thành công:** Cảm ơn + Hỏi đánh giá (textarea pre-filled)
  2. **Ngày 3:** Hỏi trải nghiệm sử dụng (textarea)
  3. **Ngày 5:** Gợi ý sản phẩm bổ sung Cross-sell (Gallery 3 SP, textarea)
  4. **Ngày 7:** Voucher VIP mua lại (textarea + input mã voucher + input hiệu lực)
- Nút [+ Thêm mốc chăm sóc]
- Kênh gửi (cho tin ngoài 24h): Radio Smax Extension (mặc định), FMM, ZNS/Zalo
- Dropdown khung giờ gửi an toàn: 9:00 - 20:00 (mặc định)

**State data:** `webview.*`, `upsale.*`

---

#### Bước 6: AI Insight & Phân tích Hội thoại 6 Chiều (🧠 Xuyên suốt)

**Stepper Label:** `Bước 6 — AI Insight`

**Panel chứa 2 cards:**

**Card 1 — AI Lead Intelligence — Phân tích 6 Chiều:**
- Ghi chú top: AI Insight phân tích MỌI phiên hội thoại xuyên suốt Trước mua → Trong mua → Sau mua
- 6 toggle switches (mỗi cái có label + mô tả + cấu hình phụ):
  1. **Chấm điểm Lead (Lead Scoring 0-100)** ✅ — Dropdown ngưỡng Hot Lead: ≥70 (mặc định), ≥80, ≥60
  2. **Mức độ tiềm năng (Hot/Warm/Cold)** ✅
  3. **Sản phẩm quan tâm (Interested Products)** ✅ — Trích xuất SKU/tên SP
  4. **Nhu cầu cụ thể (Specific Needs)** ✅
  5. **Lý do từ chối — Objections** ✅
  6. **Kịch bản xử lý từ chối — Objection Handling** ✅
- Live Preview: AI Lead Insight Card mẫu (Lead Score 88/100 Hot, SP, Nhu cầu, Từ chối, Đề xuất)

**Card 2 — Đồng bộ Tín hiệu Chuyển đổi (Meta CAPI):**
- Toggle ON/OFF: Bắn sự kiện chuyển đổi về Meta Ads Manager
- Input/Dropdown Dataset ID
- 3 checkboxes sự kiện: Event Lead ✅, Event Purchase ✅, Event AddToCart ☐

**State data:** `aiInsight.*`, `metaCapi.*`

---

#### Bước 7: Kiểm thử & Kích hoạt Toàn bộ Luồng (🚀 Kích hoạt)

**Stepper Label:** `Bước 7 — Kích hoạt`

**Panel chứa 3 cards:**

**Card 1 — Customer Journey Map:**
- Sơ đồ trực quan SVG/HTML toàn bộ hành trình đã setup
- Mỗi node hiện trạng thái ✅ Đã cấu hình / ⚠️ Chưa cấu hình
- Đếm: "Tổng: X/6 kịch bản đã sẵn sàng"

**Card 2 — Chat Simulator:**
- Khung chat simulator (tái sử dụng pattern từ Meta Business Agent Bước 8)
- Cho phép test end-to-end: Welcome → GenAI trả lời → Lead capture → Sequence trigger

**Card 3 — Kích hoạt Toàn bộ Kịch bản:**
- Bảng 10 dòng: Kịch bản | Trạng thái (🟢 Sẵn sàng / 🟡 Thiếu cấu hình) | Toggle ON/OFF
- Nút CTA lớn: [🚀 KÍCH HOẠT TOÀN BỘ LUỒNG AUTOMATION]
- Ghi chú: Sau khi kích hoạt, hệ thống chạy xuyên suốt cho tất cả khách trên các kênh đã kết nối

**State data:** `activation.*`

---

### 4. Sidebar Quick Setup — 5 Tab Giám Sát

#### Tab 1: 📊 Tổng quan (`#qsOverviewView`)
- Progress bar % hoàn thành setup (X/7 bước)
- Conversion Funnel trực quan: Tiếp cận → Lead → Chốt đơn → Sau mua (số lượng + %)
- Danh sách kịch bản đã kích hoạt (✅/⚪)
- Quick Stats 7 ngày: Tổng phiên hội thoại, Tỷ lệ AI xử lý, Doanh thu từ Automation

#### Tab 2: 📋 Log Kịch bản (`#qsScenarioLogView`)
- Bộ lọc nhanh (pills): [Tất cả] [Trước mua] [Trong mua] [Sau mua] [Thành công ✅] [Lỗi ❌] [Đang chạy 🔄]
- Bảng log realtime: Thời gian | Kịch bản | Kênh | Trạng thái | Chi tiết
- Biểu đồ trigger theo giờ (bar chart 24h)

#### Tab 3: 📈 Hiệu quả Chuyển đổi (`#qsConversionView`)
- Conversion rate theo giai đoạn (Trước mua→Lead, Lead→Chốt đơn, Chốt đơn→Repurchase) với tăng/giảm %
- Biểu đồ trend 30 ngày (line chart: Lead / Đơn hàng / Doanh thu)
- Bảng hiệu quả từng kịch bản: Kịch bản | Số gửi | Chuyển đổi | Doanh thu
- ROI Minigame & Upsale

#### Tab 4: 🧠 AI Insight Dashboard (`#qsAiInsightView`)
- Lead Scoring Distribution (Donut chart: Hot/Warm/Cold)
- Top Sản phẩm quan tâm (ranked list)
- Top Lý do từ chối + Đề xuất xử lý
- Bảng chi tiết Lead Insight: Khách hàng | Score | Tiềm năng | SP | Objection
- Meta CAPI Events: Event Lead count, Event Purchase count, Conversion Value

#### Tab 5: ⚙️ Quản lý Kênh & Kịch bản (`#qsChannelManageView`)
- Bảng kênh đã kết nối: Kênh | Trạng thái | Hành động
- Bảng quản lý kịch bản: Kịch bản | Toggle ON/OFF | Giai đoạn (badge)
- Khối cảnh báo: Token hết hạn, lỗi kênh, GenAI API token còn lại

---

## Code Style

Tuân thủ design system Smax hiện có:

```css
/* CSS: BEM-like với prefix smax-qs- */
.smax-qs-sidebar { }
.smax-qs-sidebar-item { }
.smax-qs-sidebar-item.active { }
.smax-qs-stepper { }
.smax-qs-step-item { }
.smax-qs-step-panel { }
.smax-qs-card { }
.smax-qs-timeline-step { }
.smax-qs-funnel-bar { }
```

```javascript
// JS: Class-based
class QuickSetupManager {
  constructor() { this.currentStep = 1; this.totalSteps = 7; }
  goToStep(stepNumber) { }
  nextStep() { }
  prevStep() { }
  renderStep(stepNumber) { }
  toggleScenario(scenarioId, enabled) { }
  activateAllScenarios() { }
}
window.quickSetupApp = new QuickSetupManager();
```

```javascript
// app.js: switchModule method
switchModule(moduleName) {
  // 'metaAgent' | 'quickSetup'
  const metaSidebar = document.querySelector('.smax-sidebar');
  const metaContent = document.querySelector('.smax-content-pane');
  const qsSidebar = document.getElementById('quickSetupSidebar');
  const qsContent = document.getElementById('quickSetupContentPane');
  
  if (moduleName === 'quickSetup') {
    metaSidebar.style.display = 'none';
    metaContent.style.display = 'none';
    qsSidebar.style.display = 'block';
    qsContent.style.display = 'block';
  } else {
    metaSidebar.style.display = 'block';
    metaContent.style.display = 'block';
    qsSidebar.style.display = 'none';
    qsContent.style.display = 'none';
  }
}
```

---

## Testing Strategy

| Layer | Phương pháp | Vị trí |
|-------|------------|--------|
| **Static Assertion** | Node.js script kiểm tra HTML chứa tất cả element IDs | `test-verify.js` |
| **Visual QA** | Browser QA subagent kiểm tra trên production URL | Subagent |
| **Manual** | User kiểm tra trên https://metabizai-smax.vercel.app | User |

**Assertions cần bổ sung vào `test-verify.js`:**

```javascript
const qsElements = [
  'topMenuQuickSetup',
  'quickSetupSidebar', 'quickSetupContentPane',
  'qsStepperContainer',
  'qsStep1Panel', 'qsStep2Panel', 'qsStep3Panel',
  'qsStep4Panel', 'qsStep5Panel', 'qsStep6Panel', 'qsStep7Panel',
  'qsBrandName', 'qsIndustrySelect',
  'qsWelcomeMessage', 'qsGenAiProvider', 'qsGenAiApiKey',
  'qsSkillLeadCapture', 'qsSkillAutoOrder', 'qsPosProvider',
  'qsFollowupTimeline', 'qsMinigameType',
  'qsWebviewOrderConfirm', 'qsUpsaleTimeline',
  'qsInsightLeadScoring', 'qsInsightObjections', 'qsMetaCapiToggle',
  'qsJourneyMap', 'qsChatSimulator', 'qsBtnActivateAll',
  'qsOverviewView', 'qsScenarioLogView', 'qsConversionView',
  'qsAiInsightView', 'qsChannelManageView'
];
```

---

## Boundaries

### Always do:
- Chạy `node test-verify.js` trước mỗi deploy
- Tuân thủ design system Smax (Roboto, Navy/Coral, card border-radius 12px)
- Giữ Quick Setup hoàn toàn độc lập — không ảnh hưởng đến Meta Business Agent
- Mock data cho tất cả biểu đồ, bảng, funnel
- Deploy qua `npx vercel --prod --yes`

### Ask first:
- Thay đổi cấu trúc Topbar hiện tại (ngoài việc thêm menu Quick Setup)
- Thêm thư viện JS/CSS bên ngoài
- Thay đổi logic switchView hiện tại

### Never do:
- Không sửa code Meta Business Agent Standard/Advance đã hoạt động ổn định
- Không thêm backend thật / API call thật
- Không xóa hoặc sửa element ID đã có assertion trong test-verify.js

---

## File Mới Cần Tạo

| File | Mô tả |
|------|-------|
| `src/css/quick-setup.css` | [MỚI] Toàn bộ CSS cho Quick Setup module |
| `src/js/quick-setup.js` | [MỚI] QuickSetupManager class |

## File Cần Sửa

| File | Thay đổi |
|------|----------|
| `src/index.html` | Thêm menu Topbar + Quick Setup Sidebar + Content Area + 7 Step Panels + 5 Tab Views |
| `src/js/app.js` | Thêm `switchModule()` method, cập nhật Topbar active states |
| `test-verify.js` | Thêm assertions cho Quick Setup elements |

## Open Questions

Không còn câu hỏi mở — thiết kế đã được duyệt trong phiên brainstorming.
