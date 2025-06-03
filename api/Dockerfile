# Stage 1
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2
FROM node:18

WORKDIR /app
COPY --from=builder /app .

# ✅ Instalar docker CLI
RUN apt-get update && apt-get install -y docker.io

RUN npm install -g ts-node typescript
CMD ["ts-node", "src/index.ts"]
