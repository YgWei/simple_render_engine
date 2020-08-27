FROM node:12.16.3-alpine3.11 AS builder
WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

###############################################################################

FROM node:12.16.3-alpine3.11
WORKDIR /home/node/app
ENV NODE_ENV production

COPY package.json package-lock.json ./

RUN npm install \
    && npm cache clean --force

COPY --from=builder /home/node/app/dist ./dist
COPY app.js .env.production.local ./

CMD npm run start