# Backend WorkBank

Este é um backend simples em Node.js/Express para simular operações de carteira digital: depositar, sacar, transferir e investir.

## Pré-requisitos
- Node.js instalado

## Instalação
```bash
cd backend
npm install
```

## Como rodar
```bash
node server.js
```
O servidor estará disponível em: http://localhost:3001

## Endpoints disponíveis

### Depositar
- **POST** `/api/depositar`
- **Body:** `{ "valor": 100 }`
- **Resposta:** `{ "saldo": 10100 }`

### Sacar
- **POST** `/api/sacar`
- **Body:** `{ "valor": 100 }`
- **Resposta:** `{ "saldo": 9900 }`

### Transferir
- **POST** `/api/transferir`
- **Body:** `{ "valor": 100, "destinatario": "João" }`
- **Resposta:** `{ "saldo": 9900 }`

### Investir
- **POST** `/api/investir`
- **Body:** `{ "valor": 500 }`
- **Resposta:** `{ "saldo": 9500, "investimentos": 5500 }`

### Consultar saldo e investimentos
- **GET** `/api/carteira`
- **Resposta:** `{ "saldo": 9500, "investimentos": 5500 }`

### Consultar histórico
- **GET** `/api/historico`
- **Resposta:** `{ "historico": [ ... ] }`

## Observações
- Os dados são mantidos apenas em memória (ao reiniciar o servidor, tudo é zerado).
- Ideal para testes e integração com o frontend. 