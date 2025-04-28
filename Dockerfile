FROM node:20-alpine3.19
ENV NODE_ENV=production

WORKDIR /app

# 先複製 package.json 跟 package-lock.json
COPY package*.json ./

# 安裝完整的依賴（包含 devDependencies，因為 build 需要 typescript）
RUN npm ci

# 再複製其他原始碼
COPY . .

# 編譯 TypeScript
RUN npm run build

# 移除 devDependencies，讓 image 更乾淨
RUN npm prune --production

# 啟動服務
CMD ["node", "dist/index.js"]
