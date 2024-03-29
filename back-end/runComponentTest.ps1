# Subir o Docker Compose
Write-Host "Iniciando o Docker Compose..."
docker-compose up -d

# Aguardar um tempo para os serviços iniciarem
Write-Host "Aguardando os serviços iniciarem..."
Start-Sleep -s 60

# Rodar os testes de componente
Write-Host "Rodando os testes de componente..."
Set-Location -Path componentTest
npm install
npx cucumber-js

# Derrubar o Docker Compose
Write-Host "Derrubando o Docker Compose..."
docker-compose down

Write-Host "Script concluído."