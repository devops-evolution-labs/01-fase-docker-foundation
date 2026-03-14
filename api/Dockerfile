# API Service container
# Responsible for exposing HTTP endpoints and interacting with Redis and PostgreSQL

FROM node:18

WORKDIR /app

COPY package.json .

RUN npm install

COPY server.js .

EXPOSE 3000

CMD ["node", "server.js"]