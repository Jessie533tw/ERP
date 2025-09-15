# 建置階段 - 使用官方 Node.js 18 映像
FROM node:18-alpine AS build

# 安裝必要的系統依賴
RUN apk add --no-cache python3 make g++

# 設定工作目錄
WORKDIR /app

# 複製 package*.json
COPY package*.json ./

# 安裝依賴
RUN npm install

# 複製所有源碼
COPY . .

# 建置應用程式（跳過型別檢查）
RUN npx vite build

# 生產階段 - 使用 Nginx
FROM nginx:alpine

# 複製建置結果
COPY --from=build /app/dist /usr/share/nginx/html

# 複製 Nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]