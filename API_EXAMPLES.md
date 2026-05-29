# 🧪 Exemplos de Requisições para Testar a API

Este arquivo contém exemplos de requisições HTTP para testar todos os endpoints da API RangoRápido.

## 📝 Preparação

Antes de testar, certifique-se de que:
1. O servidor backend está rodando em `http://localhost:3000`
2. Você tem um cliente HTTP como **Postman**, **Insomnia**, ou **curl**

## 🔑 Fluxo de Teste Recomendado

1. Cadastrar um usuário (cliente)
2. Fazer login
3. Usar o token retornado para fazer outras requisições
4. Cadastrar um usuário restaurante
5. Fazer login como restaurante
6. Adicionar produtos
7. Como cliente, fazer um pedido
8. Como restaurante, atualizar status do pedido

---

## 📨 Exemplos com cURL

### 1️⃣ Cadastrar Novo Usuário (Cliente)

```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "João Silva",
    "email": "joao@example.com",
    "senha": "123456",
    "telefone": "(11) 9 1234-5678",
    "endereco_principal": "Rua A, 123 - São Paulo, SP",
    "tipo_usuario": "cliente"
  }'
```

**Resposta Esperada:**
```json
{
  "message": "Usuário registrado com sucesso"
}
```

---

### 2️⃣ Login (Obter Token)

```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "senha": "123456"
  }'
```

**Resposta Esperada:**
```json
{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "tipo_usuario": "cliente"
  }
}
```

> 💡 **Salve este token! Você precisará dele para fazer requisições autenticadas.**

---

### 3️⃣ Obter Perfil do Usuário (Autenticado)

```bash
curl -X GET http://localhost:3000/api/usuarios/perfil \
  -H "Authorization: Bearer seu_token_aqui"
```

**Resposta Esperada:**
```json
{
  "id": 1,
  "nome": "João Silva",
  "email": "joao@example.com",
  "telefone": "(11) 9 1234-5678",
  "endereco_principal": "Rua A, 123 - São Paulo, SP",
  "tipo_usuario": "cliente"
}
```

---

### 4️⃣ Atualizar Perfil do Usuário (Autenticado)

```bash
curl -X PUT http://localhost:3000/api/usuarios/perfil \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer seu_token_aqui" \
  -d '{
    "nome": "João da Silva",
    "telefone": "(11) 9 8765-4321",
    "endereco_principal": "Rua B, 456 - São Paulo, SP"
  }'
```

---

### 5️⃣ Listar Todos os Restaurantes (Público)

```bash
curl -X GET http://localhost:3000/api/restaurantes
```

**Resposta Esperada:**
```json
[
  {
    "id": 1,
    "usuario_id": 2,
    "nome_fantasia": "Pizza Palace",
    "cnpj": "12.345.678/0001-90",
    "endereco": "Av. Paulista, 1000 - São Paulo, SP",
    "categoria_principal": "Pizzaria",
    "descricao": "A melhor pizza da cidade!",
    "ativo": 1,
    "created_at": "2024-01-15 10:30:00"
  }
]
```

---

### 6️⃣ Obter Detalhes de um Restaurante (Público)

```bash
curl -X GET http://localhost:3000/api/restaurantes/1
```

---

### 7️⃣ Cadastrar Novo Usuário (Restaurante)

```bash
curl -X POST http://localhost:3000/api/usuarios \
  -H "Content-Type: application/json" \
  -d '{
    "nome": "Pizza Palace",
    "email": "pizzapalace@example.com",
    "senha": "senha123",
    "telefone": "(11) 3000-0000",
    "endereco_principal": "Av. Paulista, 1000 - São Paulo, SP",
    "tipo_usuario": "restaurante"
  }'
```

---

### 8️⃣ Login como Restaurante

```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "pizzapalace@example.com",
    "senha": "senha123"
  }'
```

> 💡 **Salve este novo token do restaurante!**

---

### 9️⃣ Obter Meu Restaurante (Autenticado como Restaurante)

```bash
curl -X GET http://localhost:3000/api/restaurantes/meu-restaurante \
  -H "Authorization: Bearer token_restaurante"
```

---

### 🔟 Atualizar Dados do Restaurante (Autenticado como Restaurante)

```bash
curl -X PUT http://localhost:3000/api/restaurantes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token_restaurante" \
  -d '{
    "nome_fantasia": "Pizza Palace Premium",
    "descricao": "A melhor pizza de São Paulo!",
    "categoria_principal": "Pizzaria Italiana"
  }'
```

---

### 1️⃣1️⃣ Criar Novo Produto (Autenticado como Restaurante)

```bash
curl -X POST http://localhost:3000/api/produtos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token_restaurante" \
  -d '{
    "nome": "Pizza Margherita",
    "descricao": "Molho de tomate, queijo mozzarella e manjericão",
    "preco": 35.90,
    "imagem_url": "https://example.com/pizza-margherita.jpg"
  }'
```

---

### 1️⃣2️⃣ Listar Produtos de um Restaurante (Público)

```bash
curl -X GET http://localhost:3000/api/produtos/restaurante/1
```

**Resposta Esperada:**
```json
[
  {
    "id": 1,
    "restaurante_id": 1,
    "nome": "Pizza Margherita",
    "descricao": "Molho de tomate, queijo mozzarella e manjericão",
    "preco": 35.90,
    "imagem_url": "https://example.com/pizza-margherita.jpg",
    "ativo": 1,
    "created_at": "2024-01-15 11:00:00"
  }
]
```

---

### 1️⃣3️⃣ Atualizar Produto (Autenticado como Restaurante)

```bash
curl -X PUT http://localhost:3000/api/produtos/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token_restaurante" \
  -d '{
    "nome": "Pizza Margherita Premium",
    "descricao": "Molho de tomate fresco, queijo mozzarella importado e manjericão",
    "preco": 42.90,
    "imagem_url": "https://example.com/pizza-margherita-premium.jpg"
  }'
```

---

### 1️⃣4️⃣ Deletar Produto (Autenticado como Restaurante)

```bash
curl -X DELETE http://localhost:3000/api/produtos/1 \
  -H "Authorization: Bearer token_restaurante"
```

---

### 1️⃣5️⃣ Criar Novo Pedido (Autenticado como Cliente)

```bash
curl -X POST http://localhost:3000/api/pedidos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token_cliente" \
  -d '{
    "restaurante_id": 1,
    "itens": [
      {
        "produto_id": 1,
        "quantidade": 2
      },
      {
        "produto_id": 2,
        "quantidade": 1
      }
    ]
  }'
```

**Resposta Esperada:**
```json
{
  "success": true,
  "message": "Pedido criado",
  "pedidoId": 1,
  "valorTotal": 111.70
}
```

---

### 1️⃣6️⃣ Listar Meus Pedidos (Autenticado como Cliente)

```bash
curl -X GET http://localhost:3000/api/pedidos \
  -H "Authorization: Bearer token_cliente"
```

**Resposta Esperada:**
```json
[
  {
    "id": 1,
    "usuario_id": 1,
    "restaurante_id": 1,
    "status": "Pendente",
    "valor_total": 111.70,
    "data_pedido": "2024-01-15 12:00:00"
  }
]
```

---

### 1️⃣7️⃣ Obter Detalhes de um Pedido (Autenticado)

```bash
curl -X GET http://localhost:3000/api/pedidos/1 \
  -H "Authorization: Bearer token_cliente"
```

**Resposta Esperada:**
```json
{
  "id": 1,
  "usuario_id": 1,
  "restaurante_id": 1,
  "status": "Pendente",
  "valor_total": 111.70,
  "data_pedido": "2024-01-15 12:00:00",
  "itens": [
    {
      "id": 1,
      "pedido_id": 1,
      "produto_id": 1,
      "quantidade": 2,
      "preco_unitario": 35.90
    },
    {
      "id": 2,
      "pedido_id": 1,
      "produto_id": 2,
      "quantidade": 1,
      "preco_unitario": 40.00
    }
  ]
}
```

---

### 1️⃣8️⃣ Listar Pedidos do Restaurante (Autenticado como Restaurante)

```bash
curl -X GET http://localhost:3000/api/pedidos/restaurante/pedidos \
  -H "Authorization: Bearer token_restaurante"
```

---

### 1️⃣9️⃣ Atualizar Status do Pedido (Autenticado como Restaurante)

```bash
curl -X PATCH http://localhost:3000/api/pedidos/1/status \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer token_restaurante" \
  -d '{
    "status": "Preparando"
  }'
```

Status válidos:
- `Pendente`
- `Preparando`
- `Saiu para Entrega`
- `Entregue`

---

## 📮 Usando Postman

1. Abra o Postman
2. Crie uma nova requisição
3. Escolha o método (GET, POST, PUT, DELETE, PATCH)
4. Cole a URL
5. Na aba "Headers", adicione:
   - `Content-Type: application/json`
   - `Authorization: Bearer seu_token` (se for autenticado)
6. Na aba "Body", escolha "raw" e adicione o JSON
7. Clique em "Send"

---

## 🔒 Notas Sobre Autenticação

- Tokens JWT são válidos por tempo indefinido nesta implementação
- Sempre envie o token no header: `Authorization: Bearer <token>`
- Se tentar acessar uma rota privada sem token, receberá erro 401
- Se tentar fazer ação de restaurante como cliente, receberá erro 403

---

## ✅ Checklist de Teste

- [ ] Cadastrar cliente
- [ ] Fazer login como cliente
- [ ] Obter perfil do cliente
- [ ] Atualizar perfil do cliente
- [ ] Listar restaurantes
- [ ] Obter detalhes de restaurante
- [ ] Cadastrar restaurante
- [ ] Fazer login como restaurante
- [ ] Obter dados do restaurante
- [ ] Criar produto
- [ ] Listar produtos
- [ ] Atualizar produto
- [ ] Criar pedido
- [ ] Listar pedidos do cliente
- [ ] Obter detalhes do pedido
- [ ] Listar pedidos do restaurante
- [ ] Atualizar status do pedido

---

## 🚨 Troubleshooting

### Erro: "Token não fornecido"
- Verifique se está enviando o token no header `Authorization: Bearer <token>`

### Erro: "Token inválido"
- Verifique se o token está correto e não foi alterado

### Erro: "Acesso restrito a restaurantes"
- Você está tentando fazer ação de restaurante com um token de cliente

### Erro: "Conexão recusada"
- Verifique se o servidor backend está rodando em `http://localhost:3000`

### Erro: "CORS"
- O backend tem CORS habilitado, mas verifique se a porta está correta

---

Bom teste! 🚀
