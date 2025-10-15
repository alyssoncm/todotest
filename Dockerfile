FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY vite.config.js ./
COPY eslint.config.js ./
COPY . .

RUN npm ci
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
