FROM node:21.7-alpine3.19 AS turbo-base

RUN apk add --no-cache libc6-compat && \
    yarn global add turbo

WORKDIR /app

FROM turbo-base AS prune

COPY . .

RUN turbo prune --scope=ichiran --docker

FROM turbo-base AS build-server

COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN yarn global add pnpm && \
    pnpm install

COPY --from=prune /app/out/full/ .
COPY turbo.json turbo.json

##########################
### for production use ###
##########################
# RUN turbo build --filter=ichiran...

FROM debian:sid-20240311-slim AS install-ichiran

ARG DEBIAN_FRONTEND=noninteractive

    # Install packages
RUN apt install -y git locales sbcl wget && \
    wget -qO- https://deb.nodesource.com/setup_18.x | bash -  && \
    apt install -y nodejs && \
    # Set locale
    localedef -i ja_JP -c -f UTF-8 -A /usr/share/locale/locale.alias ja_JP.UTF-8 && \
    # Install Quicklisp
    wget https://beta.quicklisp.org/quicklisp.lisp && \
    sbcl --load /quicklisp.lisp \
      --eval '(quicklisp-quickstart:install)' \
      --eval '(ql:add-to-init-file)' \
      --eval '(sb-ext:quit)' && \
    # Download JMdictDB
    cd /root && \
    git clone https://gitlab.com/yamagoya/jmdictdb.git && \
    # Download Ichiran
    cd /root/quicklisp/local-projects/ && \
    git clone https://github.com/tshatrov/ichiran.git && \
    # Clean up
    apt remove -y git locales wget

COPY ./services/ichiran/docker/ichiran/settings.lisp /root/quicklisp/local-projects/ichiran/settings.lisp
COPY --from=build-server /app /app
COPY ./services/ichiran/docker/ichiran/init.sh /app/services/ichiran/init.sh

WORKDIR /app/services/ichiran

##########################
### for production use ###
##########################
# CMD sh init.sh && \
#     node dist/index.js

###################
### for dev use ###
###################
CMD sh init.sh && \
    ichiran-cli -f これはペンです && \
    npm install --global pnpm && \
    pnpm run dev
