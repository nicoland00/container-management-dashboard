# ui/Dockerfile

# ======= Etapa 1: build con Vite ========
FROM node:18 AS builder
WORKDIR /app

# Instalar dependencias
COPY package.json package-lock.json ./
RUN npm install

# Copiar todo el contenido de ui/ (incluye index.html, src/, vite.config.ts, etc.)
COPY . .

# Ejecutar build de Vite → genera /app/dist
RUN npm run build

# ======= Etapa 2: imagen final con Nginx ========
FROM nginx:alpine

# Copiar la configuración custom SOLO para el servidor, dentro de conf.d
# (reemplaza la default.conf que viene con nginx)
COPY default.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos estáticos generados por Vite
COPY --from=builder /app/dist /usr/share/nginx/html

# Exponer el puerto 80 del contenedor (se mapeará a 5173 en host)
EXPOSE 80

# Arrancar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
