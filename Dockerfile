FROM node:14-alpine

RUN mkdir /home/client

COPY . .

WORKDIR /home/clientß

ENV NODE_ENV production\
    REACT_APP_COGNITO_USER_POOL_ID test

RUN npm ci
RUN npm run build

EXPOSE 3000
CMD [ "npx", "serve", "build" ]
