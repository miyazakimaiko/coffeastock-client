FROM node:14-alpine

RUN mkdir -p /home/client

COPY . /home/client

WORKDIR /home/client

ENV NODE_ENV production
ENV REACT_APP_COGNITO_USER_POOL_ID test

RUN npm ci
RUN npm run build

EXPOSE 3000
CMD [ "npx", "serve", "build" ]
