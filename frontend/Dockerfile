# 建設公司ERP系統 - Frontend Dockerfile
# 🤖 Generated with Claude Code

# 建置階段
FROM node:18-alpine AS build

# 設定工作目錄
WORKDIR /app

# 複製 package*.json 檔案
COPY package*.json ./

# 安裝依賴
RUN npm ci && npm cache clean --force

# 複製專案源碼
COPY . .

# 建置應用程式
RUN npm run build

# 生產階段
FROM nginx:alpine

# 複製建置結果到 Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 複製 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]