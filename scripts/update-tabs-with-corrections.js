const fs = require('fs');
const path = require('path');

const tabsPath = path.join(__dirname, '../src/js/tabs.js');
let code = fs.readFileSync(tabsPath, 'utf8');

// 1. Update logData with detailed query, wrong answer, and training status
const logDataTarget = `    // Tab 2 Mock Data (10 Log Entries)
    this.logData = [
      {
        priority: 'high',
        id: '12457',
        customer: 'Lý Nguyễn Phan Anh',
        phone: '0988776655',
        channel: 'Inbox',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 85, level: 'hot' },
        reasons: ['Có vấn đề chưa xử lý', 'Hoàn thành tự động'],
        summary: 'Cần kiểm tra lỗi AI. Trạng thái Hoàn thành tự động. Vấn đề: Khác.',
        date: '13/06/2026',
        category: 'general'
      },
      {
        priority: 'high',
        id: '12455',
        customer: 'Thu Đặng',
        phone: '0975043234',
        channel: 'Crawl',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 60, level: 'warm' },
        reasons: ['AI chưa xử lý được', 'Chưa chốt đơn'],
        summary: 'Cần kiểm tra lỗi AI. Trạng thái Chưa xử lý được. Vấn đề: Thiếu dữ liệu ngữ cảnh.',
        date: '13/06/2026',
        category: 'unresolved'
      },
      {
        priority: 'high',
        id: '12454',
        customer: 'Thu Đặng',
        phone: '0975043234',
        channel: 'Crawl',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 55, level: 'warm' },
        reasons: ['AI chưa xử lý được', 'Có vấn đề chưa xử lý'],
        summary: 'Cần kiểm tra lỗi AI. Trạng thái Chưa xử lý được. Vấn đề: Không trả lời được giá/sản phẩm.',
        date: '13/06/2026',
        category: 'error'
      },
      {
        priority: 'high',
        id: '12453',
        customer: 'Ngọc Bích',
        phone: '0763805477',
        channel: 'Crawl',
        aiStatus: 'Escalate nhân sự',
        outcome: 'Không',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 40, level: 'warm' },
        reasons: ['Có vấn đề chưa xử lý', 'Chưa chốt đơn'],
        summary: 'Cần kiểm tra lỗi AI. Trạng thái Escalate nhân sự. Vấn đề: Thiếu dữ liệu ngữ cảnh.',
        date: '13/06/2026',
        category: 'handover'
      },
      {
        priority: 'high',
        id: '12451',
        customer: 'Đào Hoa Anh',
        phone: '0978961203',
        channel: 'Inbox',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Trung bình',
        leadScore: { score: 78, level: 'hot' },
        reasons: ['Có vấn đề chưa xử lý', 'Chưa chốt đơn'],
        summary: 'Cần kiểm tra lỗi AI. Trạng thái Hoàn thành tự động. Vấn đề: Khác.',
        date: '13/06/2026',
        category: 'general'
      },
      {
        priority: 'medium',
        id: '12448',
        customer: 'Trần Văn Hoàng',
        phone: '0912345678',
        channel: 'WhatsApp',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đã chốt',
        satisfaction: 'Hài lòng',
        leadScore: { score: 95, level: 'hot' },
        reasons: ['Đã chốt đơn', 'Hoàn thành tự động'],
        summary: 'Khách hàng đặt 2 Áo polo nam Classic qua Webview. Đã nhận mã đơn POS.',
        date: '13/06/2026',
        category: 'closed'
      },
      {
        priority: 'medium',
        id: '12445',
        customer: 'Vũ Thị Lan',
        phone: '0934567890',
        channel: 'Inbox',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không hài lòng',
        leadScore: { score: 35, level: 'cold' },
        reasons: ['Câu hỏi khó', 'Khách không hài lòng'],
        summary: 'Khách hỏi chính sách đại lý cấp 2 và chiết khấu thanh toán quốc tế.',
        date: '12/06/2026',
        category: 'difficult'
      },
      {
        priority: 'low',
        id: '12440',
        customer: 'Lê Minh Tuấn',
        phone: '0908765432',
        channel: 'Inbox',
        aiStatus: 'Escalate nhân sự',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Trung bình',
        leadScore: { score: 65, level: 'warm' },
        reasons: ['Cần người can thiệp', 'Có vấn đề chưa xử lý'],
        summary: 'Khách yêu cầu đổi địa chỉ giao hàng của đơn cũ đã xuất kho.',
        date: '12/06/2026',
        category: 'handover'
      },
      {
        priority: 'low',
        id: '12435',
        customer: 'Hoàng Mai Phương',
        phone: '0945678123',
        channel: 'WhatsApp',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đã chốt',
        satisfaction: 'Hài lòng',
        leadScore: { score: 92, level: 'hot' },
        reasons: ['Đã chốt đơn', 'Hoàn thành tự động'],
        summary: 'Khách chốt Combo Trị mụn B5 và nhận mã QR VietQR chuyển khoản.',
        date: '12/06/2026',
        category: 'closed'
      },
      {
        priority: 'medium',
        id: '12430',
        customer: 'Phạm Đức Thắng',
        phone: '0967890123',
        channel: 'Inbox',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Không',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 20, level: 'cold' },
        reasons: ['AI trả lời lỗi', 'Chưa chốt đơn'],
        summary: 'AI gửi nhầm liên kết sản phẩm áo nữ cho khách hỏi áo khoác dù nam.',
        date: '11/06/2026',
        category: 'error'
      }
    ];`;

const logDataReplacement = `    // Tab 2 Mock Data (10 Log Entries) with Questions and Ideal Corrections
    this.logData = [
      {
        priority: 'high',
        id: '12457',
        agentId: 'agent-1',
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        customer: 'Lý Nguyễn Phan Anh',
        phone: '0988776655',
        channel: 'Inbox',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 85, level: 'hot' },
        reasons: ['Có vấn đề chưa xử lý', 'Hoàn thành tự động'],
        summary: 'Khách hỏi thời gian ship nhanh hỏa tốc về Cầu Giấy Hà Nội.',
        userQuery: 'Shop có giao hỏa tốc nhận trong 2 tiếng ở Cầu Giấy không?',
        aiAnswer: 'Dạ bên em chỉ hỗ trợ giao thường từ 2 đến 3 ngày qua bưu cục ạ.',
        idealAnswer: 'Dạ shop có hỗ trợ ship Hỏa Tốc nhận trong 2 tiếng tại nội thành Hà Nội (phí tính theo app AhaMove/Grab) ạ!',
        ruleNote: 'Nội thành HN và TP.HCM có hỗ trợ giao hỏa tốc 2h.',
        isTrained: false,
        date: '13/06/2026',
        category: 'general'
      },
      {
        priority: 'high',
        id: '12455',
        agentId: 'agent-1',
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        customer: 'Thu Đặng',
        phone: '0975043234',
        channel: 'Crawl',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 60, level: 'warm' },
        reasons: ['AI chưa xử lý được', 'Chưa chốt đơn'],
        summary: 'Thiếu dữ liệu: Khách hỏi cách chọn size áo khoác nam 75kg cao 1m72.',
        userQuery: 'Mình nặng 75kg cao 1m72 mặc áo khoác size gì vừa đẹp shop?',
        aiAnswer: 'Dạ shop có nhiều size, bạn vui lòng xem bảng size trên fanpage nhé.',
        idealAnswer: 'Dạ với chiều cao 1m72 và nặng 75kg, anh mặc vừa vặn size XL hoặc chọn XXL nếu muốn mặc rộng thoải mái bên ngoài áo len ạ!',
        ruleNote: 'Nam 70-76kg cao 1m70-1m75 tư vấn size XL.',
        isTrained: false,
        date: '13/06/2026',
        category: 'unresolved'
      },
      {
        priority: 'high',
        id: '12454',
        agentId: 'agent-1',
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        customer: 'Thu Đặng',
        phone: '0975043234',
        channel: 'Crawl',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 55, level: 'warm' },
        reasons: ['AI trả lời lỗi', 'Có vấn đề chưa xử lý'],
        summary: 'AI nhầm lẫn chính sách Freeship toàn quốc.',
        userQuery: 'Shop có freeship đơn hàng đi tỉnh Đà Nẵng không?',
        aiAnswer: 'Dạ bên em miễn phí ship cho tất cả các đơn hàng toàn quốc ạ.',
        idealAnswer: 'Dạ bên em Freeship cho đơn hàng từ 500k toàn quốc ạ. Đơn dưới 500k phí ship đồng giá 25k anh/chị nha!',
        ruleNote: 'Chỉ miễn phí vận chuyển cho đơn từ 500.000đ trở lên.',
        isTrained: true,
        trainedCorrection: 'Dạ bên em Freeship cho đơn hàng từ 500k toàn quốc ạ. Đơn dưới 500k phí ship đồng giá 25k anh/chị nha!',
        date: '13/06/2026',
        category: 'error'
      },
      {
        priority: 'high',
        id: '12453',
        agentId: 'agent-4',
        agentName: 'Chuyên viên Bất Động Sản',
        customer: 'Ngọc Bích',
        phone: '0763805477',
        channel: 'Crawl',
        aiStatus: 'Escalate nhân sự',
        outcome: 'Không',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 40, level: 'warm' },
        reasons: ['Có vấn đề chưa xử lý', 'Chưa chốt đơn'],
        summary: 'Khách hỏi tiến độ thanh toán vay 0% lãi suất đợt 2.',
        userQuery: 'Chính sách vay ngân hàng 0% lãi suất áp dụng đến khi nào vậy em?',
        aiAnswer: 'Dạ dự án có hỗ trợ vay ngân hàng, chi tiết anh liên hệ phòng kinh doanh.',
        idealAnswer: 'Dạ gói hỗ trợ lãi suất 0% và ân hạn nợ gốc áp dụng tối đa 24 tháng hoặc đến khi nhận nhà (dự kiến Quý IV/2026) qua các ngân hàng VCB, MB và BIDV ạ!',
        ruleNote: 'Gói vay 0% áp dụng 24 tháng cho khách ký hợp đồng tháng này.',
        isTrained: false,
        date: '13/06/2026',
        category: 'handover'
      },
      {
        priority: 'high',
        id: '12451',
        agentId: 'agent-1',
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        customer: 'Đào Hoa Anh',
        phone: '0978961203',
        channel: 'Inbox',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Trung bình',
        leadScore: { score: 78, level: 'hot' },
        reasons: ['Có vấn đề chưa xử lý', 'Chưa chốt đơn'],
        summary: 'Khách phân vân giữa màu Xanh Navy và Đen.',
        userQuery: 'Áo polo màu xanh navy với màu đen màu nào dễ phối đồ hơn?',
        aiAnswer: 'Dạ màu nào cũng đẹp bạn thích màu nào lấy màu đó ạ.',
        idealAnswer: 'Dạ màu Xanh Navy là tone màu best-seller bên em vì rất tôn da và lịch lãm, còn màu Đen thì basic dễ phối với mọi loại quần tây, jean hoặc kaki ạ!',
        ruleNote: 'Tư vấn gợi ý chi tiết ưu điểm của từng màu.',
        isTrained: true,
        trainedCorrection: 'Dạ màu Xanh Navy là tone màu best-seller bên em vì rất tôn da và lịch lãm...',
        date: '13/06/2026',
        category: 'general'
      },
      {
        priority: 'medium',
        id: '12448',
        agentId: 'agent-1',
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        customer: 'Trần Văn Hoàng',
        phone: '0912345678',
        channel: 'WhatsApp',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đã chốt',
        satisfaction: 'Hài lòng',
        leadScore: { score: 95, level: 'hot' },
        reasons: ['Đã chốt đơn', 'Hoàn thành tự động'],
        summary: 'Khách hàng đặt 2 Áo polo nam Classic qua Webview. Đã nhận mã đơn POS.',
        userQuery: 'Mình lấy 2 áo polo trắng size L gửi về Đà Nẵng nhé.',
        aiAnswer: 'Dạ em đã tạo đơn hàng thành công qua Webview và gửi mã QR thanh toán cho anh Hoàng rồi ạ!',
        idealAnswer: 'Dạ em đã tạo đơn hàng thành công qua Webview và gửi mã QR thanh toán cho anh Hoàng rồi ạ!',
        isTrained: false,
        date: '13/06/2026',
        category: 'closed'
      },
      {
        priority: 'medium',
        id: '12445',
        agentId: 'agent-2',
        agentName: 'Chuyên viên Da liễu Smax',
        customer: 'Vũ Thị Lan',
        phone: '0934567890',
        channel: 'Inbox',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Không hài lòng',
        leadScore: { score: 35, level: 'cold' },
        reasons: ['Câu hỏi khó', 'Khách không hài lòng'],
        summary: 'Khách hỏi cách kết hợp Serum B5 cùng Retinol 0.5%.',
        userQuery: 'Da mình đang dùng Retinol 0.5% thì thoa Serum B5 trước hay sau?',
        aiAnswer: 'Dạ bạn nên bôi Serum B5 trước, còn Retinol thì tùy da bạn nhé.',
        idealAnswer: 'Dạ theo nguyên tắc lỏng trước đặc sau: Bạn nên thoa Serum B5 phục hồi trước trên nền da ẩm, đợi ráo 10-15 phút rồi thoa Retinol 0.5% và khóa ẩm bằng kem dưỡng để hạn chế kích ứng ạ!',
        ruleNote: 'Nguyên tắc skincare: Serum B5 trước -> Đợi 15p -> Retinol -> Khóa ẩm.',
        isTrained: true,
        trainedCorrection: 'Dạ theo nguyên tắc lỏng trước đặc sau...',
        date: '12/06/2026',
        category: 'difficult'
      },
      {
        priority: 'low',
        id: '12440',
        agentId: 'agent-1',
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        customer: 'Lê Minh Tuấn',
        phone: '0908765432',
        channel: 'Inbox',
        aiStatus: 'Escalate nhân sự',
        outcome: 'Đang cân nhắc',
        satisfaction: 'Trung bình',
        leadScore: { score: 65, level: 'warm' },
        reasons: ['Cần người can thiệp', 'Có vấn đề chưa xử lý'],
        summary: 'Khách yêu cầu đổi địa chỉ giao hàng của đơn cũ đã xuất kho.',
        userQuery: 'Đơn #1234 của mình đổi sang nhận ở số 10 Cầu Giấy được không?',
        aiAnswer: 'Dạ em chuyển thông tin cho chuyên viên CSKH hỗ trợ anh đổi địa chỉ với bưu tá nhé.',
        idealAnswer: 'Dạ em chuyển thông tin cho chuyên viên CSKH hỗ trợ anh đổi địa chỉ với bưu tá nhé.',
        isTrained: false,
        date: '12/06/2026',
        category: 'handover'
      },
      {
        priority: 'low',
        id: '12435',
        agentId: 'agent-2',
        agentName: 'Chuyên viên Da liễu Smax',
        customer: 'Hoàng Mai Phương',
        phone: '0945678123',
        channel: 'WhatsApp',
        aiStatus: 'Hoàn thành tự động',
        outcome: 'Đã chốt',
        satisfaction: 'Hài lòng',
        leadScore: { score: 92, level: 'hot' },
        reasons: ['Đã chốt đơn', 'Hoàn thành tự động'],
        summary: 'Khách chốt Combo Trị mụn B5 và nhận mã QR VietQR chuyển khoản.',
        userQuery: 'Tư vấn cho mình combo trị mụn cho da dầu nhé.',
        aiAnswer: 'Dạ combo chuẩn gồm Sữa rửa mặt tràm trà + Serum B5 + Kem dưỡng ẩm Centella trị mụn phục hồi ạ.',
        idealAnswer: 'Dạ combo chuẩn gồm Sữa rửa mặt tràm trà + Serum B5 + Kem dưỡng ẩm Centella trị mụn phục hồi ạ.',
        isTrained: false,
        date: '12/06/2026',
        category: 'closed'
      },
      {
        priority: 'medium',
        id: '12430',
        agentId: 'agent-1',
        agentName: 'Trợ lý Tư vấn Thời trang Smax',
        customer: 'Phạm Đức Thắng',
        phone: '0967890123',
        channel: 'Inbox',
        aiStatus: 'Chưa xử lý được',
        outcome: 'Không',
        satisfaction: 'Không đánh giá',
        leadScore: { score: 20, level: 'cold' },
        reasons: ['AI trả lời lỗi', 'Chưa chốt đơn'],
        summary: 'AI gửi nhầm liên kết sản phẩm áo nữ cho khách hỏi áo khoác dù nam.',
        userQuery: 'Cho mình xem mẫu áo khoác dù 2 lớp chống nước cho nam.',
        aiAnswer: 'Dạ shop gửi bạn xem mẫu Váy Đầm Công Sở Nữ Chữ A đang giảm 20% ạ.',
        idealAnswer: 'Dạ shop gửi anh Thắng xem mẫu Áo Khoác Dù 2 Lớp Nam Kháng Nước Cao Cấp (Màu Đen / Rêu) giá 399.000₫ ạ!',
        ruleNote: 'Khách hỏi đồ Nam phải trả lời đúng danh mục Áo Khoác Nam.',
        isTrained: true,
        trainedCorrection: 'Dạ shop gửi anh Thắng xem mẫu Áo Khoác Dù 2 Lớp Nam Kháng Nước Cao Cấp...',
        date: '11/06/2026',
        category: 'error'
      }
    ];

    // Tab 3 Mock Data: Few-Shot Q&A Overrides (Danh sách câu hỏi đã huấn luyện)
    this.responseCorrectionsList = [
      {
        id: 'cor-101',
        agentId: 'agent-1',
        agentName: 'Trợ lý Thời trang Smax',
        userQuery: 'Shop có freeship đơn hàng đi tỉnh Đà Nẵng không?',
        idealAnswer: 'Dạ bên em Freeship cho đơn hàng từ 500k toàn quốc ạ. Đơn dưới 500k phí ship đồng giá 25k anh/chị nha!',
        ruleNote: 'Chỉ miễn phí vận chuyển cho đơn từ 500.000đ trở lên.',
        source: 'log',
        sourceLogId: '12454',
        status: 'active',
        createdAt: '13/06/2026 14:20',
        createdBy: 'tuannt160990'
      },
      {
        id: 'cor-102',
        agentId: 'agent-1',
        agentName: 'Trợ lý Thời trang Smax',
        userQuery: 'Cho mình xem mẫu áo khoác dù 2 lớp chống nước cho nam.',
        idealAnswer: 'Dạ shop gửi anh Thắng xem mẫu Áo Khoác Dù 2 Lớp Nam Kháng Nước Cao Cấp (Màu Đen / Rêu) giá 399.000₫ ạ!',
        ruleNote: 'Khách hỏi đồ Nam phải trả lời đúng danh mục Áo Khoác Nam.',
        source: 'log',
        sourceLogId: '12430',
        status: 'active',
        createdAt: '11/06/2026 10:15',
        createdBy: 'tuannt160990'
      },
      {
        id: 'cor-103',
        agentId: 'agent-2',
        agentName: 'Chuyên viên Da liễu Smax',
        userQuery: 'Da mình đang dùng Retinol 0.5% thì thoa Serum B5 trước hay sau?',
        idealAnswer: 'Dạ theo nguyên tắc lỏng trước đặc sau: Bạn nên thoa Serum B5 phục hồi trước trên nền da ẩm, đợi ráo 10-15 phút rồi thoa Retinol 0.5% và khóa ẩm bằng kem dưỡng để hạn chế kích ứng ạ!',
        ruleNote: 'Nguyên tắc skincare: Serum B5 trước -> Đợi 15p -> Retinol -> Khóa ẩm.',
        source: 'log',
        sourceLogId: '12445',
        status: 'active',
        createdAt: '12/06/2026 09:30',
        createdBy: 'tuannt160990'
      },
      {
        id: 'cor-104',
        agentId: 'agent-1',
        agentName: 'Trợ lý Thời trang Smax',
        userQuery: 'Áo polo màu xanh navy với màu đen màu nào dễ phối đồ hơn?',
        idealAnswer: 'Dạ màu Xanh Navy là tone màu best-seller bên em vì rất tôn da và lịch lãm, còn màu Đen thì basic dễ phối với mọi loại quần tây, jean hoặc kaki ạ!',
        ruleNote: 'Tư vấn so sánh màu sắc chi tiết, tôn vinh cả 2 màu.',
        source: 'log',
        sourceLogId: '12451',
        status: 'active',
        createdAt: '13/06/2026 16:10',
        createdBy: 'tuannt160990'
      },
      {
        id: 'cor-105',
        agentId: 'agent-3',
        agentName: 'Trợ lý Đặt Món Trà Sữa',
        userQuery: 'Quán có cho đổi độ ngọt 0% đường và ít đá không?',
        idealAnswer: 'Dạ quán có hỗ trợ tùy chỉnh 0% / 30% / 50% / 70% / 100% đường và đá riêng theo sở thích của bạn hoàn toàn miễn phí ạ!',
        ruleNote: 'Hỗ trợ tùy chỉnh định lượng đường đá.',
        source: 'manual',
        status: 'active',
        createdAt: '10/06/2026 11:00',
        createdBy: 'tuannt160990'
      },
      {
        id: 'cor-106',
        agentId: 'agent-4',
        agentName: 'Chuyên viên Bất Động Sản',
        userQuery: 'Căn hộ 2 phòng ngủ bàn giao có full nội thất bếp không?',
        idealAnswer: 'Dạ căn hộ 2PN bàn giao tiêu chuẩn cao cấp gồm tủ bếp trên dưới An Cường, bếp từ Hafele, máy hút mùi và thiết bị vệ sinh Kohler nhập khẩu ạ!',
        ruleNote: 'Tiêu chuẩn bàn giao nội thất gắn tường cao cấp.',
        source: 'manual',
        status: 'active',
        createdAt: '09/06/2026 15:40',
        createdBy: 'tuannt160990'
      }
    ];`;

code = code.replace(logDataTarget, logDataReplacement);

// 2. Update renderLogTable to render Action column with Teach AI button
const renderLogTableTarget = `      tr.innerHTML = \`
        <td style="text-align: center;">\${priorityBadge}</td>
        <td><strong style="color: #0f1835; font-family: monospace;">\${item.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #0f1835;">\${item.customer}</div>
          <div style="font-size: 11px; color: #787b83; font-family: monospace;">\${item.phone}</div>
        </td>
        <td><span style="font-size: 11.5px; font-weight: 600; color: #475569;">\${item.channel}</span></td>
        <td><span style="font-size: 12px; color: #0f1835;">\${item.aiStatus}</span></td>
        <td><span style="font-size: 12px; color: #475569;">\${item.outcome}</span></td>
        <td><span style="font-size: 12px; color: #787b83;">\${item.satisfaction}</span></td>
        <td>\${leadBadge}</td>
        <td>\${reasonTags}</td>
        <td style="max-width: 260px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="\${item.summary}">
          <span style="color: #334155;">\${item.summary}</span>
        </td>
        <td style="font-size: 11.5px; color: #787b83; white-space: nowrap;">\${item.date}</td>
      \`;`;

const renderLogTableReplacement = `      // Action Column: Teach AI Button / Trained Badge
      let actionBtnHtml = '';
      if (item.isTrained) {
        actionBtnHtml = \`
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 100px; display: inline-flex; align-items: center; gap: 4px;">
              <span>✓</span> Đã Huấn Luyện
            </span>
            <button class="smax-icon-btn" title="Chỉnh sửa câu trả lời đã huấn luyện" onclick="tabsApp.openTeachAiModal('\${item.id}')" style="width: 24px; height: 24px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
          </div>
        \`;
      } else {
        actionBtnHtml = \`
          <button class="smax-btn-pill-primary" style="padding: 4px 10px; font-size: 11.5px; font-weight: 600; white-space: nowrap; box-shadow: none;" onclick="tabsApp.openTeachAiModal('\${item.id}')">
            <span>Dạy AI câu này</span>
          </button>
        \`;
      }

      tr.innerHTML = \`
        <td style="text-align: center;">\${priorityBadge}</td>
        <td><strong style="color: #0f1835; font-family: monospace;">\${item.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #0f1835;">\${item.customer}</div>
          <div style="font-size: 11px; color: #787b83; font-family: monospace;">\${item.phone}</div>
        </td>
        <td><span style="font-size: 11.5px; font-weight: 600; color: #475569;">\${item.channel}</span></td>
        <td><span style="font-size: 12px; color: #0f1835;">\${item.aiStatus}</span></td>
        <td><span style="font-size: 12px; color: #475569;">\${item.outcome}</span></td>
        <td><span style="font-size: 12px; color: #787b83;">\${item.satisfaction}</span></td>
        <td>\${leadBadge}</td>
        <td>\${reasonTags}</td>
        <td style="max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="\${item.summary}">
          <span style="color: #334155;">\${item.summary}</span>
        </td>
        <td style="font-size: 11.5px; color: #787b83; white-space: nowrap;">\${item.date}</td>
        <td style="text-align: center;">\${actionBtnHtml}</td>
      \`;`;

code = code.replace(renderLogTableTarget, renderLogTableReplacement);

// 3. Add Corrections methods and Teach AI Modal logic to TabsManager
const initTarget = `  init() {
    this.renderLogTable();
    this.renderKnowledgeSources();
    this.renderCatalogProducts();
    this.renderFanpageStats();
    this.renderLeadsTable();
    this.renderOrdersTable();
    this.setupEventListeners();
  }`;

const initReplacement = `  init() {
    this.renderLogTable();
    this.renderKnowledgeSources();
    this.renderCatalogProducts();
    this.renderCorrectionsTable();
    this.renderFanpageStats();
    this.renderLeadsTable();
    this.renderOrdersTable();
    this.setupEventListeners();
  }`;

code = code.replace(initTarget, initReplacement);

// 4. Append methods at the bottom of tabs.js
const endOfClassTarget = `  showToast(message) {`;

const methodsToAdd = `  // --- TAB 3: FEW-SHOT Q&A OVERRIDES (HUẤN LUYỆN & HIỆU CHỈNH CÂU TRẢ LỜI) ---
  renderCorrectionsTable(dataToRender = null) {
    const tbody = document.getElementById('correctionsTableBody');
    if (!tbody) return;

    const data = dataToRender || this.responseCorrectionsList;
    tbody.innerHTML = '';

    // Update mini stats
    const totalEl = document.getElementById('statTotalCorrections');
    const activeEl = document.getElementById('statActiveCorrections');
    const logEl = document.getElementById('statLogCorrections');
    if (totalEl) totalEl.innerText = \`\${this.responseCorrectionsList.length} cặp\`;
    if (activeEl) {
      const activeCount = this.responseCorrectionsList.filter(c => c.status === 'active').length;
      activeEl.innerText = \`\${activeCount} cặp (\${Math.round(activeCount / (this.responseCorrectionsList.length || 1) * 100)}%)\`;
    }
    if (logEl) {
      const logCount = this.responseCorrectionsList.filter(c => c.source === 'log').length;
      logEl.innerText = \`\${logCount} cặp\`;
    }

    if (data.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 24px; color: #94a3b8;">Không tìm thấy câu hỏi huấn luyện nào phù hợp.</td></tr>';
      return;
    }

    data.forEach(item => {
      const tr = document.createElement('tr');
      const isChecked = item.status === 'active' ? 'checked' : '';

      let sourceBadge = '';
      if (item.source === 'log') {
        sourceBadge = \`<span style="background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 100px; border: 1px solid #bfdbfe;">Log #\${item.sourceLogId || ''}</span>\`;
      } else {
        sourceBadge = '<span style="background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px;">Nhập tay</span>';
      }

      tr.innerHTML = \`
        <td>
          <div style="font-weight: 700; color: #0f1835; font-size: 13px; margin-bottom: 2px;">\${item.userQuery}</div>
          \${item.ruleNote ? \`<div style="font-size: 11.5px; color: #64748b; font-style: italic;">Quy tắc: \${item.ruleNote}</div>\` : ''}
        </td>
        <td>
          <div style="font-size: 12.5px; color: #064e3b; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 8px 12px; border-radius: 8px; line-height: 1.45;">
            \${item.idealAnswer}
          </div>
        </td>
        <td>
          <span style="font-weight: 600; color: #334155; font-size: 12px;">\${item.agentName}</span>
        </td>
        <td>\${sourceBadge}</td>
        <td style="text-align: center;">
          <label class="smax-switch" style="transform: scale(0.85); margin: 0 auto;">
            <input type="checkbox" \${isChecked} onchange="tabsApp.toggleCorrectionStatus('\${item.id}')">
            <span class="smax-slider"></span>
          </label>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
            <button class="smax-icon-btn" title="Chỉnh sửa câu trả lời" onclick="tabsApp.openEditCorrectionModal('\${item.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="smax-icon-btn" title="Xóa" onclick="tabsApp.deleteCorrection('\${item.id}')">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      \`;

      tbody.appendChild(tr);
    });
  }

  toggleCorrectionStatus(id) {
    const item = this.responseCorrectionsList.find(c => c.id === id);
    if (!item) return;
    item.status = item.status === 'active' ? 'inactive' : 'active';
    this.renderCorrectionsTable();
    this.showToast(\`Đã \${item.status === 'active' ? 'bật' : 'tắt'} áp dụng câu trả lời huấn luyện!\`);
  }

  deleteCorrection(id) {
    const item = this.responseCorrectionsList.find(c => c.id === id);
    if (!item) return;
    if (confirm(\`Bạn có chắc muốn xóa câu trả lời huấn luyện cho: "\${item.userQuery}"?\`)) {
      this.responseCorrectionsList = this.responseCorrectionsList.filter(c => c.id !== id);
      this.renderCorrectionsTable();
      this.showToast('Đã xóa câu hỏi huấn luyện thành công!');
    }
  }

  filterCorrectionsByAgent(agentId) {
    if (agentId === 'all') {
      this.renderCorrectionsTable(this.responseCorrectionsList);
      return;
    }
    const filtered = this.responseCorrectionsList.filter(c => c.agentId === agentId);
    this.renderCorrectionsTable(filtered);
  }

  filterCorrectionsTable(query) {
    if (!query) {
      this.renderCorrectionsTable(this.responseCorrectionsList);
      return;
    }
    const q = query.toLowerCase();
    const filtered = this.responseCorrectionsList.filter(c => {
      return (c.userQuery || '').toLowerCase().includes(q) ||
             (c.idealAnswer || '').toLowerCase().includes(q) ||
             (c.agentName || '').toLowerCase().includes(q) ||
             (c.ruleNote || '').toLowerCase().includes(q);
    });
    this.renderCorrectionsTable(filtered);
  }

  // --- TEACH AI MODAL (HUMAN-IN-THE-LOOP FEEDBACK) ---
  openTeachAiModal(logId, correctionId = null) {
    const backdrop = document.getElementById('teachAiModalBackdrop');
    if (!backdrop) return;

    const inputLogId = document.getElementById('inputTeachLogId');
    const inputCorrId = document.getElementById('inputTeachCorrectionId');
    const selectAgent = document.getElementById('selectTeachAgent');
    const textareaQuery = document.getElementById('textareaTeachUserQuery');
    const displayWrong = document.getElementById('displayTeachWrongAnswer');
    const groupWrong = document.getElementById('teachWrongAnswerGroup');
    const textareaIdeal = document.getElementById('textareaTeachIdealAnswer');
    const inputRule = document.getElementById('inputTeachRuleNote');

    if (inputLogId) inputLogId.value = logId || '';
    if (inputCorrId) inputCorrId.value = correctionId || '';

    if (logId) {
      const log = this.logData.find(l => l.id === logId);
      if (log) {
        if (selectAgent) selectAgent.value = log.agentId || 'agent-1';
        if (textareaQuery) textareaQuery.value = log.userQuery || log.summary || '';
        if (displayWrong) displayWrong.innerText = log.aiAnswer || log.summary || '';
        if (groupWrong) groupWrong.style.display = 'block';
        if (textareaIdeal) textareaIdeal.value = log.idealAnswer || log.trainedCorrection || '';
        if (inputRule) inputRule.value = log.ruleNote || '';
      }
    } else if (correctionId) {
      const item = this.responseCorrectionsList.find(c => c.id === correctionId);
      if (item) {
        if (selectAgent) selectAgent.value = item.agentId || 'agent-1';
        if (textareaQuery) textareaQuery.value = item.userQuery || '';
        if (groupWrong) groupWrong.style.display = 'none';
        if (textareaIdeal) textareaIdeal.value = item.idealAnswer || '';
        if (inputRule) inputRule.value = item.ruleNote || '';
      }
    } else {
      // Add new manual correction
      if (selectAgent) selectAgent.value = 'agent-1';
      if (textareaQuery) textareaQuery.value = '';
      if (groupWrong) groupWrong.style.display = 'none';
      if (textareaIdeal) textareaIdeal.value = '';
      if (inputRule) inputRule.value = '';
    }

    backdrop.classList.add('active');
  }

  openAddCorrectionModal() {
    this.openTeachAiModal(null, null);
  }

  openEditCorrectionModal(id) {
    this.openTeachAiModal(null, id);
  }

  closeTeachAiModal() {
    document.getElementById('teachAiModalBackdrop')?.classList.remove('active');
  }

  saveTeachAiCorrection() {
    const logId = document.getElementById('inputTeachLogId')?.value;
    const corrId = document.getElementById('inputTeachCorrectionId')?.value;
    const agentId = document.getElementById('selectTeachAgent')?.value || 'agent-1';
    const query = document.getElementById('textareaTeachUserQuery')?.value.trim();
    const ideal = document.getElementById('textareaTeachIdealAnswer')?.value.trim();
    const rule = document.getElementById('inputTeachRuleNote')?.value.trim();
    const saveToTab3 = document.getElementById('chkTeachSaveToTab3')?.checked;

    if (!query) {
      alert('Vui lòng nhập câu hỏi / tình huống của khách hàng!');
      return;
    }
    if (!ideal) {
      alert('Vui lòng nhập câu trả lời chuẩn mong muốn (Ground Truth)!');
      return;
    }

    const agentNames = {
      'agent-1': 'Trợ lý Thời trang Smax',
      'agent-2': 'Chuyên viên Da liễu Smax',
      'agent-3': 'Trợ lý Đặt Món Trà Sữa',
      'agent-4': 'Chuyên viên Bất Động Sản',
      'agent-5': 'Trợ lý Thẩm Mỹ & Spa'
    };

    // 1. If originated from a log row in Tab 2, update that log row
    if (logId) {
      const log = this.logData.find(l => l.id === logId);
      if (log) {
        log.isTrained = true;
        log.idealAnswer = ideal;
        log.ruleNote = rule;
        log.trainedCorrection = ideal;
      }
      this.renderLogTable();
    }

    // 2. Add or update in responseCorrectionsList (Tab 3)
    if (saveToTab3) {
      if (corrId) {
        const item = this.responseCorrectionsList.find(c => c.id === corrId);
        if (item) {
          item.agentId = agentId;
          item.agentName = agentNames[agentId] || 'Trợ lý AI';
          item.userQuery = query;
          item.idealAnswer = ideal;
          item.ruleNote = rule;
        }
      } else {
        const newCorr = {
          id: 'cor-' + Date.now().toString().slice(-4),
          agentId: agentId,
          agentName: agentNames[agentId] || 'Trợ lý AI',
          userQuery: query,
          idealAnswer: ideal,
          ruleNote: rule,
          source: logId ? 'log' : 'manual',
          sourceLogId: logId || undefined,
          status: 'active',
          createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }),
          createdBy: 'tuannt160990'
        };
        this.responseCorrectionsList.unshift(newCorr);
      }
      this.renderCorrectionsTable();
    }

    this.closeTeachAiModal();
    this.showToast('Đã lưu & huấn luyện câu trả lời chuẩn cho AI thành công!');
  }

  showToast(message) {`;

code = code.replace(endOfClassTarget, methodsToAdd);

// 5. Add search event listener for corrections table
const searchListenerTarget = `    // Search in Orders Table (Tab 6)
    const ordersSearchInput = document.getElementById('ordersTableSearchInput');
    if (ordersSearchInput) {
      ordersSearchInput.addEventListener('input', (e) => {
        this.filterOrdersTable(e.target.value.toLowerCase());
      });
    }`;

const searchListenerReplacement = `    // Search in Orders Table (Tab 6)
    const ordersSearchInput = document.getElementById('ordersTableSearchInput');
    if (ordersSearchInput) {
      ordersSearchInput.addEventListener('input', (e) => {
        this.filterOrdersTable(e.target.value.toLowerCase());
      });
    }

    // Search in Few-Shot Corrections Table (Tab 3 Khối 4)
    const correctionsSearchInput = document.getElementById('correctionsTableSearchInput');
    if (correctionsSearchInput) {
      correctionsSearchInput.addEventListener('input', (e) => {
        this.filterCorrectionsTable(e.target.value.toLowerCase());
      });
    }`;

code = code.replace(searchListenerTarget, searchListenerReplacement);

fs.writeFileSync(tabsPath, code, 'utf8');
console.log('src/js/tabs.js updated with full Teach AI and Few-Shot Q&A Overrides logic successfully!');
