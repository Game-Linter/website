FROM node:alpine

WORKDIR /usr/app/src

COPY package.json  .
COPY yarn.lock  .

RUN yarn install --frozen-lockfile

COPY . .

CMD [ "yarn", "start" ]
