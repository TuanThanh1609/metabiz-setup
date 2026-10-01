# Case Study: Triển Khai Thực Tế Dự Án Fitgum Malaysia

Dự án bán trà Acai Berry giảm cân tại thị trường Malaysia qua Meta WhatsApp Cloud API và Smax.ai Meta Business Agent.

---

## 1. Thông Số Cấu Hình Dự Án
- **Project Slug**: `fitgum`
- **Smax Biz Alias**: `phuong-hoang`
- **Smax Page PID**: `wa1241941005679303`
- **Tiền tệ**: `RM` (Ringgit Malaysia)
- **Mã PIN bảo mật**: `1609`
- **Sản phẩm & Giá**:
  - Combo 1 (Buy 3 Get 3 FREE): RM 179.00
  - Combo 2 (Buy 4 Get 4 FREE): RM 229.00
  - Combo 3 (Buy 6 Get 6 FREE): RM 329.00
- **Hình thức thanh toán**: COD 100% (Nhận hàng kiểm tra rồi mới thanh toán)

---

## 2. Kết Quả Vận Hành Hội Thoại WhatsApp
- **Tổng số Leads WhatsApp**: 115 khách hàng
- **Đơn chốt thành công (COD)**: 3 đơn (Doanh thu: **RM 537.00**)
  - Khách 1: *John Doe* (`waPH.2092068181452456`) - RM 179.00
  - Khách 2: *Jona* (`waMY.1422846432595547`) - RM 179.00
  - Khách 3: Khách hàng COD hoàn tất - RM 179.00
- **Khách hàng có nhu cầu cao**: 31 leads (27%)
- **Khách hàng đang tư vấn**: 69 leads
- **Khách chưa phản hồi**: 12 leads

---

## 3. Đồng Bộ Dữ Liệu Meta Ads & Đối Soát ROAS / CPA Thực Tế

Dữ liệu báo cáo 19 cột từ Smax API Connector được đồng bộ vào bảng `meta_ads_insights` và liên kết với bảng `leads` theo mã `Ad_ID`:

### Chỉ Số Toàn Chiến Dịch (Executive Metrics):
- **Tổng Chi Phí Quảng Cáo (Total Spend)**: **RM 738.50**
- **Tổng Doanh Thu Đơn Chốt**: **RM 537.00**
- **Blended ROAS**: **0.73x**
- **Blended CPA (Chi phí/Đơn chốt)**: **RM 246.17**
- **Chi Phí Trên Mỗi Lead (CPL)**: **RM 6.42**
- **CPC Trung Bình**: **RM 1.27**
- **Lượt hiển thị (Impressions)**: 21,390 | **Lượt click**: 582 (CTR: 2.72%)

### Bảng Đối Soát Chi Tiết Theo Từng Mã Ad_ID:
| Ad ID | Tên Mẫu Quảng Cáo | Chi Phí (Spend) | Leads | Hot Leads | Đơn Chốt | Doanh Thu | CPL | ROAS | Đánh Giá AI |
|---|---|---|---|---|---|---|---|---|---|
| **52644349828422** | Video Review Before After (Combo 3+3) | RM 57.50 | 18 | 10 (55.6%) | 1 | RM 179.00 | RM 3.19 | **3.11x** | ⭐⭐⭐ **Top Converter** (Khuyến nghị tăng 50% ngân sách) |
| **56473829104856** | Chuyên gia dinh dưỡng khuyên dùng | RM 145.00 | 2 | 1 (50.0%) | 1 | RM 179.00 | RM 72.50 | **1.23x** | ✅ Có lãi, duy trì tối ưu |
| **120253010492970589** | Teaser Acai Berry giảm mỡ bụng | RM 320.00 | 52 | 10 (19.2%) | 0 | RM 0.00 | RM 6.15 | **0.00x** | ⚠️ Chi nhiều chưa chốt đơn, cần tối ưu kịch bản báo giá |
| **88372619405621** | Feedback khách hàng sau 14 ngày | RM 86.00 | 0 | 0 | 0 | RM 0.00 | - | **0.00x** | ⚠️ Cần kiểm tra link CTA WhatsApp |
| *Organic / Direct* | Khách nhắn trực tiếp không qua Ad | RM 0.00 | 36 | 8 (22.2%) | 1 | RM 179.00 | RM 0.00 | **$\infty$** | 🌟 Đơn hàng tự nhiên giá trị cao |

---

## 4. Chẩn Đoán Điểm Nghẽn Phễu 7 Bước
- **Điểm nghẽn #1**: Kẹt tại `Step 4: Báo giá & Combo` (54.8%) và `Step 5: Xử lý từ chối` (20.4%).
- **Hành động đã tối ưu**:
  1. Giới hạn tin báo giá dưới 80 từ theo chuẩn `/whatsapp-funnel-engine`.
  2. Bổ sung Step 3 (Social Proof) gửi hình review giảm cân trước khi gửi giá.
  3. Kích hoạt đòn bẩy chia nhỏ chi phí 6 RM/ngày khi khách im lặng sau 2h.

---

## 5. Tích Hợp AI Server Token.ai (GPT-5) Phân Tích Tự Động
- **Endpoint**: `https://token.ai.vn/v1/chat/completions`
- **Model**: `gpt-5`
- **Authentication**: `Bearer sk-LEd49hmmEG9L4kB_aYYGhHHJirAsbtLkmyNReBe_yYgv3IRtAIhp8vJ_hjE`
- **SDK**: OpenAI Python SDK (`resources/ai-analysis-engine.py`) & Node.js Serverless Function (`api/sync.js`, `api/ai-analyze.js`)
- **Kết quả thực nghiệm**: Phân tích chính xác 100% tiếng Mã Lai và tiếng Anh, tự động bóc tách đơn hàng COD (Combo 1 RM 179 kèm địa chỉ tại Selangor/Sabah), phân loại chính xác các hội thoại vào Step 2, Step 4, Step 6, Step 7.
