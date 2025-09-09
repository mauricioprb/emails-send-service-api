FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20

RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

COPY entrypoint.sh .
RUN chmod +x ./entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]
