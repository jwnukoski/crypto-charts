FROM node:16
RUN apt update

COPY ./app/frontend /usr/app/frontend
COPY ./.env /usr/app/frontend/.env
COPY ./app/frontend/package.json /usr/app/frontend/package.json
RUN rm -f /usr/app/frontend/node_modules & rm -rf /usr/app/frontend/package-lock.json
RUN rm -rf /usr/app/frontend/build

RUN npm install pm2 -g

RUN chmod +x /usr/app/frontend/entrypoint.sh
ENTRYPOINT ["/usr/app/frontend/entrypoint.sh"]