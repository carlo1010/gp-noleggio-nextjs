FROM node:20-bookworm-slim AS base

ENV NODE_ENV=production
WORKDIR /app

FROM base AS deps
COPY gp-noleggio-fe/package.json gp-noleggio-fe/package-lock.json ./
RUN npm ci

FROM base AS builder
ENV NODE_ENV=development
COPY --from=deps /app/node_modules ./node_modules
COPY gp-noleggio-fe/ ./
RUN npm run build

FROM base AS runner
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN groupadd --gid 1001 nodejs
RUN useradd --uid 1001 --gid 1001 --shell /bin/bash --create-home nextjs

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app ./

USER nextjs
EXPOSE 3000

CMD ["npm", "run", "start"]
