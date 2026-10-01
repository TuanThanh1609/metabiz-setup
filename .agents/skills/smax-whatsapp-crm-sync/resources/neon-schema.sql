-- =====================================================================
-- SMAX WHATSAPP CRM SCHEMA (NEON SERVERLESS POSTGRES)
-- Multi-tenant Architecture: Projects + Leads + 7-Step Funnel + Meta Ads + BotAPI
-- =====================================================================

-- 1. PROJECTS TABLE (Quản lý đa dự án / Multi-tenant)
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(50) PRIMARY KEY,              -- Slug URL (e.g. 'fitgum', 'abera')
  name VARCHAR(150) NOT NULL,              -- Tên dự án (e.g. 'Fitgum Acai Berry Drink Malaysia')
  currency VARCHAR(10) DEFAULT 'RM',       -- Tiền tệ (e.g. 'RM', 'VND', 'IDR')
  smax_biz VARCHAR(100) NOT NULL,          -- Smax Biz Alias (e.g. 'phuong-hoang')
  smax_page_pid VARCHAR(100) NOT NULL,     -- Smax WhatsApp Page PID (e.g. 'wa1241941005679303')
  access_pin VARCHAR(20) DEFAULT '1609',   -- Mã PIN bảo mật truy cập CRM khách hàng
  botapi_success_url TEXT,                 -- URL trigger BotAPI gắn tag Thành công
  botapi_success_token TEXT,               -- Token trigger BotAPI gắn tag Thành công
  botapi_demand_url TEXT,                  -- URL trigger BotAPI gắn tag Có nhu cầu
  botapi_demand_token TEXT,                -- Token trigger BotAPI gắn tag Có nhu cầu
  -- AI Server Token.ai (GPT-5) Configuration
  ai_endpoint TEXT DEFAULT 'https://token.ai.vn/v1',
  ai_token TEXT DEFAULT 'sk-LEd49hmmEG9L4kB_aYYGhHHJirAsbtLkmyNReBe_yYgv3IRtAIhp8vJ_hjE',
  ai_model VARCHAR(50) DEFAULT 'gpt-5',
  ai_enabled BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. LEADS TABLE (Chi tiết hội thoại & phân loại chuyển đổi)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  project_id VARCHAR(50) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  tid VARCHAR(100) NOT NULL,               -- WhatsApp Thread ID trên Smax (e.g. 'waMY.1529541145646328')
  customer_name VARCHAR(255),              -- Tên khách hàng từ WhatsApp Profile
  phone VARCHAR(50),                       -- Số điện thoại khách hàng (có mã quốc gia)
  ad_id VARCHAR(100),                      -- Mã Meta Click-to-WhatsApp Ad ID
  total_messages INT DEFAULT 0,            -- Tổng số tin nhắn thực tế (sau lọc tin rác)
  customer_messages INT DEFAULT 0,         -- Số tin nhắn do khách hàng gửi
  main_intent VARCHAR(255),                -- Nhu cầu cốt lõi (tóm tắt bằng AI / Rule)
  conversation_result VARCHAR(50),         -- Trạng thái: 'Đã chốt đơn' | 'Có nhu cầu' | 'Đang tư vấn' | 'Chưa phản hồi'
  order_combo VARCHAR(255),                -- Combo sản phẩm đã chốt (e.g. 'Combo 1 (Buy 3 Get 3 FREE)')
  order_amount NUMERIC(12,2) DEFAULT 0,    -- Giá trị đơn hàng thu hộ COD
  order_details TEXT,                      -- Chi tiết đơn hàng: Sản phẩm, Họ tên, SĐT, Địa chỉ giao
  dropoff_reason TEXT,                     -- Điểm nghẽn rớt khách (e.g. 'Khách im lặng sau khi báo giá')
  last_customer_msg TEXT,                  -- Tin nhắn mới nhất khách hàng gửi
  last_ai_msg TEXT,                        -- Tin nhắn mới nhất AI gửi
  key_evidence TEXT,                       -- Bằng chứng trích dẫn nguyên văn / Địa chỉ giao hàng
  first_msg_at TIMESTAMPTZ,                -- Thời gian phát sinh tin nhắn đầu tiên
  last_msg_at TIMESTAMPTZ,                 -- Thời gian phát sinh tin nhắn mới nhất
  updated_at TIMESTAMPTZ DEFAULT NOW(),    -- Thời gian hệ thống cập nhật bản ghi
  raw_transcript JSONB,                    -- Lịch sử tin nhắn trò chuyện (Array of objects)
  tags JSONB DEFAULT '[]'::jsonb,          -- Mảng nhãn tag (e.g. ["co_nhu_cau"])
  tagged_success_at TIMESTAMPTZ,           -- Timestamp gọi BotAPI gắn tag 'Thành công' (Chống spam)
  tagged_demand_at TIMESTAMPTZ,            -- Timestamp gọi BotAPI gắn tag 'Có nhu cầu' (Chống spam)
  funnel_step VARCHAR(100),                -- Nhãn 7 bước phễu (e.g. 'Step 4: Báo giá & Combo')
  funnel_step_num INT DEFAULT 1,           -- Số thứ tự bước phễu (1 đến 7)
  ai_analyzed_at TIMESTAMPTZ,              -- Timestamp lần cuối phân tích bằng Token.ai GPT-5
  ai_raw_analysis JSONB,                   -- Toàn bộ kết quả phân tích JSON trả về từ GPT-5
  CONSTRAINT uq_project_tid UNIQUE (project_id, tid)
);

-- 3. META ADS INSIGHTS TABLE (Hứng dữ liệu quảng cáo từ Smax API Connector)
CREATE TABLE IF NOT EXISTS meta_ads_insights (
  id BIGSERIAL PRIMARY KEY,
  project_id VARCHAR(50) NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  account_id VARCHAR(100) DEFAULT '',
  campaign_id VARCHAR(100) DEFAULT '',
  campaign_name TEXT DEFAULT '',
  adset_id VARCHAR(100) DEFAULT '',
  adset_name TEXT DEFAULT '',
  ad_id VARCHAR(100) DEFAULT '',
  ad_name TEXT DEFAULT '',
  actions NUMERIC(14, 2) DEFAULT 0,
  spend NUMERIC(14, 2) DEFAULT 0,
  click_rate NUMERIC(8, 4) DEFAULT 0,
  cpc NUMERIC(14, 4) DEFAULT 0,
  reach BIGINT DEFAULT 0,
  frequency NUMERIC(8, 4) DEFAULT 1.0,
  inline_link_clicks INTEGER DEFAULT 0,
  inline_post_engagement INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  impressions BIGINT DEFAULT 0,
  cpm NUMERIC(14, 4) DEFAULT 0,
  raw_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_meta_ads_entry UNIQUE (project_id, date, ad_id, adset_id, campaign_id)
);

-- 4. INDEXES FOR ULTRA-FAST PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_leads_project_updated ON leads (project_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_project_last_msg ON leads (project_id, last_msg_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_project_result ON leads (project_id, conversation_result);
CREATE INDEX IF NOT EXISTS idx_leads_project_funnel ON leads (project_id, funnel_step_num);
CREATE INDEX IF NOT EXISTS idx_leads_project_ad_id ON leads (project_id, ad_id);
CREATE INDEX IF NOT EXISTS idx_leads_tagged_success ON leads (project_id, tagged_success_at) WHERE tagged_success_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_leads_tagged_demand ON leads (project_id, tagged_demand_at) WHERE tagged_demand_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_meta_ads_project_ad_id ON meta_ads_insights (project_id, ad_id);
CREATE INDEX IF NOT EXISTS idx_meta_ads_project_date ON meta_ads_insights (project_id, date DESC);
CREATE INDEX IF NOT EXISTS idx_meta_ads_project_campaign ON meta_ads_insights (project_id, campaign_id);
