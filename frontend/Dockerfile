FROM node:16-alpine as build
WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:1-alpine
COPY --from=build /usr/src/app/dist/tiredd/ /usr/share/nginx/html
