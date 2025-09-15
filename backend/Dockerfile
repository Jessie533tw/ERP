# 建設公司ERP系統 - Backend Dockerfile
# 🤖 Generated with Claude Code

# 使用 Node.js 18 官方映像檔
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製 package*.json 檔案
COPY package*.json ./

# 安裝依賴
RUN npm ci --only=production && npm cache clean --force

# 複製專案源碼
COPY . .

# 建置應用程式
RUN npm run build

# 暴露端口
EXPOSE 3000

# 設定健康檢查
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# 啟動應用程式
CMD ["npm", "run", "start:prod"]