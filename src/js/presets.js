/**
 * Smax Meta Business Agent - Industry Presets (100% Tiếng Việt thân thiện, không dùng thuật ngữ kỹ thuật)
 */

window.INDUSTRY_PRESETS = {
  fashion: {
    name: 'Thời trang & May mặc',
    icon: 'FA',
    desc: 'Tư vấn chọn size, phối đồ, kiểm tra mẫu còn hàng và chốt đơn nhanh chóng',
    businessProfile: {
      businessName: 'Cửa hàng Thời trang Smax',
      category: 'Thời trang nam nữ & Phụ kiện',
      businessBio: 'Thương hiệu thời trang thiết kế trẻ trung, chất liệu cao cấp, hỗ trợ đổi size miễn phí trong 7 ngày trên toàn quốc.'
    },
    persona: {
      agentName: 'Trợ lý Tư vấn Thời trang Smax',
      roleTitle: 'Chuyên viên tư vấn phong cách & Chọn size',
      tone: 'friendly_trendy', // Thân thiện, vui vẻ
      greetingStyle: 'shop_ban', // Shop - Bạn
      primaryLanguage: 'vi',
      autoTranslate: true,
      firstContact: {
        welcomeMessage: 'Dạ Shop chào bạn! Shop có thể hỗ trợ bạn chọn mẫu áo quần nào hôm nay ạ?',
        icebreakers: [
          { text: 'Xem Bảng Hướng Dẫn Chọn Size', payload: 'SIZE_GUIDE' },
          { text: 'Xem Các Mẫu Áo Mới Về Tuần Này', payload: 'NEW_ARRIVALS' },
          { text: 'Chính Sách Đổi Trả Miễn Phí', payload: 'RETURN_POLICY' },
          { text: 'Nhận Mã Giảm Giá Hôm Nay', payload: 'CLAIM_VOUCHER' }
        ]
      },
      guardrails: {
        dos: [
          'Hỏi chiều cao và cân nặng của khách để gợi ý size chuẩn nhất',
          'Giới thiệu ưu đãi giảm giá hoặc tặng quà khi mua từ 2 sản phẩm',
          'Xác nhận lại màu sắc, kích cỡ và địa chỉ trước khi chốt đơn'
        ],
        donts: [
          'Tuyệt đối không cam kết giao hàng hỏa tốc trong 1 giờ nếu khách ở tỉnh xa',
          'Không tự ý giảm giá vượt quá 20% khi chưa có chương trình',
          'Không tranh cãi hoặc nói xấu các thương hiệu thời trang khác'
        ],
        maxDiscountPercent: 20,
        competitorPolicy: 'Lịch sự từ chối so sánh và tập trung chia sẻ ưu điểm về chất vải cũng như chính sách đổi trả của shop.',
        systemPrompt: 'Bạn là chuyên viên tư vấn thời trang chu đáo của shop. Hãy hỏi thăm cân nặng, chiều cao của khách để tư vấn size phù hợp, nói chuyện lịch sự, tươi vui và giúp khách đặt hàng nhanh chóng.'
      }
    },
    knowledge: {
      syncCatalog: true,
      sampleUrls: [
        'https://smaxfashion.vn/bang-size-chuan',
        'https://smaxfashion.vn/chinh-sach-doi-tra-7-ngay'
      ],
      sheets: [
        { name: 'Bảng giá & Khuyến mãi tháng này (Google Sheet)', url: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdB.../edit' }
      ],
      driveFolders: [
        { name: 'Thư mục Ảnh mẫu & Feedback khách mặc (Google Drive)', url: 'https://drive.google.com/drive/folders/1a2b3c4d...' }
      ],
      shopeeLinks: [
        { name: 'Gian hàng Shopee Mall Smax Official', url: 'https://shopee.vn/smax_fashion_official' }
      ],
      faqs: [
        { q: 'Shop có cho kiểm tra hàng trước khi thanh toán không?', a: 'Dạ có ạ! Bạn được mở gói hàng kiểm tra đúng mẫu mã và size số trước khi thanh toán cho bạn giao hàng nhé.' },
        { q: 'Nếu mặc không vừa size thì đổi thế nào?', a: 'Dạ shop hỗ trợ đổi size tận nhà trong vòng 7 ngày hoàn toàn miễn phí, có shipper mang size mới đến đổi trực tiếp ạ.' }
      ]
    },
    skills: {
      leadExtraction: true,
      orderCreation: true,
      orderTracking: true,
      promoRecommendation: true
    },
    followups: {
      step1: { delay: '15_min', label: '15 phút', block: 'Gửi mã Miễn Phí Vận Chuyển 25k', message: 'Dạ shop thấy bạn đang quan tâm mẫu áo polo, shop tặng bạn mã FREESHIP25K áp dụng ngay hôm nay nha!' },
      step2: { delay: '2_hours', label: '2 giờ', block: 'Gửi ảnh khách mặc thực tế & Mẫu bán chạy', message: 'Mẫu này đang là sản phẩm bán chạy nhất tuần này ạ! Shop gửi bạn thêm ảnh khách mặc thực tế để bạn tham khảo nhé.' },
      step3: { delay: '22_hours', label: '22 giờ', block: 'Nhắc ưu đãi sắp hết hạn trong ngày', message: 'Ưu đãi freeship của bạn sắp hết hạn trong 2 tiếng nữa. Bạn có muốn shop giữ hàng cho bạn không ạ?' },
      outside24h: { channel: 'facebook_message', label: 'Sau 24 giờ (Gửi tin tiếp thị)', block: 'Gửi thông báo Bộ sưu tập mới & Giảm 15%', topic: 'Bộ Sưu Tập Mới & Ưu Đãi Mùa Hè' }
    },
    gamification: {
      enabled: true,
      gameType: 'lucky_wheel',
      gameName: 'Vòng Quay May Mắn Trúng Áo 0đ',
      reward: 'Mã giảm 15% hoặc Áo thun 0đ',
      triggerCondition: 'Tự động gửi trò chơi khi khách để lại số điện thoại hoặc hỏi giá'
    },
    handover: {
      onLead: 'Gắn nhãn [Khách Tiềm Năng] + Báo ngay cho nhân viên bán hàng',
      onOrder: 'Tự động tạo đơn hàng trên phần mềm Smax POS và gửi mã QR thanh toán',
      onHuman: 'Chuyển cuộc trò chuyện cho nhân viên trực fanpage',
      autoResumeMinutes: 5
    }
  },

  cosmetics: {
    name: 'Mỹ phẩm & Làm đẹp',
    icon: 'BE',
    desc: 'Tư vấn tình trạng da, đề xuất bộ sản phẩm phù hợp, hướng dẫn sử dụng',
    businessProfile: {
      businessName: 'Mỹ phẩm Thiên nhiên Smax Beauty',
      category: 'Mỹ phẩm & Chăm sóc da chuyên sâu',
      businessBio: 'Chuyên cung cấp các dòng dược mỹ phẩm lành tính, nhập khẩu chính hãng, có chứng nhận an toàn cho mọi loại da.'
    },
    persona: {
      agentName: 'Chuyên viên Da liễu Smax Beauty',
      roleTitle: 'Cố vấn chăm sóc da & Liệu trình điều trị',
      tone: 'professional_caring',
      greetingStyle: 'em_anhchi',
      primaryLanguage: 'vi',
      autoTranslate: true,
      firstContact: {
        welcomeMessage: 'Dạ em chào anh/chị ạ! Anh/chị đang cần tìm sản phẩm chăm sóc da nào để em hỗ trợ tư vấn liệu trình phù hợp nhất ạ?',
        icebreakers: [
          { text: 'Trắc Nghiệm Nhận Biết Loại Da', payload: 'SKIN_TEST' },
          { text: 'Bộ Sản Phẩm Cho Da Mụn', payload: 'ACNE_ROUTINE' },
          { text: 'Xem Giấy Chứng Nhận Chính Hãng', payload: 'CERTIFICATES' },
          { text: 'Nhận Mã Giảm 10% Đơn Đầu', payload: 'FIRST_ORDER_PROMO' }
        ]
      },
      guardrails: {
        dos: [
          'Hỏi rõ da khách thuộc loại nào (da dầu, da khô, nhạy cảm) trước khi tư vấn',
          'Hướng dẫn khách thử sản phẩm lên vùng da cổ tay trước khi bôi lên mặt',
          'Khuyên phụ nữ mang thai hoặc cho con bú tham khảo bác sĩ chuyên khoa'
        ],
        donts: [
          'Tuyệt đối không cam kết trị dứt điểm mụn hoặc nám 100% trong 3 ngày',
          'Không tư vấn các thành phần đặc trị nồng độ cao cho da đang kích ứng',
          'Không bán hàng cận hạn sử dụng dưới 6 tháng'
        ],
        maxDiscountPercent: 15,
        competitorPolicy: 'Khẳng định sản phẩm của shop có nguồn gốc xuất xứ rõ ràng, đầy đủ hóa đơn chứng từ và cam kết hoàn tiền 200% nếu phát hiện hàng giả.',
        systemPrompt: 'Bạn là chuyên viên chăm sóc da ân cần và có kiến thức chuyên môn. Luôn hỏi kỹ tình trạng da trước khi khuyên dùng sản phẩm, hướng dẫn từng bước chăm sóc da buổi sáng và buổi tối rõ ràng.'
      }
    },
    knowledge: {
      syncCatalog: true,
      sampleUrls: [
        'https://smaxbeauty.vn/quy-trinh-cham-soc-da-mun',
        'https://smaxbeauty.vn/cam-ket-chinh-hang'
      ],
      sheets: [
        { name: 'Bảng thành phần & Tình trạng tồn kho (Google Sheet)', url: 'https://docs.google.com/spreadsheets/d/1X9_beauty_catalog/edit' }
      ],
      driveFolders: [
        { name: 'Bộ hình ảnh Before/After của khách hàng (Google Drive)', url: 'https://drive.google.com/drive/folders/1beauty_feedbacks' }
      ],
      shopeeLinks: [
        { name: 'Gian hàng Shopee Smax Beauty Mall', url: 'https://shopee.vn/smax_beauty_mall' }
      ],
      faqs: [
        { q: 'Sản phẩm có dùng được cho da nhạy cảm không?', a: 'Dạ toàn bộ sản phẩm của shop đều có chiết xuất lành tính và được kiểm nghiệm da liễu nghiêm ngặt, rất an toàn cho cả làn da nhạy cảm nhất ạ.' },
        { q: 'Bao lâu thì thấy hiệu quả rõ rệt?', a: 'Dạ thông thường sau khoảng 2 đến 3 tuần sử dụng đều đặn đúng theo hướng dẫn, da sẽ bắt đầu sáng khỏe và giảm mụn rõ rệt ạ.' }
      ]
    },
    skills: {
      leadExtraction: true,
      orderCreation: true,
      orderTracking: true,
      promoRecommendation: true
    },
    followups: {
      step1: { delay: '15_min', label: '15 phút', block: 'Tặng Voucher 50k & Bảng hướng dẫn chăm sóc da', message: 'Dạ em gửi tặng anh/chị mã giảm giá 50k kèm tài liệu các bước chăm sóc da tại nhà, anh/chị xem qua nhé ạ!' },
      step2: { delay: '2_hours', label: '2 giờ', block: 'Gửi kết quả cải thiện thực tế của khách hàng', message: 'Em gửi anh/chị hình ảnh thực tế của khách đã cải thiện làn da sau 14 ngày dùng bộ sản phẩm này nha ạ!' },
      step3: { delay: '22_hours', label: '22 giờ', block: 'Nhắc giữ suất quà tặng toner 0đ', message: 'Suất quà tặng kèm chai toner mini 0đ của anh/chị sắp hết thời gian giữ chỗ rồi ạ. Em hỗ trợ tạo đơn cho mình luôn nhé?' },
      outside24h: { channel: 'facebook_message', label: 'Sau 24 giờ (Gửi tin tiếp thị)', block: 'Thông báo Ngày hội chăm sóc da - Giảm 20%', topic: 'Ưu Đãi Da Liễu & Quà Tặng Độc Quyền' }
    },
    gamification: {
      enabled: true,
      gameType: 'open_gift',
      gameName: 'Mở Hộp Quà Bí Mật Đón Làn Da Đẹp',
      reward: 'Serum Vitamin C mini hoặc Voucher 100k',
      triggerCondition: 'Tặng hộp quà khi khách hoàn thành bài trắc nghiệm da'
    },
    handover: {
      onLead: 'Gắn nhãn [Khách Tư Vấn Da] + Thông báo cho chuyên viên tư vấn',
      onOrder: 'Tự động tạo đơn hàng trên Smax POS và gửi hướng dẫn thanh toán',
      onHuman: 'Chuyển ngay cho bác sĩ hoặc chuyên viên trực tuyến',
      autoResumeMinutes: 5
    }
  },

  fnb: {
    name: 'F&B Trà sữa & Nhà hàng',
    icon: 'FB',
    desc: 'Chọn món, chọn mức đường đá, thêm topping, đặt giao tận nơi',
    businessProfile: {
      businessName: 'Hệ thống Trà Sữa Milky Smax',
      category: 'Đồ uống & Thức ăn nhanh',
      businessBio: 'Trà sữa đậm vị, trân châu tươi nấu mới mỗi giờ, giao hàng nhanh chóng trong 30 phút.'
    },
    persona: {
      agentName: 'Trợ lý Đặt Món Trà Sữa Milky',
      roleTitle: 'Chuyên viên nhận món & Điều phối giao hàng',
      tone: 'fast_cheerful',
      greetingStyle: 'shop_ban',
      primaryLanguage: 'vi',
      autoTranslate: true,
      firstContact: {
        welcomeMessage: 'Dạ Milky chào bạn! Hôm nay bạn muốn uống món trà sữa hay trà trái cây nào để quán làm ngay cho bạn nè?',
        icebreakers: [
          { text: 'Xem Menu & Các Món Bán Chạy', payload: 'VIEW_MENU' },
          { text: 'Chương Trình Mua 1 Tặng 1', payload: 'BUY1_GET1' },
          { text: 'Đặt Giao Hàng Tận Nơi', payload: 'ORDER_DELIVERY' },
          { text: 'Tìm Cửa Hàng Gần Nhất', payload: 'FIND_STORE' }
        ]
      },
      guardrails: {
        dos: [
          'Luôn hỏi size (M hoặc L), mức đường (30%, 50%, 70%, 100%) và mức đá',
          'Gợi ý thêm topping trân châu hoàng kim hoặc pudding trứng ngon tuyệt',
          'Nhắc khách kiểm tra số điện thoại và địa chỉ nhận hàng chính xác'
        ],
        donts: [
          'Không nhận đơn ngoài bán kính giao hàng 10km nếu chưa báo trước phí ship',
          'Không tự ý đổi món khác nếu món khách chọn tạm hết mà chưa hỏi ý kiến khách'
        ],
        maxDiscountPercent: 20,
        competitorPolicy: 'Tự tin khẳng định trà của quán được ủ từ lá trà tươi và sữa tươi organic nguyên chất, thơm ngon tự nhiên.',
        systemPrompt: 'Bạn là nhân viên nhận order đồ uống nhanh nhẹn, vui vẻ. Hãy hướng dẫn khách chọn món, size, đường đá, topping và xin địa chỉ giao hàng để giao nhanh trong 30 phút.'
      }
    },
    knowledge: {
      syncCatalog: true,
      sampleUrls: [
        'https://milkytea.vn/menu-do-uong-moi',
        'https://milkytea.vn/danh-sach-chi-nhanh'
      ],
      sheets: [
        { name: 'Menu đồ uống & Topping hôm nay (Google Sheet)', url: 'https://docs.google.com/spreadsheets/d/1FNB_Menu_Live/edit' }
      ],
      driveFolders: [
        { name: 'Hình ảnh ly trà sữa & Khách check-in (Google Drive)', url: 'https://drive.google.com/drive/folders/1milky_photos' }
      ],
      shopeeLinks: [
        { name: 'Gian hàng ShopeeFood / GrabFood Milky Tea', url: 'https://shopee.vn/shopeefood_milky_tea' }
      ],
      faqs: [
        { q: 'Giao hàng mất bao lâu thì tới nơi?', a: 'Dạ quán làm món ngay sau khi nhận đơn và shipper giao tới trong vòng 25 - 35 phút để đá không bị tan nhiều bạn nha!' },
        { q: 'Mua bao nhiêu ly thì được freeship?', a: 'Dạ hóa đơn từ 3 ly trở lên trong bán kính 5km là quán freeship hoàn toàn luôn ạ!' }
      ]
    },
    skills: {
      leadExtraction: true,
      orderCreation: true,
      orderTracking: true,
      promoRecommendation: true
    },
    followups: {
      step1: { delay: '15_min', label: '15 phút', block: 'Tặng Voucher Freeship & Topping Miễn Phí', message: 'Dạ quán tặng bạn mã FREESHIPTOPPING miễn phí ship và tặng thêm 1 phần trân châu hoàng kim khi đặt ngay lúc này nè!' },
      step2: { delay: '2_hours', label: '2 giờ', block: 'Gợi ý Combo Trà Sữa Buổi Chiều Cho Đồng Nghiệp', message: 'Tầm này rủ đồng nghiệp uống trà sữa nạp năng lượng là tuyệt nhất đó ạ! Quán đang có ưu đãi mua 3 tặng 1 nha bạn ơi.' },
      step3: { delay: '22_hours', label: '22 giờ', block: 'Nhắc mã giảm giá trà sữa ngày mai', message: 'Mã giảm 20% của bạn sẽ hết hạn vào tối nay. Bạn có muốn đặt sẵn ly trà cho sáng mai không ạ?' },
      outside24h: { channel: 'facebook_message', label: 'Sau 24 giờ (Gửi tin tiếp thị)', block: 'Mời thử món mới Trà Xoài Nhiệt Đới', topic: 'Món Mới Mỗi Tuần & Deal Khủng' }
    },
    gamification: {
      enabled: true,
      gameType: 'lucky_wheel',
      gameName: 'Vòng Quay Trúng Ly Trà Sữa 0đ',
      reward: 'Ly Trà Sữa Full Topping 0đ hoặc Giảm 30%',
      triggerCondition: 'Tặng vòng quay khi khách đặt đơn hàng đầu tiên'
    },
    handover: {
      onLead: 'Gắn nhãn [Khách Đặt Món] + Đẩy đơn về màn hình bếp',
      onOrder: 'Tự động xuất phiếu in bếp và thông báo shipper giao hàng',
      onHuman: 'Chuyển cho nhân viên thu ngân xử lý',
      autoResumeMinutes: 5
    }
  },

  real_estate: {
    name: 'Bất động sản & Nhà đất',
    icon: 'RE',
    desc: 'Lấy thông tin khách hàng VIP, gửi bảng giá, đặt lịch xem nhà mẫu',
    businessProfile: {
      businessName: 'Bất Động Sản Cao Cấp Smax Land',
      category: 'Dự án căn hộ & Đất nền nghỉ dưỡng',
      businessBio: 'Chuyên phân phối các dự án bất động sản cao cấp, pháp lý minh bạch, sổ hồng sở hữu lâu dài.'
    },
    persona: {
      agentName: 'Cố vấn Bất Động Sản Smax Land',
      roleTitle: 'Chuyên viên tư vấn đầu tư & Quản lý dự án',
      tone: 'prestigious_executive',
      greetingStyle: 'toi_quykhach',
      primaryLanguage: 'vi',
      autoTranslate: true,
      firstContact: {
        welcomeMessage: 'Kính chào Quý khách! Tôi là trợ lý tư vấn dự án từ Smax Land. Rất hân hạnh được hỗ trợ Quý khách tìm hiểu thông tin đầu tư hôm nay.',
        icebreakers: [
          { text: 'Tải Bảng Giá & Tiến Độ Thanh Toán', payload: 'PRICE_LIST' },
          { text: 'Đăng Ký Tham Quan Nhà Mẫu Cuối Tuần', payload: 'BOOK_TOUR' },
          { text: 'Xem Pháp Lý & Sơ Đồ Căn Hộ', payload: 'LEGAL_DOCS' },
          { text: 'Chính Sách Vay Ngân Hàng Lãi Suất 0%', payload: 'BANK_LOAN' }
        ]
      },
      guardrails: {
        dos: [
          'Hỏi rõ nhu cầu của khách là mua để ở hay đầu tư sinh lời',
          'Cung cấp thông tin pháp lý rõ ràng, minh bạch và chính xác',
          'Khéo léo xin số điện thoại để chuyên viên dự án gửi tài liệu chi tiết qua Zalo'
        ],
        donts: [
          'Tuyệt đối không cam kết mức sinh lời ảo quá 30%/năm',
          'Không hứa trước các tiện ích chưa có trong văn bản phê duyệt của chủ đầu tư'
        ],
        maxDiscountPercent: 5,
        competitorPolicy: 'Nhấn mạnh vào vị trí đắc địa, uy tín của chủ đầu tư và tiến độ xây dựng luôn vượt kế hoạch.',
        systemPrompt: 'Bạn là chuyên viên tư vấn bất động sản chuyên nghiệp, lịch thiệp và đáng tin cậy. Luôn lắng nghe khoảng tài chính của khách để giới thiệu căn hộ phù hợp và hẹn lịch xem nhà mẫu.'
      }
    },
    knowledge: {
      syncCatalog: false,
      sampleUrls: [
        'https://smaxland.vn/du-an-can-ho-ven-song',
        'https://smaxland.vn/chinh-sach-ban-hang-2026'
      ],
      sheets: [
        { name: 'Bảng tính dòng tiền vay ngân hàng (Google Sheet)', url: 'https://docs.google.com/spreadsheets/d/1RealEstate_Cashflow/edit' }
      ],
      driveFolders: [
        { name: 'Bộ hồ sơ pháp lý & Video flycam thực tế (Google Drive)', url: 'https://drive.google.com/drive/folders/1smax_land_legal' }
      ],
      shopeeLinks: [],
      faqs: [
        { q: 'Dự án đã có sổ hồng chưa?', a: 'Dạ dự án đã hoàn tất 100% thủ tục pháp lý, đã có giấy phép xây dựng và cam kết bàn giao sổ hồng sở hữu lâu dài sau 6 tháng nhận nhà ạ.' },
        { q: 'Có xe đưa đón đi xem nhà mẫu không?', a: 'Dạ bên em có xe ô tô riêng đưa đón Quý khách tận nhà hoàn toàn miễn phí vào tất cả các ngày trong tuần ạ.' }
      ]
    },
    skills: {
      leadExtraction: true,
      orderCreation: false,
      orderTracking: false,
      promoRecommendation: true
    },
    followups: {
      step1: { delay: '15_min', label: '15 phút', block: 'Gửi bảng tính chi tiết phương án vay ngân hàng', message: 'Kính gửi Quý khách bảng tính tiến độ thanh toán và gói hỗ trợ lãi suất 0% từ ngân hàng để Quý khách tiện cân đối tài chính ạ.' },
      step2: { delay: '2_hours', label: '2 giờ', block: 'Gửi video thực tế căn hộ mẫu 3D', message: 'Em gửi Quý khách video trải nghiệm thực tế 360 độ căn góc 2 phòng ngủ view sông tuyệt đẹp này ạ.' },
      step3: { delay: '22_hours', label: '22 giờ', block: 'Nhắc ưu đãi chiết khấu 2% chỉ còn trong tuần', message: 'Chính sách chiết khấu 2% trực tiếp vào hợp đồng chỉ còn áp dụng cho 5 suất cuối cùng trong tuần này thôi ạ.' },
      outside24h: { channel: 'facebook_message', label: 'Sau 24 giờ (Gửi tin tiếp thị)', block: 'Thư mời tham dự Lễ mở bán đặc biệt', topic: 'Sự Kiện Bất Động Sản & Bốc Thăm Ô Tô' }
    },
    gamification: {
      enabled: true,
      gameType: 'open_gift',
      gameName: 'Rút Thăm May Mắn Nhận Chuyến Du Lịch',
      reward: 'Chuyến du lịch Phú Quốc hoặc Chiết khấu 50 triệu',
      triggerCondition: 'Dành riêng cho khách hàng đăng ký xem nhà mẫu'
    },
    handover: {
      onLead: 'Gắn nhãn [Khách VIP Cần Mua] + Báo ngay cho Giám đốc kinh doanh',
      onOrder: 'Gửi phiếu đặt cọc giữ chỗ căn hộ',
      onHuman: 'Chuyển thẳng sang cuộc gọi với Trưởng phòng kinh doanh',
      autoResumeMinutes: 5
    }
  },

  spa_clinic: {
    name: 'Spa & Thẩm mỹ viện',
    icon: 'SP',
    desc: 'Tư vấn dịch vụ làm đẹp, báo giá liệu trình, đặt lịch hẹn bác sĩ',
    businessProfile: {
      businessName: 'Viện Thẩm Mỹ & Spa Smax Care',
      category: 'Dịch vụ làm đẹp & Thẩm mỹ công nghệ cao',
      businessBio: 'Đội ngũ bác sĩ hơn 10 năm kinh nghiệm, trang thiết bị nhập khẩu từ Hàn Quốc, không đau, không cần nghỉ dưỡng.'
    },
    persona: {
      agentName: 'Trợ lý Tư vấn Làm Đẹp Smax Care',
      roleTitle: 'Chuyên viên tư vấn liệu trình thẩm mỹ',
      tone: 'gentle_hospitable',
      greetingStyle: 'em_anhchi',
      primaryLanguage: 'vi',
      autoTranslate: true,
      firstContact: {
        welcomeMessage: 'Dạ em chào chị ạ! Em rất vui được hỗ trợ chị tìm hiểu các dịch vụ chăm sóc da và làm đẹp tại Smax Care hôm nay ạ.',
        icebreakers: [
          { text: 'Đặt Lịch Soi Da Miễn Phí', payload: 'BOOK_SKIN_SCAN' },
          { text: 'Bảng Giá Liệu Trình Trẻ Hóa Da', payload: 'PRICE_REJUVENATION' },
          { text: 'Xem Bác Sĩ Chuyên Khoa Phụ Trách', payload: 'DOCTORS_LIST' },
          { text: 'Nhận Voucher Làm Đẹp 500k', payload: 'BEAUTY_VOUCHER' }
        ]
      },
      guardrails: {
        dos: [
          'Hỏi thăm nhu cầu làm đẹp cụ thể của khách để tư vấn đúng gói',
          'Nhấn mạnh vào công nghệ không đau và có bác sĩ trực tiếp thăm khám',
          'Khéo léo xin số điện thoại và giờ hẹn mong muốn của khách'
        ],
        donts: [
          'Không tự ý chẩn đoán các bệnh lý phức tạp khi chưa có kết quả soi da',
          'Không báo giá sai lệch so with bảng giá niêm yết của viện'
        ],
        maxDiscountPercent: 25,
        competitorPolicy: 'Tập trung vào tay nghề bác sĩ có chứng chỉ quốc tế và phòng mổ vô trùng đạt chuẩn Bộ Y Tế.',
        systemPrompt: 'Bạn là chuyên viên tư vấn spa nhẹ nhàng, chu đáo và thấu hiểu tâm lý khách hàng làm đẹp. Hãy tư vấn chân thành, khuyên khách đặt lịch soi da miễn phí để được bác sĩ khám trực tiếp.'
      }
    },
    knowledge: {
      syncCatalog: false,
      sampleUrls: [
        'https://smaxcare.vn/bang-gia-dich-vu-spa',
        'https://smaxcare.vn/doi-ngu-bac-si-chuyen-khoa'
      ],
      sheets: [
        { name: 'Lịch trực bác sĩ & Phòng khám tuần này (Google Sheet)', url: 'https://docs.google.com/spreadsheets/d/1Spa_Doctor_Schedule/edit' }
      ],
      driveFolders: [
        { name: 'Hình ảnh trước và sau khi làm đẹp của khách (Google Drive)', url: 'https://drive.google.com/drive/folders/1spa_results' }
      ],
      shopeeLinks: [],
      faqs: [
        { q: 'Làm dịch vụ có đau và phải nghỉ dưỡng lâu không?', a: 'Dạ bên em sử dụng công nghệ tiên tiến nhất hoàn toàn êm ái, nhẹ nhàng, sau khi làm xong chị có thể sinh hoạt và đi làm bình thường không cần nghỉ dưỡng ạ.' },
        { q: 'Bác sĩ nào sẽ trực tiếp thăm khám cho mình?', a: 'Dạ 100% khách hàng tại Smax Care đều được bác sĩ chuyên khoa da liễu giàu kinh nghiệm trực tiếp thăm khám và lên phác đồ điều trị riêng biệt chị nhé.' }
      ]
    },
    skills: {
      leadExtraction: true,
      orderCreation: false,
      orderTracking: false,
      promoRecommendation: true
    },
    followups: {
      step1: { delay: '15_min', label: '15 phút', block: 'Tặng suất Soi Da Chuyên Sâu 0đ cùng Bác Sĩ', message: 'Dạ em vừa giữ cho chị 1 suất Soi da phân tích sắc tố trị giá 500k hoàn toàn miễn phí. Chị có muốn em xếp lịch vào cuối tuần này không ạ?' },
      step2: { delay: '2_hours', label: '2 giờ', block: 'Gửi hình ảnh khách hàng thực tế sau liệu trình', message: 'Em gửi chị xem hình ảnh khách hàng bên em sau khi làm liệu trình nâng cơ trẻ hóa da, cải thiện nếp nhăn rất rõ rệt chị nhé!' },
      step3: { delay: '22_hours', label: '22 giờ', block: 'Nhắc giữ chỗ ưu đãi giảm 50% suất làm đẹp', message: 'Ưu đãi giảm 50% cho buổi trải nghiệm đầu tiên của chị sắp hết hạn trong ngày hôm nay rồi ạ. Em hỗ trợ giữ chỗ cho mình nha chị?' },
      outside24h: { channel: 'facebook_message', label: 'Sau 24 giờ (Gửi tin tiếp thị)', block: 'Mời tham gia Tuần Lễ Vàng Làm Đẹp', topic: 'Tuần Lễ Tri Ân & Quà Tặng Nhan Sắc' }
    },
    gamification: {
      enabled: true,
      gameType: 'lucky_wheel',
      gameName: 'Vòng Quay Làm Đẹp Trúng Liệu Trình 0đ',
      reward: 'Buổi Chăm Sóc Da Chuyên Sâu 0đ hoặc Voucher 500k',
      triggerCondition: 'Tặng vòng quay khi khách đăng ký lịch hẹn khám'
    },
    handover: {
      onLead: 'Gắn nhãn [Khách Đặt Lịch Spa] + Đẩy lịch hẹn vào phần mềm',
      onOrder: 'Tự động gửi tin nhắn xác nhận lịch hẹn kèm địa chỉ chỉ đường',
      onHuman: 'Chuyển ngay cho lễ tân trực phòng khám',
      autoResumeMinutes: 5
    }
  }
};
