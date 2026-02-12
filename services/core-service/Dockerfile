# ------- Builder Image -------
FROM node:20-alpine AS builder
WORKDIR /app
# install dependencies
COPY package*.json ./
RUN npm ci
# copy source code
COPY tsconfig.json ./
COPY src ./src


# build type script
RUN npm run build

# ------- Runner Image -------
FROM node:20-alpine
WORKDIR /app

#security: non root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# copy only production artifacts
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY package.json ./

ENV NODE_ENV=production 
ENV PORT=3000

EXPOSE 3000
USER appuser
CMD ["node", "dist/main.js"]