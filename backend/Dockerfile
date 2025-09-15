# 使用官方 Node.js 18 映像
FROM node:18-alpine

# 安裝必要的系統依賴
RUN apk add --no-cache python3 make g++ curl

# 設定工作目錄
WORKDIR /app

# 複製 package*.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有源碼
COPY . .

# 建置應用程式
RUN npm run build

# 暴露端口
EXPOSE 3000

# 健康檢查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# 啟動生產模式
CMD ["npm", "run", "start:prod"]