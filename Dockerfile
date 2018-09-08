# build: docker build -t koa-blog .
# run: docker run --name koa-blog -d -p 5000:5000 koa-blog

FROM node:8.9.4-alpine as builder

WORKDIR /app

COPY . .

RUN npm install cnpm -g --registry=https://registry.npm.taobao.org \
	&& cnpm i\
	&& npm uninstall -g cnpm\
	&& npm run build

EXPOSE 5000

CMD ["npm","run","docker"]
