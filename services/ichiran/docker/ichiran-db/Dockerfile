FROM postgres:latest

ARG ICHIRAN_PGDUMP

RUN    DEBIAN_FRONTEND=noninteractive \
       apt-get update \
    && apt-get install -y wget \
    && rm -rf /var/lib/apt/lists/*

RUN localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8

RUN    wget $ICHIRAN_PGDUMP --quiet -O /ichiran.pgdump \
    && chmod o+r /ichiran.pgdump 
COPY services/ichiran/docker/ichiran-db/init-db.sh /docker-entrypoint-initdb.d/init-db.sh
