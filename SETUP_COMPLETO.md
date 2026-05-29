# 🍔 RangoRápido - Completo com Next.js + React + Node.js

Projeto de delivery desenvolvido com **Next.js + React** no frontend e **Node.js (Express)** no backend.

## 📂 Estrutura do Projeto

```
RangoRapido/
├── backend/              # API Node.js com Express
├── frontend-nextjs/      # Frontend Next.js com React
├── Planejamento/         # Documentação do projeto
└── README.md
```

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### 1️⃣ Preparar Backend

```bash
cd backend
npm install
npm start
```

Servidor rodará em: **http://localhost:3000/api**

### 2️⃣ Preparar Frontend Next.js

Em outro terminal:

```bash
cd frontend-nextjs
npm install
npm run dev
```

Aplicação rodará em: **http://localhost:3000** (pode ser necessário usar porta diferente)

Se a porta 3000 já estiver em uso, Next.js automaticamente usa 3001, 3002, etc.

## 👤 Contas de Teste

### Cliente
- **Email**: joao@test.com
- **Senha**: 123456

### Restaurante
- **Email**: pizzaria@test.com
- **Senha**: 123456

## 🎨 Tecnologias Utilizadas

### Frontend
- **Next.js 14** - Framework React com SSR/SSG
- **React 18** - Biblioteca UI
- **CSS Modules** - Estilos componentizados
- **Axios** - Cliente HTTP
- **Context API** - Gerenciamento de estado

### Backend
- **Express.js** - Framework web
- **Node.js** - Runtime JavaScript
- **SQLite** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Criptografia de senhas

## 📁 Estrutura Frontend Next.js

```
frontend-nextjs/
├── pages/
│   ├── index.js           # Home - Restaurantes
│   ├── login.js           # Login
│   ├── cadastro.js        # Cadastro
│   ├── restaurante/[id].js # Cardápio
│   ├── pedidos.js         # Meus pedidos
│   ├── perfil.js          # Perfil
│   ├── admin.js           # Painel administrativo
│   ├── _app.js            # App wrapper
│   ├── _document.js       # HTML document
│   └── 404.js             # Página não encontrada
├── components/
│   ├── Header.js
│   ├── LoginForm.js
│   ├── RegisterForm.js
│   ├── RestaurantCard.js
│   ├── ProductCard.js
│   ├── Cart.js
│   ├── OrderList.js
│   └── Layout.js
├── contexts/
│   └── AuthContext.js     # Contexto de autenticação
├── hooks/
│   └── useAuth.js         # Custom hook de auth
├── lib/
│   └── api.js             # Client da API
├── styles/
│   ├── globals.css        # Estilos globais
│   ├── components.css     # Estilos de componentes
│   └── *.module.css       # CSS Modules
└── public/                # Arquivos estáticos
```

## 🔌 Configuração

### Backend

O backend usa SQLite e é autoconfigurado na primeira execução.

**Arquivo: `backend/.env`** (opcional)
```
PORT=3000
NODE_ENV=development
```

### Frontend

**Arquivo: `frontend-nextjs/.env.local`**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## ✨ Funcionalidades

### 👥 Para Clientes

- ✅ Cadastro e login
- ✅ Visualizar restaurantes
- ✅ Explorar cardápio
- ✅ Carrinho de compras
- ✅ Fazer pedidos
- ✅ Acompanhar pedidos (status em tempo real)
- ✅ Gerenciar perfil

### 🍽️ Para Restaurantes

- ✅ Painel administrativo
- ✅ Gerenciar cardápio (produtos)
- ✅ Visualizar pedidos recebidos
- ✅ Atualizar status dos pedidos
- ✅ Estatísticas de vendas
- ✅ Faturamento total

## 🔐 Autenticação

- JWT (JSON Web Token)
- Token armazenado em localStorage
- AuthContext para gerenciamento global
- Rotas protegidas por tipo de usuário

## 📱 Responsividade

- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (< 768px)

## 🎨 Design

- **Cor Principal**: #ff6b35 (Laranja vibrante)
- **Cor Secundária**: #f7a500 (Amarelo)
- **Fundo**: #f5f5f5 (Cinza claro)
- **Texto**: #333 (Cinza escuro)

## 📚 API Endpoints

### Autenticação
- `POST /api/usuarios` - Registrar usuário
- `POST /api/usuarios/login` - Login
- `GET /api/usuarios/perfil` - Perfil do usuário
- `PUT /api/usuarios/perfil` - Atualizar perfil

### Restaurantes
- `GET /api/restaurantes` - Listar restaurantes
- `GET /api/restaurantes/:id` - Detalhes do restaurante
- `GET /api/restaurantes/meu-restaurante` - Meu restaurante

### Produtos
- `GET /api/produtos/restaurante/:id` - Produtos de um restaurante
- `POST /api/produtos` - Criar produto
- `PUT /api/produtos/:id` - Atualizar produto
- `DELETE /api/produtos/:id` - Deletar produto

### Pedidos
- `POST /api/pedidos` - Criar pedido
- `GET /api/pedidos` - Meus pedidos
- `GET /api/pedidos/restaurante/pedidos` - Pedidos do restaurante
- `GET /api/pedidos/:id` - Detalhes do pedido
- `PATCH /api/pedidos/:id/status` - Atualizar status

## 🚀 Deploy

### Frontend no Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Backend no Heroku

```bash
heroku login
heroku create seu-app
git push heroku main
```

## 📊 Banco de Dados

Tabelas:
- **usuarios** - Dados dos usuários
- **restaurantes** - Dados dos restaurantes
- **produtos** - Cardápio dos restaurantes
- **pedidos** - Pedidos realizados
- **itens_pedido** - Itens de cada pedido

## 🔧 Desenvolvimento

### Scripts Disponíveis

#### Backend
```bash
npm start          # Inicia o servidor
npm run dev        # Modo desenvolvimento com nodemon
npm test           # Roda testes
```

#### Frontend
```bash
npm run dev        # Modo desenvolvimento
npm run build      # Build para produção
npm start          # Inicia produção
npm run lint       # Verifica código
```

## 📝 Notas

- O banco de dados SQLite é criado automaticamente
- Senhas são criptografadas com bcrypt
- Autenticação via JWT nos headers
- CORS configurado para localhost

## 🐛 Troubleshooting

### Erro de porta já em uso

```bash
# Encontrar processo na porta 3000
lsof -i :3000

# Matar processo
kill -9 <PID>
```

### Erro de CORS

Verifique se a URL da API está correta em `.env.local`

### Banco de dados corrompido

Delete o arquivo `database.db` na pasta backend e reinicie

## 📞 Suporte

Para mais informações:
- [Next.js Docs](https://nextjs.org/docs)
- [Express.js Docs](https://expressjs.com/)
- [React Docs](https://react.dev)

---

Desenvolvido com ❤️ para o RangoRápido
