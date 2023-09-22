FROM node:lts
RUN apt update

COPY ./app/api /usr/app/api
COPY ./.env /usr/app/api/.env
COPY ./app/api/package.json /usr/app/api/package.json

RUN chmod +x /usr/app/api/entrypoint.sh
ENTRYPOINT ["/usr/app/api/entrypoint.sh"]