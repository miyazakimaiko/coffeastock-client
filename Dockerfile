FROM node:16-alpine

RUN mkdir -p /home/client

COPY . /home/client

WORKDIR /home/client

# Create a .env for react app
# Define a required build arg
ARG REACT_APP_COGNITO_USER_POOL_ID
ARG REACT_APP_COGNITO_CLIENT_ID
ARG REACT_APP_URL
# Create a .env file
RUN touch .env
# Write the api url into the env file
RUN echo REACT_APP_COGNITO_USER_POOL_ID=${REACT_APP_COGNITO_USER_POOL_ID} > .env
RUN echo REACT_APP_COGNITO_CLIENT_ID=${REACT_APP_COGNITO_CLIENT_ID} > .env
RUN echo REACT_APP_API_ENDPOINT=/api/v1 > .env
RUN echo REACT_APP_URL=${REACT_APP_URL} > .env
RUN cat .env

RUN npm ci
RUN npm run build

ENV NODE_ENV production

EXPOSE 3000
CMD [ "npx", "serve", "build" ]
