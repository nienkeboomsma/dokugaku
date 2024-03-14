# Prune
FROM node:21.7-alpine3.19 AS pruner
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add turbo
COPY . .
RUN turbo prune --scope=ichiran --docker

# Install server
FROM node:21.7-alpine3.19 AS server-installer
RUN apk add --no-cache libc6-compat
RUN apk update

WORKDIR /app
RUN yarn global add pnpm
RUN yarn global add turbo

COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
RUN pnpm install

COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json

# production
# RUN turbo build --filter=ichiran...

# Install ichiran
FROM clfoundation/sbcl:latest AS ichiran-installer

RUN apt update && apt -y install locales
RUN echo "LC_ALL=en_US.UTF-8" >> /etc/environment
RUN echo "en_US.UTF-8 UTF-8" >> /etc/locale.gen
RUN echo "LANG=en_US.UTF-8" > /etc/locale.conf
RUN locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US:en
ENV LC_ALL en_US.UTF-8

RUN DEBIAN_FRONTEND=noninteractive \
    apt-get update \
    && apt-get install -y wget postgresql-client \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /root
RUN wget https://beta.quicklisp.org/quicklisp.lisp
RUN sbcl --load quicklisp.lisp --non-interactive \
    --eval "(quicklisp-quickstart:install)" \
    --eval "(ql-util:without-prompting (ql:add-to-init-file))" \
    --eval "(sb-ext:quit)"

WORKDIR /root
RUN git clone https://gitlab.com/yamagoya/jmdictdb.git

WORKDIR /root/quicklisp/local-projects
RUN git clone https://github.com/tshatrov/ichiran.git
COPY ./services/ichiran/docker/ichiran/settings.lisp ./ichiran/settings.lisp
COPY ./services/ichiran/docker/ichiran/init.sh ./ichiran/docker/ichiran-scripts/init.sh
RUN sbcl --non-interactive --eval "(ql:quickload :ichiran)"

ENV PATH=/root/quicklisp/local-projects/ichiran/docker/ichiran-scripts:$PATH

# Run the server and ichiran
WORKDIR /app

RUN curl -fsSL https://deb.nodesource.com/setup_21.x | bash - && \
    apt-get install -y \
    nodejs

# dev
RUN npm install -g pnpm

# production
# RUN addgroup --system --gid 1001 expressjs
# RUN adduser --system --uid 1001 expressjs
# USER expressjs

COPY --from=server-installer /app .

# production
# CMD sh /root/quicklisp/local-projects/ichiran/docker/ichiran-scripts/init.sh && node services/ichiran/dist/index.js

# dev
CMD sh /root/quicklisp/local-projects/ichiran/docker/ichiran-scripts/init.sh && cd services/ichiran && pnpm run dev
