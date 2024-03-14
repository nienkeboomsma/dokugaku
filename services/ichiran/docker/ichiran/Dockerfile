FROM node:21.7-alpine3.19 AS turbo-base

RUN apk add --no-cache libc6-compat \
    && apk update \
    && yarn global add turbo

WORKDIR /app

FROM turbo-base AS prune

COPY . .

RUN turbo prune --scope=ichiran --docker

FROM turbo-base AS build-server

COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN yarn global add pnpm \
    && pnpm install

COPY --from=prune /app/out/full/ .
COPY turbo.json turbo.json

### for production use ###
# RUN turbo build --filter=ichiran...

FROM clfoundation/sbcl:2.2.4-buster AS install-ichiran

WORKDIR /root

RUN DEBIAN_FRONTEND=noninteractive \
    && apt update \
    && curl -fsSL https://deb.nodesource.com/setup_21.x | bash - \
    && apt install --no-install-recommends -y locales nodejs postgresql-client wget \
    && echo "LC_ALL=en_US.UTF-8" >> /etc/environment \
    && echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen \
    && echo "LANG=en_US.UTF-8" > /etc/locale.conf \
    && locale-gen en_US.UTF-8 \
    && rm -rf /var/lib/apt/lists/* \
    && wget https://beta.quicklisp.org/quicklisp.lisp \
    && sbcl --load quicklisp.lisp --non-interactive \
        --eval "(quicklisp-quickstart:install)" \
        --eval "(ql-util:without-prompting (ql:add-to-init-file))" \
        --eval "(sb-ext:quit)" \
    && git clone https://gitlab.com/yamagoya/jmdictdb.git \
    && cd ./quicklisp/local-projects \
    && git clone https://github.com/tshatrov/ichiran.git

COPY ./services/ichiran/docker/ichiran ./quicklisp/local-projects/ichiran

RUN sbcl --non-interactive --eval "(ql:quickload :ichiran)"

ENV PATH=/root/quicklisp/local-projects/ichiran/docker/ichiran-scripts:$PATH

WORKDIR /app

### for dev use ###
RUN npm install -g pnpm

COPY --from=build-server /app .

### for production use ###
# CMD sh /root/quicklisp/local-projects/ichiran/init.sh \
#     && node services/ichiran/dist/index.js

### for dev use ###
CMD sh /root/quicklisp/local-projects/ichiran/init.sh \
    && cd services/ichiran \
    && pnpm run dev
