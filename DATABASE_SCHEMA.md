# 📊 Estrutura do Banco de Dados

Este documento descreve as tabelas criadas no SQLite e seus relacionamentos.

## 🗂️ Tabelas

### 1. `usuarios`

Armazena todos os usuários do sistema (clientes e restaurantes).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária |
| `nome` | TEXT | Nome do usuário |
| `email` | TEXT | Email único |
| `senha_hash` | TEXT | Senha criptografada com bcrypt |
| `telefone` | TEXT | Número de telefone |
| `endereco_principal` | TEXT | Endereço principal |
| `tipo_usuario` | TEXT | 'cliente' ou 'restaurante' |
| `created_at` | DATETIME | Data de criação |

**Exemplo:**
```sql
INSERT INTO usuarios (nome, email, senha_hash, tipo_usuario, telefone, endereco_principal)
VALUES ('João Silva', 'joao@test.com', '$2a$10$...', 'cliente', '11912345678', 'Rua A, 123');
```

---

### 2. `restaurantes`

Dados específicos dos restaurantes (um por usuário restaurante).

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária |
| `usuario_id` | INTEGER | FK para usuarios (UNIQUE) |
| `nome_fantasia` | TEXT | Nome do restaurante |
| `cnpj` | TEXT | CNPJ único |
| `endereco` | TEXT | Endereço do restaurante |
| `categoria_principal` | TEXT | Ex: 'Pizzaria', 'Hamburgueria' |
| `descricao` | TEXT | Descrição do restaurante |
| `ativo` | BOOLEAN | Ativo ou não |
| `created_at` | DATETIME | Data de criação |

**Relacionamento:** `Usuário 1:1 Restaurante`

---

### 3. `produtos`

Itens do cardápio dos restaurantes.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária |
| `restaurante_id` | INTEGER | FK para restaurantes |
| `nome` | TEXT | Nome do produto |
| `descricao` | TEXT | Descrição do produto |
| `preco` | DECIMAL | Preço em reais |
| `imagem_url` | TEXT | URL da imagem |
| `ativo` | BOOLEAN | Ativo ou não |
| `created_at` | DATETIME | Data de criação |

**Relacionamento:** `Restaurante 1:N Produtos`

**Exemplo:**
```sql
INSERT INTO produtos (restaurante_id, nome, preco, descricao)
VALUES (1, 'Pizza Margherita', 35.90, 'Molho de tomate, queijo e manjericão');
```

---

### 4. `pedidos`

Pedidos realizados pelos clientes.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária |
| `usuario_id` | INTEGER | FK para usuarios (cliente) |
| `restaurante_id` | INTEGER | FK para restaurantes |
| `status` | TEXT | Pendente / Preparando / Saiu para Entrega / Entregue |
| `valor_total` | DECIMAL | Valor total do pedido |
| `data_pedido` | DATETIME | Data do pedido |

**Relacionamentos:** 
- `Usuário 1:N Pedidos`
- `Restaurante 1:N Pedidos`

**Exemplo:**
```sql
INSERT INTO pedidos (usuario_id, restaurante_id, status, valor_total)
VALUES (1, 1, 'Pendente', 111.70);
```

---

### 5. `itens_pedido`

Detalhes dos produtos em cada pedido.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `id` | INTEGER | Chave primária |
| `pedido_id` | INTEGER | FK para pedidos |
| `produto_id` | INTEGER | FK para produtos |
| `quantidade` | INTEGER | Quantidade do produto |
| `preco_unitario` | DECIMAL | Preço no momento do pedido |

**Relacionamentos:**
- `Pedido 1:N ItemPedido`
- `Produto 1:N ItemPedido`

**Exemplo:**
```sql
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade, preco_unitario)
VALUES (1, 1, 2, 35.90);
```

---

## 📊 Diagrama de Relacionamentos

```
┌─────────────┐
│  USUARIOS   │
│─────────────│
│ id (PK)     │
│ nome        │
│ email (UQ)  │
│ senha_hash  │
│ tipo_user   │
└──────┬──────┘
       │
       │ 1:1
       ├─────────────────────────────┐
       │                             │
       ▼                             ▼
┌─────────────────┐        ┌──────────────────┐
│ RESTAURANTES    │        │    PEDIDOS       │
│─────────────────│        │──────────────────│
│ id (PK)         │        │ id (PK)          │
│ usuario_id (FK) │        │ usuario_id (FK)  │
│ nome_fantasia   │        │ restaurante_id   │◄─────┐
│ cnpj (UQ)       │        │ status           │      │
│ categoria       │        │ valor_total      │      │
└────────┬────────┘        │ data_pedido      │      │
         │                 └────────┬─────────┘      │
         │ 1:N                      │ 1:N            │
         │                          │                │
         ▼                          ▼                │ 1:N
    ┌────────────┐            ┌───────────────┐     │
    │ PRODUTOS   │            │ ITENS_PEDIDO  │     │
    │────────────│            │───────────────│     │
    │ id (PK)    │            │ id (PK)       │     │
    │ rest_id    ├──(1:N)────►│ pedido_id (FK)├─────┘
    │ nome       │            │ produto_id (FK)
    │ preco      │            │ quantidade    │
    │ descricao  │            │ preco_unitario│
    └────────────┘            └───────────────┘
```

---

## 🔑 Chaves Primárias e Únicas

| Tabela | Campo | Tipo |
|--------|-------|------|
| usuarios | email | UNIQUE |
| restaurantes | cnpj | UNIQUE |
| restaurantes | usuario_id | UNIQUE |
| produtos | - | - |
| pedidos | - | - |
| itens_pedido | - | - |

---

## 🔗 Foreign Keys (Integridade Referencial)

Todas as chaves estrangeiras estão configuradas com `FOREIGN KEY`:

```sql
CREATE TABLE restaurantes (
  ...
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

CREATE TABLE produtos (
  ...
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
);

CREATE TABLE pedidos (
  ...
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
  FOREIGN KEY (restaurante_id) REFERENCES restaurantes(id)
);

CREATE TABLE itens_pedido (
  ...
  FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
  FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
```

---

## 📈 Fluxo de Dados

### 1. Cadastro e Login
```
Usuario (cliente) → insere nome, email, senha
                 → API calcula hash com bcrypt
                 → Salva na tabela usuarios
                 → No login, retorna JWT token
```

### 2. Restaurante se Cadastra
```
Usuario (restaurante) → insere dados na tabela usuarios
                     → API cria entrada em restaurantes
                     → Pode agora adicionar produtos
```

### 3. Adicionar Produtos
```
Restaurante (autenticado) → cria produto
                          → salva em produtos com restaurante_id
```

### 4. Cliente Faz Pedido
```
Cliente (autenticado) → seleciona restaurante
                      → adiciona itens ao carrinho
                      → finaliza pedido
                      → cria registro em pedidos
                      → cria N registros em itens_pedido (um por item)
```

### 5. Restaurante Atualiza Status
```
Restaurante (autenticado) → recebe lista de seus pedidos
                          → atualiza status (Preparando, etc)
                          → Cliente vê atualização
```

---

## 🔍 Queries Úteis

### Listar todas as pizzas
```sql
SELECT p.* FROM produtos p
JOIN restaurantes r ON p.restaurante_id = r.id
WHERE r.categoria_principal = 'Pizzaria';
```

### Ver histórico de um cliente
```sql
SELECT p.*, r.nome_fantasia FROM pedidos p
JOIN restaurantes r ON p.restaurante_id = r.id
WHERE p.usuario_id = 1
ORDER BY p.data_pedido DESC;
```

### Detalhes de um pedido
```sql
SELECT 
  p.id as pedido_id,
  p.status,
  p.valor_total,
  ip.quantidade,
  pr.nome,
  pr.preco
FROM pedidos p
JOIN itens_pedido ip ON p.id = ip.pedido_id
JOIN produtos pr ON ip.produto_id = pr.id
WHERE p.id = 1;
```

### Receita total de um restaurante
```sql
SELECT 
  r.nome_fantasia,
  SUM(p.valor_total) as receita_total,
  COUNT(p.id) as total_pedidos
FROM pedidos p
JOIN restaurantes r ON p.restaurante_id = r.id
WHERE r.id = 1
GROUP BY r.id;
```

---

## 📝 Notas Importantes

1. **Senhas:** Armazenadas como hash bcrypt, nunca em texto plano
2. **Integridade:** Todas as chaves estrangeiras garantem integridade referencial
3. **Cascade:** Deletar um usuário não deleta seus dados (soft delete com `ativo = 0`)
4. **Preços:** Usar DECIMAL para evitar problemas de arredondamento
5. **Datas:** Usar DATETIME para rastreabilidade completa

---

Para resetar o banco de dados, delete a pasta `database/` e reinicie o servidor!
