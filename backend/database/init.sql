-- 建設公司發包管理系統資料庫初始化
-- 創建 UUID 擴展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 創建預設角色
INSERT INTO roles (id, name, description, permissions) VALUES
  (uuid_generate_v4(), '系統管理員', '系統管理員，擁有所有權限', '["*"]'),
  (uuid_generate_v4(), '專案經理', '專案經理，管理專案和預算', '["project:*", "budget:*", "inquiry:*", "quotation:read", "purchase:*", "progress:*"]'),
  (uuid_generate_v4(), '採購人員', '採購人員，處理詢價和採購', '["inquiry:*", "quotation:*", "purchase:*", "vendor:*"]'),
  (uuid_generate_v4(), '財務人員', '財務人員，管理預算和付款', '["budget:*", "purchase:read", "project:read"]'),
  (uuid_generate_v4(), '一般使用者', '一般使用者，檢視權限', '["project:read", "budget:read", "inquiry:read", "quotation:read", "purchase:read"]')
ON CONFLICT (name) DO NOTHING;

-- 創建預設預算分類
INSERT INTO budget_categories (id, name, code, level) VALUES
  (uuid_generate_v4(), '材料費', 'MAT', 1),
  (uuid_generate_v4(), '人工費', 'LAB', 1),
  (uuid_generate_v4(), '機械費', 'MAC', 1),
  (uuid_generate_v4(), '管理費', 'ADM', 1),
  (uuid_generate_v4(), '其他費用', 'OTH', 1)
ON CONFLICT (code) DO NOTHING;

-- 創建預設系統設定
INSERT INTO system_settings (key, value, description, category) VALUES
  ('project_code_prefix', '{"prefix": "P", "year": true, "sequence_length": 4}', '專案編號前綴設定', 'project'),
  ('inquiry_code_prefix', '{"prefix": "INQ", "year": true, "sequence_length": 4}', '詢價單編號前綴設定', 'inquiry'),
  ('quotation_code_prefix', '{"prefix": "QUO", "year": true, "sequence_length": 4}', '報價單編號前綴設定', 'quotation'),
  ('po_code_prefix', '{"prefix": "PO", "year": true, "sequence_length": 4}', '採購單編號前綴設定', 'purchase'),
  ('budget_alert_threshold', '{"warning": 80, "critical": 90}', '預算警告門檻設定', 'budget'),
  ('email_templates', '{"budget_alert": "預算使用率已達 {{percentage}}%", "approval_required": "您有新的審核請求"}', 'Email 範本設定', 'notification'),
  ('file_upload_settings', '{"max_file_size": 10485760, "allowed_types": ["pdf", "dwg", "xlsx", "jpg", "png"]}', '檔案上傳設定', 'file')
ON CONFLICT (key) DO NOTHING;

-- 創建預設管理員使用者 (密碼: admin123)
INSERT INTO users (id, username, email, password_hash, full_name, department, position, is_active) VALUES
  (uuid_generate_v4(), 'admin', 'admin@construction-erp.com', '$2b$10$K8QgZj7Y1FWQvZQ1F8QGxOKjHzFZy8X6Y9CgZHGvKmB5JZ3fYQN6u', '系統管理員', 'IT部門', '系統管理員', true)
ON CONFLICT (username) DO NOTHING;

-- 將管理員指派系統管理員角色
INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id FROM users u, roles r
WHERE u.username = 'admin' AND r.name = '系統管理員'
ON CONFLICT (user_id, role_id) DO NOTHING;