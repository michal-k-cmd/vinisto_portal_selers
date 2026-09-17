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
        pnpm --filter vinisto_eshop build; \
    elif [ "$BUILD_ENV" = "testing" ]; then \
        pnpm --filter vinisto_eshop build:testing; \
    else \
        pnpm --filter vinisto_eshop build:dev; \
    fi

# Production stage - using Node.js instead of nginx
FROM git.merkatos.dev:5050/vinisto/vinisto/node:22.14.0-bullseye-slim AS production

# Create app directory
WORKDIR /app

# Copy the standalone output directory (self-contained Next.js application)
COPY --from=builder /app/eshop/dist/standalone ./

# Copy static assets to the standalone output
COPY --from=builder /app/eshop/dist/static ./eshop/dist/static

# Copy public folder to the standalone output
COPY --from=builder /app/eshop/public ./eshop/public

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js server from the standalone package
CMD ["node", "eshop/server.js"]
