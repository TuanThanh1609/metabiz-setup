# Đặc Tả 7 Bước Phễu Chuyển Đổi (WhatsApp Funnel Engine Mapping)

Quy chuẩn phân loại trạng thái hội thoại khách hàng trên nền tảng Smax.ai Meta Business Agent:

| Bước | Tên Bước (Funnel Step) | Mã Code | Tiêu Chí Nhận Diện (Heuristics) | Mục Tiêu & Kịch Bản Chuẩn |
| :---: | :--- | :--- | :--- | :--- |
| **1** | **Tiếp cận & Chào mừng** *(Welcome & Hook)* | `step_1_welcome` | Khách click quảng cáo vào, nhận tin chào/3 nút bấm nhu cầu nhưng **chưa gửi tin nhắn lại** (`customer_messages == 0`). | Chào ngắn gọn (< 50 từ), đưa ra 3 nút Quick Reply để khách chọn vấn đề (Mụn/Bụng/Vóc dáng). |
| **2** | **Tư vấn vóc dáng & USP** *(Consultation)* | `step_2_consultation` | Khách gửi $\ge 1$ tin nhắn chia sẻ tình trạng vóc dáng/cân nặng/cách sử dụng, nhưng **chưa hỏi bảng giá**. | Đồng cảm sâu sắc, giải thích ngắn gọn cơ chế sản phẩm (< 50 từ/tin), kích hoạt gửi ảnh USP sản phẩm. |
| **3** | **Bằng chứng xã hội** *(Social Proof)* | `step_3_social_proof` | Khách hỏi về hiệu quả, feedback, review khách hàng cũ, độ an toàn. | Gửi ngay ảnh feedback review người thật việc thật trước khi báo giá để củng cố niềm tin. |
| **4** | **Báo giá & Combo** *(Pricing & Offers)* | `step_4_pricing` | Khách hỏi giá hoặc AI đã trình bày bảng giá 3 gói Decoy Pricing (`RM 179`, `RM 229`, `RM 329`...). | Báo giá 3 gói ngắn gọn (< 80 từ), làm nổi bật gói giữa (Best Value) kèm đồng hồ khẩn cấp 2h. |
| **5** | **Xử lý từ chối** *(Objection Handling)* | `step_5_objection` | Khách chê đắt, im lặng sau khi báo giá, nói cần suy nghĩ thêm, sợ tác dụng phụ. | Chia nhỏ chi phí theo ngày (ví dụ: chỉ 6 RM/ngày), nhấn mạnh chính sách quà tặng giới hạn và cam kết an toàn. |
| **6** | **Thu thập địa chỉ COD** *(Checkout)* | `step_6_checkout` | Khách đã chọn gói combo, đang cung cấp hoặc hỏi về thông tin giao nhận, địa chỉ nhà, mã bưu điện. | **TUYỆT ĐỐI KHÔNG UPSELL**. Thu thập SĐT + Địa chỉ. Kích hoạt 3 Cam Kết Vàng COD (kiểm hàng mới trả tiền). |
| **7** | **Chốt đơn thành công** *(Order Confirmed)* | `step_7_confirmed` | Khách đã cung cấp đầy đủ thông tin giao hàng, AI đã xác nhận đơn hàng thành công (`is_order_closed == true`). | Xác nhận đơn hàng, kích hoạt BotAPI gắn tag `thanh_cong`, thông báo thời gian giao dự kiến 2-3 ngày. |

---

### Logic Quyết Định Trong Code (`determineFunnelStep`):

```javascript
function determineFunnelStep(lead) {
  const isClosed = lead.conversation_result === 'Đã chốt đơn' || (lead.order_details && lead.order_details.length > 5);
  if (isClosed) return { num: 7, step: 'Step 7: Chốt đơn thành công' };

  const transcript = (lead.raw_transcript ? JSON.stringify(lead.raw_transcript) : '').toLowerCase();
  const dropoff = (lead.dropoff_reason || '').toLowerCase();
  const intent = (lead.main_intent || '').toLowerCase();
  const cMsgs = parseInt(lead.customer_messages || 0, 10);

  if (dropoff.includes('địa chỉ') || transcript.includes('address') || transcript.includes('poskod') || transcript.includes('hantar ke')) {
    return { num: 6, step: 'Step 6: Thu thập địa chỉ COD' };
  }
  if (dropoff.includes('im lặng sau khi báo') || dropoff.includes('chê đắt') || dropoff.includes('suy nghĩ') || dropoff.includes('mahal')) {
    return { num: 5, step: 'Step 5: Xử lý từ chối' };
  }
  if (intent.includes('giá') || intent.includes('combo') || transcript.includes('rm179') || transcript.includes('harga')) {
    if (cMsgs >= 1) return { num: 4, step: 'Step 4: Báo giá & Combo' };
  }
  if (transcript.includes('feedback') || transcript.includes('testimoni') || transcript.includes('review')) {
    if (cMsgs >= 1) return { num: 3, step: 'Step 3: Bằng chứng xã hội' };
  }
  if (cMsgs >= 1 || intent.includes('giảm cân') || intent.includes('vóc dáng')) {
    return { num: 2, step: 'Step 2: Tư vấn vóc dáng & USP' };
  }
  return { num: 1, step: 'Step 1: Tiếp cận & Chào mừng' };
}
```
