-- 建設公司ERP系統 - PostgreSQL 初始化腳本
-- 🤖 Generated with Claude Code

-- 創建資料庫（如果不存在）
CREATE DATABASE IF NOT EXISTS construction_erp;

-- 連接到資料庫
\c construction_erp;

-- 創建預設角色
INSERT INTO roles (id, name, description, permissions, created_at, updated_at) VALUES
('role-admin', '系統管理員', '具有所有系統權限的管理員角色',
 '["user:read", "user:write", "user:delete", "project:read", "project:write", "project:delete", "budget:read", "budget:write", "budget:delete", "inquiry:read", "inquiry:write", "inquiry:delete", "quotation:read", "quotation:write", "quotation:delete", "purchase:read", "purchase:write", "purchase:delete", "vendor:read", "vendor:write", "vendor:delete", "report:read", "system:admin"]',
 NOW(), NOW()),
('role-manager', '專案經理', '負責專案管理和預算控制的角色',
 '["project:read", "project:write", "budget:read", "budget:write", "inquiry:read", "inquiry:write", "quotation:read", "quotation:write", "vendor:read", "report:read"]',
 NOW(), NOW()),
('role-purchaser', '採購人員', '負責詢價採購的角色',
 '["inquiry:read", "inquiry:write", "quotation:read", "quotation:write", "purchase:read", "purchase:write", "vendor:read", "vendor:write"]',
 NOW(), NOW()),
('role-viewer', '查看者', '只能查看相關資訊的角色',
 '["project:read", "budget:read", "inquiry:read", "quotation:read", "purchase:read", "vendor:read", "report:read"]',
 NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 創建預設管理員用戶
INSERT INTO users (id, username, email, password_hash, full_name, role_id, is_active, is_verified, created_at, updated_at) VALUES
('user-admin', 'admin', 'admin@construction-erp.com', '$2b$10$CwTycUXWue0Thq9StjUM0uOONNKLZrNE.c2NTRbA7Pb7RFZKl4x.G', '系統管理員', 'role-admin', true, true, NOW(), NOW())
ON CONFLICT (username) DO NOTHING;

-- 創建預設預算類別
INSERT INTO budget_categories (id, name, description, created_at, updated_at) VALUES
('budget-cat-material', '材料費', '工程所需的各種材料成本', NOW(), NOW()),
('budget-cat-labor', '人工費', '施工人員的工資和勞務費用', NOW(), NOW()),
('budget-cat-equipment', '設備費', '施工設備租賃和購置費用', NOW(), NOW()),
('budget-cat-transport', '運輸費', '材料和設備的運輸費用', NOW(), NOW()),
('budget-cat-other', '其他費用', '其他雜項費用', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 創建系統設定
INSERT INTO system_settings (key, value, description, created_at, updated_at) VALUES
('system.name', '建設公司發包管理系統', '系統名稱', NOW(), NOW()),
('system.version', '1.0.0', '系統版本', NOW(), NOW()),
('system.company', '建設公司', '公司名稱', NOW(), NOW()),
('project.code.prefix', 'PRJ', '專案編號前綴', NOW(), NOW()),
('inquiry.code.prefix', 'INQ', '詢價單編號前綴', NOW(), NOW()),
('purchase.code.prefix', 'PO', '採購單編號前綴', NOW(), NOW()),
('budget.currency', 'TWD', '預算幣別', NOW(), NOW()),
('notification.email.enabled', 'true', '是否啟用郵件通知', NOW(), NOW()),
('audit.retention.days', '365', '審計日誌保留天數', NOW(), NOW())
ON CONFLICT (key) DO NOTHING;

-- 創建測試專案（可選）
INSERT INTO projects (id, name, code, description, status, start_date, expected_end_date, budget_amount, manager_id, created_by, created_at, updated_at) VALUES
('project-demo', '示範專案', 'PRJ-DEMO-001', '這是一個示範專案，展示系統功能', 'PLANNING', CURRENT_DATE, CURRENT_DATE + INTERVAL '90 days', 1000000.00, 'user-admin', 'user-admin', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- 顯示初始化結果
SELECT 'Database initialization completed successfully!' as status;
SELECT COUNT(*) as role_count FROM roles;
SELECT COUNT(*) as user_count FROM users;
SELECT COUNT(*) as category_count FROM budget_categories;
SELECT COUNT(*) as setting_count FROM system_settings;
SELECT COUNT(*) as project_count FROM projects;