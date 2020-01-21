FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json .

RUN npm install

EXPOSE 8081

CMD [ "npm", "run" ,"serve" ]
