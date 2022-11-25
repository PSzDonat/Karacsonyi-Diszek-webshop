FROM node:16-alpine3.15

RUN npm install -g json-server

WORKDIR /server

RUN mkdir config && mkdir data

COPY config/json-server.json config/json-server.json

COPY data/db.json data/db.json
COPY data/routes.json data/routes.json

EXPOSE 80

ENTRYPOINT ["json-server"]

CMD ["-c", "config/json-server.json", "-r", "data/routes.json", "--watch", "data/db.json"]