# src Dockerfile: https://github.com/vercel/turbo/blob/main/examples/with-docker/apps/web/Dockerfile
FROM node:18-alpine AS alpine

# Set up pnpm on the alpine base
FROM alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && \
    pnpm install turbo@1.13.3 --global

FROM base AS builder
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat && \
    apk update

# Set working directory
WORKDIR /app
COPY packages/ ./packages/
COPY turbo.json ./
COPY package.json turbo.json packages ./
COPY apps/web ./apps/web
COPY pnpm-lock.yaml pnpm-workspace.yaml ./

# Install dependencies as per the lockfile to ensure consistent dependency resolution.
RUN pnpm install --frozen-lockfile

RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat && \
    apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

# NEXT_PUBLIC_ browser-available env variables are included during
# build time, so we must make them available here
ARG NEXT_PUBLIC_ALLOW_OTHER_DEVICES
ENV NEXT_PUBLIC_ALLOW_OTHER_DEVICES=${NEXT_PUBLIC_ALLOW_OTHER_DEVICES}

ARG NEXT_PUBLIC_GRAPHQL_PORT
ENV NEXT_PUBLIC_GRAPHQL_PORT=${NEXT_PUBLIC_GRAPHQL_PORT}

ARG NEXT_PUBLIC_HOST_IP
ENV NEXT_PUBLIC_HOST_IP=${NEXT_PUBLIC_HOST_IP}

ARG NEXT_PUBLIC_WORK_PROCESSOR_PORT
ENV NEXT_PUBLIC_WORK_PROCESSOR_PORT=${NEXT_PUBLIC_WORK_PROCESSOR_PORT}

# Build the project
COPY --from=builder /app/out/full/ .
COPY turbo.json turbo.json
RUN turbo run build --filter=web

FROM base AS runner
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

ARG WEB_PORT
ENV PORT=${WEB_PORT}

CMD node apps/web/server.js
