# PressureMattress ICU - API service image
# Build: docker build -t pressure-mattress-api ./api
FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source
COPY server.js ./

# Run as the non-root "node" user provided by the base image
USER node

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=5s --retries=5 --start-period=10s \
  CMD node -e "require('http').get('http://localhost:8080/health',function(r){process.exit(r.statusCode===200?0:1)})"

CMD ["node", "server.js"]
