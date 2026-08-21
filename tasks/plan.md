# Implementation Plan: 2 New Tabs — Quản Lý Leads & Quản Lý Đơn Hàng

## Overview

Mở rộng Sidebar từ 4 lên 6 Tab chuyên nghiệp:
1. Danh sách Agent
2. Lịch sử hội thoại AI
3. Kho tri thức & Catalog
4. Thống kê & Báo cáo
5. **Quản lý Leads** (`#leadsManagementView`) [NEW]
6. **Quản lý Đơn hàng** (`#ordersManagementView`) [NEW]

Kèm theo tính năng cột "Xem lịch sử chat" (💬) mockup chuyển hướng Livechat Smax, và "Xem Webview" (🔍) mở popup biên lai đơn hàng.

---

## Dependency Graph

```
Phase 1: Sidebar & View Routing (6 items)
    │
    ├── Phase 2: Tab 5 — Quản Lý Leads (HTML + Chart + Table + 💬 Livechat)
    │
    ├── Phase 3: Tab 6 — Quản Lý Đơn Hàng (HTML + 2-Axis Chart + Table + 🔍 Webview Modal)
    │
    ├── Phase 4: Automated Testing & Self-Fixing (node test-verify.js)
    │
    └── Phase 5: Production Deploy & Browser QA Review (Vercel + Subagent)
```

---

## Task Breakdown

### Phase 1: Sidebar & View Routing

#### Task 1: Mở rộng Sidebar 6 Tab & Routing trong index.html và app.js
- **Description**: Thêm 2 mục menu `Quản lý Leads` và `Quản lý Đơn hàng` vào Sidebar trong `src/index.html`. Cập nhật `switchView(viewId)` trong `src/js/app.js` để tự động render biểu đồ của Tab 5 & Tab 6.
- **Files**: `src/index.html`, `src/js/app.js`
- **Verification**: Click 6 mục Sidebar không có lỗi console.

---

### Phase 2: Tab 5 — Quản Lý Leads

#### Task 2: Xây dựng HTML, CSS & Logic cho Tab 5 (#leadsManagementView)
- **Description**: 
  - 6 Scorecards (Tổng Leads, Hot/Warm/Cold, CAPI Synced, Tỷ lệ thành đơn).
  - Linechart Chart.js `#leadsTrendChart` (3 đường Hot/Warm/Cold).
  - Filter Pills 6 nút.
  - Bảng Leads 11 cột (ID, Khách hàng, Kênh/Page, Lead Score, Sản phẩm, Nhu cầu, Trạng thái, CAPI, Trợ lý AI, Ngày, Hành động).
  - Mockup nút 💬 "Xem lịch sử chat" hiển thị Toast điều hướng Livechat Smax.
- **Files**: `src/index.html`, `src/css/tabs.css`, `src/js/tabs.js`
- **Verification**: Scorecards, Chart, Filter và Bảng hiển thị đầy đủ, tìm kiếm nhạy bén.

---

### Phase 3: Tab 6 — Quản Lý Đơn Hàng

#### Task 3: Xây dựng HTML, CSS & Logic cho Tab 6 (#ordersManagementView)
- **Description**:
  - 5 Scorecards (Tổng đơn, Doanh thu 142.8M, Đã đẩy POS, Đang giao, Tỷ lệ hủy).
  - Linechart 2 trục Y Chart.js `#ordersTrendChart` (Doanh thu VNĐ + Số đơn).
  - Filter Pills 6 nút.
  - Bảng Orders 11 cột (Mã đơn, Khách hàng, Sản phẩm & SL, Tổng tiền, Nguồn chốt, Trạng thái, CAPI Purchase, POS đồng bộ, Trợ lý AI, Ngày, Hành động).
  - Nút 💬 "Xem lịch sử chat" + 🔍 "Xem Webview" mở popup biên lai đơn hàng.
- **Files**: `src/index.html`, `src/css/tabs.css`, `src/js/tabs.js`
- **Verification**: Click xem Webview mở popup, xem lịch sử chat hiện toast, chart 2 trục Y hiển thị sắc nét.

---

### Phase 4: Automated Testing & Self-Fixing

#### Task 4: Mở rộng test-verify.js & Kiểm thử tự động
- **Description**: Thêm kiểm tra toàn diện cho 6 tabs, các view IDs, canvas charts, table headers và mockup buttons. Chạy kiểm thử tự động, phát hiện và sửa toàn bộ lỗi nếu có.
- **Files**: `test-verify.js`
- **Verification**: `node test-verify.js` PASS 100%.

---

### Phase 5: Production Deploy & Browser QA

#### Task 5: Deploy Vercel Production & Browser QA Subagent Verification
- **Description**: Deploy lên Vercel production (`npx vercel --prod`). Kích hoạt Browser QA subagent để review trực tiếp giao diện trên trình duyệt và xác nhận cả 6 tabs hoạt động hoàn hảo.
- **Verification**: Browser QA báo cáo PASS 100%.
