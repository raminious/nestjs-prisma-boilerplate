FROM node:18-bookworm

WORKDIR /app

RUN echo "deb http://deb.debian.org/debian bookworm main contrib non-free" > /etc/apt/sources.list

RUN apt-get update

ENV APP_HOME /app
WORKDIR $APP_HOME

COPY package.json .
COPY package-lock.json .

RUN npm install

ADD . $APP_HOME
RUN npm run build

ENV NODE_ENV=production

CMD npm run db:migration; npm run start:prod
