FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .

EXPOSE 16108

RUN chown -R node /app
USER node

RUN npm run build
CMD ["npm", "start"]
