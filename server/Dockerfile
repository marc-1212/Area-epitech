FROM node:lts as base

RUN mkdir -p ./home/node/app/

WORKDIR /home/node/app/

COPY package*.json ./

COPY . .
 
RUN npm install 
 
EXPOSE 8080
 
CMD ["npm", "run", "dev"]
