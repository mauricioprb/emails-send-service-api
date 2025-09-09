#!/bin/sh

node /app/wait-for-postgres.js

echo "Executando migrações e iniciando o servidor..."
npx prisma migrate deploy
npx prisma generate
npm start
