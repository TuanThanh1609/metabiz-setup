# Spec: 3 Sidebar Tabs — Log Kiểm Soát AI, Kho Tri Thức & Catalog, Thống Kê & Báo Cáo

## Objective

Xây dựng giao diện hoàn chỉnh cho 3 tab còn lại trên Sidebar của Meta Business Agent Studio, bổ sung vào hệ thống hiện có (Tab 1: Danh sách Agent đã hoàn thiện). Mục tiêu:

- **Tab 2 — Log Kiểm Soát AI**: Tổng hợp kết quả phiên hội thoại AI dạng log (không phải danh sách chat), giúp nhà bán hàng theo dõi và can thiệp các trường hợp AI cần hỗ trợ.
- **Tab 3 — Kho Tri Thức & Meta Catalog**: Quản lý tập trung nguồn dữ liệu huấn luyện AI + Đồng bộ Meta Product Catalog từ POS + Quy tắc thương hiệu.
- **Tab 4 — Thống Kê & Báo Cáo**: Phân tích đa chiều hiệu quả kinh doanh, phễu chuyển đổi, Meta CAPI performance, insight khách hàng.

**Người dùng mục tiêu**: Nhà bán hàng / Partner sử dụng Smax.ai để quản lý Meta Business Agent.

**Hình ảnh tham chiếu Tab 2**: UI dạng "Log Kiểm Soát AI" với Score Cards + Line Chart + Bảng dữ liệu log.

---

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (không dùng framework)
- **Font**: Roboto (Google Fonts) — chuẩn Smax.ai Design System
- **Màu thương hiệu**: Coral `#eb6553`, Dark Navy `#0f1835`
- **Biểu đồ**: Chart.js (CDN) — Line Chart, Bar Chart, Doughnut Chart, Funnel
- **Deploy**: Vercel (static site)

---

## Commands

```
Dev:   npx -y serve src -p 3000
Test:  node test-verify.js
Build: N/A (static site, no build step)
Deploy: vercel --prod
```

---

## Project Structure

```
src/
├── index.html          → Main HTML (tất cả views inline, routing bằng JS)
├── css/
│   ├── smax-theme.css  → Theme variables, sidebar, navbar, scorecards
│   ├── wizard.css      → Modal wizard 8 bước
│   ├── playground.css  → Chat playground
│   └── tabs.css        → [NEW] CSS cho 3 tab mới (Log, Knowledge, Analytics)
├── js/
│   ├── app.js          → Main app class, view routing, wizard logic
│   ├── presets.js      → Industry presets (fashion, cosmetics, fnb, ...)
│   ├── simulator.js    → Chat simulator
│   ├── smax-bridge.js  → Smax API bridge
│   └── tabs.js         → [NEW] Logic cho 3 tab mới
docs/
├── superpowers/specs/  → Design specs
test-verify.js          → Test assertions
```

---

## Code Style

Tuân thủ pattern hiện tại của dự án:

```javascript
// Naming: camelCase cho functions/variables, PascalCase cho classes
// Views routing: toggle class 'active' trên section elements
// Data: Mock data inline (chưa có backend API)
// DOM: getElementById / querySelector, innerHTML rendering

// Ví dụ pattern hiện tại:
class MetaAgentApp {
  switchView(viewId) {
    document.querySelectorAll('.smax-view-section').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    document.querySelectorAll('.smax-sidebar-item').forEach(i => i.classList.remove('active'));
    // ... highlight active sidebar item
  }
}
```

```css
/* CSS: BEM-like naming với prefix smax- */
.smax-log-scorecards { }
.smax-log-chart-container { }
.smax-log-table { }
.smax-knowledge-source-card { }
.smax-analytics-funnel { }
```

---

## Boundaries

### Always:
- Giữ nguyên font Roboto và bảng màu Smax (#eb6553 coral, #0f1835 navy)
- Giữ nguyên cấu trúc sidebar routing hiện tại (toggle class `active`)
- Sử dụng mock data tĩnh (chưa kết nối API thực)
- Chạy `node test-verify.js` trước khi commit

### Ask First:
- Thêm thư viện JS mới ngoài Chart.js
- Thay đổi cấu trúc file app.js hiện tại
- Thay đổi layout sidebar hoặc navbar

### Never:
- Không thay đổi giao diện Tab 1 (Danh sách Agent) và Wizard 8 bước đã hoạt động
- Không xóa hoặc sửa logic presets.js hiện tại
- Không thay đổi cấu hình Vercel deployment

---

## Thiết Kế Chi Tiết

---

### TAB 2: Log Kiểm Soát AI (`#aiLogView`)

**View ID**: `aiLogView`
**Sidebar label**: "Lịch sử hội thoại AI"

#### Cấu trúc HTML (Top → Bottom):

##### ① Header Bar
- Tiêu đề: **"Log Kiểm Soát AI"** (h2, font-weight: 700)
- Mô tả phụ: "Theo dõi các hội thoại AI chưa xử lý tốt, cần can thiệp hoặc đã chốt đơn."
- Góc phải: 3 nút lọc thời gian: `Hôm nay` | `7 ngày` | `Tất cả`

##### ② 6 Score Cards hàng ngang
Layout: CSS Grid 6 cột, gap 16px
Mỗi card: nền trắng, border-radius 8px, border-left 4px solid (màu tùy loại), padding 16px

| Card | Số liệu | % | Viền trái |
|---|---|---|---|
| Tổng hội thoại | 11.506 | 100% | `#0f1835` (navy) |
| Cần can thiệp | 1.117 | 9.7% | `#eb6553` (coral) |
| Câu hỏi khó | 333 | 2.9% | `#f5a623` (vàng cam) |
| KH không hài lòng | 196 | 1.7% | `#9b59b6` (tím) |
| Đã chốt đơn | 976 | 8.5% | `#27ae60` (xanh lá) |
| AI trả lời lỗi | 178 | 1.5% | `#e74c3c` (đỏ) |

##### ③ Filter Pills (thanh lọc nhanh)
Layout: flex, gap 8px, overflow-x auto
Pill đầu tiên active: nền coral `#eb6553`, chữ trắng
Các pill khác: nền `#f0f2f5`, chữ `#333`

Danh sách pills:
- `Tổng quan 11.506` (active mặc định)
- `Chưa chốt đơn 10.530`
- `Đã chốt đơn 976`
- `Câu hỏi khó 333`
- `KH không hài lòng 196`
- `Cần người can thiệp 1.117`
- `AI trả lời lỗi 178`
- `Đã xử lý 4.912`

##### ④ Biểu đồ "Biến động vấn đề theo ngày"
- Container: nền trắng, border-radius 12px, padding 24px, box-shadow nhẹ
- Tiêu đề: "Biến động vấn đề theo ngày"
- Mô tả phụ: "Theo dõi 5 nhóm vấn đề để thấy điểm nghẽn tăng/giảm từng ngày."
- Góc phải: "62 ngày dữ liệu"
- Chart: Chart.js Line chart, 5 datasets:
  - 🔴 Chưa chốt đơn — `#eb6553`
  - 🟠 Câu hỏi khó — `#f5a623`
  - 🟣 KH không hài lòng — `#9b59b6`
  - 🔵 Cần người can thiệp — `#3498db`
  - 🟢 AI trả lời lỗi — `#2ecc71`
- Trục X: ngày (dd/mm), Trục Y: số lượng
- Tooltip on hover, responsive

##### ⑤ Bảng Tổng Quan (Log Table)
- Header bảng: "Tổng quan" + mô tả + ô tìm kiếm góc phải
- Search placeholder: "Tìm khách, SĐT, ID, vấn đề..."
- Table: 11 cột, striped rows, hover highlight

| # | Cột | CSS width | Nội dung |
|---|---|---|---|
| 1 | Ưu tiên | 60px | Badge: `Cao` (nền đỏ nhạt, chữ đỏ) / `TB` (vàng) / `Thấp` (xám) |
| 2 | ID | 70px | Số nguyên: 12457, 12455... |
| 3 | Khách hàng | 160px | Tên (bold) + SĐT dòng dưới (font-size nhỏ, màu secondary) |
| 4 | Kênh | 70px | `Inbox` / `Crawl` / `WhatsApp` |
| 5 | Trạng thái AI | 140px | "Hoàn thành tự động" / "Chưa xử lý được" / "Escalate nhân sự" |
| 6 | Kết quả chốt | 110px | "Đang cân nhắc" / "Không" / "Đã chốt" |
| 7 | Hài lòng | 110px | "Không đánh giá" / "Trung bình" / "Hài lòng" / "Không hài lòng" |
| 8 | Lead Score | 100px | Badge: 🔥 `85 Hot` (coral) / ⚡ `60 Warm` (vàng) / ❄️ `25 Cold` (xanh dương nhạt) |
| 9 | Lý do vào Log | 160px | Tag chips: "Có vấn đề chưa xử lý", "Chưa chốt đơn", "Hoàn thành tự động" |
| 10 | Tóm tắt vấn đề | flex (chiếm phần còn lại) | Text 1 dòng truncate, tooltip on hover hiện đầy đủ |
| 11 | Ngày | 90px | dd/mm/yyyy |

**Mock data**: 10 dòng mẫu đa dạng trạng thái, kênh, lead score

---

### TAB 3: Kho Tri Thức & Meta Catalog (`#knowledgeCatalogView`)

**View ID**: `knowledgeCatalogView`
**Sidebar label**: "Kho tri thức & Catalog"

#### Cấu trúc HTML (Top → Bottom):

##### Khối 1: Nguồn Tri Thức AI

###### ① Header
- Tiêu đề: **"Kho Tri Thức AI"**
- Mô tả: "Quản lý tập trung các nguồn dữ liệu huấn luyện cho Meta Business Agent"
- Nút góc phải: `+ Thêm nguồn tri thức` (coral button)

###### ② 3 Mini Summary Cards (hàng ngang)

| Tổng nguồn hoạt động | Tổng mục đã index | Lần đồng bộ gần nhất |
|---|---|---|
| **8 nguồn** | **1.247 mục** | *14 phút trước* |

Card style: nền `#f8f9fa`, border-radius 8px, padding 16px, icon bên trái

###### ③ Bảng Nguồn Tri Thức — 7 cột

| Loại nguồn | Tên nguồn | URL / Đường dẫn | Trạng thái | Lần cập nhật cuối | Số mục | Hành động |
|---|---|---|---|---|---|---|
| 🌐 Website URL | Landing page chính | https://thuonghieu.vn | ✅ Đã đồng bộ | 2 giờ trước | 48 trang | 🔄 ✏️ 🗑️ |
| 📊 Google Sheet | Bảng giá T8/2026 | sheets.google.com/... | ✅ Đã đồng bộ | 30 phút trước | 156 SP | 🔄 ✏️ 🗑️ |
| 📁 Google Drive | Ảnh mẫu Lookbook | drive.google.com/... | 🔄 Đang cập nhật | 1 ngày trước | 89 ảnh | 🔄 ✏️ 🗑️ |
| 🛒 Shopee Store | Shopee Mall Official | shopee.vn/... | ✅ Đã đồng bộ | 4 giờ trước | 234 SP | 🔄 ✏️ 🗑️ |
| ❓ FAQ thủ công | Chính sách đổi trả | — | ✅ Đã đồng bộ | 3 ngày trước | 23 câu | 🔄 ✏️ 🗑️ |

**Mock data**: 5 dòng như trên

---

##### Khối 2: Meta Catalogs & POS Sync

###### ① Header
- Tiêu đề: **"Meta Product Catalog"**
- Mô tả: "Đồng bộ kho sản phẩm từ POS sang Meta Catalog để AI tự động gửi card sản phẩm cho khách"
- Nút góc phải: `+ Kết nối Catalog` (coral button)

###### ② Card Kết Nối Catalog (dạng card ngang)
- Layout: flex, nền trắng, border-radius 12px, border 1px solid #e0e0e0, padding 20px
- Bên trái: Logo Meta Catalog (icon) + `Catalog ID: 123456789`
- Giữa: Trạng thái `✅ Đã kết nối` + Logo POS (ví dụ Haravan 32x32) + Thống kê: "324 sản phẩm · 12 danh mục · Cập nhật 30 phút trước"
- Bên phải: Nút `🔄 Đồng bộ ngay` + `⚙️ Cài đặt`

###### ③ Bảng Sản Phẩm Catalog — 6 cột

| Ảnh | Tên sản phẩm | Giá | Tồn kho | Danh mục | Trạng thái Meta |
|---|---|---|---|---|---|
| 📷 40x40 | Áo polo nam Classic | 299.000₫ | 156 | Áo nam | ✅ Approved |
| 📷 40x40 | Váy đầm công sở | 459.000₫ | 78 | Váy nữ | ✅ Approved |
| 📷 40x40 | Giày sneaker trắng | 899.000₫ | 23 | Giày dép | ⏳ Pending |
| 📷 40x40 | Túi xách da bò | 1.290.000₫ | 5 | Túi xách | ❌ Rejected |

**Mock data**: 6 dòng, ảnh dùng placeholder div 40x40 nền xám

---

##### Khối 3: Brand Guardrails

###### ① Header
- Tiêu đề: **"Quy Tắc Thương Hiệu & Giới Hạn AI"**
- Mô tả: "Thiết lập rào cản để AI không vi phạm chính sách kinh doanh"

###### ② 3 Accordion Sections

**Section 1: ✅ Được phép (Dos)**
- Accordion header: icon ✅ + "Được phép (Dos)" + chevron mở/đóng
- Body: Textarea editable với placeholder content
- Mock content: "Tư vấn sản phẩm dựa trên thông tin trong Kho tri thức\nBáo giá công khai theo bảng giá\nGợi ý combo và upsell sản phẩm liên quan\nHướng dẫn đổi trả theo chính sách"

**Section 2: 🚫 Cấm kỵ (Don'ts)**
- Mock content: "Không nói xấu đối thủ cạnh tranh\nKhông cam kết hiệu quả điều trị (ngành mỹ phẩm/spa)\nKhông giảm giá quá 20% mà không có phê duyệt\nKhông chia sẻ thông tin nội bộ công ty"

**Section 3: 🏷️ Chính sách đối thủ**
- Mock content: "Khi khách hỏi so sánh: tập trung vào ưu điểm sản phẩm mình\nKhông đề cập tên thương hiệu đối thủ trực tiếp\nChuyển hướng sang giá trị và chất lượng dịch vụ"

Mỗi accordion: nút `💾 Lưu thay đổi` ở cuối

---

### TAB 4: Thống Kê & Báo Cáo (`#analyticsReportsView`)

**View ID**: `analyticsReportsView`
**Sidebar label**: "Thống kê & Báo cáo"

#### Cấu trúc HTML (Top → Bottom):

##### ① Header Bar
- Tiêu đề: **"Thống Kê & Báo Cáo"**
- Mô tả: "Phân tích đa chiều hiệu quả kinh doanh & chuyển đổi của Meta Business Agent"
- Góc phải: Dropdown lọc thời gian (`7 ngày` | `30 ngày` | `Tùy chỉnh`) + Dropdown chọn Agent

##### ② 5 Score Cards hàng ngang
Layout: CSS Grid 5 cột

| Card | Số liệu | Sub text | Viền trái |
|---|---|---|---|
| Tổng hội thoại | 11.506 | +12.3% so tháng trước | `#0f1835` |
| Tỷ lệ AI tự xử lý | 82% | FCR (First Contact Resolution) | `#27ae60` |
| Tỷ lệ chốt đơn | 8.5% | 976 đơn thành công | `#3498db` |
| Doanh thu từ AI | 142.8M₫ | Tổng giá trị đơn qua AI | `#eb6553` |
| Chi phí CPA TB | ↓ 35% | So với tháng trước | `#f5a623` |

##### Khối 1: Phễu Chuyển Đổi (Conversion Funnel)
- Container: nền trắng, border-radius 12px, padding 24px
- Tiêu đề: "Phễu Chuyển Đổi"
- Hiển thị bằng CSS (horizontal bars thu hẹp dần), không cần Chart.js:

```
Lượt tiếp cận      ████████████████████████████  28.450  (100%)
Hội thoại AI       ████████████████████          11.506  (40.4%)
Thu thập Lead (SĐT) ██████████████               4.230   (14.9%)
Chốt đơn Webview   ████████                      976     (3.4%)
Doanh thu POS      ██████                        812     (2.9%) → 142.8M₫
```

- Mỗi thanh: background gradient từ coral `#eb6553` → nhạt dần
- Hiển thị conversion rate giữa mỗi tầng: "40.4% → 36.7% → 23.1% → 83.2%"

##### Khối 2: Meta CAPI & Dataset Performance
- Layout 2 cột (50/50)

**Cột trái — Bảng Event:**

| Event | Số lượng | Match Rate | Trạng thái |
|---|---|---|---|
| 📱 Lead (SĐT/Email) | 4.230 events | 8.2/10 | ✅ Tốt |
| 💰 Purchase (Đơn hàng) | 976 events | 8.7/10 | ✅ Xuất sắc |
| 📊 Tổng cộng | 5.206 events | 8.5/10 avg | — |

**Cột phải — Bar Chart (Chart.js):**
- Stacked bar: Lead (cam nhạt `#f5a623`) + Purchase (coral `#eb6553`)
- Line overlay: Event Match Quality Score (xanh dương `#3498db`)
- Trục X: 7 ngày gần nhất, Trục Y: số event

##### Khối 3: Phân Tích Insight Khách Hàng
- Layout 3 cột (33/33/33)

**Cột 1 — Top 5 Sản Phẩm Quan Tâm (bảng nhỏ):**

| # | Sản phẩm | Lượt hỏi | Tỷ lệ chốt |
|---|---|---|---|
| 1 | Áo polo nam Classic | 234 | 12.4% |
| 2 | Kem chống nắng SPF50 | 189 | 18.2% |
| 3 | Váy đầm công sở | 156 | 9.8% |
| 4 | Son môi matte | 134 | 22.1% |
| 5 | Giày sneaker trắng | 112 | 7.5% |

**Cột 2 — Top 5 Lý Do Từ Chối (horizontal bar chart CSS):**
- "Giá cao" — 32%
- "Cần suy nghĩ thêm" — 28%
- "Đã mua nơi khác" — 15%
- "Không đúng size/màu" — 14%
- "Chưa tin tưởng" — 11%

**Cột 3 — Phân Bổ Lead Score (Chart.js Doughnut):**
- 🔥 Hot (70-100): 18% — 762 khách — `#eb6553`
- ⚡ Warm (40-69): 45% — 1.903 khách — `#f5a623`
- ❄️ Cold (0-39): 37% — 1.565 khách — `#3498db`

##### Khối 4: Hiệu Suất Vận Hành AI

**4 mini-cards hàng ngang:**

| Thời gian phản hồi TB | Tỷ lệ AI tự xử lý (FCR) | Tỷ lệ Chuyển quyền | Giờ công tiết kiệm |
|---|---|---|---|
| **1.2s** (↓0.3s) | **82%** (↑5%) | **9.7%** (↓2%) | **~384 giờ/tháng** |

**Bảng chi tiết theo Fanpage:**

| Tên Fanpage | Kênh | Hội thoại | AI tự xử lý | Chuyển quyền | Chốt đơn | CSAT |
|---|---|---|---|---|---|---|
| Thời Trang ABC Official | 💬 Messenger | 4.120 | 84% | 8.2% | 9.1% | 4.2/5 |
| Thời Trang ABC Official | 📱 WhatsApp | 1.680 | 86% | 7.8% | 10.2% | 4.5/5 |
| Mỹ Phẩm XYZ Store | 💬 Messenger | 3.450 | 79% | 11.5% | 7.3% | 3.9/5 |
| Mỹ Phẩm XYZ Store | 📱 WhatsApp | 890 | 81% | 9.4% | 8.1% | 4.0/5 |
| Spa Beauty Clinic | 💬 Messenger | 1.366 | 78% | 13.2% | 6.5% | 3.8/5 |

**Lưu ý**: Chỉ hiển thị kênh Messenger và WhatsApp (đúng chuẩn Meta Business Agent Platform hiện tại).

---

## Testing Strategy

- **Test file**: `test-verify.js` (mở rộng file hiện tại)
- **Test assertions cho 3 tab mới**:
  1. View routing: click sidebar item → đúng view hiển thị, các view khác ẩn
  2. Tab 2: 6 score cards render đúng, bảng log có 11 cột, chart container tồn tại
  3. Tab 3: Bảng tri thức có 7 cột, card catalog hiển thị, 3 accordion hoạt động
  4. Tab 4: 5 score cards, funnel hiển thị 5 tầng, bảng fanpage có 7 cột đúng header
  5. Responsive: Không bị thanh cuộn ngang trên viewport 1280px
- **Chart.js**: Verify canvas elements render (kiểm tra DOM, không cần verify pixel)

---

## Success Criteria

- [ ] Click sidebar "Lịch sử hội thoại AI" → hiển thị `#aiLogView` với đầy đủ 5 khối (Header, 6 Cards, Filter Pills, Line Chart, Log Table 11 cột)
- [ ] Click sidebar "Kho tri thức & Catalog" → hiển thị `#knowledgeCatalogView` với 3 khối (Knowledge Sources, Meta Catalog, Brand Guardrails)
- [ ] Click sidebar "Thống kê & Báo cáo" → hiển thị `#analyticsReportsView` với 4 khối (Funnel, CAPI, Insight, Vận hành)
- [ ] Filter pills Tab 2 phản hồi khi click (highlight active pill, lọc bảng)
- [ ] Chart.js render thành công 3 biểu đồ: Line (Tab 2), Stacked Bar (Tab 4), Doughnut (Tab 4)
- [ ] Accordion Tab 3 mở/đóng mượt mà
- [ ] Toàn bộ UI đồng bộ font Roboto, màu thương hiệu coral `#eb6553`
- [ ] Không phá vỡ Tab 1 (Danh sách Agent) và Wizard 8 bước hiện tại
- [ ] `node test-verify.js` pass 100%

---

## Open Questions

> Không có câu hỏi mở — tất cả đã được thống nhất qua brainstorming session.
