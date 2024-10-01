FROM node:21.7-alpine3.19 AS turbo-base

RUN apk add --no-cache libc6-compat && \
    apk update && \
    yarn global add turbo@1.13.3

WORKDIR /app

FROM turbo-base AS prune

COPY . .

RUN turbo prune --scope=work-processor --docker

FROM turbo-base AS build-server

COPY --from=prune /app/out/json/ .
COPY --from=prune /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=prune /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN yarn global add pnpm && \
    pnpm install

COPY --from=prune /app/out/full/ .
COPY turbo.json turbo.json

RUN turbo build --filter=work-processor...

FROM node:21.7-alpine3.19 AS run-server
    
COPY --from=build-server /app /app

WORKDIR /app/services/work-processor

CMD node dist/index.js
