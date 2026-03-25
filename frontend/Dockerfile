# build
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_API_URL
ARG VITE_OLLAMA_URL
ARG VITE_LLM_PROVIDER

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_OLLAMA_URL=$VITE_OLLAMA_URL
ENV VITE_LLM_PROVIDER=$VITE_LLM_PROVIDER

RUN npm run build

# nginx
FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]