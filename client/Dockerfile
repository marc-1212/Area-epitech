FROM node:lts as base

RUN mkdir -p ./home/node/app/

RUN mkdir -p ./home/node/app/apk

WORKDIR /home/node/app/

COPY package*.json ./

COPY . .

RUN  npm install

CMD ["npm", "run", "serve", "--", "--port", "8081"]