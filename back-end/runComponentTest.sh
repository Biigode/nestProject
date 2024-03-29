#!/bin/bash

# Subir o Docker Compose
echo "Iniciando o Docker Compose..."
docker-compose up -d

# Aguardar um tempo para os serviços iniciarem
echo "Aguardando os serviços iniciarem..."
sleep 60

# Rodar os testes de componente
echo "Rodando os testes de componente..."
cd componentTest
npm install
npx cucumber-js

# Derrubar o Docker Compose
echo "Derrubando o Docker Compose..."
docker-compose down

echo "Script concluído."