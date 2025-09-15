# 🚀 Zeabur 部署檢查清單

## ✅ 部署前檢查

### 1. GitHub 推送
- [ ] 已設定遠端倉庫：`https://github.com/jessie533tw/ERP.git`
- [ ] 需要手動推送代碼到 GitHub（由於 WSL 認證限制）

**解決方案：**
```bash
# 選項 1: 使用 Personal Access Token
git remote set-url origin https://YOUR_TOKEN@github.com/jessie533tw/ERP.git
git push -u origin main

# 選項 2: 手動上傳
# 將整個專案資料夾壓縮上傳到 GitHub
```

### 2. Zeabur 服務設定
- [ ] 前往 [Zeabur Dashboard](https://dash.zeabur.com)
- [ ] 創建新專案
- [ ] 連接 GitHub 倉庫：`jessie533tw/ERP`
- [ ] 確認自動檢測到 4 個服務：
  - ✅ backend (Node.js)
  - ✅ frontend (Static)
  - ✅ database (PostgreSQL 15)
  - ✅ redis (Redis 7)

### 3. 環境變數配置

#### Backend 服務：
```env
NODE_ENV=production
PORT=3000
DATABASE_HOST=${ZEABUR_POSTGRESQL_HOST}
DATABASE_PORT=5432
DATABASE_USERNAME=${ZEABUR_POSTGRESQL_USERNAME}
DATABASE_PASSWORD=${ZEABUR_POSTGRESQL_PASSWORD}
DATABASE_NAME=construction_erp
REDIS_HOST=${ZEABUR_REDIS_HOST}
REDIS_PORT=6379
JWT_SECRET=your-super-secret-jwt-key-production-2024
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://YOUR_FRONTEND_DOMAIN.zeabur.app
ENCRYPTION_KEY=32-character-encryption-key-prod-123
AUDIT_ENABLED=true
AUDIT_RETENTION_DAYS=365
```

#### Frontend 服務：
```env
VITE_API_URL=https://YOUR_BACKEND_DOMAIN.zeabur.app/api
VITE_WS_URL=wss://YOUR_BACKEND_DOMAIN.zeabur.app
```

### 4. 部署檢查

#### 後端服務：
- [ ] 服務啟動成功
- [ ] 健康檢查通過：`GET /health`
- [ ] API 文件可訪問：`/api-docs`
- [ ] 資料庫連線正常
- [ ] Redis 連線正常

**檢查命令：**
```bash
# 健康檢查
curl https://YOUR_BACKEND_DOMAIN.zeabur.app/health

# 資料庫連線測試（查看日誌）
# 應該看到 TypeORM 連線成功訊息
```

#### 前端服務：
- [ ] 靜態檔案部署成功
- [ ] 網站可以正常訪問
- [ ] API 請求可以連接到後端
- [ ] 登入功能正常

### 5. 資料庫初始化
- [ ] 後端啟動時自動建立資料表
- [ ] 執行初始化腳本（可選）：
```sql
-- 使用 database-init.sql 創建預設資料
-- 包含：管理員帳號、角色、預算類別、系統設定
```

### 6. 功能測試

#### 基本功能：
- [ ] 管理員登入：`admin` / `admin123`
- [ ] API 文件瀏覽
- [ ] 使用者管理
- [ ] 專案管理
- [ ] 即時通知（WebSocket）

#### 進階功能：
- [ ] 檔案上傳
- [ ] 資料匯出
- [ ] 審計日誌
- [ ] 權限控制

### 7. 監控和日誌

#### Zeabur 控制台：
- [ ] 檢查各服務運行狀態
- [ ] 查看部署日誌
- [ ] 監控資源使用情況
- [ ] 設定自動重啟（如需要）

#### 日誌檢查重點：
```log
# 成功啟動的關鍵訊息
✅ TypeORM 資料庫連線成功
✅ Redis 連線成功
✅ 應用程式已啟動於 port 3000
✅ Swagger API 文件已設置
✅ WebSocket 服務已啟動
```

### 8. 域名和 SSL

#### 自訂域名（可選）：
- [ ] 設定自訂域名
- [ ] 更新 CORS 設定
- [ ] 更新前端 API URL
- [ ] SSL 憑證自動配置

### 9. 生產環境優化

#### 安全設定：
- [ ] 更改預設管理員密碼
- [ ] 設定強密碼策略
- [ ] 啟用 MFA 二步驗證
- [ ] 檢查 CORS 設定

#### 效能優化：
- [ ] 資料庫索引優化
- [ ] Redis 快取策略
- [ ] 檔案上傳限制
- [ ] API 速率限制

## 🚨 常見問題排除

### 部署失敗：
1. 檢查 Node.js 版本（需要 18+）
2. 確認 package.json 依賴完整
3. 查看 Zeabur 建置日誌

### 資料庫連線失敗：
1. 確認環境變數設定正確
2. 檢查 PostgreSQL 服務狀態
3. 查看後端服務日誌

### 前端無法連接後端：
1. 檢查 CORS 設定
2. 確認 API URL 正確
3. 檢查網路連通性

### WebSocket 連線問題：
1. 確認 WebSocket URL 設定
2. 檢查防火牆設定
3. 查看瀏覽器網路請求

## 📞 支援聯絡

- Zeabur 文件：https://docs.zeabur.com
- GitHub Issues：https://github.com/jessie533tw/ERP/issues

---

🤖 Generated with [Claude Code](https://claude.ai/code)