# Usa una imagen base de Node.js
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Limpia la caché de npm y instala dependencias
#RUN npm cache clean --force
RUN npm install --verbose

# Copia el resto de la aplicación
COPY . .

# Muestra el contenido de node_modules para verificar
RUN ls -la node_modules

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "src/app.js"]
