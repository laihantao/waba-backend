# Stage 1: Build Stage (使用一个完整的 Node 镜像来安装依赖)
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖。由于您的 EC2 在 SG，可能需要设置 npm registry 镜像加速。
RUN npm install

# 复制项目代码
COPY . .

# Stage 2: Production Stage (使用一个更小的 Alpine 镜像来运行，减少体积)
FROM node:20-alpine

# 设置工作目录
WORKDIR /usr/src/app

# 复制 Build Stage 中安装好的依赖和代码
COPY --from=builder /usr/src/app .

# 暴露 Node.js 监听的端口 (例如 3000 或 8080)
EXPOSE 80:3000

# 启动 Node.js 应用
CMD ["npm", "start"]