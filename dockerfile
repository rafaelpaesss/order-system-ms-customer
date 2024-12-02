# Etapa 1: Construção da imagem
FROM node:20-alpine AS builder

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# Instalar dependências
RUN npm install

# Copiar todos os arquivos do projeto
COPY . .

# Compilar o código TypeScript
RUN npm run build

# Etapa 2: Criação da imagem final para produção
FROM node:20-alpine

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos necessários da etapa anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./

# Definir variáveis de ambiente para produção
ENV NODE_ENV=production
ENV PORT=3000

# Expor a porta do container
EXPOSE 3000

# Comando para rodar a aplicação no ambiente de produção
CMD ["node", "dist/main.js"]
