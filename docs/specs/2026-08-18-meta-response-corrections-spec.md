# Spec: Tính Năng Hiệu Chỉnh Câu Trả Lời & Huấn Luyện AI (Few-Shot Q&A Overrides) Theo Chuẩn Meta Business Agent

- **Tài liệu tham chiếu:** [Meta Business Agent Platform - Getting Started & Response Corrections API](https://developers.facebook.com/documentation/meta-business-agent/get-started)
- **Ngày tạo:** 18/08/2026
- **Trạng thái:** DRAFT & REVIEW

---

## 1. Mục Tiêu (Objective)
Cung cấp cơ chế **Human-in-the-loop AI Teaching & Response Corrections** cho nền tảng Meta Business Agent trên Smax.ai. Cho phép người vận hành sửa trực tiếp các câu trả lời sai, ảo giác (hallucination) hoặc chưa đúng chính sách của AI, tự động nạp câu trả lời chuẩn (Ground Truth) vào bộ nhớ huấn luyện (Few-Shot Q&A Overrides) của Agent để AI không bao giờ lặp lại lỗi sai đó.

---

## 2. Thiết Kế 3 Điểm Chạm (3 Integrated Touchpoints)

### Điểm Chạm 1: Tại Tab 2 - Lịch Sử Hội Thoại AI (`#aiLogView`)
- **Vị trí:** Cột "Hành động" của bảng Log Kiểm Soát AI.
- **Thành phần:**
  - Nút bấm `🔧 Dạy AI câu này` trên từng dòng log (đặc biệt khi lọc theo `AI trả lời lỗi`, `Câu hỏi khó`, `Khách không hài lòng`).
  - Modal **"Hiệu Chỉnh Câu Trả Lời & Huấn Luyện AI"**:
    - Hiển thị Câu hỏi của khách hàng (User Query).
    - Hiển thị Câu trả lời sai/chưa chuẩn của AI (Wrong AI Response).
    - Ô nhập: **Câu trả lời chuẩn mong muốn (Ideal Ground Truth Response)**.
    - Ô nhập: **Quy tắc ghi nhớ / Lời dặn bổ sung cho AI (Guardrail Rule)**.
    - Nút bấm: `"Lưu & Huấn Luyện Tức Thì"`.
  - Khi lưu: Dòng log được gắn nhãn badge xanh `Đã Huấn Luyện`, đồng thời dữ liệu được tự động đồng bộ sang Tab 3.

---

### Điểm Chạm 2: Tại Tab 3 - Kho Tri Thức & Meta Catalog (`#knowledgeCatalogView`)
- **Vị trí:** Bổ sung **Khối 4** bên dưới Brand Guardrails.
- **Thành phần:**
  - Tiêu đề: **"Bộ Hiệu Chỉnh Câu Trả Lời & Huấn Luyện Thực Tế (Few-Shot Q&A Overrides)"**.
  - Mini summary cards: Tổng cặp Q&A đã dạy, Đang áp dụng, Tự động trích xuất từ Log.
  - Thanh công cụ: Ô tìm kiếm câu hỏi/đáp + Nút **"+ Thêm Cặp Huấn Luyện Mới"**.
  - Bảng dữ liệu 6 cột:
    1. **Tình huống / Câu hỏi của khách**
    2. **Câu trả lời chuẩn đã huấn luyện**
    3. **Trợ lý AI áp dụng**
    4. **Nguồn gốc** (Từ Log hội thoại #ID / Nhập tay / Chat thử)
    5. **Trạng thái** (Toggle Switch ON/OFF)
    6. **Hành động** (✏️ Sửa, 🗑️ Xóa)

---

### Điểm Chạm 3: Tại Khung Chat Thử Nghiệm (Playground & Quick Chat Drawer)
- **Vị trí:** Ngay dưới mỗi bubble tin nhắn của AI trong Playground Bước 8 và Drawer Chat Thử.
- **Thành phần:**
  - Nút chip nhỏ: `✏️ Sửa câu trả lời này / Dạy AI`.
  - Khi click: Mở popover/modal chỉnh sửa nhanh, cho phép gõ câu trả lời chuẩn và lưu ngay.
  - Khi lưu xong: Chat Simulator cập nhật bộ nhớ ngay lập tức để người dùng có thể gõ lại câu hỏi đó và kiểm tra phản hồi mới của AI.

---

## 3. Cấu Trúc Dữ Liệu (Data Model)

```typescript
interface ResponseCorrectionItem {
  id: string;              // 'cor-101'
  agentId: string;         // 'agent-1'
  agentName: string;       // 'Trợ lý Tư vấn Thời trang Smax'
  userQuery: string;       // 'Shop có freeship đơn đi Đà Nẵng không?'
  wrongAnswer: string;     // 'Dạ bên em freeship toàn quốc mọi đơn ạ.'
  idealAnswer: string;     // 'Dạ đơn từ 500k bên em freeship toàn quốc, dưới 500k phí ship 25k ạ.'
  ruleNote: string;        // 'Chỉ freeship đơn >= 500k.'
  source: 'log' | 'manual' | 'playground';
  sourceLogId?: string;    // 'log-178'
  status: 'active' | 'inactive';
  createdAt: string;       // '18/08/2026 16:45'
  createdBy: string;       // 'tuannt160990'
}
```

---

## 4. Testing Strategy & Success Criteria
1. **Kiểm tra Tab 2:** Click nút "Dạy AI câu này" trên log `log-178` -> Mở modal -> Điền câu trả lời chuẩn -> Bấm Lưu -> Badge chuyển thành `Đã Huấn Luyện`.
2. **Kiểm tra Tab 3:** Khối 4 hiển thị cặp câu hỏi vừa dạy với đầy đủ thông tin, hỗ trợ tìm kiếm, sửa và toggle ON/OFF.
3. **Kiểm tra Chat Simulator / Drawer:** Bấm "Sửa câu trả lời này" -> Nhập câu chuẩn -> Lưu -> Gõ lại câu hỏi -> AI trả lời chuẩn xác.
