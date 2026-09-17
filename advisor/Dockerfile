# Build stage
FROM git.merkatos.dev:5050/vinisto/vinisto/node:22.14.0-bullseye-slim AS builder

RUN npm install -g pnpm@10.6.1

WORKDIR /app

COPY . .

ARG BUILD_ENV

ENV GENERATE_SOURCEMAP=false
ENV NODE_OPTIONS=--max-old-space-size=4096
ENV CI=false

RUN pnpm i --no-frozen-lockfile

# Build depending on the environment
RUN if [ "$BUILD_ENV" = "prod" ]; then \
        pnpm --filter vinisto_advisor build; \
    elif [ "$BUILD_ENV" = "testing" ]; then \
        pnpm --filter vinisto_advisor build:testing; \
    else \
        pnpm --filter vinisto_advisor build:dev; \
    fi

# Production stage
FROM git.merkatos.dev:5050/vinisto/vinisto/nginx:stable-alpine AS production

COPY --from=builder /app/advisor/config/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/advisor/build /usr/share/nginx/html

RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid /usr/share/nginx/html

USER nginx

CMD ["nginx", "-g", "daemon off;"]
