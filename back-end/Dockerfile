# Define a imagem base
FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta em que a aplicação está rodando
EXPOSE 3000

# Inicia a aplicação
CMD [ "npm", "start" ]