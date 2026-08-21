/**
 * Meta Business Agent Studio - Sidebar Tabs Extension Manager
 * Handles Tab 2 (Log Kiểm Soát AI), Tab 3 (Kho Tri Thức & Catalog), Tab 4 (Thống Kê & Báo Cáo)
 */

class TabsManager {
  constructor() {
    this.currentFilter = 'all';
    this.chartInstances = {};
    
    // Tab 2 Mock Data (10 Log Entries) with Questions and Ideal Corrections
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
    ];

    // Tab 3 Mock Data (Knowledge Sources)
    this.knowledgeSources = [
      {
        type: 'web',
        name: 'Landing Page & Trang Chủ Thương Hiệu',
        url: 'https://thuonghieu.vn/gioi-thieu',
        status: 'synced',
        statusText: 'Đã đồng bộ',
        lastUpdated: '2 giờ trước',
        itemsCount: '48 trang'
      },
      {
        type: 'sheet',
        name: 'Bảng Giá & Chính Sách T8/2026',
        url: 'https://docs.google.com/spreadsheets/d/1A.../edit',
        status: 'synced',
        statusText: 'Đã đồng bộ',
        lastUpdated: '30 phút trước',
        itemsCount: '156 sản phẩm'
      },
      {
        type: 'drive',
        name: 'Ảnh Mẫu & Lookbook Bộ Sưu Tập',
        url: 'https://drive.google.com/drive/folders/1B...',
        status: 'syncing',
        statusText: 'Đang cập nhật',
        lastUpdated: '1 ngày trước',
        itemsCount: '89 ảnh'
      },
      {
        type: 'shopee',
        name: 'Shopee Mall Official Store',
        url: 'https://shopee.vn/official_store',
        status: 'synced',
        statusText: 'Đã đồng bộ',
        lastUpdated: '4 giờ trước',
        itemsCount: '234 sản phẩm'
      },
      {
        type: 'faq',
        name: 'Bộ Câu Hỏi & Trả Lời Đổi Trả Bảo Hành',
        url: 'Nội bộ Smax Knowledge Base',
        status: 'synced',
        statusText: 'Đã đồng bộ',
        lastUpdated: '3 ngày trước',
        itemsCount: '23 câu FAQ'
      }
    ];

    // Tab 3 Catalog Products
    this.catalogProducts = [
      {
        id: 'SKU-001',
        name: 'Áo Polo Nam Classic Cotton Compact',
        price: '299.000₫',
        stock: 156,
        category: 'Thời trang nam',
        status: 'approved',
        statusText: 'Approved'
      },
      {
        id: 'SKU-002',
        name: 'Váy Đầm Công Sở Dáng Chữ A',
        price: '459.000₫',
        stock: 78,
        category: 'Thời trang nữ',
        status: 'approved',
        statusText: 'Approved'
      },
      {
        id: 'SKU-003',
        name: 'Serum Phục Hồi Da B5 Centella 50ml',
        price: '380.000₫',
        stock: 92,
        category: 'Mỹ phẩm & Chăm sóc da',
        status: 'approved',
        statusText: 'Approved'
      },
      {
        id: 'SKU-004',
        name: 'Giày Sneaker Trắng Đế Cao 4cm',
        price: '899.000₫',
        stock: 23,
        category: 'Giày dép & Phụ kiện',
        status: 'pending',
        statusText: 'Pending'
      },
      {
        id: 'SKU-005',
        name: 'Túi Xách Nữ Da Bò Thật Cao Cấp',
        price: '1.290.000₫',
        stock: 5,
        category: 'Túi xách',
        status: 'rejected',
        statusText: 'Rejected'
      },
      {
        id: 'SKU-006',
        name: 'Trà Sữa Trân Châu Đường Đen Size L',
        price: '55.000₫',
        stock: 999,
        category: 'Đồ uống & Trà sữa',
        status: 'approved',
        statusText: 'Approved'
      }
    ];

    // Tab 4 Fanpage Data
    this.fanpageStats = [
      {
        page: 'Thời Trang ABC Official',
        channel: 'Messenger',
        convs: '4.120',
        aiResolution: '84%',
        handoverRate: '8.2%',
        conversion: '9.1%',
        csat: '4.2/5'
      },
      {
        page: 'Thời Trang ABC Official',
        channel: 'WhatsApp',
        convs: '1.680',
        aiResolution: '86%',
        handoverRate: '7.8%',
        conversion: '10.2%',
        csat: '4.5/5'
      },
      {
        page: 'Mỹ Phẩm XYZ Store',
        channel: 'Messenger',
        convs: '3.450',
        aiResolution: '79%',
        handoverRate: '11.5%',
        conversion: '7.3%',
        csat: '3.9/5'
      },
      {
        page: 'Mỹ Phẩm XYZ Store',
        channel: 'WhatsApp',
        convs: '890',
        aiResolution: '81%',
        handoverRate: '9.4%',
        conversion: '8.1%',
        csat: '4.0/5'
      },
      {
        page: 'Spa Beauty Clinic & Academy',
        channel: 'Messenger',
        convs: '1.366',
        aiResolution: '78%',
        handoverRate: '13.2%',
        conversion: '6.5%',
        csat: '3.8/5'
      }
    ];

    // Tab 5 Mock Data: Quản Lý Leads (10 Entries)
    this.leadsData = [
      {
        id: 'L-1094',
        customer: 'Lê Văn An',
        phone: '0912345678',
        email: 'an.le@gmail.com',
        channel: 'FB Thời Trang Flagship',
        leadScore: { score: 88, level: 'hot' },
        product: 'Áo Polo Nam Classic (Navy)',
        needs: 'Mua đi làm công sở, cần ship gấp trước 17h',
        status: 'Đã chốt đơn',
        statusLevel: 'success',
        capi: 'Dataset Synced',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '13/06/2026',
        category: 'converted'
      },
      {
        id: 'L-1093',
        customer: 'Nguyễn Thu Hà',
        phone: '0988776655',
        email: 'thuha.beauty@gmail.com',
        channel: 'WA Smax Beauty',
        leadScore: { score: 92, level: 'hot' },
        product: 'Serum B5 + Kem Dưỡng Centella',
        needs: 'Da dầu mụn nhạy cảm, nhờ chuyên viên tư vấn phục hồi',
        status: 'Đang tư vấn',
        statusLevel: 'warning',
        capi: 'Dataset Synced',
        agent: 'Chuyên viên Da liễu Smax',
        date: '13/06/2026',
        category: 'hot'
      },
      {
        id: 'L-1092',
        customer: 'Trần Minh Quang',
        phone: '0903456789',
        email: 'quang.tran@bds.vn',
        channel: 'FB Smax Land BĐS',
        leadScore: { score: 65, level: 'warm' },
        product: 'Căn hộ 2PN Vinhomes Smart City',
        needs: 'Quan tâm chính sách vay ngân hàng 70%, ân hạn 2 năm',
        status: 'Chưa liên hệ',
        statusLevel: 'neutral',
        capi: 'Dataset Synced',
        agent: 'Cố vấn BĐS Smax Land',
        date: '13/06/2026',
        category: 'warm'
      },
      {
        id: 'L-1091',
        customer: 'Hoàng Bảo Ngọc',
        phone: '0945678123',
        email: 'ngoc.hoang@milky.vn',
        channel: 'IG Trà Sữa Milky',
        leadScore: { score: 78, level: 'hot' },
        product: 'Combo 5 Trà Sữa Trân Châu Size L',
        needs: 'Đặt tiệc sinh nhật cho văn phòng, cần hóa đơn đỏ VAT',
        status: 'Đã chốt đơn',
        statusLevel: 'success',
        capi: 'Dataset Synced',
        agent: 'Trợ lý Đặt Món Trà Sữa',
        date: '13/06/2026',
        category: 'converted'
      },
      {
        id: 'L-1090',
        customer: 'Phan Thùy Dung',
        phone: '0978961203',
        email: 'dung.thuy@spa.com',
        channel: 'FB Thẩm Mỹ Smax Care',
        leadScore: { score: 85, level: 'hot' },
        product: 'Gói Trị Liệu Trẻ Hóa Da Hifu 9D',
        needs: 'Đặt lịch trải nghiệm thử cuối tuần tại chi nhánh Quận 1',
        status: 'Đang tư vấn',
        statusLevel: 'warning',
        capi: 'Dataset Synced',
        agent: 'Trợ lý Thẩm Mỹ & Spa',
        date: '12/06/2026',
        category: 'hot'
      },
      {
        id: 'L-1089',
        customer: 'Đặng Quốc Huy',
        phone: '0934567890',
        email: 'huy.dang@yahoo.com',
        channel: 'FB Thời Trang Flagship',
        leadScore: { score: 58, level: 'warm' },
        product: 'Áo Khoác Gió Nam Chống Nước',
        needs: 'Hỏi bảng size cho người 1m75 nặng 78kg',
        status: 'Chưa liên hệ',
        statusLevel: 'neutral',
        capi: 'Dataset Synced',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '12/06/2026',
        category: 'warm'
      },
      {
        id: 'L-1088',
        customer: 'Vũ Thanh Thảo',
        phone: '0967890123',
        email: 'thao.vu@gmail.com',
        channel: 'WA Smax Beauty',
        leadScore: { score: 25, level: 'cold' },
        product: 'Son Dưỡng Có Màu Tint Lip',
        needs: 'Chỉ hỏi thăm giá sale và so sánh với shop khác',
        status: 'Chưa liên hệ',
        statusLevel: 'neutral',
        capi: 'Dataset Synced',
        agent: 'Chuyên viên Da liễu Smax',
        date: '12/06/2026',
        category: 'cold'
      },
      {
        id: 'L-1087',
        customer: 'Bùi Tuấn Kiệt',
        phone: '0918273645',
        email: 'kiet.bui@tech.com',
        channel: 'FB Smax Land BĐS',
        leadScore: { score: 32, level: 'cold' },
        product: 'Đất Nền Biệt Thự Nghỉ Dưỡng',
        needs: 'Khách khảo sát giá thị trường, chưa có kế hoạch mua',
        status: 'Chưa liên hệ',
        statusLevel: 'neutral',
        capi: 'Dataset Synced',
        agent: 'Cố vấn BĐS Smax Land',
        date: '11/06/2026',
        category: 'cold'
      },
      {
        id: 'L-1086',
        customer: 'Lâm Ngọc Hân',
        phone: '0922334455',
        email: 'han.lam@outlook.com',
        channel: 'IG Trà Sữa Milky',
        leadScore: { score: 95, level: 'hot' },
        product: 'Trà Sữa Khoai Môn Kem Cheese',
        needs: 'Giao ngay 3 ly kèm voucher freeship 25k',
        status: 'Đã chốt đơn',
        statusLevel: 'success',
        capi: 'Dataset Synced',
        agent: 'Trợ lý Đặt Món Trà Sữa',
        date: '11/06/2026',
        category: 'converted'
      },
      {
        id: 'L-1085',
        customer: 'Trịnh Quốc Bảo',
        phone: '0933445566',
        email: 'bao.trinh@gmail.com',
        channel: 'FB Thời Trang Flagship',
        leadScore: { score: 62, level: 'warm' },
        product: 'Quần Khaki Slimfit Co Giãn',
        needs: 'Hỏi xem shop có màu đen size 32 không để qua thử',
        status: 'Đang tư vấn',
        statusLevel: 'warning',
        capi: 'Dataset Synced',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '11/06/2026',
        category: 'warm'
      }
    ];

    // Tab 6 Mock Data: Quản Lý Đơn Hàng (10 Entries)
    this.ordersData = [
      {
        id: '#123456789',
        customer: 'Lê Văn An',
        phone: '0912345678',
        address: '45 Cầu Giấy, P. Dịch Vọng, Q. Cầu Giấy, Hà Nội',
        items: 'Áo Polo Nam Classic (x2)',
        total: '598.000₫',
        payment: 'COD (Thanh toán khi nhận)',
        source: 'Webview Form',
        status: 'Đã đẩy POS',
        statusLevel: 'info',
        pos: 'Haravan POS',
        capi: 'Purchase (8.7/10)',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '13/06/2026',
        category: 'pos_synced'
      },
      {
        id: '#123456788',
        customer: 'Hoàng Bảo Ngọc',
        phone: '0945678123',
        address: 'Tòa Landmark 81, 720A Điện Biên Phủ, P. 22, Bình Thạnh, TP.HCM',
        items: 'Combo 5 Trà Sữa Trân Châu (x1)',
        total: '275.000₫',
        payment: 'VietQR (Đã chuyển khoản)',
        source: 'Webview Form',
        status: 'Đang giao',
        statusLevel: 'warning',
        pos: 'Smax POS',
        capi: 'Purchase (8.9/10)',
        agent: 'Trợ lý Đặt Món Trà Sữa',
        date: '13/06/2026',
        category: 'shipping'
      },
      {
        id: '#123456787',
        customer: 'Lâm Ngọc Hân',
        phone: '0922334455',
        address: '120 Nguyễn Huệ, P. Bến Nghé, Quận 1, TP.HCM',
        items: 'Trà Sữa Khoai Môn Cheese (x3)',
        total: '165.000₫',
        payment: 'COD (Thanh toán khi nhận)',
        source: 'AI Direct Chat',
        status: 'Hoàn thành',
        statusLevel: 'success',
        pos: 'Smax POS',
        capi: 'Purchase (9.0/10)',
        agent: 'Trợ lý Đặt Món Trà Sữa',
        date: '12/06/2026',
        category: 'completed'
      },
      {
        id: '#123456786',
        customer: 'Nguyễn Thu Hà',
        phone: '0988776655',
        address: '18 Hai Bà Trưng, P. Tràng Tiền, Hoàn Kiếm, Hà Nội',
        items: 'Serum B5 + Kem Dưỡng Centella (x1)',
        total: '760.000₫',
        payment: 'VietQR (Đã chuyển khoản)',
        source: 'Webview Form',
        status: 'Đã đẩy POS',
        statusLevel: 'info',
        pos: 'Sapo POS',
        capi: 'Purchase (8.5/10)',
        agent: 'Chuyên viên Da liễu Smax',
        date: '12/06/2026',
        category: 'pos_synced'
      },
      {
        id: '#123456785',
        customer: 'Trần Văn Hoàng',
        phone: '0912345678',
        address: '88 Lê Lợi, P. Thạch Thang, Q. Hải Châu, Đà Nẵng',
        items: 'Váy Đầm Công Sở Chữ A (x1)',
        total: '459.000₫',
        payment: 'COD (Thanh toán khi nhận)',
        source: 'Webview Form',
        status: 'Đang giao',
        statusLevel: 'warning',
        pos: 'KiotViet',
        capi: 'Purchase (8.6/10)',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '12/06/2026',
        category: 'shipping'
      },
      {
        id: '#123456784',
        customer: 'Phan Thùy Dung',
        phone: '0978961203',
        address: 'Chi nhánh Smax Care Q1, TP.HCM',
        items: 'Đặt cọc Gói Trẻ Hóa Hifu 9D (x1)',
        total: '500.000₫',
        payment: 'VietQR (Đã chuyển khoản)',
        source: 'Webview Form',
        status: 'Hoàn thành',
        statusLevel: 'success',
        pos: 'Smax POS',
        capi: 'Purchase (9.2/10)',
        agent: 'Trợ lý Thẩm Mỹ & Spa',
        date: '11/06/2026',
        category: 'completed'
      },
      {
        id: '#123456783',
        customer: 'Phạm Đức Thắng',
        phone: '0967890123',
        address: '25 Lý Thường Kiệt, TP. Hải Phòng',
        items: 'Áo Khoác Gió Nam (x1)',
        total: '399.000₫',
        payment: 'COD (Thanh toán khi nhận)',
        source: 'AI Direct Chat',
        status: 'Đã hủy',
        statusLevel: 'danger',
        pos: 'Haravan POS',
        capi: 'Refund Event',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '11/06/2026',
        category: 'cancelled'
      },
      {
        id: '#123456782',
        customer: 'Trịnh Quốc Bảo',
        phone: '0933445566',
        address: '56 Trần Hưng Đạo, P. 7, Quận 5, TP.HCM',
        items: 'Quần Khaki Slimfit Đen (x1)',
        total: '350.000₫',
        payment: 'COD (Thanh toán khi nhận)',
        source: 'Webview Form',
        status: 'Mới tạo',
        statusLevel: 'neutral',
        pos: 'Chờ đồng bộ',
        capi: 'Đang xử lý',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '11/06/2026',
        category: 'new'
      },
      {
        id: '#123456781',
        customer: 'Vũ Thị Lan',
        phone: '0934567890',
        address: '99 Quang Trung, P. 10, Q. Gò Vấp, TP.HCM',
        items: 'Serum Trị Mụn B5 50ml (x2)',
        total: '760.000₫',
        payment: 'VietQR (Đã chuyển khoản)',
        source: 'Webview Form',
        status: 'Đang giao',
        statusLevel: 'warning',
        pos: 'Sapo POS',
        capi: 'Purchase (8.8/10)',
        agent: 'Chuyên viên Da liễu Smax',
        date: '10/06/2026',
        category: 'shipping'
      },
      {
        id: '#123456780',
        customer: 'Đào Hoa Anh',
        phone: '0978961203',
        address: '15 Hoàng Hoa Thám, P. 13, Tân Bình, TP.HCM',
        items: 'Giày Sneaker Trắng 4cm (x1)',
        total: '899.000₫',
        payment: 'COD (Thanh toán khi nhận)',
        source: 'Webview Form',
        status: 'Hoàn thành',
        statusLevel: 'success',
        pos: 'Haravan POS',
        capi: 'Purchase (9.1/10)',
        agent: 'Trợ lý Tư vấn Thời trang',
        date: '10/06/2026',
        category: 'completed'
      }
    ];
  }

  init() {
    this.renderLogTable();
    this.renderKnowledgeSources();
    this.renderCatalogProducts();
    this.renderCorrectionsTable();
    this.renderFanpageStats();
    this.renderLeadsTable();
    this.renderOrdersTable();
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Search in Log Table (Tab 2)
    const logSearchInput = document.getElementById('logTableSearchInput');
    if (logSearchInput) {
      logSearchInput.addEventListener('input', (e) => {
        this.filterLogTable(e.target.value.toLowerCase());
      });
    }

    // Search in Leads Table (Tab 5)
    const leadsSearchInput = document.getElementById('leadsTableSearchInput');
    if (leadsSearchInput) {
      leadsSearchInput.addEventListener('input', (e) => {
        this.filterLeadsTable(e.target.value.toLowerCase());
      });
    }

    // Search in Orders Table (Tab 6)
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
    }

    // Filter pills in Tab 2
    document.querySelectorAll('.smax-log-filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        document.querySelectorAll('.smax-log-filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const filterType = btn.getAttribute('data-filter') || 'all';
        this.filterLogByCategory(filterType);
      });
    });

    // Filter pills in Tab 5 (Leads)
    document.querySelectorAll('.smax-leads-filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        document.querySelectorAll('.smax-leads-filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const filterType = btn.getAttribute('data-filter') || 'all';
        this.filterLeadsByCategory(filterType);
      });
    });

    // Filter pills in Tab 6 (Orders)
    document.querySelectorAll('.smax-orders-filter-pill').forEach(pill => {
      pill.addEventListener('click', (e) => {
        const btn = e.currentTarget;
        document.querySelectorAll('.smax-orders-filter-pill').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const filterType = btn.getAttribute('data-filter') || 'all';
        this.filterOrdersByCategory(filterType);
      });
    });
  }

  renderLogTable(dataToRender = null) {
    const tbody = document.getElementById('aiLogTableBody');
    if (!tbody) return;

    const data = dataToRender || this.logData;
    tbody.innerHTML = '';

    data.forEach(item => {
      const tr = document.createElement('tr');

      // Priority badge
      let priorityBadge = '';
      if (item.priority === 'high') priorityBadge = '<span class="smax-badge-priority high">Cao</span>';
      else if (item.priority === 'medium') priorityBadge = '<span class="smax-badge-priority medium">TB</span>';
      else priorityBadge = '<span class="smax-badge-priority low">Thấp</span>';

      // Lead score badge
      let leadBadge = '';
      if (item.leadScore.level === 'hot') {
        leadBadge = `<span class="smax-badge-lead-score hot">${item.leadScore.score} Hot</span>`;
      } else if (item.leadScore.level === 'warm') {
        leadBadge = `<span class="smax-badge-lead-score warm">${item.leadScore.score} Warm</span>`;
      } else {
        leadBadge = `<span class="smax-badge-lead-score cold">${item.leadScore.score} Cold</span>`;
      }

      // Reason tags
      const reasonTags = item.reasons.map(r => `<span class="smax-tag-chip">${r}</span>`).join(' ');

      // Action Column: Teach AI Button / Trained Badge
      let actionBtnHtml = '';
      if (item.isTrained) {
        actionBtnHtml = `
          <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
            <span style="background: #dcfce7; color: #15803d; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 100px; display: inline-flex; align-items: center; gap: 4px;">
              <span>✓</span> Đã Huấn Luyện
            </span>
            <button class="smax-icon-btn" title="Chỉnh sửa câu trả lời đã huấn luyện" onclick="tabsApp.openTeachAiModal('${item.id}')" style="width: 24px; height: 24px;">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
          </div>
        `;
      } else {
        actionBtnHtml = `
          <button class="smax-btn-pill-primary" style="padding: 4px 10px; font-size: 11.5px; font-weight: 600; white-space: nowrap; box-shadow: none;" onclick="tabsApp.openTeachAiModal('${item.id}')">
            <span>Dạy AI câu này</span>
          </button>
        `;
      }

      tr.innerHTML = `
        <td style="text-align: center;">${priorityBadge}</td>
        <td><strong style="color: #0f1835; font-family: monospace;">${item.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #0f1835;">${item.customer}</div>
          <div style="font-size: 11px; color: #787b83; font-family: monospace;">${item.phone}</div>
        </td>
        <td><span style="font-size: 11.5px; font-weight: 600; color: #475569;">${item.channel}</span></td>
        <td><span style="font-size: 12px; color: #0f1835;">${item.aiStatus}</span></td>
        <td><span style="font-size: 12px; color: #475569;">${item.outcome}</span></td>
        <td><span style="font-size: 12px; color: #787b83;">${item.satisfaction}</span></td>
        <td>${leadBadge}</td>
        <td>${reasonTags}</td>
        <td style="max-width: 240px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.summary}">
          <span style="color: #334155;">${item.summary}</span>
        </td>
        <td style="font-size: 11.5px; color: #787b83; white-space: nowrap;">${item.date}</td>
        <td style="text-align: center;">${actionBtnHtml}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  filterLogByCategory(category) {
    document.querySelectorAll('.smax-log-filter-pill').forEach(p => {
      p.classList.toggle('active', p.getAttribute('data-filter') === category);
    });

    if (category === 'all') {
      this.renderLogTable(this.logData);
      return;
    }

    const filtered = this.logData.filter(item => {
      if (category === 'closed') return item.outcome === 'Đã chốt' || item.category === 'closed';
      if (category === 'unresolved') return item.aiStatus.includes('Chưa xử lý') || item.category === 'unresolved';
      if (category === 'difficult') return item.reasons.some(r => r.includes('khó')) || item.category === 'difficult';
      if (category === 'unhappy') return item.satisfaction.includes('Không hài lòng') || item.category === 'unhappy';
      if (category === 'handover') return item.aiStatus.includes('Escalate') || item.reasons.some(r => r.includes('can thiệp')) || item.category === 'handover';
      if (category === 'error') return item.reasons.some(r => r.includes('lỗi')) || item.category === 'error';
      if (category === 'processed') return item.aiStatus.includes('Hoàn thành') || item.outcome === 'Đã chốt';
      return true;
    });

    this.renderLogTable(filtered);
  }

  filterLogTable(query) {
    if (!query) {
      this.renderLogTable(this.logData);
      return;
    }

    const filtered = this.logData.filter(item => {
      return item.customer.toLowerCase().includes(query) ||
             item.phone.includes(query) ||
             item.id.includes(query) ||
             item.summary.toLowerCase().includes(query) ||
             item.aiStatus.toLowerCase().includes(query);
    });

    this.renderLogTable(filtered);
  }

  renderKnowledgeSources() {
    const tbody = document.getElementById('knowledgeSourcesTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    this.knowledgeSources.forEach(src => {
      const tr = document.createElement('tr');

      // Status Badge
      let statusBadge = '';
      if (src.status === 'synced') {
        statusBadge = '<span style="color: #10b981; font-weight: 700; font-size: 12px;">Đã đồng bộ</span>';
      } else {
        statusBadge = '<span style="color: #f59e0b; font-weight: 700; font-size: 12px;">Đang cập nhật</span>';
      }

      // Type Badge
      let typeBadge = '';
      if (src.type === 'web') {
        typeBadge = '<span class="smax-source-badge web"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg> WEB</span>';
      } else if (src.type === 'sheet') {
        typeBadge = '<span class="smax-source-badge sheet"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line></svg> SHEET</span>';
      } else if (src.type === 'drive') {
        typeBadge = '<span class="smax-source-badge drive"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg> DRIVE</span>';
      } else if (src.type === 'shopee') {
        typeBadge = '<span class="smax-source-badge shopee"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg> SHOPEE</span>';
      } else {
        typeBadge = '<span class="smax-source-badge faq"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg> FAQ</span>';
      }

      // SVG action icons
      const syncSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>';
      const editSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>';
      const deleteSvg = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';

      tr.innerHTML = `
        <td>${typeBadge}</td>
        <td><strong style="color: #0f1835;">${src.name}</strong></td>
        <td><a href="#" style="color: #1877f2; text-decoration: none; font-size: 12px; max-width: 200px; display: inline-block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${src.url}">${src.url}</a></td>
        <td>${statusBadge}</td>
        <td style="font-size: 12px; color: #787b83;">${src.lastUpdated}</td>
        <td><strong style="color: #0f1835; font-size: 12.5px;">${src.itemsCount}</strong></td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="smax-row-action-btn btn-sync" title="Đồng bộ lại" onclick="tabsApp.showToast('Đang bắt đầu đồng bộ lại dữ liệu: ${src.name}...')">${syncSvg}</button>
            <button class="smax-row-action-btn" title="Chỉnh sửa" onclick="tabsApp.showToast('Mở cấu hình nguồn dữ liệu: ${src.name}')">${editSvg}</button>
            <button class="smax-row-action-btn btn-delete" title="Xóa" onclick="tabsApp.showToast('Nguồn dữ liệu đã được lưu')">${deleteSvg}</button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  renderCatalogProducts() {
    const tbody = document.getElementById('catalogProductsTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    this.catalogProducts.forEach(prod => {
      const tr = document.createElement('tr');

      let statusBadge = '';
      if (prod.status === 'approved') {
        statusBadge = '<span style="background: #e6f9f0; color: #10b981; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 11.5px;">Approved</span>';
      } else if (prod.status === 'pending') {
        statusBadge = '<span style="background: #fffbeb; color: #d97706; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 11.5px;">Pending</span>';
      } else {
        statusBadge = '<span style="background: #fee2e2; color: #ef4444; padding: 3px 8px; border-radius: 6px; font-weight: 700; font-size: 11.5px;">Rejected</span>';
      }

      tr.innerHTML = `
        <td style="width: 50px;">
          <div style="width: 38px; height: 38px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-size: 18px;">
            
          </div>
        </td>
        <td>
          <strong style="color: #0f1835;">${prod.name}</strong>
          <div style="font-size: 11px; color: #787b83; font-family: monospace;">${prod.id}</div>
        </td>
        <td><strong style="color: #eb6553; font-size: 13px;">${prod.price}</strong></td>
        <td><span style="font-weight: 600; color: #0f1835;">${prod.stock}</span></td>
        <td><span style="font-size: 12px; color: #475569;">${prod.category}</span></td>
        <td>${statusBadge}</td>
      `;

      tbody.appendChild(tr);
    });
  }

  renderFanpageStats() {
    const tbody = document.getElementById('analyticsFanpageTableBody');
    if (!tbody) return;

    tbody.innerHTML = '';
    this.fanpageStats.forEach(fp => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><strong style="color: #0f1835;">${fp.page}</strong></td>
        <td><span style="font-weight: 600; color: #475569; font-size: 12.5px;">${fp.channel}</span></td>
        <td><strong style="color: #0f1835;">${fp.convs}</strong></td>
        <td><span style="color: #10b981; font-weight: 700;">${fp.aiResolution}</span></td>
        <td><span style="color: #eb6553; font-weight: 600;">${fp.handoverRate}</span></td>
        <td><strong style="color: #0f1835;">${fp.conversion}</strong></td>
        <td><span style="background: #f1f5f9; padding: 3px 8px; border-radius: 6px; font-weight: 700; color: #f59e0b;">${fp.csat}</span></td>
      `;
      tbody.appendChild(tr);
    });
  }

  toggleAccordion(headerElem) {
    const item = headerElem.closest('.smax-accordion-item');
    if (!item) return;
    item.classList.toggle('open');
  }

  initTab2Chart() {
    const canvas = document.getElementById('aiLogTrendChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.chartInstances['aiLogTrend']) {
      this.chartInstances['aiLogTrend'].destroy();
    }

    const labels = [
      '12-04', '14-04', '16-04', '18-04', '20-04', '22-04', '24-04', '26-04', '28-04', '30-04',
      '02-05', '04-05', '06-05', '08-05', '10-05', '12-05', '14-05', '16-05', '18-05', '20-05',
      '22-05', '24-05', '26-05', '28-05', '30-05', '02-06', '04-06', '06-06', '08-06', '10-06', '13-06'
    ];

    const ctx = canvas.getContext('2d');
    this.chartInstances['aiLogTrend'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Chưa chốt đơn',
            data: [85, 260, 220, 320, 350, 60, 70, 140, 150, 240, 170, 160, 130, 120, 190, 160, 140, 90, 110, 100, 120, 110, 150, 200, 160, 230, 180, 140, 170, 200, 140],
            borderColor: '#eb6553',
            backgroundColor: 'rgba(235, 101, 83, 0.05)',
            borderWidth: 2.5,
            pointRadius: 2.5,
            pointHoverRadius: 5,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Cần người can thiệp',
            data: [15, 35, 45, 38, 120, 140, 15, 18, 30, 25, 50, 42, 30, 28, 22, 35, 40, 12, 18, 20, 15, 18, 25, 20, 28, 30, 22, 18, 24, 26, 20],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.35,
            fill: false
          },
          {
            label: 'Câu hỏi khó',
            data: [5, 12, 10, 8, 25, 30, 8, 10, 12, 15, 18, 12, 10, 8, 14, 12, 10, 5, 8, 7, 10, 12, 14, 18, 15, 16, 12, 10, 15, 14, 10],
            borderColor: '#f59e0b',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.35
          },
          {
            label: 'Khách không hài lòng',
            data: [3, 8, 5, 6, 15, 18, 4, 6, 8, 7, 12, 8, 6, 5, 10, 8, 7, 4, 5, 6, 8, 7, 9, 12, 10, 11, 8, 6, 10, 9, 6],
            borderColor: '#ef4444',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.35
          },
          {
            label: 'AI trả lời lỗi',
            data: [2, 5, 4, 3, 10, 12, 2, 4, 5, 4, 8, 5, 4, 3, 6, 5, 4, 2, 3, 4, 5, 4, 6, 8, 6, 7, 5, 4, 6, 5, 4],
            borderColor: '#1877f2',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.35
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              boxWidth: 8,
              padding: 18,
              font: { family: 'Roboto', size: 12 }
            }
          },
          tooltip: {
            backgroundColor: '#0f1835',
            titleFont: { family: 'Roboto', size: 12, weight: 'bold' },
            bodyFont: { family: 'Roboto', size: 11 },
            padding: 10,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { family: 'Roboto', size: 10 }, color: '#787b83' }
          },
          y: {
            grid: { color: '#f1f5f9' },
            ticks: { font: { family: 'Roboto', size: 10 }, color: '#787b83' }
          }
        }
      }
    });
  }

  initTab4Charts() {
    if (typeof Chart === 'undefined') return;

    // 1. CAPI Events Stacked Bar Chart
    const capiCanvas = document.getElementById('capiTrendChart');
    if (capiCanvas) {
      if (this.chartInstances['capiTrend']) {
        this.chartInstances['capiTrend'].destroy();
      }

      const ctx1 = capiCanvas.getContext('2d');
      this.chartInstances['capiTrend'] = new Chart(ctx1, {
        type: 'bar',
        data: {
          labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
          datasets: [
            {
              label: 'Event Purchase',
              data: [120, 145, 130, 160, 190, 210, 240],
              backgroundColor: '#eb6553',
              borderRadius: 4
            },
            {
              label: 'Event Lead',
              data: [450, 520, 480, 590, 680, 750, 810],
              backgroundColor: '#f59e0b',
              borderRadius: 4
            },
            {
              label: 'Match Quality (x100)',
              data: [820, 840, 830, 860, 880, 870, 890],
              type: 'line',
              borderColor: '#1877f2',
              borderWidth: 2,
              pointRadius: 3,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'top',
              labels: { boxWidth: 10, font: { family: 'Roboto', size: 11 } }
            }
          },
          scales: {
            x: { stacked: true, grid: { display: false } },
            y: { stacked: true, grid: { color: '#f1f5f9' } }
          }
        }
      });
    }

    // 2. Lead Score Distribution Donut Chart
    const leadScoreCanvas = document.getElementById('leadScoreDonutChart');
    if (leadScoreCanvas) {
      if (this.chartInstances['leadScoreDonut']) {
        this.chartInstances['leadScoreDonut'].destroy();
      }

      const ctx2 = leadScoreCanvas.getContext('2d');
      this.chartInstances['leadScoreDonut'] = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Hot (70-100)', 'Warm (40-69)', 'Cold (0-39)'],
          datasets: [
            {
              data: [762, 1903, 1565],
              backgroundColor: ['#eb6553', '#f59e0b', '#3b82f6'],
              borderWidth: 2,
              borderColor: '#ffffff'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { boxWidth: 10, padding: 12, font: { family: 'Roboto', size: 11 } }
            }
          }
        }
      });
    }
  }

  // --- TAB 5: QUẢN LÝ LEADS METHODS ---
  renderLeadsTable(dataToRender = null) {
    const tbody = document.getElementById('leadsTableBody');
    if (!tbody) return;

    const data = dataToRender || this.leadsData;
    tbody.innerHTML = '';

    data.forEach(item => {
      const tr = document.createElement('tr');

      // Lead Score Badge
      let leadBadge = '';
      if (item.leadScore.level === 'hot') {
        leadBadge = `<span class="smax-badge-lead-score hot">${item.leadScore.score} Hot</span>`;
      } else if (item.leadScore.level === 'warm') {
        leadBadge = `<span class="smax-badge-lead-score warm">${item.leadScore.score} Warm</span>`;
      } else {
        leadBadge = `<span class="smax-badge-lead-score cold">${item.leadScore.score} Cold</span>`;
      }

      // Status Badge
      let statusBadge = '';
      if (item.statusLevel === 'success') {
        statusBadge = `<span class="smax-badge-status success">${item.status}</span>`;
      } else if (item.statusLevel === 'warning') {
        statusBadge = `<span class="smax-badge-status warning">${item.status}</span>`;
      } else {
        statusBadge = `<span class="smax-badge-status neutral">${item.status}</span>`;
      }

      tr.innerHTML = `
        <td><strong style="color: #0f1835; font-family: monospace;">${item.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #0f1835;">${item.customer}</div>
          <div style="font-size: 11px; color: #787b83; font-family: monospace;">${item.phone} • ${item.email}</div>
        </td>
        <td><span style="font-size: 12px; font-weight: 600; color: #475569;">${item.channel}</span></td>
        <td>${leadBadge}</td>
        <td><strong style="color: #0f1835; font-size: 12px;">${item.product}</strong></td>
        <td style="max-width: 220px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.needs}">
          <span style="color: #334155; font-size: 12px;">${item.needs}</span>
        </td>
        <td>${statusBadge}</td>
        <td><span style="color: #10b981; font-weight: 700; font-size: 11.5px;">${item.capi}</span></td>
        <td><span style="font-size: 12px; color: #475569;">${item.agent}</span></td>
        <td style="font-size: 11.5px; color: #787b83; white-space: nowrap;">${item.date}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="smax-table-action-btn btn-chat" title="Xem lịch sử chat (Livechat Smax)" onclick="tabsApp.openLivechatMockup('${item.id}', '${item.customer}')">Chat</button>
            <button class="smax-table-action-btn" title="Gọi điện cho khách" onclick="tabsApp.showToast('Đang kết nối cuộc gọi tới số: ${item.phone}...')">Gọi</button>
            <button class="smax-table-action-btn" title="Xem chi tiết Lead" onclick="tabsApp.showToast('Lead ID ${item.id}: Điểm ${item.leadScore.score}/100 - Nhu cầu: ${item.needs}')">Chi tiết</button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  filterLeadsByCategory(category) {
    if (category === 'all') {
      this.renderLeadsTable(this.leadsData);
      return;
    }
    const filtered = this.leadsData.filter(item => {
      if (category === 'hot') return item.leadScore.level === 'hot';
      if (category === 'warm') return item.leadScore.level === 'warm';
      if (category === 'cold') return item.leadScore.level === 'cold';
      if (category === 'converted') return item.category === 'converted';
      if (category === 'new') return item.status === 'Chưa liên hệ';
      return true;
    });
    this.renderLeadsTable(filtered);
  }

  filterLeadsTable(query) {
    if (!query) {
      this.renderLeadsTable(this.leadsData);
      return;
    }
    const filtered = this.leadsData.filter(item => {
      return item.customer.toLowerCase().includes(query) ||
             item.phone.includes(query) ||
             item.id.toLowerCase().includes(query) ||
             item.product.toLowerCase().includes(query) ||
             item.needs.toLowerCase().includes(query);
    });
    this.renderLeadsTable(filtered);
  }

  initTab5Chart() {
    const canvas = document.getElementById('leadsTrendChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.chartInstances['leadsTrend']) {
      this.chartInstances['leadsTrend'].destroy();
    }

    const labels = [
      '12-04', '14-04', '16-04', '18-04', '20-04', '22-04', '24-04', '26-04', '28-04', '30-04',
      '02-05', '04-05', '06-05', '08-05', '10-05', '12-05', '14-05', '16-05', '18-05', '20-05',
      '22-05', '24-05', '26-05', '28-05', '30-05', '02-06', '04-06', '06-06', '08-06', '10-06', '13-06'
    ];

    const ctx = canvas.getContext('2d');
    this.chartInstances['leadsTrend'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Warm Leads (40-69)',
            data: [40, 65, 80, 110, 140, 120, 85, 95, 110, 130, 125, 115, 135, 140, 160, 150, 145, 120, 130, 140, 155, 140, 150, 165, 170, 185, 160, 150, 175, 190, 160],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.05)',
            borderWidth: 2.5,
            pointRadius: 2,
            tension: 0.35,
            fill: true
          },
          {
            label: 'Cold Leads (0-39)',
            data: [30, 50, 60, 75, 90, 80, 60, 70, 80, 95, 85, 80, 90, 95, 110, 100, 95, 80, 85, 90, 100, 90, 95, 105, 110, 120, 105, 100, 115, 125, 110],
            borderColor: '#3b82f6',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 2,
            tension: 0.35
          },
          {
            label: 'Hot Leads (70-100)',
            data: [15, 30, 45, 55, 70, 65, 40, 50, 60, 75, 70, 65, 80, 85, 95, 90, 85, 70, 80, 85, 95, 90, 95, 105, 110, 125, 110, 100, 120, 135, 115],
            borderColor: '#eb6553',
            backgroundColor: 'transparent',
            borderWidth: 2.5,
            pointRadius: 2.5,
            tension: 0.35
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, boxWidth: 8, padding: 18, font: { family: 'Roboto', size: 12 } }
          },
          tooltip: {
            backgroundColor: '#0f1835',
            titleFont: { family: 'Roboto', size: 12, weight: 'bold' },
            bodyFont: { family: 'Roboto', size: 11 },
            padding: 10,
            cornerRadius: 8
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Roboto', size: 10 }, color: '#787b83' } },
          y: { grid: { color: '#f1f5f9' }, ticks: { font: { family: 'Roboto', size: 10 }, color: '#787b83' } }
        }
      }
    });
  }

  // --- TAB 6: QUẢN LÝ ĐƠN HÀNG METHODS ---
  renderOrdersTable(dataToRender = null) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;

    const data = dataToRender || this.ordersData;
    tbody.innerHTML = '';

    data.forEach(item => {
      const tr = document.createElement('tr');

      // Status Badge
      let statusBadge = '';
      if (item.statusLevel === 'success') {
        statusBadge = `<span class="smax-badge-status success">${item.status}</span>`;
      } else if (item.statusLevel === 'warning') {
        statusBadge = `<span class="smax-badge-status warning">${item.status}</span>`;
      } else if (item.statusLevel === 'info') {
        statusBadge = `<span class="smax-badge-status info">${item.status}</span>`;
      } else if (item.statusLevel === 'danger') {
        statusBadge = `<span class="smax-badge-status danger">${item.status}</span>`;
      } else {
        statusBadge = `<span class="smax-badge-status neutral">${item.status}</span>`;
      }

      tr.innerHTML = `
        <td><strong style="color: #1877f2; font-family: monospace; cursor: pointer;" onclick="tabsApp.openWebviewReceiptModal('${item.id}')">${item.id}</strong></td>
        <td>
          <div style="font-weight: 700; color: #0f1835;">${item.customer}</div>
          <div style="font-size: 11px; color: #787b83; font-family: monospace;">${item.phone}</div>
          <div style="font-size: 11px; color: #475569; max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.address}">${item.address}</div>
        </td>
        <td><strong style="color: #0f1835; font-size: 12px;">${item.items}</strong></td>
        <td>
          <div style="font-weight: 800; color: #eb6553; font-size: 13px;">${item.total}</div>
          <div style="font-size: 10.5px; color: #787b83;">${item.payment}</div>
        </td>
        <td><span style="font-size: 11.5px; font-weight: 600; color: #475569;">${item.source}</span></td>
        <td>${statusBadge}</td>
        <td><span style="color: #10b981; font-weight: 700; font-size: 11.5px;">${item.capi}</span></td>
        <td><strong style="font-size: 12px; color: #0f1835;">${item.pos}</strong></td>
        <td><span style="font-size: 12px; color: #475569;">${item.agent}</span></td>
        <td style="font-size: 11.5px; color: #787b83; white-space: nowrap;">${item.date}</td>
        <td>
          <div style="display: flex; gap: 6px;">
            <button class="smax-table-action-btn btn-chat" title="Xem lịch sử chat (Livechat Smax)" onclick="tabsApp.openLivechatMockup('${item.id}', '${item.customer}')">Chat</button>
            <button class="smax-table-action-btn" title="Xem biên lai Webview" onclick="tabsApp.openWebviewReceiptModal('${item.id}')">Xem</button>
            <button class="smax-table-action-btn" title="In vận đơn POS" onclick="tabsApp.showToast('Đang tạo phiếu in vận đơn cho mã đơn ${item.id}...')">In đơn</button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  filterOrdersByCategory(category) {
    if (category === 'all') {
      this.renderOrdersTable(this.ordersData);
      return;
    }
    const filtered = this.ordersData.filter(item => {
      if (category === 'pos_synced') return item.status === 'Đã đẩy POS' || item.category === 'pos_synced';
      if (category === 'shipping') return item.status === 'Đang giao' || item.category === 'shipping';
      if (category === 'completed') return item.status === 'Hoàn thành' || item.category === 'completed';
      if (category === 'cancelled') return item.status === 'Đã hủy' || item.category === 'cancelled';
      if (category === 'new') return item.status === 'Mới tạo' || item.category === 'new';
      return true;
    });
    this.renderOrdersTable(filtered);
  }

  filterOrdersTable(query) {
    if (!query) {
      this.renderOrdersTable(this.ordersData);
      return;
    }
    const filtered = this.ordersData.filter(item => {
      return item.customer.toLowerCase().includes(query) ||
             item.phone.includes(query) ||
             item.id.toLowerCase().includes(query) ||
             item.items.toLowerCase().includes(query) ||
             item.address.toLowerCase().includes(query) ||
             item.pos.toLowerCase().includes(query);
    });
    this.renderOrdersTable(filtered);
  }

  initTab6Chart() {
    const canvas = document.getElementById('ordersTrendChart');
    if (!canvas || typeof Chart === 'undefined') return;

    if (this.chartInstances['ordersTrend']) {
      this.chartInstances['ordersTrend'].destroy();
    }

    const labels = [
      '12-04', '14-04', '16-04', '18-04', '20-04', '22-04', '24-04', '26-04', '28-04', '30-04',
      '02-05', '04-05', '06-05', '08-05', '10-05', '12-05', '14-05', '16-05', '18-05', '20-05',
      '22-05', '24-05', '26-05', '28-05', '30-05', '02-06', '04-06', '06-06', '08-06', '10-06', '13-06'
    ];

    const ctx = canvas.getContext('2d');
    this.chartInstances['ordersTrend'] = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Doanh thu AI (Triệu VNĐ)',
            data: [2.5, 4.8, 6.2, 8.5, 11.2, 9.8, 6.5, 7.8, 9.5, 12.0, 10.5, 9.8, 11.5, 13.0, 15.5, 14.2, 13.8, 11.0, 12.5, 13.5, 15.0, 14.0, 14.8, 16.5, 17.2, 19.5, 17.0, 15.8, 18.5, 21.0, 18.2],
            borderColor: '#eb6553',
            backgroundColor: 'rgba(235, 101, 83, 0.08)',
            borderWidth: 3,
            pointRadius: 2.5,
            tension: 0.35,
            fill: true,
            yAxisID: 'y'
          },
          {
            label: 'Số đơn hàng chốt',
            data: [8, 15, 20, 28, 38, 32, 22, 26, 32, 40, 35, 33, 38, 44, 52, 48, 46, 36, 42, 45, 50, 47, 49, 55, 58, 65, 56, 52, 62, 70, 60],
            borderColor: '#0f1835',
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 2,
            borderDash: [4, 4],
            tension: 0.35,
            yAxisID: 'y1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: {
            position: 'bottom',
            labels: { usePointStyle: true, boxWidth: 8, padding: 18, font: { family: 'Roboto', size: 12 } }
          },
          tooltip: {
            backgroundColor: '#0f1835',
            titleFont: { family: 'Roboto', size: 12, weight: 'bold' },
            bodyFont: { family: 'Roboto', size: 11 },
            padding: 10,
            cornerRadius: 8
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: 'Roboto', size: 10 }, color: '#787b83' } },
          y: {
            type: 'linear',
            display: true,
            position: 'left',
            grid: { color: '#f1f5f9' },
            ticks: {
              callback: value => value + 'M',
              font: { family: 'Roboto', size: 10 },
              color: '#eb6553'
            }
          },
          y1: {
            type: 'linear',
            display: true,
            position: 'right',
            grid: { drawOnChartArea: false },
            ticks: {
              callback: value => value + ' đơn',
              font: { family: 'Roboto', size: 10 },
              color: '#0f1835'
            }
          }
        }
      }
    });
  }

  // --- MOCKUP LIVECHAT & WEBVIEW MODALS ---
  openLivechatMockup(threadId, customerName) {
    this.showToast(`Đang kết nối Smax Livechat — Hội thoại với ${customerName} (Thread ${threadId})...`);
  }

  openWebviewReceiptModal(orderId) {
    const order = this.ordersData.find(o => o.id === orderId) || this.ordersData[0];
    const backdrop = document.getElementById('webviewReceiptModalBackdrop');
    if (!backdrop) return;

    document.getElementById('receiptModalOrderId').innerText = order.id;
    document.getElementById('receiptModalCustomerName').innerText = order.customer;
    document.getElementById('receiptModalCustomerPhone').innerText = order.phone;
    document.getElementById('receiptModalCustomerAddress').innerText = order.address;
    document.getElementById('receiptModalItems').innerText = order.items;
    document.getElementById('receiptModalTotal').innerText = order.total;
    document.getElementById('receiptModalPayment').innerText = order.payment;
    document.getElementById('receiptModalPos').innerText = order.pos;
    document.getElementById('receiptModalCapi').innerText = order.capi;

    backdrop.classList.add('active');
  }

  closeWebviewReceiptModal() {
    const backdrop = document.getElementById('webviewReceiptModalBackdrop');
    if (backdrop) backdrop.classList.remove('active');
  }

  // ==========================================================================
  // TAB 3: FEW-SHOT Q&A OVERRIDES (HUẤN LUYỆN & HIỆU CHỈNH CÂU TRẢ LỜI)
  // ==========================================================================
  renderCorrectionsTable(dataToRender = null) {
    const tbody = document.getElementById('correctionsTableBody');
    if (!tbody) return;

    const data = dataToRender || this.responseCorrectionsList;
    tbody.innerHTML = '';

    // Update mini stats
    const totalEl = document.getElementById('statTotalCorrections');
    const activeEl = document.getElementById('statActiveCorrections');
    const logEl = document.getElementById('statLogCorrections');
    if (totalEl) totalEl.innerText = `${this.responseCorrectionsList.length} cặp`;
    if (activeEl) {
      const activeCount = this.responseCorrectionsList.filter(c => c.status === 'active').length;
      activeEl.innerText = `${activeCount} cặp (${Math.round(activeCount / (this.responseCorrectionsList.length || 1) * 100)}%)`;
    }
    if (logEl) {
      const logCount = this.responseCorrectionsList.filter(c => c.source === 'log').length;
      logEl.innerText = `${logCount} cặp`;
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
        sourceBadge = `<span style="background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 100px; border: 1px solid #bfdbfe;">Log #${item.sourceLogId || ''}</span>`;
      } else {
        sourceBadge = '<span style="background: #f1f5f9; color: #475569; font-size: 11px; font-weight: 600; padding: 2px 8px; border-radius: 100px;">Nhập tay</span>';
      }

      tr.innerHTML = `
        <td>
          <div style="font-weight: 700; color: #0f1835; font-size: 13px; margin-bottom: 2px;">${item.userQuery}</div>
          ${item.ruleNote ? `<div style="font-size: 11.5px; color: #64748b; font-style: italic;">Quy tắc: ${item.ruleNote}</div>` : ''}
        </td>
        <td>
          <div style="font-size: 12.5px; color: #064e3b; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 8px 12px; border-radius: 8px; line-height: 1.45;">
            ${item.idealAnswer}
          </div>
        </td>
        <td>
          <span style="font-weight: 600; color: #334155; font-size: 12px;">${item.agentName}</span>
        </td>
        <td>${sourceBadge}</td>
        <td style="text-align: center;">
          <label class="smax-switch" style="transform: scale(0.85); margin: 0 auto;">
            <input type="checkbox" ${isChecked} onchange="tabsApp.toggleCorrectionStatus('${item.id}')">
            <span class="smax-slider"></span>
          </label>
        </td>
        <td style="text-align: center;">
          <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
            <button class="smax-icon-btn" title="Chỉnh sửa câu trả lời" onclick="tabsApp.openEditCorrectionModal('${item.id}')" style="width: 28px; height: 28px; border: 1px solid #e2e8f0; background: #ffffff;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
            <button class="smax-icon-btn" title="Xóa" onclick="tabsApp.deleteCorrection('${item.id}')" style="width: 28px; height: 28px; border: 1px solid #e2e8f0; background: #ffffff;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  toggleCorrectionStatus(id) {
    const item = this.responseCorrectionsList.find(c => c.id === id);
    if (!item) return;
    item.status = item.status === 'active' ? 'inactive' : 'active';
    this.renderCorrectionsTable();
    this.showToast(`Đã ${item.status === 'active' ? 'bật' : 'tắt'} áp dụng câu trả lời huấn luyện!`);
  }

  deleteCorrection(id) {
    const item = this.responseCorrectionsList.find(c => c.id === id);
    if (!item) return;
    if (confirm(`Bạn có chắc muốn xóa câu trả lời huấn luyện cho: "${item.userQuery}"?`)) {
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

  // ==========================================================================
  // TEACH AI MODAL (HUMAN-IN-THE-LOOP FEEDBACK)
  // ==========================================================================
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
        if (groupWrong && groupWrong.style) groupWrong.style.display = 'block';
        if (textareaIdeal) textareaIdeal.value = log.idealAnswer || log.trainedCorrection || '';
        if (inputRule) inputRule.value = log.ruleNote || '';
      }
    } else if (correctionId) {
      const item = this.responseCorrectionsList.find(c => c.id === correctionId);
      if (item) {
        if (selectAgent) selectAgent.value = item.agentId || 'agent-1';
        if (textareaQuery) textareaQuery.value = item.userQuery || '';
        if (groupWrong && groupWrong.style) groupWrong.style.display = 'none';
        if (textareaIdeal) textareaIdeal.value = item.idealAnswer || '';
        if (inputRule) inputRule.value = item.ruleNote || '';
      }
    } else {
      // Add new manual correction
      if (selectAgent) selectAgent.value = 'agent-1';
      if (textareaQuery) textareaQuery.value = '';
      if (groupWrong && groupWrong.style) groupWrong.style.display = 'none';
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
      'agent-1': 'Trợ lý Tư vấn Thời trang Smax',
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

  showToast(msg) {
    let toast = document.getElementById('smaxGlobalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'smaxGlobalToast';
      toast.className = 'smax-toast-msg';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>${msg}</span>`;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }
}

// Global instance
window.tabsApp = new TabsManager();
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.tabsApp.init();
    });
  } else {
    window.tabsApp.init();
  }
}
