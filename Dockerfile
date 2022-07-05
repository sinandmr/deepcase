FROM node:16

ENV SERVER_PORT 4000

EXPOSE 4000

ENV SECRET_KEY "deepcaseAPI"

WORKDIR /case

RUN npm install npm@latest -g

COPY package.json package-lock*.json ./

RUN npm install

COPY . .

CMD ["node","app.js"]