#!/bin/sh


echo "Aguardando o banco de dados ficar disponível..."

while ! nc -z postgres 5432; do
  sleep 1 
done

echo "Banco de dados disponível! Iniciando a aplicação..."

npx prisma migrate deploy
npx prisma generate
npm start
