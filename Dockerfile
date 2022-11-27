FROM node:14-alpine

RUN apt-get update -y && apt-get upgrade -y

RUN mkdir -p /home/client

COPY . /home/client

WORKDIR /home/client

RUN npm ci
RUN npm run build

ENV NODE_ENV production

EXPOSE 3000
CMD [ "npx", "serve", "build" ]
