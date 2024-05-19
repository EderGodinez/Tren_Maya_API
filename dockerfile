FROM node:20.9.0
ARG 'Eder Yair Godinez Salazar'
# Establecer el directorio de trabajo
WORKDIR /app
# Copiar package.json y package-lock.json
COPY package*.json ./
# Instalar dependencias
RUN npm install
# Copiar el resto del código
COPY . .
# Exponer el puerto
EXPOSE 3000
