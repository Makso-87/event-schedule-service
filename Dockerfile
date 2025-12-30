FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

ARG PORT
ENV PORT=$PORT

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

ARG DB_PORT
ENV DB_PORT=$DB_PORT

ARG DB_HOST
ENV DB_HOST=$DB_HOST

ARG DB_LOGIN
ENV DB_LOGIN=$DB_LOGIN

ARG DB_PASSWORD
ENV DB_PASSWORD=$DB_PASSWORD

ARG DB_NAME
ENV DB_NAME=$DB_NAME

ARG JWT_SECRET
ENV JWT_SECRET=$JWT_SECRET

ARG SSL_KEY_PATH
ENV SSL_KEY_PATH=$SSL_KEY_PATH

ARG SSL_CERT_PATH
ENV SSL_CERT_PATH=$SSL_CERT_PATH

EXPOSE 16108

RUN chown -R node /usr/src/app
USER node

RUN npm run build
CMD ["npm", "start"]
