# Hướng Dẫn Thiết Lập Smax API Connector Đẩy Dữ Liệu Meta Ads Sang Mini-CRM

Tài liệu hướng dẫn chi tiết cách kết nối tính năng **API Connector** trên Smax.ai để tự động đẩy dữ liệu báo cáo quảng cáo Meta Ads (Facebook/Instagram/WhatsApp Ads) về Mini-CRM trên Vercel và Neon Serverless Postgres.

---

## 1. Tổng Quan Cấu Trúc Dữ Liệu 19 Cột Meta Ads

Smax.ai xuất dữ liệu báo cáo hiệu quả quảng cáo Meta với 19 cột tiêu chuẩn:

| Cột Smax | Kiểu Dữ Liệu | Ví Dụ | Diễn Giải |
|---|---|---|---|
| **Date** | String / Date | `2026-09-30` | Ngày phát sinh số liệu quảng cáo |
| **Account ID** | String | `act_102847192847` | ID tài khoản quảng cáo Meta Ads |
| **Campaign ID** | String | `120253010492970589` | Mã định danh chiến dịch |
| **Campaign Name** | String | `[MY] Fitgum Acai Berry - Sep Promo` | Tên chiến dịch quảng cáo |
| **Adset ID** | String | `120253010492970590` | Mã nhóm quảng cáo |
| **Adset Name** | String | `Women 25-45 - Weightloss Interest` | Tên nhóm quảng cáo |
| **Ad ID** | String | `52644349828422` | **Mã quảng cáo** (Khớp với `ad_id` trong WhatsApp Livechat) |
| **Ad Name** | String | `Video Review Before After - Combo 3+3` | Tên bài quảng cáo / Mẫu sáng tạo |
| **Actions** | Integer | `35` | Tổng số hành động được ghi nhận |
| **Spend** | Numeric / Float | `738.50` | Tổng chi phí quảng cáo (RM / USD / VNĐ) |
| **Click Rate** | Numeric / Float | `2.72` | Tỷ lệ nhấp (CTR %) |
| **CPC** | Numeric / Float | `1.27` | Chi phí trung bình cho mỗi lượt nhấp |
| **Reach** | Integer | `18420` | Số người dùng duy nhất nhìn thấy quảng cáo |
| **Frequency** | Numeric / Float | `1.16` | Tần suất hiển thị trung bình trên mỗi người |
| **Inline Link Clicks**| Integer | `420` | Số lượt nhấp trực tiếp vào liên kết CTA |
| **Inline Post Engagement** | Integer | `610` | Số lượt tương tác bài viết quảng cáo |
| **Clicks** | Integer | `582` | Tổng số lượt nhấp chuột mọi loại |
| **Impressions** | Integer | `21390` | Tổng số lượt hiển thị quảng cáo |
| **CPM** | Numeric / Float | `34.53` | Chi phí cho 1.000 lượt hiển thị |

---

## 2. Hướng Dẫn Cấu Hình Trên Smax.ai

### Bước 1: Mở Modal "Thêm Kết Nối Mới"
1. Đăng nhập vào workspace Smax của bạn (`https://smax.ai/bizs/{biz_alias}`).
2. Điều hướng tới mục **Cài đặt** $\rightarrow$ **Kết nối (Integrations)** $\rightarrow$ **API Connector** (hoặc mục Đẩy Dữ Liệu Báo Cáo).
3. Bấm nút **"Thêm kết nối mới"** (Add new connection).

### Bước 2: Điền Các Trường Thông Tin
- **Nền tảng (Platform)**: Chọn biểu tượng `API` (Khối lập phương màu xanh dương).
- **Tên kết nối**: Đặt tên nhận diện trực quan, ví dụ:  
  `Fitgum - Meta Ads to Mini-CRM` hoặc `Meta Ads Insights Ingestion`
- **URL Webhook**: Nhập URL endpoint Vercel kèm tham số `project_id`:
  ```text
  https://your-crm.vercel.app/api/ads-webhook?project_id=fitgum
  ```
  *(Thay `your-crm.vercel.app` bằng domain Vercel thực tế và `fitgum` bằng slug dự án của bạn).*
- **Phương thức (Method)**: `POST` (Định dạng Content-Type: `application/json`).
- **Xác thực (Authentication)**: Chọn `None` (Public webhook - Endpoint đã có sẵn CORS và xử lý an toàn).
- **Thời gian gửi**: Chọn `Theo thời gian thực` hoặc `Định kỳ hàng ngày lúc 23:59`.

### Bước 3: Lưu & Kích Hoạt
Bấm **"Lưu kết nối"** (Save Connection). Smax sẽ thực hiện 1 cuộc gọi thử nghiệm (Healthcheck Ping) tới URL để kiểm tra phản hồi.

---

## 3. Cơ Chế Xử Lý Healthcheck Ping Từ Smax

> [!IMPORTANT]
> Khi người dùng bấm "Lưu kết nối", Smax sẽ gửi một HTTP request kiểm tra với payload rỗng (`{}` hoặc không có bản ghi nào). Nếu endpoint trả về mã lỗi HTTP 400/500, Smax sẽ báo lỗi kết nối thất bại!

Hệ thống Mini-CRM xử lý trường hợp này như sau:
```javascript
// Trích xuất từ api/ads-webhook.js
if (!items || (Array.isArray(items) && items.length === 0) || (typeof items === 'object' && Object.keys(items).length === 0)) {
  return res.status(200).json({
    success: true,
    message: 'Ping acknowledged. Webhook endpoint is healthy and ready to receive Meta Ads data.',
    count: 0
  });
}
```
Nhờ đó, Smax xác nhận kết nối thành công 100% ngay từ lần bấm đầu tiên.

---

## 4. Chuẩn Hóa Dữ Liệu & Làm Sạch (Data Sanitization)

Smax có thể gửi tiêu đề cột dưới nhiều định dạng khác nhau (chữ hoa/thường có dấu cách như `"Click Rate"`, `snake_case` như `click_rate`, hoặc `camelCase` như `clickRate`). Đồng thời, các số tiền hoặc tỷ lệ phần trăm có thể chứa ký tự lạ (`RM 120.50`, `2.72%`, `1,250`).

Hàm chuẩn hóa trong `api/ads-webhook.js`:
```javascript
function cleanNumber(val) {
  if (val === undefined || val === null || val === '') return 0;
  if (typeof val === 'number') return isNaN(val) ? 0 : val;
  const cleaned = String(val).replace(/[^0-9.-]/g, '');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
}

function normalizeDate(val) {
  if (!val) return new Date().toISOString().split('T')[0];
  const d = new Date(val);
  if (isNaN(d.getTime())) return new Date().toISOString().split('T')[0];
  return d.toISOString().split('T')[0];
}
```

---

## 5. Cơ Chế Idempotent Batch Upsert Vào Neon Postgres

Để tránh trùng lặp dữ liệu khi Smax gửi lại báo cáo của ngày cũ hoặc cập nhật số liệu mới trong ngày:
```sql
INSERT INTO meta_ads_insights (
  project_id, date, account_id, campaign_id, campaign_name,
  adset_id, adset_name, ad_id, ad_name, actions,
  spend, click_rate, cpc, reach, frequency,
  inline_link_clicks, inline_post_engagement, clicks, impressions, cpm,
  raw_data, updated_at
) VALUES ($1, $2, ...)
ON CONFLICT (project_id, date, ad_id, adset_id, campaign_id) 
DO UPDATE SET
  account_id = EXCLUDED.account_id,
  campaign_name = EXCLUDED.campaign_name,
  adset_name = EXCLUDED.adset_name,
  ad_name = EXCLUDED.ad_name,
  actions = EXCLUDED.actions,
  spend = EXCLUDED.spend,
  click_rate = EXCLUDED.click_rate,
  cpc = EXCLUDED.cpc,
  reach = EXCLUDED.reach,
  frequency = EXCLUDED.frequency,
  inline_link_clicks = EXCLUDED.inline_link_clicks,
  inline_post_engagement = EXCLUDED.inline_post_engagement,
  clicks = EXCLUDED.clicks,
  impressions = EXCLUDED.impressions,
  cpm = EXCLUDED.cpm,
  raw_data = EXCLUDED.raw_data,
  updated_at = NOW();
```

> [!NOTE]
> Bảng `meta_ads_insights` áp dụng ràng buộc `DEFAULT '' NOT NULL` cho các cột `ad_id`, `adset_id`, `campaign_id` để đảm bảo định lý Postgres Nullable Uniqueness không bị vi phạm (trong Postgres, `NULL != NULL` khiến `ON CONFLICT` bị bỏ qua nếu có giá trị NULL).

---

## 6. Mẫu Payload Kiểm Thử Đẩy Dữ Liệu Qua cURL

Bạn có thể chạy thử lệnh cURL sau để kiểm tra endpoint hoạt động:

```bash
curl -X POST "https://your-crm.vercel.app/api/ads-webhook?project_id=fitgum" \
  -H "Content-Type: application/json" \
  -d '[
    {
      "Date": "2026-09-30",
      "Account ID": "act_102847192847",
      "Campaign ID": "120253010492970589",
      "Campaign Name": "[MY] Fitgum Acai Berry Drink - Sep",
      "Adset ID": "120253010492970590",
      "Adset Name": "Women 25-45 Selangor",
      "Ad ID": "52644349828422",
      "Ad Name": "Video Review Before After - Combo 3+3",
      "Actions": 35,
      "Spend": 57.50,
      "Click Rate": 3.42,
      "CPC": 0.85,
      "Reach": 4200,
      "Frequency": 1.12,
      "Inline Link Clicks": 68,
      "Inline Post Engagement": 95,
      "Clicks": 82,
      "Impressions": 4700,
      "CPM": 12.23
    }
  ]'
```

Phản hồi mẫu thành công:
```json
{
  "success": true,
  "project_id": "fitgum",
  "received": 1,
  "upserted": 1,
  "errors": 0,
  "message": "Successfully synchronized 1 Meta Ads record(s) into Neon Postgres."
}
```

---

## 7. Hiển Thị Số Liệu Trên Mini-CRM Tab "Báo Cáo Theo Ads Campaign"

Khi dữ liệu quảng cáo được đồng bộ vào Neon, API `/api/leads` tự động thực hiện phép liên kết `FULL OUTER JOIN` với bảng `leads` để tạo ra:
1. **4 Thẻ Executive KPI**:
   - **Tổng Ngân Sách Quảng Cáo**: Chi phí thực tế chi trả cho Meta.
   - **Doanh Thu & ROAS**: Doanh thu đơn chốt / Tổng chi phí quảng cáo (kèm huy hiệu xanh nếu ROAS $\ge 1.0x$).
   - **Blended CPA**: Chi phí trung bình để ra 1 đơn chốt COD.
   - **Cost Per Lead & CPC**: Chi phí trên mỗi hội thoại WhatsApp mới và chi phí mỗi lượt nhấp.
2. **Khung Đề Xuất AI Tối Ưu Ngân Sách**:
   - Tự động phát hiện bài quảng cáo có ROAS cao nhất để gợi ý tăng ngân sách.
   - Cảnh báo các mẫu quảng cáo đã chi nhiều ngân sách nhưng chưa ra đơn chốt.
3. **Bảng Đối Soát Chi Tiết 13 Cột**:
   - Tên quảng cáo & Campaign, Chi tiêu (Spend), Lượt hiển thị (Impressions), Lượt click, CTR, CPC, CPM, Số Lead nhắn tin, Tỷ lệ lead có nhu cầu (Hot Rate %), Số đơn chốt COD, Doanh thu, CPL, và ROAS.
