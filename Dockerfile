FROM node:18 as build

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD [ "nginx", "-g", "daemon off;" ]