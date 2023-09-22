FROM node:16
RUN apt update

COPY ./app/api /usr/app/api
COPY ./.env /usr/app/api/.env
COPY ./app/api/package.json /usr/app/api/package.json
RUN rm -f /usr/app/api/node_modules & rm -rf /usr/app/api/package-lock.json

# RUN npm install pm2 -g

RUN chmod +x /usr/app/api/entrypoint.sh
ENTRYPOINT ["/usr/app/api/entrypoint.sh"]