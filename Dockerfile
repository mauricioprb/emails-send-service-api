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

RUN echo "$POSTGRES_PASSWORD" > /run/secrets/db_password

EXPOSE 8000

CMD sh -c "until pg_isready -h postgres -p 5432 -U $POSTGRES_USER; do sleep 2; done && \
    npx prisma migrate deploy && \
    npx prisma generate && \
    npm start"
