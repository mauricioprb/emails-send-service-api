FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules

EXPOSE 8000

CMD ["npm", "start"]
