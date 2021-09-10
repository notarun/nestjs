FROM node:16-alpine as base

FROM base as production

WORKDIR /home/node/app
COPY package.json package-lock.json ./
RUN npm install --production
COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]
