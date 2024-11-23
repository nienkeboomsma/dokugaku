FROM node:20-alpine3.19 AS turbo-base

RUN apk add --no-cache libc6-compat && \
    apk update && \
    yarn global add turbo@1.13.3

WORKDIR /app

FROM turbo-base AS prune

COPY . .

RUN turbo prune --scope=mokuro --docker

FROM turbo-base AS build-server

COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN yarn global add pnpm && \
    pnpm install

COPY --from=prune /app/out/full/ .
COPY turbo.json turbo.json

RUN turbo build --filter=mokuro...

FROM python:3.11.8-slim AS install-mokuro

RUN apt update && \
    apt install -y wget libgl1-mesa-glx libglib2.0-0 && \
    wget -qO- https://deb.nodesource.com/setup_21.x | bash - && \
    apt install -y nodejs && \
    python3 -m pip install mokuro==0.1.8
    
COPY --from=build-server /app /app

WORKDIR /app/services/mokuro

CMD node dist/index.js
