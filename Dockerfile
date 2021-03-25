# build stage
FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./

# environment variables
ARG VUE_APP_BACKEND_URL

RUN npm install --production
COPY . .
RUN npm run build --production

# production stage
FROM nginx:stable-alpine as production-stage
COPY ./nginx.conf /temp/prod.conf
RUN envsubst /app < /temp/prod.conf > /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
