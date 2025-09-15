#!/bin/bash

# 建設公司ERP系統 - 一鍵部署腳本
# 🤖 Generated with Claude Code

echo "🚀 開始部署建設公司ERP管理系統..."

# 檢查是否在正確的目錄
if [ ! -f "zeabur.json" ]; then
    echo "❌ 請在專案根目錄執行此腳本"
    exit 1
fi

# 檢查 Git 狀態
echo "📝 檢查 Git 狀態..."
if [ ! -d ".git" ]; then
    echo "❌ Git 倉庫未初始化"
    exit 1
fi

# 檢查是否有未提交的變更
if [ -n "$(git status --porcelain)" ]; then
    echo "⚠️  有未提交的變更，正在提交..."
    git add .
    git commit -m "Pre-deployment updates

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>"
fi

# 檢查遠端倉庫
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "❌ 請先設定 GitHub 遠端倉庫:"
    echo "   git remote add origin https://github.com/YOUR_USERNAME/construction-erp.git"
    exit 1
fi

# 推送到 GitHub
echo "📤 推送到 GitHub..."
git push -u origin main

# 嘗試使用 Zeabur CLI 部署
echo "🔧 嘗試使用 Zeabur CLI 部署..."
if command -v zeabur >/dev/null 2>&1; then
    zeabur deploy
else
    echo "📦 安裝 Zeabur CLI..."
    npm install -g @zeabur/cli

    echo "🔑 請先登入 Zeabur:"
    echo "   zeabur auth login"
    echo ""
    echo "然後執行部署:"
    echo "   zeabur deploy"
fi

echo ""
echo "✅ 部署腳本執行完成！"
echo ""
echo "📋 接下來的步驟:"
echo "1. 前往 Zeabur 控制台設定環境變數"
echo "2. 確保 PostgreSQL 和 Redis 服務正常運行"
echo "3. 檢查前後端服務部署狀態"
echo ""
echo "🔗 有用的連結:"
echo "   Zeabur 控制台: https://dash.zeabur.com"
echo "   部署指南: ./DEPLOYMENT.md"
echo ""
echo "🤖 Generated with Claude Code"