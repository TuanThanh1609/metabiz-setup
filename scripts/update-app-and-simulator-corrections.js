const fs = require('fs');
const path = require('path');

// 1. UPDATE src/js/simulator.js to track lastUserMessage and support trained Few-Shot overrides
const simPath = path.join(__dirname, '../src/js/simulator.js');
let simCode = fs.readFileSync(simPath, 'utf8');

const simProcessTarget = `  processUserMessage(userText, agentState) {
    const textLower = userText.toLowerCase();
    this.tokenCount += Math.floor(userText.length / 3) + 120; // Simulated token count`;

const simProcessReplacement = `  processUserMessage(userText, agentState) {
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
    }`;

simCode = simCode.replace(simProcessTarget, simProcessReplacement);
fs.writeFileSync(simPath, simCode, 'utf8');
console.log('src/js/simulator.js updated successfully!');

// 2. UPDATE src/js/app.js
const appPath = path.join(__dirname, '../src/js/app.js');
let appCode = fs.readFileSync(appPath, 'utf8');

// A. Quick Chat Drawer AI Reply with Teach Chip & Few-Shot lookup
const sendQuickChatTarget = `      const agent = this.activeQuickChatAgent;
      let reply = '';
      if (text.toLowerCase().includes('size') || text.toLowerCase().includes('áo')) {
        reply = 'Dạ mẫu Áo polo nam classic cotton bên em có đủ size M (50-60kg), L (60-70kg), XL (70-80kg). Bạn cho mình xin chiều cao và cân nặng để mình chọn size vừa vặn nhất cho bạn nhé!';
      } else if (text.toLowerCase().includes('giá') || text.toLowerCase().includes('khuyến mãi')) {
        reply = 'Dạ hiện tại shop đang có chương trình khuyến mãi tháng 8: Giảm ngay 15% cho đơn từ 2 sản phẩm và tặng mã Freeship 25k ạ!';
      } else if (text.toLowerCase().includes('da') || text.toLowerCase().includes('mụn') || text.toLowerCase().includes('serum')) {
        reply = 'Dạ Serum B5 phục hồi rau má 30ml bên em chiết xuất 100% tự nhiên, dịu nhẹ cho mọi loại da, đặc biệt là da dầu mụn và nhạy cảm. Giá ưu đãi hôm nay là 450.000₫/chai ạ!';
      } else {
        reply = \`Dạ em đã ghi nhận thông tin về "\${text}". Trợ lý AI \${agent ? agent.name : ''} đã đối chiếu tài liệu kho tri thức RAG và sẵn sàng hỗ trợ bạn ngay ạ! Bạn có cần em tạo đơn hàng hoặc gửi ảnh chi tiết không ạ?\`;
      }

      aiBubble.innerHTML = \`
        <div style="font-weight: 700; font-size: 11.5px; color: #eb6553; margin-bottom: 4px;">\${agent ? agent.name : 'Trợ lý AI'}</div>
        \${reply}
      \`;`;

const sendQuickChatReplacement = `      const agent = this.activeQuickChatAgent;
      let reply = '';

      // Check if user query matches any Few-Shot trained override
      let trainedMatch = null;
      if (typeof tabsApp !== 'undefined' && tabsApp.responseCorrectionsList) {
        trainedMatch = tabsApp.responseCorrectionsList.find(c => 
          c.status === 'active' && 
          c.agentId === (agent?.id || 'agent-1') && 
          text.toLowerCase().includes(c.userQuery.toLowerCase().slice(0, 15))
        );
      }

      if (trainedMatch) {
        reply = trainedMatch.idealAnswer;
      } else if (text.toLowerCase().includes('size') || text.toLowerCase().includes('áo')) {
        reply = 'Dạ mẫu Áo polo nam classic cotton bên em có đủ size M (50-60kg), L (60-70kg), XL (70-80kg). Bạn cho mình xin chiều cao và cân nặng để mình chọn size vừa vặn nhất cho bạn nhé!';
      } else if (text.toLowerCase().includes('giá') || text.toLowerCase().includes('khuyến mãi') || text.toLowerCase().includes('freeship')) {
        reply = 'Dạ hiện tại shop đang có chương trình khuyến mãi tháng 8: Giảm ngay 15% cho đơn từ 2 sản phẩm và tặng mã Freeship 25k ạ!';
      } else if (text.toLowerCase().includes('da') || text.toLowerCase().includes('mụn') || text.toLowerCase().includes('serum')) {
        reply = 'Dạ Serum B5 phục hồi rau má 30ml bên em chiết xuất 100% tự nhiên, dịu nhẹ cho mọi loại da, đặc biệt là da dầu mụn và nhạy cảm. Giá ưu đãi hôm nay là 450.000₫/chai ạ!';
      } else {
        reply = \`Dạ em đã ghi nhận thông tin về "\${text}". Trợ lý AI \${agent ? agent.name : ''} đã đối chiếu tài liệu kho tri thức RAG và sẵn sàng hỗ trợ bạn ngay ạ! Bạn có cần em tạo đơn hàng hoặc gửi ảnh chi tiết không ạ?\`;
      }

      const encodedQuery = encodeURIComponent(text);
      const encodedReply = encodeURIComponent(reply);
      const targetAgentId = agent?.id || 'agent-1';

      aiBubble.innerHTML = \`
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
          <span style="font-weight: 700; font-size: 11.5px; color: #eb6553;">\${agent ? agent.name : 'Trợ lý AI'}</span>
          \${trainedMatch ? '<span style="font-size: 10px; font-weight: 700; color: #15803d; background: #dcfce7; padding: 1px 6px; border-radius: 100px;">✓ Câu đã huấn luyện</span>' : ''}
        </div>
        <div>\${reply}</div>
        <div style="margin-top: 8px; padding-top: 6px; border-top: 1px dashed #e2e8f0; display: flex; justify-content: flex-end;">
          <button class="smax-btn-teach-chip" onclick="app.openQuickTeachFromDrawer('\${encodedQuery}', '\${encodedReply}', '\${targetAgentId}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <span>Sửa câu này / Dạy AI</span>
          </button>
        </div>
      \`;`;

appCode = appCode.replace(sendQuickChatTarget, sendQuickChatReplacement);

// B. Add openQuickTeachFromDrawer and openQuickTeachFromPlayground methods
const bindStep1Target = `  // --- Step 1: Channel Connection Management (Image 1) ---`;

const teachDrawerMethods = `  // --- TEACH AI FROM QUICK CHAT DRAWER & PLAYGROUND ---
  openQuickTeachFromDrawer(encodedQuery, encodedReply, agentId) {
    const query = decodeURIComponent(encodedQuery || '');
    const reply = decodeURIComponent(encodedReply || '');

    if (typeof tabsApp !== 'undefined') {
      tabsApp.openTeachAiModal(null, null);
      const selectAgent = document.getElementById('selectTeachAgent');
      const textareaQuery = document.getElementById('textareaTeachUserQuery');
      const displayWrong = document.getElementById('displayTeachWrongAnswer');
      const groupWrong = document.getElementById('teachWrongAnswerGroup');
      const textareaIdeal = document.getElementById('textareaTeachIdealAnswer');

      if (selectAgent) selectAgent.value = agentId || 'agent-1';
      if (textareaQuery) textareaQuery.value = query;
      if (displayWrong) displayWrong.innerText = reply;
      if (groupWrong) groupWrong.style.display = 'block';
      if (textareaIdeal) {
        textareaIdeal.value = reply;
        textareaIdeal.focus();
      }
    }
  }

  openQuickTeachFromPlayground(encodedQuery, encodedReply) {
    this.openQuickTeachFromDrawer(encodedQuery, encodedReply, 'agent-1');
  }

  // --- Step 1: Channel Connection Management (Image 1) ---`;

appCode = appCode.replace(bindStep1Target, teachDrawerMethods);

// C. Update appendMessage in Playground to add teach button
const appendMsgTarget = `    row.innerHTML = \`
      <div class="smax-msg-bubble">
        \${text.replace(/\\n/g, '<br>')}
        <div class="smax-msg-time">\${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
      </div>
    \`;`;

const appendMsgReplacement = `    let teachBtnHtml = '';
    if (sender === 'bot') {
      const lastUserMsg = window.metaAgentSimulator?.lastUserMessage || 'Câu hỏi khách hàng';
      const encQ = encodeURIComponent(lastUserMsg);
      const encR = encodeURIComponent(text);
      teachBtnHtml = \`
        <div style="margin-top: 6px; padding-top: 6px; border-top: 1px dashed rgba(0,0,0,0.08); display: flex; justify-content: flex-end;">
          <button class="smax-btn-teach-chip" onclick="app.openQuickTeachFromPlayground('\${encQ}', '\${encR}')">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            <span>Sửa câu này / Dạy AI</span>
          </button>
        </div>
      \`;
    }

    row.innerHTML = \`
      <div class="smax-msg-bubble">
        \${text.replace(/\\n/g, '<br>')}
        <div class="smax-msg-time">\${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
        \${teachBtnHtml}
      </div>
    \`;`;

appCode = appCode.replace(appendMsgTarget, appendMsgReplacement);

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('src/js/app.js updated successfully with quick teach buttons and few-shot integration!');
