# RangoRápido - Plataforma de Delivery de Comida

## 📋 Descrição

RangoRápido é uma plataforma de delivery de comida que conecta clientes a restaurantes locais de forma prática e rápida. O sistema oferece uma interface intuitiva onde os usuários podem explorar cardápios, fazer pedidos e acompanhar as entregas.

## 🎯 Funcionalidades

### Para Clientes
- ✅ Cadastro e autenticação de usuário
- ✅ Busca e filtragem de restaurantes
- ✅ Visualização de cardápios com preços
- ✅ Carrinho de compras dinâmico
- ✅ Finalização de pedidos
- ✅ Acompanhamento em tempo real
- ✅ Histórico de pedidos

### Para Restaurantes
- ✅ Cadastro e autenticação
- ✅ Gerenciamento de cardápio (CRUD)
- ✅ Painel de controle de pedidos
- ✅ Atualização de status de pedidos
- ✅ Histórico de vendas

## 🏗️ Arquitetura

### Backend
- **Node.js + Express** - Framework web
- **SQLite** - Banco de dados
- **JWT** - Autenticação e autorização
- **Bcrypt** - Hash de senhas
- **CORS** - Integração com frontend

### Frontend
- **HTML5** - Estrutura
- **CSS3** - Estilização responsiva
- **Vanilla JavaScript** - Lógica da aplicação
- **Fetch API** - Comunicação com backend

## 📁 Estrutura de Pastas

```
RangoRapido/
├── backend/
│   ├── src/
│   │   ├── config/          # Configurações (banco de dados)
│   │   ├── controllers/     # Lógica de requisições HTTP
│   │   ├── middlewares/     # Middlewares (autenticação)
│   │   ├── models/          # Esquemas de dados
│   │   ├── repositories/    # Acesso ao banco de dados
│   │   ├── routes/          # Definição de endpoints
│   │   ├── services/        # Lógica de negócio
│   │   ├── utils/           # Funções auxiliares
│   │   ├── app.js           # Configuração da aplicação
│   │   └── server.js        # Inicialização do servidor
│   ├── package.json
│   ├── .env
│   └── .env.example
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   ├── api.js           # Cliente HTTP
│   │   └── app.js           # Lógica da aplicação
│   └── public/              # Assets estáticos
└── Planejamento/
    ├── arquitetura.md
    ├── descricao.md
    ├── rotas.md
    └── tarefas.md
```

## 🚀 Como Executar

### Backend

1. **Instalar dependências**
```bash
cd backend
npm install
```

2. **Criar arquivo .env**
```bash
cp .env.example .env
```

3. **Iniciar o servidor**
```bash
npm start
```
ou para desenvolvimento com hot-reload:
```bash
npm run dev
```

O servidor estará disponível em `http://localhost:3000`

### Frontend

1. **Iniciar um servidor HTTP**

Você pode usar qualquer servidor HTTP. Algumas opções:

**Com Python 3:**
```bash
cd frontend
python -m http.server 8000
```

**Com Node.js (http-server):**
```bash
npm install -g http-server
cd frontend
http-server
```

2. **Acessar a aplicação**

Abra seu navegador e acesse: `http://localhost:8000` (ou a porta que você escolher)

## 📡 Endpoints da API

### Usuários

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/usuarios` | Cadastrar novo usuário | Não |
| POST | `/api/usuarios/login` | Fazer login | Não |
| GET | `/api/usuarios/perfil` | Obter perfil do usuário | Sim |
| PUT | `/api/usuarios/perfil` | Atualizar perfil | Sim |

### Restaurantes

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/restaurantes` | Listar todos | Não |
| GET | `/api/restaurantes/:id` | Detalhes de um restaurante | Não |
| GET | `/api/restaurantes/meu-restaurante` | Obter meu restaurante | Sim |
| PUT | `/api/restaurantes` | Atualizar restaurante | Sim |

### Produtos

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| GET | `/api/produtos/restaurante/:id` | Listar produtos | Não |
| POST | `/api/produtos` | Criar produto | Sim (Admin) |
| PUT | `/api/produtos/:id` | Atualizar produto | Sim (Admin) |
| DELETE | `/api/produtos/:id` | Deletar produto | Sim (Admin) |

### Pedidos

| Método | Rota | Descrição | Autenticação |
|--------|------|-----------|--------------|
| POST | `/api/pedidos` | Criar novo pedido | Sim |
| GET | `/api/pedidos` | Listar meus pedidos | Sim |
| GET | `/api/pedidos/:id` | Detalhes do pedido | Sim |
| GET | `/api/pedidos/restaurante/pedidos` | Pedidos do restaurante | Sim (Admin) |
| PATCH | `/api/pedidos/:id/status` | Atualizar status | Sim (Admin) |

## 🔐 Autenticação

A autenticação é feita via JWT (JSON Web Token). Após fazer login, você receberá um token que deve ser enviado em todas as requisições privadas no header:

```
Authorization: Bearer <seu_token>
```

## 💾 Banco de Dados

O projeto usa **SQLite** com as seguintes tabelas:

- **usuarios** - Dados dos usuários (clientes e restaurantes)
- **restaurantes** - Dados dos restaurantes
- **produtos** - Itens do cardápio
- **pedidos** - Pedidos realizados
- **itens_pedido** - Detalhes dos produtos em cada pedido

## 🧪 Testando a API

Você pode usar ferramentas como **Postman** ou **Insomnia** para testar os endpoints.

### Exemplo de Login

```bash
curl -X POST http://localhost:3000/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "cliente@example.com",
    "senha": "123456"
  }'
```

## 📝 Notas Importantes

1. O backend e frontend rodam em portas diferentes (3000 e 8000)
2. CORS está habilitado para permitir requisições entre portas diferentes
3. As senhas são criptografadas com bcrypt
4. Cada restaurante pode gerenciar apenas seu próprio cardápio
5. O banco de dados é criado automaticamente na primeira execução

## 🛠️ Tecnologias Utilizadas

- **Backend**: Node.js, Express, SQLite, JWT, Bcrypt
- **Frontend**: HTML5, CSS3, JavaScript vanilla
- **DevOps**: Nodemon (desenvolvimento)

## 📖 Documentação Adicional

Para mais informações sobre a arquitetura e planejamento, veja:
- [Descrição do Sistema](Planejamento/descricao.md)
- [Arquitetura Técnica](Planejamento/arquitetura.md)
- [Rotas da API](Planejamento/rotas.md)
- [Divisão de Tarefas](Planejamento/tarefas.md)

## 👥 Equipe

- **Érico** - Frontend
- **João** - Backend

## 📝 Licença

MIT

---

**Desenvolvido com ❤️ para a disciplina de Desenvolvimento de Aplicações**
