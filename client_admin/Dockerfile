# Build stage
FROM git.merkatos.dev:5050/vinisto/vinisto/node:22.14.0-bullseye-slim AS builder

# Install pnpm
RUN npm install -g pnpm@10.6.1

# Set the working directory
WORKDIR /app

# Copy necessary files
COPY . .

# Set build environment
ARG BUILD_ENV

# Install dependencies
RUN pnpm install --no-frozen-lockfile

# Build depending on the environment
RUN if [ "$BUILD_ENV" = "prod" ]; then \
        pnpm --filter vinisto_client_admin build; \
    elif [ "$BUILD_ENV" = "testing" ]; then \
        pnpm --filter vinisto_client_admin build:testing; \
    else \
        pnpm --filter vinisto_client_admin build:dev; \
    fi

# Production stage
FROM git.merkatos.dev:5050/vinisto/vinisto/nginx:stable-alpine AS production

# Copy the nginx configuration from the build stage
COPY --from=builder --chown=nginx:nginx /app/client_admin/config/nginx.conf /etc/nginx/conf.d/default.conf

# Clear the nginx html directory and copy build files
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder --chown=nginx:nginx /app/client_admin/build .

# Adjust permissions
RUN touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/cache/nginx /var/run/nginx.pid /usr/share/nginx/html

# Set the user to nginx
USER nginx

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
