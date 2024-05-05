# TODO: update to use output: standalone
# https://github.com/vercel/turbo/issues/5462


FROM node:21.7-alpine3.19 AS base
# Update the package list and install libc6-compat. This package is often required for binary Node.js modules.
RUN apk update && apk add --no-cache libc6-compat

# Setup pnpm and turbo
# Start a new stage based on the base image for setting up pnpm (a package manager) and turbo (for monorepo management).
FROM base as setup
# Install pnpm and turbo globally using npm.
# Configure pnpm to use a specific directory for storing its package cache.
RUN npm install -g pnpm turbo && \
    pnpm config set store-dir ~/.pnpm-store

# Install all dependencies in the monorepo
# Start a new stage for handling dependencies. This stage uses the previously setup image with pnpm and turbo installed.
FROM setup AS dependencies
WORKDIR /app
# Copy the essential configuration files and the specific project's files into the Docker image.
COPY packages/ ./packages/
COPY turbo.json ./
COPY package.json turbo.json packages ./
COPY apps/web ./apps/web
COPY pnpm-lock.yaml pnpm-workspace.yaml ./
# Install dependencies as per the lockfile to ensure consistent dependency resolution.
RUN pnpm install --frozen-lockfile

# Prune projects to focus on the specified project scope
# Start a new stage to prune the monorepo, focusing only on the necessary parts for the specified project.
FROM dependencies AS pruner
# Remove all empty node_modules folders. This is a cleanup step to remove unnecessary directories and reduce image size.
RUN turbo prune --scope=web --docker && \
    rm -rf /app/out/full/*/*/node_modules

# Build the project using turbo
# Start a new stage for building the project. This stage will compile and prepare the project for production.
FROM pruner AS builder
WORKDIR /app

# Copy pruned lockfile and package.json files
# This ensures that the builder stage has the exact dependencies needed for the project.
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=pruner /app/out/json/ .

# Install dependencies for the pruned project
# Utilize BuildKit's cache to speed up the dependency installation process.
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm install --frozen-lockfile

# Copy pruned source code
# Bring in the necessary source code to the builder stage for compilation.
COPY --from=pruner /app/out/full/ .

# Build with turbo and prune dev dependencies
# Use turbo to build the project, followed by pruning development dependencies to minimize the final image size.
# Remove source files to further reduce the image size, keeping only the compiled output and necessary runtime files.

RUN turbo build --filter=web...
RUN --mount=type=cache,id=pnpm,target=~/.pnpm-store pnpm prune --prod --no-optional
RUN rm -rf ./**/*/src

# Final production image
# Start the final stage for the production-ready image.
FROM base AS runner
# Create a non-root user and group for better security.
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nodejs
# Switch to the non-root user.
USER nodejs

WORKDIR /app
# Copy the entire app directory, including node_modules and built code. This includes all necessary runtime files.
COPY --from=builder --chown=nodejs:nodejs /app .

WORKDIR /app/apps/web

CMD npm run start
