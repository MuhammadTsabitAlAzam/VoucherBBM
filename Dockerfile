# Base image
FROM node:16-alpine

RUN  apk update && apk add ca-certificates openssl && update-ca-certificates

# Set working directory
RUN mkdir /app
ADD . /app
WORKDIR /app

RUN npm install

# Start the app
CMD [ "npm", "start" ]
