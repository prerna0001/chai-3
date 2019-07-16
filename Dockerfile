FROM node:12

WORKDIR /app

COPY . .

RUN npm install

RUN npm install http-server -g

RUN npm run build

WORKDIR /app/dist/angular-frontend

ENTRYPOINT ["http-server","-p","8042"]