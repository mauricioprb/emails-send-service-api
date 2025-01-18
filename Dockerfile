FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma 

RUN npm install -g wait-port

EXPOSE 8000

CMD sh -c "mkdir -p /run/secrets && echo \"$POSTGRES_PASSWORD\" > /run/secrets/db_password && \
    npx wait-port postgres:5432 && \
    npx prisma migrate deploy && \
    npx prisma generate && \
    npm start"
