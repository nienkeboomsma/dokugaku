# Builder
FROM node:alpine AS builder
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=ichiran --docker

# Installer
FROM node:alpine AS installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add pnpm
RUN yarn global add turbo

COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json

# production
# RUN turbo build --filter=ichiran...

# Runner
FROM node:alpine AS runner
WORKDIR /app

# dev
RUN yarn global add pnpm

# production
# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs
# USER expressjs

COPY --from=installer /app .

# production
# CMD node services/ichiran/dist/index.js

EXPOSE ${ICHIRAN_PORT}

# dev
CMD cd services/ichiran && pnpm run dev
