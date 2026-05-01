# Etapa 1: Build
FROM node:18 AS build
WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Copiar arquivos do projeto
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa 2: Servir o app
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Remover arquivos padrão do NGINX e copiar o build
RUN rm -rf ./*
COPY --from=build /app/build .

EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
