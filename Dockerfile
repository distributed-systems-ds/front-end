# Etapa de construcción
FROM node:16-alpine AS build

ARG VITE_API_URL

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

RUN echo "VITE_API_URL=$VITE_API_URL" > .env.production

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar la build de la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/.env.production /home/.env.production

# Copiar el archivo de configuración de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponer el puerto
EXPOSE 80

# Comando para ejecutar nginx
CMD ["nginx", "-g", "daemon off;"]
