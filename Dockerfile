FROM node:20

WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN npm install --quit --no-optional --no-fund --loglevel=error
RUN npm run build

EXPOSE 5000

CMD ["npm", "run", "start:prod"]