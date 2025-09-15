# 🚀 Zeabur 部署步驟指南

## 步驟 1: 登入 Zeabur 並創建專案

1. 前往 [Zeabur Dashboard](https://dash.zeabur.com)
2. 使用 GitHub 帳號登入
3. 點擊 "Create Project"
4. 選擇 "Import from Git"

## 步驟 2: 服務配置

由於我們有 `zeabur.json` 配置文件，Zeabur 會自動偵測並建立以下服務：

### 自動建立的服務：
- ✅ **backend** (Node.js 服務)
- ✅ **frontend** (靜態網站)
- ✅ **database** (PostgreSQL 15)
- ✅ **redis** (Redis 7)

## 步驟 3: 環境變數設定

### Backend 服務環境變數：
```
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
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads
CORS_ORIGIN=https://construction-erp.zeabur.app
ENCRYPTION_KEY=your-32-character-encryption-key-prod
AUDIT_ENABLED=true
AUDIT_RETENTION_DAYS=365
```

### Frontend 服務環境變數：
```
VITE_API_URL=https://construction-erp-backend.zeabur.app/api
VITE_WS_URL=wss://construction-erp-backend.zeabur.app
```

## 步驟 4: 檢查部署狀態

### 後端服務檢查：
```bash
# 健康檢查
curl https://construction-erp-backend.zeabur.app/health

# API 文件
https://construction-erp-backend.zeabur.app/api-docs
```

### 前端服務檢查：
```bash
# 前端訪問
https://construction-erp.zeabur.app
```

## 步驟 5: PostgreSQL 連線測試

Zeabur 會自動提供 PostgreSQL 連線資訊：
- Host: `postgresql.zeabur.internal`
- Port: `5432`
- Database: `construction_erp`
- Username: 自動生成
- Password: 自動生成

## 步驟 6: 查看日誌和調試

### 在 Zeabur Dashboard：
1. 選擇對應的服務
2. 點擊 "Logs" 頁籤
3. 即時查看部署和運行日誌

### 常見問題檢查：
```bash
# 檢查環境變數
echo $DATABASE_HOST
echo $REDIS_HOST

# 檢查網路連通性
ping postgresql.zeabur.internal
ping redis.zeabur.internal
```

## 步驟 7: 域名設定（可選）

### 自訂域名：
1. 在 Zeabur 服務設定中點擊 "Domains"
2. 添加自訂域名
3. 更新 CORS_ORIGIN 和 VITE_API_URL 環境變數

## 🎯 部署完成檢查清單

- [ ] Zeabur 專案已創建
- [ ] 4 個服務已自動建立
- [ ] 環境變數已設定
- [ ] 後端服務健康檢查通過
- [ ] 前端可以正常訪問
- [ ] PostgreSQL 連線正常
- [ ] Redis 連線正常
- [ ] API 文件可以查看
- [ ] 日誌顯示正常

## 🔧 故障排除

### 如果部署失敗：
1. 檢查 Zeabur 日誌
2. 確認環境變數設定正確
3. 檢查 package.json 依賴
4. 確認 Node.js 版本（需要 18+）

### 資料庫連線問題：
1. 確認 DATABASE_* 環境變數
2. 檢查 PostgreSQL 服務狀態
3. 查看後端服務日誌

---

🤖 Generated with [Claude Code](https://claude.ai/code)