FROM node:14-alpine

RUN mkdir -p /home/client

COPY . /home/client

WORKDIR /home/client

RUN npm ci
RUN npm run build

ENV NODE_ENV production\
    REACT_APP_COGNITO_USER_POOL_ID test

EXPOSE 3000
CMD [ "npx", "serve", "build" ]
