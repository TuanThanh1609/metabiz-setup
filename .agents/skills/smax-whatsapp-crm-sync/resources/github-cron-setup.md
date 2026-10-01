# Hướng Dẫn Thiết Lập Tự Động Đồng Bộ 15 Phút/Lần 24/7 (GitHub Actions Cron)

Do Vercel tài khoản Hobby giới hạn cron chạy tối đa 1 lần/ngày, chúng ta sử dụng **GitHub Actions Scheduled Workflow** hoàn toàn miễn phí để ping tự động endpoint `/api/sync` mỗi 15 phút/lần 24/7 trên Cloud.

---

## 1. Cấu Hình Workflow File
Tạo file tại đường dẫn: `.github/workflows/smax-sync-cron.yml`

```yaml
name: Smax WhatsApp 15-Min Sync Cron

on:
  schedule:
    - cron: '*/15 * * * *'  # Chạy mỗi 15 phút một lần
  workflow_dispatch:        # Cho phép bấm nút chạy thủ công trên GitHub

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Smax to Neon Sync on Vercel
        run: |
          echo "Triggering Smax sync for project: fitgum..."
          curl -sS -X GET "https://metabizai-smax.vercel.app/api/sync?project_id=fitgum&limit=50"
          echo ""
          echo "Triggering BotAPI tagger..."
          curl -sS -X GET "https://metabizai-smax.vercel.app/api/botapi-tagger?project_id=fitgum"
          echo "Done sync."
```

---

## 2. Ưu Điểm Của Cơ Chế
1. **Hoàn toàn miễn phí**: GitHub cung cấp 2,000 phút chạy Actions/tháng cho tài khoản public/private. Một lần curl chỉ tốn ~5 giây.
2. **Không cần bật máy tính cá nhân**: GitHub runner tự khởi chạy trên cloud.
3. **Tự động kích hoạt BotAPI**: Ngay sau khi quét tin nhắn, hệ thống kiểm tra và gắn tag phân loại ngay lập tức.
