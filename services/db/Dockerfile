FROM node:20-alpine3.19 AS import-jmdict

ARG DB_JMDICT

COPY ./services/db/convert-jmdict.js .

RUN apk add --no-cache wget && \
    wget $DB_JMDICT -O originalJmdict.zip && \
    unzip originalJmdict.zip && \
    mv *.json originalJmdict.json &&\
    node convert-jmdict.js < originalJmdict.json > processedJmdict.csv
    
FROM postgres:16.2-bullseye as postgres

RUN apt update && \
    apt install -y locales && \
    localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8

COPY --from=import-jmdict processedJmdict.csv processedJmdict.csv
COPY ./services/db/init.sql /docker-entrypoint-initdb.d/init.sql
