FROM node:17.8-alpine


WORKDIR /usr/src

COPY package.json .
COPY package-lock.json .

RUN npm install && npm cache clean --force

COPY . .

CMD ["node", "./dist/index.js"]