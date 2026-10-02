# Hệ Thống Thiết Kế UI/UX Cho Smax WhatsApp Mini-CRM (Evondev /ui-ux Standards)

Tài liệu này chuẩn hóa toàn bộ quy chuẩn thiết kế giao diện (Design System), nhận diện thương hiệu Smax, bố cục bảng dữ liệu, và trải nghiệm người dùng (UX) cho Mini-CRM trên Vercel + Neon Postgres.

---

## 1. Nhận Diện Thương Hiệu & Tài Nguyên Chuẩn (Official Assets)

* **Favicon chính thức của Smax.ai**:
  `https://i.ibb.co/tTXsDCSP/LOGO-SMAX-AI-MOBLE-N-N-TR-NG-08.png`
* **Khung Logo Header**:
  ```html
  <div class="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-slate-700/60 flex-shrink-0 overflow-hidden" id="projectLogoContainer" title="Smax.ai WhatsApp Intelligence Platform">
    <img src="https://i.ibb.co/tTXsDCSP/LOGO-SMAX-AI-MOBLE-N-N-TR-NG-08.png" alt="Smax AI Logo" class="w-full h-full object-contain" id="projectLogoImg" />
  </div>
  ```
* **Tiêu đề trang chuẩn**:
  `<title>Smax AI - WhatsApp Mini CRM &amp; Meta Ads Intelligence</title>`

---

## 2. Hệ Thống Typography & Design Tokens (Evondev /ui-ux)

### A. Font Chữ Chuẩn
* **Font giao diện chính**: `Plus Jakarta Sans` (hiện đại, tinh tế, không mang cảm giác AI thô thiển).
* **Font dữ liệu & mã**: `JetBrains Mono` (dành cho số điện thoại, mã Ad_ID, thời gian, số tiền và code).

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&display=swap" rel="stylesheet">
```

### B. Bảng Màu & Phân Cấp Trực Quan (Color Semantics)
* **Nền trang (Canvas)**: `bg-slate-50` (`#f8fafc`).
* **Nền thẻ (Surface)**: `bg-white` với viền mảnh `border-slate-200/80` và bo tròn `rounded-2xl`.
* **Đổ bóng (Shadows)**: Áp dụng quy tắc `M15` trong `/ui-ux` — **chỉ dùng bóng nhẹ (`shadow-xs` / `shadow-sm`)**, cấm tuyệt đối đổ bóng đen đậm thô kệch.
* **Màu thương hiệu nhấn (Primary Brand)**: Emerald / Teal (`#059669` / `#10b981`).
* **Tương phản thanh điều hướng (Dark Contrast)**: `bg-slate-900` (`#0f172a`).

---

## 3. Bộ Chuyển Đổi Dự Án Tức Thì (Multi-Project Switcher)

Cho phép quản lý đồng thời nhiều thị trường (ví dụ: Abera Indonesia 🇮🇩 và Fitgum Malaysia 🇲🇾) mà không cần nhập lại URL hay mất phiên làm việc.

```html
<!-- Project Dropdown Switcher trong Header -->
<div class="relative inline-block text-left" id="projectSwitcherWrapper">
  <button onclick="toggleProjectDropdown()" class="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700/80 text-white text-xs font-bold border border-slate-700 transition" id="projectDropdownBtn">
    <span id="projectBadgeFlag">🇲🇾</span>
    <span id="projectTitle" class="truncate max-w-[140px] sm:max-w-[200px]">Fitgum Acai Berry</span>
    <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
  </button>
  
  <div id="projectDropdownMenu" class="hidden absolute left-0 mt-1 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl z-50 py-1 divide-y divide-slate-800">
    <div class="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Chọn Dự Án Đang Chạy</div>
    <a href="/fitgum" onclick="handleProjectSelect(event, 'fitgum')" class="flex items-center justify-between px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 transition">
      <div class="flex items-center gap-2">
        <span class="text-base">🇲🇾</span>
        <div>
          <div class="font-bold text-white">Fitgum Acai Berry</div>
          <div class="text-[10px] text-slate-400 font-mono">Malaysia · RM · Smax WA</div>
        </div>
      </div>
      <span id="checkFitgum" class="text-emerald-400 text-xs font-bold">✓</span>
    </a>
    <a href="/abera" onclick="handleProjectSelect(event, 'abera')" class="flex items-center justify-between px-3 py-2 text-xs text-slate-200 hover:bg-slate-800 transition">
      <div class="flex items-center gap-2">
        <span class="text-base">🇮🇩</span>
        <div>
          <div class="font-bold text-white">Abera Dark Spot Serum</div>
          <div class="text-[10px] text-slate-400 font-mono">Indonesia · IDR · Smax WA</div>
        </div>
      </div>
      <span id="checkAbera" class="text-emerald-400 text-xs font-bold hidden">✓</span>
    </a>
  </div>
</div>
```

---

## 4. Cấu Trúc Bảng Dữ Liệu & Bộ Lọc Chuẩn UX

1. **Thanh Trạng Thái (Status Segmented Tabs)**:
   - Tất cả (Kèm tổng số đếm)
   - ✅ Đã chốt đơn
   - 🔥 Có nhu cầu
   - 💬 Đang tư vấn
   - ⏳ Chưa phản hồi
2. **Quy Chuẩn Màu Badge Phễu 7 Bước**:
   - `Step 1: Tiếp cận & Chào mừng` $\to$ `bg-slate-100 text-slate-700 border-slate-200`
   - `Step 2: Tư vấn & USP` $\to$ `bg-purple-50 text-purple-700 border-purple-200`
   - `Step 3: Review / Social Proof` $\to$ `bg-indigo-50 text-indigo-700 border-indigo-200`
   - `Step 4: Báo giá Combo` $\to$ `bg-blue-50 text-blue-700 border-blue-200`
   - `Step 5: Xử lý từ chối` $\to$ `bg-amber-50 text-amber-800 border-amber-200`
   - `Step 6: Thu thập COD` $\to$ `bg-teal-50 text-teal-800 border-teal-200`
   - `Step 7: Chốt đơn COD` $\to$ `bg-emerald-50 text-emerald-800 border-emerald-200 font-bold`
3. **Thanh Phân Trang (Pagination Bar)**:
   - Hiển thị tùy chọn dòng/trang: 20, 50, 100.
   - Text rõ ràng: `Hiển thị 1 - 20 trong tổng số 1,263 hội thoại`.
   - Nút phân trang dạng pill gọn gàng với trang hiện tại active đậm màu.

---

## 5. Drawer Trượt Đa Tầng (3-Tab Off-Canvas Drawer)

Thay vì cuộn dọc vô tận làm loãng thông tin, Drawer phân bổ theo 3 Tab chức năng:
* **Tab 1: 📦 Đơn Hàng COD**:
  - Thẻ thông tin đơn hàng chốt thành công (`orderCardFullCard`).
  - Tên người nhận, Số điện thoại, Địa chỉ giao hàng đầy đủ.
  - Combo và Số tiền thu hộ COD.
  - Nút bấm **"Sao chép thông tin gửi Đơn Vị Vận Chuyển"** (1 click lưu vào clipboard).
* **Tab 2: 💬 Lịch Sử Chat**:
  - Toàn bộ nội dung hội thoại với bong bóng WhatsApp (`#dcf8c6` cho bot/nhân viên, `#ffffff` cho khách).
  - Phân biệt rõ thời gian và tên người gửi.
* **Tab 3: 🧠 AI Bóc Tách (Token.ai GPT-5)**:
  - Hiển thị giai đoạn Phễu được phân loại.
  - Nhu cầu cốt lõi được AI bóc tách.
  - Điểm nghẽn rơi rụng (Drop-off Bottleneck).
  - Trích dẫn nguyên văn bằng chứng xác thực từ đoạn chat.
* **Nút Action Header**:
  - `[ 💬 WhatsApp ]`: Mở trực tiếp link `https://wa.me/{phone}` trong tab mới để nhân viên telesales / CSKH hỗ trợ khách ngay tức khắc.
