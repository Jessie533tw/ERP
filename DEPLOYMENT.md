# 🚀 建設公司ERP系統 - 快速部署指南

## ✅ 系統檢查完成狀態
- ✅ 後端構建成功 (NestJS + TypeORM + PostgreSQL)
- ✅ 前端構建成功 (Vue 3 + Vite)
- ✅ TypeScript 錯誤已修復
- ✅ 所有依賴已安裝
- ✅ Git 倉庫已初始化並提交

## 🎯 立即部署到 Zeabur

### 方法一：GitHub + Zeabur 自動部署（推薦）

1. **推送到 GitHub**
   ```bash
   # 在專案根目錄執行
   git remote add origin https://github.com/YOUR_USERNAME/construction-erp.git
   git push -u origin main
   ```

2. **Zeabur 部署**
   - 前往 [Zeabur 控制台](https://dash.zeabur.com)
   - 點擊 "Create Project"
   - 選擇 "Deploy from GitHub"
   - 選擇剛才推送的倉庫
   - Zeabur 會自動偵測 `zeabur.json` 配置

3. **設定環境變數**
   在 Zeabur 服務設定中加入：

   **Backend 服務:**
   ```
   NODE_ENV=production
   DATABASE_HOST=<zeabur-postgresql-host>
   DATABASE_PORT=5432
   DATABASE_USERNAME=<db-username>
   DATABASE_PASSWORD=<db-password>
   DATABASE_NAME=construction_erp
   REDIS_HOST=<zeabur-redis-host>
   REDIS_PORT=6379
   JWT_SECRET=your-super-secret-jwt-key-2024
   CORS_ORIGIN=https://your-frontend-domain.zeabur.app
   ```

   **Frontend 服務:**
   ```
   VITE_API_URL=https://your-backend-domain.zeabur.app/api
   VITE_WS_URL=wss://your-backend-domain.zeabur.app
   ```

### 方法二：本地命令行部署

1. **登入 Zeabur**
   ```bash
   # 如果在 Windows/WSL，請在 Windows 瀏覽器中訪問登入頁面
   npx zeabur auth login
   # 或使用 token: npx zeabur auth login --token YOUR_TOKEN
   ```

2. **部署專案**
   ```bash
   npx zeabur deploy
   ```

## 🗄️ 資料庫初始化

系統首次啟動後，會自動創建資料表結構。預設管理員帳號：
- 使用者名稱: `admin`
- 密碼: `admin123`

## 🔧 部署後配置

1. **域名設定**
   - Backend: `api.your-domain.com`
   - Frontend: `your-domain.com`

2. **SSL 憑證**
   - Zeabur 自動提供 SSL 憑證

3. **環境變數檢查**
   - 確保所有必要的環境變數都已設定
   - 特別注意 CORS_ORIGIN 要設定正確的前端域名

## 📊 系統監控

部署完成後可以訪問：
- **前端**: https://your-frontend-domain.zeabur.app
- **API 文件**: https://your-backend-domain.zeabur.app/api-docs
- **健康檢查**: https://your-backend-domain.zeabur.app/health

## 🚨 常見問題

1. **構建失敗**
   - 檢查 Node.js 版本 (需要 18+)
   - 確保 package.json 中所有依賴版本正確

2. **資料庫連線錯誤**
   - 確認 DATABASE_* 環境變數設定正確
   - 檢查 PostgreSQL 服務是否正常運行

3. **CORS 錯誤**
   - 確保 CORS_ORIGIN 環境變數包含正確的前端域名

## 🎉 部署完成清單

- [ ] GitHub 倉庫已創建並推送
- [ ] Zeabur 專案已創建
- [ ] 環境變數已設定
- [ ] PostgreSQL 資料庫已連接
- [ ] Redis 快取已連接
- [ ] 前端可以正常訪問
- [ ] API 文件可以正常查看
- [ ] 管理員帳號可以正常登入

---

🤖 Generated with [Claude Code](https://claude.ai/code)