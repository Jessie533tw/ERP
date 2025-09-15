# 建設公司發包管理系統

一個專為建設公司設計的現代化發包管理系統，提供完整的專案管理、預算控制、詢價採購、進度追蹤等功能。

## 🚀 系統特色

### 核心功能
- **專案與預算管理** - 新建專案自動建立預算表，支援審核流程，預算超支警示
- **詢價單生成** - 根據工程圖自動生成詢價單，發送給多個廠商，版本管理
- **智能報價比較** - 自動整理各廠商報價，生成比較分析報告，機器學習預測趨勢
- **採購單管理** - 選定廠商後生成採購單，自動扣除預算並追蹤交期，延遲預警
- **進度追蹤系統** - 根據採購單自動生成施工進度表，監控實際 vs 預期進度
- **自動化通知** - 各階段自動生成報告並發送給相關人員，即時推播通知

### 技術亮點
- **類 Ragic 表格體驗** - 虛擬滾動、即時編輯、拖拽排序
- **檔案版本控制** - 支援 CAD、PDF、圖片等多格式，線上預覽
- **WebSocket 即時通知** - 即時推播，多渠道通知整合
- **多因素身份驗證** - TOTP 二步驟驗證，企業級安全
- **完整審計日誌** - 所有操作自動記錄，支援合規性要求
- **RBAC 權限控制** - 細粒度權限管控，角色繼承

## 🏗️ 技術架構

### 前端
- Vue 3 + TypeScript + Composition API
- Element Plus + Tailwind CSS
- AG Grid (表格) + ECharts (圖表)
- Pinia (狀態管理) + Vue Router 4
- WebSocket + Axios

### 後端
- NestJS + TypeORM + PostgreSQL
- Redis + BullMQ (任務排程)
- JWT + Passport (認證)
- Winston (日誌) + Swagger (API 文件)
- WebSocket + Multer (檔案上傳)

### 部署
- Zeabur 雲端部署
- Docker 容器化
- GitHub Actions CI/CD
- 前後端分離架構

## 📦 快速開始

### 前置要求
- Node.js 18+
- PostgreSQL 15+
- Redis 7+
- Docker (可選)

### 本地開發

1. **複製專案**
   ```bash
   git clone <repository-url>
   cd construction-erp
   ```

2. **使用 Docker 快速啟動**
   ```bash
   docker-compose up -d
   ```

3. **手動啟動**

   **後端設定**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # 編輯 .env 設定資料庫連線資訊
   npm run start:dev
   ```

   **前端設定**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### 預設帳號
- 使用者名稱：`admin`
- 密碼：`admin123`

## 📚 API 文件

啟動後端後，可以在以下位址查看 API 文件：
- 開發環境: http://localhost:3000/api-docs
- 健康檢查: http://localhost:3000/health

## 🚀 部署到 Zeabur

1. **安裝 Zeabur CLI**
   ```bash
   npm install -g @zeabur/cli
   ```

2. **登入 Zeabur**
   ```bash
   zeabur auth login
   ```

3. **部署專案**
   ```bash
   zeabur deploy
   ```

### 環境變數設定

在 Zeabur 控制台設定以下環境變數：

**後端服務 (backend)**
- `NODE_ENV`: production
- `DATABASE_HOST`: (Zeabur PostgreSQL 主機)
- `DATABASE_PORT`: 5432
- `DATABASE_USERNAME`: (資料庫使用者名稱)
- `DATABASE_PASSWORD`: (資料庫密碼)
- `DATABASE_NAME`: construction_erp
- `REDIS_HOST`: (Zeabur Redis 主機)
- `REDIS_PORT`: 6379
- `JWT_SECRET`: (請設定強密碼)
- `CORS_ORIGIN`: https://your-frontend-domain.zeabur.app

**前端服務 (frontend)**
- `VITE_API_URL`: https://your-backend-domain.zeabur.app/api
- `VITE_WS_URL`: wss://your-backend-domain.zeabur.app

## 📁 專案結構

```
construction-erp/
├── frontend/          # Vue 3 前端應用
│   ├── src/
│   │   ├── components/    # 共用組件
│   │   ├── modules/       # 業務模組
│   │   ├── composables/   # 組合式函數
│   │   ├── stores/        # Pinia 狀態管理
│   │   └── utils/         # 工具函數
│   └── index.html         # 範例展示頁面
├── backend/           # NestJS 後端應用
│   ├── src/
│   │   ├── modules/       # 業務模組
│   │   ├── entities/      # 資料庫實體
│   │   ├── common/        # 共用模組
│   │   └── config/        # 配置檔案
│   └── database/          # 資料庫腳本
├── docs/              # 專案文件
├── scripts/           # 部署腳本
└── .github/           # CI/CD 配置
```

## 🔧 開發指南

### 資料庫設計
系統包含 17 個核心實體，覆蓋完整業務流程：
- 使用者管理 (users, roles)
- 專案管理 (projects, project_budgets)
- 詢價採購 (inquiries, quotations, purchase_orders)
- 進度追蹤 (project_progress)
- 系統功能 (notifications, audit_logs, file_attachments)

### API 設計原則
- RESTful API 設計
- 統一回應格式
- JWT 認證機制
- 權限分級控制
- 完整錯誤處理

### 前端架構
- 組合式 API 優先
- 模組化設計
- 響應式開發
- 類型安全 (TypeScript)
- 效能優化 (虛擬滾動、懶載入)

## 📖 文件

- [API 文件](./docs/api/README.md)
- [資料庫設計](./docs/database/README.md)
- [部署指南](./docs/deployment/README.md)
- [開發指南](./docs/development/README.md)

## 🤝 貢獻

歡迎提交 Issue 和 Pull Request 來幫助改善這個專案。

## 📄 授權

此專案採用 MIT 授權條款。

---

🔧 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>