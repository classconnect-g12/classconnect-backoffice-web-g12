# Etapa de construcción
FROM node:20-alpine AS build

WORKDIR /app

ARG VITE_API_URL
ARG VITE_LIMIT_PAGE

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_LIMIT_PAGE=${VITE_LIMIT_PAGE}

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install
RUN npm install --save-dev @types/node

# Copiar el resto del código
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos construidos
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"] 
