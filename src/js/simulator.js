/**
 * Smax Meta Business Agent Simulator Engine (100% Tiếng Việt thân thiện)
 */

class MetaAgentSimulator {
  constructor() {
    this.sessionHistory = [];
    this.extractedEntities = {
      customerName: null,
      phone: null,
      address: null,
      items: [],
      voucher: null
    };
    this.tokenCount = 0;
    this.currentOwner = 'Trợ lý AI (Lễ tân)';
  }

  resetSession() {
    this.sessionHistory = [];
    this.extractedEntities = {
      customerName: null,
      phone: null,
      address: null,
      items: [],
      voucher: null
    };
    this.tokenCount = 0;
    this.currentOwner = 'Trợ lý AI (Lễ tân)';
  }

  processUserMessage(userText, agentState) {
    this.lastUserMessage = userText;
    const textLower = userText.toLowerCase();
    this.tokenCount += Math.floor(userText.length / 3) + 120; // Simulated token count

    // Check if there is an active Few-Shot override from tabsApp.responseCorrectionsList
    if (typeof tabsApp !== 'undefined' && tabsApp.responseCorrectionsList) {
      const match = tabsApp.responseCorrectionsList.find(c => 
        c.status === 'active' && 
        userText.toLowerCase().includes(c.userQuery.toLowerCase().slice(0, 15))
      );
      if (match) {
        return {
          botReply: match.idealAnswer,
          activeOwner: this.currentOwner,
          intent: 'Phản hồi theo câu trả lời đã huấn luyện (Few-Shot Ground Truth)',
          extractedEntities: this.extractedEntities,
          tokenUsage: this.calculateTokens(),
          isTrainedCorrection: true
        };
      }
    }

    // Extract Phone Number
    const phoneMatch = userText.match(/(0[3|5|7|8|9][0-9]{8})/);
    if (phoneMatch) {
      this.extractedEntities.phone = phoneMatch[1];
    }

    // Extract Address
    const addressKeywords = ['địa chỉ', 'ship về', 'giao tới', 'ở', 'tại', 'nhà số', 'đường', 'phường', 'quận', 'thành phố', 'huyện', 'tỉnh'];
    let detectedAddress = null;
    addressKeywords.forEach(kw => {
      if (textLower.includes(kw)) {
        const parts = userText.split(new RegExp(kw, 'i'));
        if (parts[1] && parts[1].length > 4) {
          detectedAddress = parts[1].replace(/sđt|số điện thoại|alo|gọi|liên hệ/gi, '').trim();
        }
      }
    });
    if (detectedAddress && !this.extractedEntities.address) {
      this.extractedEntities.address = detectedAddress.slice(0, 80);
    }

    // Extract Voucher / Gift
    if (textLower.includes('voucher') || textLower.includes('mã') || textLower.includes('freeship') || textLower.includes('giảm')) {
      if (textLower.includes('freeship')) this.extractedEntities.voucher = 'FREESHIP25K (Miễn phí vận chuyển)';
      else if (textLower.includes('10%')) this.extractedEntities.voucher = 'GIAM10 (Giảm 10% đơn đầu)';
      else this.extractedEntities.voucher = 'VOUCHER_HOT (Ưu đãi hôm nay)';
    }

    // 1. Check if user wants Human Agent (CSKH)
    if (textLower.includes('gặp nhân viên') || textLower.includes('người thật') || textLower.includes('tổng đài') || textLower.includes('gọi cho tôi') || textLower.includes('cskh') || textLower.includes('nhân viên tư vấn')) {
      this.currentOwner = 'Nhân viên CSKH (Đã chuyển giao)';
      return {
        botReply: `Dạ em đã chuyển cuộc trò chuyện của mình cho chuyên viên tư vấn rồi ạ. Bạn trực tổng đài sẽ phản hồi và hỗ trợ bạn ngay trong giây lát nhé! 👤`,
        activeOwner: this.currentOwner,
        intent: 'Chuyển cho nhân viên CSKH',
        handoverAction: {
          trigger: 'Khách yêu cầu gặp nhân viên trực tiếp',
          targetBlock: agentState.handover?.onHuman || 'Chuyển sang LiveChat nhân viên trực ca',
          resumeTag: 'Sau khi hỗ trợ xong, AI sẽ tiếp tục phục vụ'
        },
        extractedEntities: this.extractedEntities,
        tokenUsage: this.calculateTokens()
      };
    }

    // 2. Check Order Intent
    if (textLower.includes('đặt') || textLower.includes('mua') || textLower.includes('lấy') || textLower.includes('chốt') || (this.extractedEntities.phone && this.extractedEntities.address)) {
      let itemName = 'Sản phẩm khách chọn';
      if (textLower.includes('áo') || textLower.includes('quần') || textLower.includes('váy')) itemName = 'Áo polo thiết kế cao cấp (Size L)';
      else if (textLower.includes('kem') || textLower.includes('serum') || textLower.includes('sữa rửa mặt')) itemName = 'Combo Dưỡng Sáng Da Chuyên Sâu';
      else if (textLower.includes('trà sữa') || textLower.includes('trà')) itemName = 'Trà Sữa Trân Châu Hoàng Kim (Size L, 50% đường, 50% đá)';
      else if (textLower.includes('căn hộ') || textLower.includes('nhà')) itemName = 'Đăng ký tham quan Căn hộ 2PN View Sông';

      if (!this.extractedEntities.items.some(i => i.name === itemName)) {
        this.extractedEntities.items.push({ name: itemName, qty: 1 });
      }

      let reply = `Dạ ${agentState.persona?.agentName || 'Shop'} đã ghi nhận đơn hàng: <strong>${itemName}</strong> của bạn ạ!`;
      if (this.extractedEntities.phone) {
        reply += `<br>📞 Số điện thoại nhận hàng: <strong>${this.extractedEntities.phone}</strong>`;
      }
      if (this.extractedEntities.address) {
        reply += `<br>📍 Địa chỉ giao hàng: <strong>${this.extractedEntities.address}</strong>`;
      }
      reply += `<br>🎉 Hệ thống Smax đang tự động tạo đơn hàng và gửi tin nhắn xác nhận cho bạn nha!`;

      this.currentOwner = 'Smax Tự Động Tạo Đơn (Chân tay)';
      return {
        botReply: reply,
        activeOwner: this.currentOwner,
        intent: 'Tự động tạo đơn hàng',
        handoverAction: {
          trigger: 'Khách hàng hoàn tất thông tin chốt đơn',
          targetBlock: agentState.handover?.onOrder || 'Tự động tạo đơn Smax POS & Gửi VietQR',
          resumeTag: 'Sau 5 phút tự động kích hoạt lại AI'
        },
        extractedEntities: this.extractedEntities,
        tokenUsage: this.calculateTokens()
      };
    }

    // 3. Check Lead Submission (Phone number provided)
    if (this.extractedEntities.phone) {
      this.currentOwner = 'Smax Ghi Nhận Khách Hàng (Chân tay)';
      return {
        botReply: `Dạ ${agentState.persona?.agentName || 'Shop'} đã nhận được số điện thoại <strong>${this.extractedEntities.phone}</strong> của bạn rồi ạ! Chuyên viên bên shop sẽ liên hệ gửi tài liệu chi tiết và ưu đãi riêng cho bạn ngay nhé ạ.`,
        activeOwner: this.currentOwner,
        intent: 'Ghi nhận thông tin khách tiềm năng',
        handoverAction: {
          trigger: 'Khách gửi số điện thoại liên hệ',
          targetBlock: agentState.handover?.onLead || 'Gắn nhãn [Khách Tiềm Năng] & Báo Telegram Sale',
          resumeTag: 'Sau 5 phút tự động kích hoạt lại AI'
        },
        extractedEntities: this.extractedEntities,
        tokenUsage: this.calculateTokens()
      };
    }

    // 4. Default Inquiry / Knowledge Q&A
    this.currentOwner = 'Trợ lý AI (Lễ tân)';
    let reply = `Dạ ${agentState.persona?.agentName || 'Shop'} đã hiểu câu hỏi của bạn. `;
    if (textLower.includes('size') || textLower.includes('chiều cao') || textLower.includes('cân nặng')) {
      reply += `Với chiều cao và cân nặng của bạn, size L hoặc XL là vừa vặn và tôn dáng nhất ạ. Bạn có muốn xem thêm bảng thông số chi tiết không ạ?`;
    } else if (textLower.includes('giá') || textLower.includes('bao nhiêu') || textLower.includes('nhiêu')) {
      reply += `Mẫu này hiện đang có giá ưu đãi là <strong>299.000đ</strong> (giá gốc 380.000đ) và đang được tặng kèm mã miễn phí vận chuyển trong hôm nay nha!`;
    } else if (textLower.includes('đổi') || textLower.includes('trả') || textLower.includes('bảo hành')) {
      reply += `Shop hỗ trợ đổi size và đổi mẫu tận nhà trong 7 ngày hoàn toàn miễn phí, có shipper mang hàng mới đến đổi trực tiếp nên bạn hoàn toàn yên tâm nha.`;
    } else {
      reply += `Sản phẩm này bên shop luôn có sẵn hàng và được bảo đảm chính hãng 100%. Bạn có cần shop tư vấn thêm màu sắc hoặc gửi ưu đãi hôm nay không ạ?`;
    }

    return {
      botReply: reply,
      activeOwner: this.currentOwner,
      intent: 'Tư vấn thông tin sản phẩm',
      handoverAction: null,
      extractedEntities: this.extractedEntities,
      tokenUsage: this.calculateTokens()
    };
  }

  triggerFollowUp(stepKey, agentState) {
    const fu = agentState.followups;
    let target = fu.step1;
    let channelLabel = 'Trong 24 giờ';

    if (stepKey === '2_hours') {
      target = fu.step2;
    } else if (stepKey === '22_hours') {
      target = fu.step3;
    } else if (stepKey === 'outside_24h') {
      target = fu.outside24h;
      channelLabel = 'Ngoài 24 giờ (Tin nhắn tiếp thị)';
    }

    return {
      channelLabel: channelLabel,
      blockName: target.block || 'Kịch bản bám đuổi tự động',
      message: target.message || 'Dạ shop gửi bạn thêm ưu đãi hôm nay nha!',
      activeOwner: 'Smax Tự Động Bám Đuổi (Chân tay)',
      handoverAction: {
        trigger: `Khách im lặng sau ${target.label || '15 phút'}`,
        targetBlock: target.block || 'Gửi tin nhắn bám đuổi',
        resumeTag: 'Sau khi gửi xong, tiếp tục theo dõi'
      }
    };
  }

  triggerGamification(agentState) {
    const g = agentState.gamification;
    return {
      gameName: g.gameName || 'Vòng Quay May Mắn',
      reward: g.reward || 'Voucher giảm 20%',
      message: `🎉 Chúc mừng bạn được tặng 1 lượt tham gia <strong>${g.gameName || 'Vòng Quay May Mắn'}</strong> trúng ${g.reward}!<br><br>👉 <a href="#" style="color:#fa6e5b; font-weight:bold; text-decoration:underline;">Bấm vào đây để quay thưởng ngay</a>`,
      activeOwner: 'Smax Trò Chơi Tương Tác (Chân tay)'
    };
  }

  calculateTokens() {
    const costUSD = ((this.tokenCount / 1000) * 0.0015).toFixed(4);
    const costVND = Math.round((this.tokenCount / 1000) * 0.0015 * 25400);
    return {
      totalTokens: this.tokenCount,
      estimatedCostUSD: costUSD,
      estimatedCostVND: costVND
    };
  }
}

window.metaAgentSimulator = new MetaAgentSimulator();
