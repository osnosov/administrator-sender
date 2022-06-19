FROM node:16.15.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install --only=production

COPY . .

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

CMD [ "node", "index.js" ]