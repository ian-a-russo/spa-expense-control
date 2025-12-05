FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build-only

# estágio de produção
FROM nginx:stable-alpine as production-stage
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html
