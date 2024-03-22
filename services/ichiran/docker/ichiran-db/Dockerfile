FROM postgres:13.14-alpine3.19

ARG ICHIRAN_PGDUMP

ENV LANG=ja_JP.UTF-8

RUN apk add --no-cache wget && \
    wget $ICHIRAN_PGDUMP --quiet -O ichiran.pgdump && \
    chmod o+r ichiran.pgdump && \
    apk del wget

COPY ./services/ichiran/docker/ichiran-db/init-db.sh /docker-entrypoint-initdb.d/ichiran-db.sh
