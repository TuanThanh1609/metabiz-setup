# Spec: 2 Sidebar Tabs — Quản Lý Leads & Quản Lý Đơn Hàng

## Objective

Bổ sung thêm 2 tab chuyên sâu vào Sidebar của Meta Business Agent Studio:
- **Tab 5 — Quản Lý Leads (`#leadsManagementView`)**: Quản lý toàn bộ danh sách khách hàng tiềm năng thu thập từ Meta Business Agent, phân loại theo Intent Lead Scoring, theo dõi nhu cầu, và đồng bộ Meta CAPI Dataset.
- **Tab 6 — Quản Lý Đơn Hàng (`#ordersManagementView`)**: Quản lý các đơn hàng được AI chốt tự động qua Webview hoặc Chat trực tiếp, trạng thái đồng bộ Smax POS / Haravan / Sapo, tín hiệu CAPI Purchase và xem trước biên lai Webview.
- **Tính năng chuyển tiếp Livechat Smax.ai**: Cột "Xem lịch sử chat" (💬) tại mỗi dòng Lead/Đơn hàng để mockup chuyển hướng sang Smax Livechat.

**Người dùng mục tiêu**: Nhà bán hàng và đội ngũ Sale/CSKH sử dụng Smax.ai để quản lý hiệu quả kinh doanh từ Meta Business Agent.

---

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JS (không dùng framework)
- **Font**: Roboto (Google Fonts) — chuẩn Smax.ai Design System
- **Màu thương hiệu**: Smax Coral `#eb6553`, Dark Navy `#0f1835`, Green `#10b981`, Amber `#f59e0b`, Blue `#1877f2`
- **Biểu đồ**: Chart.js (CDN) — Line Charts (Đa sê-ri & 2 trục Y)
- **Deploy**: Vercel (static site)

---

## Commands

```
Dev:    npx -y serve src -p 3000
Test:   node test-verify.js
Deploy: vercel --prod
```

---

## Project Structure

```
src/
├── index.html          → Sidebar cập nhật 6 items + 2 section views mới (#leadsManagementView, #ordersManagementView)
├── css/
│   ├── smax-theme.css  → Theme variables, base styling
│   ├── wizard.css      → Modal wizard 8 bước
│   ├── playground.css  → Chat playground
│   └── tabs.css        → Mở rộng CSS cho Tab 5 (Leads) và Tab 6 (Orders)
├── js/
│   ├── app.js          → Routing switchView mở rộng cho 6 views
│   ├── presets.js      → Industry presets
│   ├── simulator.js    → Chat simulator
│   ├── smax-bridge.js  → Smax API bridge
│   └── tabs.js         → TabsManager chứa mock data và Chart.js cho Tab 5 & Tab 6
docs/
├── superpowers/specs/  → 2026-08-15-leads-orders-tabs-design.md
test-verify.js          → Mở rộng test assertions cho 6 tabs
```

---

## Boundaries

### Always:
- Tuân thủ cấu trúc chuẩn Smax: Scorecards ➔ Line Chart ➔ Filter Pills ➔ Bảng dữ liệu
- Giữ vững font Roboto và màu nhận diện `#eb6553`
- Đảm bảo responsive không vỡ layout trên màn hình 1280px trở lên
- Giữ 100% tính ổn định của các Tab 1, 2, 3, 4 đã hoàn thành

### Ask First:
- Thêm thư viện bên ngoài ngoài Chart.js
- Thay đổi cấu trúc dữ liệu của các tab hiện tại

### Never:
- Không phá vỡ chức năng Wizard Modal 8 bước hoặc các views đã deploy

---

## Chi Tiết Thiết Kế Kỹ Thuật

---

### TAB 5: Quản Lý Leads (`#leadsManagementView`)

**View ID**: `leadsManagementView`  
**Sidebar Label**: "Quản lý Leads"

#### 1. Header Bar
- **Tiêu đề**: "Quản Lý Leads & Khách Hàng Tiềm Năng"
- **Mô tả phụ**: "Danh sách khách hàng tiềm năng được Trợ lý AI thu thập, chấm điểm Intent Score và đồng bộ Meta CAPI Dataset."
- **Nút hành động**: 
  - Button Group thời gian: `Hôm nay` | `7 ngày` | `30 ngày` | `Tất cả`
  - Nút `📥 Xuất Excel Leads` (Toast thông báo)

#### 2. 6 Scorecards Hàng Ngang (Grid 6 cột)
| Card | Giá trị | Phụ chú | Màu viền |
|---|---|---|---|
| Tổng Leads thu thập | **4.230** | 100.0% | Navy `#0f1835` |
| Hot Leads (🔥 70-100) | **762** | 18.0% | Coral `#eb6553` |
| Warm Leads (⚡ 40-69) | **1.903** | 45.0% | Amber `#f59e0b` |
| Cold Leads (❄️ 0-39) | **1.565** | 37.0% | Blue `#3b82f6` |
| Đã đẩy Meta CAPI | **4.230** | Match 8.2/10 | Green `#10b981` |
| Tỷ lệ thành Đơn | **23.1%** | 976 đơn hàng | Purple `#8b5cf6` |

#### 3. Line Chart Xu Hướng Phân Loại Leads (Chart.js)
- **ID Canvas**: `leadsTrendChart`
- **3 Đường sê-ri**:
  - Hot Leads (Coral `#eb6553`)
  - Warm Leads (Amber `#f59e0b`)
  - Cold Leads (Blue `#3b82f6`)
- **Dữ liệu**: 31 mốc ngày

#### 4. Filter Pills Navigation (6 Nút)
- `Tất cả (4.230)` [data-filter="all", active]
- `Hot Leads 🔥 (762)` [data-filter="hot"]
- `Warm Leads ⚡ (1.903)` [data-filter="warm"]
- `Cold Leads ❄️ (1.565)` [data-filter="cold"]
- `Đã chốt đơn ✅ (976)` [data-filter="converted"]
- `Chưa liên hệ ⏳ (1.240)` [data-filter="new"]

#### 5. Bảng Chi Tiết Leads (11 Cột)
| # | Cột | Width | Nội dung |
|---|---|---|---|
| 1 | ID Lead | 75px | Mã định danh (`L-1094`, `L-1093`...) |
| 2 | Khách hàng | 180px | Tên (bold) + SĐT + Email |
| 3 | Kênh & Fanpage | 130px | Badge Kênh (*💬 FB Flagship, 📱 WA Beauty...*) |
| 4 | Điểm Lead Score | 110px | Badge màu: 🔥 **88 Hot**, ⚡ **62 Warm**, ❄️ **25 Cold** |
| 5 | Sản phẩm quan tâm | 160px | Tên sản phẩm / SKU |
| 6 | Nhu cầu cụ thể | 200px | Nhu cầu trích xuất từ AI |
| 7 | Trạng thái xử lý | 110px | `Đã chốt đơn` / `Đang tư vấn` / `Chưa liên hệ` |
| 8 | Meta CAPI | 120px | Badge `✅ Dataset Synced` |
| 9 | Trợ lý AI | 140px | Tên Trợ lý AI phụ trách |
| 10 | Ngày nhận | 95px | dd/mm/yyyy |
| 11 | Hành động | 120px | 💬 Xem chat (Smax Livechat mockup), 📞 Gọi điện, 📝 Chi tiết |

---

### TAB 6: Quản Lý Đơn Hàng (`#ordersManagementView`)

**View ID**: `ordersManagementView`  
**Sidebar Label**: "Quản lý Đơn hàng"

#### 1. Header Bar
- **Tiêu đề**: "Quản Lý Đơn Hàng & POS Sync"
- **Mô tả phụ**: "Theo dõi các đơn hàng được Trợ lý AI chốt qua Webview, tự động tạo đơn trên Smax POS / Haravan / Sapo và bắn tín hiệu CAPI Purchase."
- **Nút hành động**: 
  - Button Group: `7 ngày` | `30 ngày` | `Tất cả`
  - Nút `🔄 Đồng bộ toàn bộ POS` (Toast thông báo)

#### 2. 5 Scorecards Hàng Ngang (Grid 5 cột)
| Card | Giá trị | Phụ chú | Màu viền |
|---|---|---|---|
| Tổng đơn hàng AI | **976 đơn** | Doanh thu **142.8M₫** | Coral `#eb6553` |
| Đơn Webview xác nhận | **976** | 100% khách tự điền | Green `#10b981` |
| Đã đẩy POS | **812 đơn** | 83.2% thành công | Blue `#1877f2` |
| Đang giao hàng | **540 đơn** | Đơn vị vận chuyển | Amber `#f59e0b` |
| Tỷ lệ hủy / hoàn | **3.1%** | 30 đơn hủy | Danger `#ef4444` |

#### 3. Line Chart 2 Trục Y: Doanh Thu & Số Lượng Đơn (Chart.js)
- **ID Canvas**: `ordersTrendChart`
- **Trục Y1 (Trái)**: Doanh thu AI (triệu VNĐ) — Đường Coral `#eb6553`
- **Trục Y2 (Phải)**: Số lượng đơn hàng chốt — Đường Navy `#0f1835`

#### 4. Filter Pills Navigation (6 Nút)
- `Tất cả (976)` [data-filter="all", active]
- `Mới tạo (164)` [data-filter="new"]
- `Đã đồng bộ POS (812)` [data-filter="pos_synced"]
- `Đang giao (540)` [data-filter="shipping"]
- `Hoàn thành (242)` [data-filter="completed"]
- `Đã hủy (30)` [data-filter="cancelled"]

#### 5. Bảng Chi Tiết Đơn Hàng (11 Cột)
| # | Cột | Width | Nội dung |
|---|---|---|---|
| 1 | Mã đơn hàng | 100px | `#123456789`, `#123456788`... |
| 2 | Khách hàng | 180px | Tên + SĐT + Địa chỉ nhận hàng |
| 3 | Sản phẩm & SL | 180px | Tên SP + Số lượng |
| 4 | Tổng tiền | 110px | Giá trị đơn + COD / VietQR |
| 5 | Nguồn chốt | 110px | `📱 Webview` / `🤖 Direct Chat` |
| 6 | Trạng thái đơn | 110px | `Đã đẩy POS` / `Đang giao` / `Hoàn thành` / `Đã hủy` |
| 7 | Meta CAPI Purchase | 130px | Badge `✅ Purchase Synced` (8.7/10) |
| 8 | POS đồng bộ | 120px | Logo Haravan / Sapo / Smax POS |
| 9 | Trợ lý AI chốt | 140px | Tên Trợ lý AI |
| 10 | Ngày tạo | 95px | dd/mm/yyyy |
| 11 | Hành động | 120px | 💬 Xem chat (Livechat mockup), 🔍 Xem Webview receipt, 📄 In đơn |

---

## Testing Strategy

- **Test file**: `test-verify.js` (Mở rộng bổ sung kiểm tra cho 6 tabs)
- **Test assertions**:
  1. Kiểm tra 6 mục Sidebar menu (Danh sách Agent, Lịch sử hội thoại, Kho tri thức, Thống kê, Quản lý Leads, Quản lý Đơn hàng).
  2. Kiểm tra tồn tại `#leadsManagementView` với 6 cards, `leadsTrendChart`, bảng leads 11 cột.
  3. Kiểm tra tồn tại `#ordersManagementView` với 5 cards, `ordersTrendChart`, bảng orders 11 cột.
  4. Kiểm tra nút "Xem lịch sử chat" (💬) và "Xem Webview" (🔍) hoạt động kích hoạt Toast thông báo chuẩn xác.

---

## Success Criteria

- [ ] Sidebar menu hiển thị đầy đủ 6 tabs với icon và nhãn tiếng Việt chuẩn.
- [ ] Chuyển tab sang `#leadsManagementView`: Scorecards, Linechart Leads, Filter Pills, Bảng Leads 11 cột render trơn tru.
- [ ] Chuyển tab sang `#ordersManagementView`: Scorecards, Linechart 2 trục Y, Filter Pills, Bảng Orders 11 cột render trơn tru.
- [ ] Click "Xem lịch sử chat" (💬) hiển thị Toast mockup chuyển hướng Livechat Smax.
- [ ] Click "Xem Webview" (🔍) hiển thị Toast hoặc mở popup xem lại biên lai đơn hàng Webview.
- [ ] Biểu đồ Chart.js tự động resize và render khi chuyển qua lại giữa các tab.
- [ ] `node test-verify.js` PASS 100%.
- [ ] Deploy thành công lên Vercel Production.
