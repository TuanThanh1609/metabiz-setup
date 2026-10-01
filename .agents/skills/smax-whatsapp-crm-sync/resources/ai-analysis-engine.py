"""
================================================================================
SMAX WHATSAPP AI ANALYSIS ENGINE (OPENAI SDK PYTHON + TOKEN.AI SERVER)
================================================================================
Tự động kích hoạt khi khởi tạo dự án mới trong hệ thống smax-whatsapp-crm-sync.
Kết nối trực tiếp tới AI Server https://token.ai.vn/v1 thông qua OpenAI SDK Python.

- AI Server: https://token.ai.vn/v1
- Model: gpt-5
- Authentication: Bearer Token (sk-LEd49hmmEG9L4kB_aYYGhHHJirAsbtLkmyNReBe_yYgv3IRtAIhp8vJ_hjE)
- Output: Structured JSON chuẩn 7 Bước Phễu Bán Hàng & Đơn Hàng COD
================================================================================
"""

import os
import json
import argparse
from typing import Dict, Any, Optional
from openai import OpenAI

# ------------------------------------------------------------------------------
# 1. CẤU HÌNH MẶC ĐỊNH (DEFAULT AI CONFIGURATION)
# ------------------------------------------------------------------------------
DEFAULT_AI_CONFIG = {
    "base_url": os.getenv("AI_ENDPOINT", "https://token.ai.vn/v1"),
    "api_key": os.getenv("AI_TOKEN", "sk-LEd49hmmEG9L4kB_aYYGhHHJirAsbtLkmyNReBe_yYgv3IRtAIhp8vJ_hjE"),
    "model": os.getenv("AI_MODEL", "gpt-5")
}

# ------------------------------------------------------------------------------
# 2. KHỞI TẠO OPENAI CLIENT
# ------------------------------------------------------------------------------
def get_ai_client(base_url: Optional[str] = None, api_key: Optional[str] = None) -> OpenAI:
    """Khởi tạo OpenAI SDK Client trỏ về AI Server Token.ai"""
    return OpenAI(
        base_url=base_url or DEFAULT_AI_CONFIG["base_url"],
        api_key=api_key or DEFAULT_AI_CONFIG["api_key"]
    )

# ------------------------------------------------------------------------------
# 3. PROMPT HỆ THỐNG PHÂN TÍCH CHUẨN 7 BƯỚC PHỄU
# ------------------------------------------------------------------------------
SYSTEM_ANALYSIS_PROMPT = """Bạn là chuyên gia AI phân tích hội thoại bán hàng WhatsApp (Meta Business Agent).
Nhiệm vụ của bạn là đọc toàn bộ lịch sử trò chuyện giữa Khách hàng và Trợ lý AI để trích xuất thông tin kinh doanh chuẩn xác.

Yêu cầu xuất ra DUY NHẤT một chuỗi JSON hợp lệ theo schema sau:
{
  "main_intent": "Nhu cầu cốt lõi của khách (5-10 từ, ví dụ: 'Hỏi giá Combo 1', 'Tư vấn giảm mỡ bụng')",
  "conversation_result": "Một trong 4 giá trị chuẩn: 'Đã chốt đơn' | 'Có nhu cầu' | 'Đang tư vấn' | 'Chưa phản hồi'",
  "is_order_closed": true/false (chỉ true khi khách chốt mua combo và đã cung cấp địa chỉ nhận hàng COD),
  "is_high_intent": true/false (true khi khách hỏi giá cụ thể, hỏi ship COD, chọn combo hoặc gửi thông tin nhận hàng, hoặc đã nhắn >= 3 tin có nội dung),
  "order_combo": "Tên combo chốt (ví dụ: 'Combo 1 (Buy 3 Get 3 FREE)') hoặc chuỗi rỗng nếu chưa chốt",
  "order_amount": số tiền COD dạng số (float/int) hoặc 0 nếu chưa chốt,
  "recipient_name": "Tên người nhận hàng",
  "recipient_phone": "Số điện thoại nhận hàng",
  "shipping_address": "Địa chỉ giao hàng đầy đủ (bao gồm đường, phường/xã, quận/huyện, bang/tỉnh, mã bưu điện)",
  "order_details": "Tóm tắt đơn hàng định dạng: 📦 [Combo] ([Tiền]) | 👤 Người nhận: [Tên] | 📞 [SĐT] | 📍 Địa chỉ: [Địa chỉ] | 🚚 COD Free Shipping (hoặc chuỗi rỗng nếu chưa chốt)",
  "dropoff_reason": "Điểm nghẽn khiến khách dừng lại hoặc chưa mua (ví dụ: 'Khách im lặng sau khi báo giá', 'Chưa gửi địa chỉ nhận hàng')",
  "key_evidence": "Trích dẫn 1 câu nguyên văn quan trọng nhất của khách hoặc địa chỉ giao hàng",
  "funnel_step": "Tên bước trong 7 bước phễu ('Step 1: Tiếp cận & Chào mừng' | 'Step 2: Tư vấn vóc dáng & USP' | 'Step 3: Bằng chứng xã hội' | 'Step 4: Báo giá & Combo' | 'Step 5: Xử lý từ chối' | 'Step 6: Thu thập địa chỉ COD' | 'Step 7: Chốt đơn thành công')",
  "funnel_step_num": số nguyên từ 1 đến 7 tương ứng với funnel_step
}

Quy tắc phân loại:
1. 'Đã chốt đơn' (Step 7): Chỉ khi có đầy đủ họ tên, sđt và địa chỉ nhận hàng COD.
2. 'Step 6: Thu thập địa chỉ COD': Khách đồng ý chọn combo nhưng chưa đủ địa chỉ.
3. 'Step 5: Xử lý từ chối': Khách chê đắt, phân vân hoặc im lặng sau khi nghe báo giá.
4. 'Step 4: Báo giá & Combo': Đã gửi bảng giá/combo nhưng khách chưa phản hồi chốt.
5. 'Step 3: Bằng chứng xã hội': Khách hỏi feedback, review, an toàn, hiệu quả.
6. 'Step 2: Tư vấn vóc dáng & USP': Đang khai thác nhu cầu mỡ bụng, cân nặng, sức khỏe.
7. 'Step 1: Tiếp cận & Chào mừng': Khách mới gửi tin chào ban đầu.
"""

# ------------------------------------------------------------------------------
# 4. HÀM PHÂN TÍCH HỘI THOẠI BẰNG TOKEN.AI (GPT-5)
# ------------------------------------------------------------------------------
def analyze_whatsapp_conversation(
    transcript: str,
    customer_name: str = "Khách hàng WhatsApp",
    currency: str = "RM",
    client: Optional[OpenAI] = None,
    model: str = "gpt-5"
) -> Dict[str, Any]:
    """
    Gọi AI Server Token.ai qua OpenAI SDK Python để phân tích hội thoại.
    """
    if not transcript or not transcript.strip():
        return {
            "main_intent": "Khách chưa nhắn tin",
            "conversation_result": "Chưa phản hồi",
            "is_order_closed": False,
            "is_high_intent": False,
            "order_combo": "",
            "order_amount": 0,
            "recipient_name": customer_name,
            "recipient_phone": "",
            "shipping_address": "",
            "order_details": "",
            "dropoff_reason": "Khách click quảng cáo nhưng chưa gửi tin nhắn",
            "key_evidence": "",
            "funnel_step": "Step 1: Tiếp cận & Chào mừng",
            "funnel_step_num": 1
        }

    ai_client = client or get_ai_client()

    user_message = f"""Đơn vị tiền tệ: {currency}
Khách hàng: {customer_name}

Lịch sử trò chuyện WhatsApp:
{transcript}
"""

    response = ai_client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_ANALYSIS_PROMPT},
            {"role": "user", "content": user_message}
        ],
        temperature=0.1,
        response_format={"type": "json_object"}
    )

    content = response.choices[0].message.content
    try:
        data = json.loads(content)
        return data
    except Exception as e:
        print(f"Error parsing AI JSON output: {e}. Raw content: {content}")
        return {
            "main_intent": "Đang tư vấn",
            "conversation_result": "Đang tư vấn",
            "is_order_closed": False,
            "is_high_intent": False,
            "order_combo": "",
            "order_amount": 0,
            "recipient_name": customer_name,
            "recipient_phone": "",
            "shipping_address": "",
            "order_details": "",
            "dropoff_reason": "Lỗi phân tích AI JSON",
            "key_evidence": "",
            "funnel_step": "Step 2: Tư vấn vóc dáng & USP",
            "funnel_step_num": 2
        }

# ------------------------------------------------------------------------------
# 5. DEMO THỰC THI (CLI USAGE)
# ------------------------------------------------------------------------------
if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Phân tích hội thoại WhatsApp bằng Token.ai GPT-5")
    parser.add_argument("--name", default="Siti Aminah", help="Tên khách hàng")
    parser.add_argument("--currency", default="RM", help="Đơn vị tiền tệ (RM, VND, PHP...)")
    parser.add_argument("--model", default="gpt-5", help="Tên model trên Token.ai")
    args = parser.parse_args()

    sample_transcript = """
[Khách hàng]: Hi Fitgum
[Fitgum AI]: Salam sejahtera! Selamat datang ke Fitgum Acai Berry Drink. Adakah anda sedang mencari penyelesaian untuk kempiskan perut buncit atau turunkan berat badan?
[Khách hàng]: Perut buncit lepas bersalin. Berapa harga combo?
[Fitgum AI]: Fitgum sangat sesuai untuk kempiskan perut buncit seawal 7 hari. Promosi hari ini:
Combo 1: Beli 3 Percuma 3 hanya RM179 (Paling Laris)
Combo 2: Beli 4 Percuma 4 hanya RM229
Free postage COD seluruh Malaysia.
[Khách hàng]: Saya nak Combo 1. Boleh COD kan?
[Fitgum AI]: Boleh puan! Sila berikan Nama, No Telefon dan Alamat penuh untuk penghantaran COD ya.
[Khách hàng]: Siti Aminah, 013-8889922, No 45, Jalan Anggerik 2, Taman Saujana Impian, 43000 Kajang, Selangor
"""

    print("=== CHẠY PHÂN TÍCH HỘI THOẠI MẪU BẰNG TOKEN.AI GPT-5 ===")
    print(f"Server: {DEFAULT_AI_CONFIG['base_url']} | Model: {args.model}")
    result = analyze_whatsapp_conversation(sample_transcript, args.name, args.currency, model=args.model)
    print("\n✓ KẾT QUẢ PHÂN TÍCH JSON TỪ TOKEN.AI GPT-5:")
    print(json.dumps(result, ensure_ascii=False, indent=2))
