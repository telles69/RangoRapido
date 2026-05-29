# RangoRápido - Frontend Next.js

Frontend moderno desenvolvido com Next.js e React para a plataforma de delivery RangoRápido.

## 🚀 Início Rápido

### Instalação

```bash
cd frontend-nextjs
npm install
```

### Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

```
frontend-nextjs/
├── pages/              # Páginas Next.js
│   ├── _app.js        # App principal com providers
│   ├── _document.js   # Document HTML
│   ├── index.js       # Home - Listagem de restaurantes
│   ├── login.js       # Login
│   ├── cadastro.js    # Cadastro
│   ├── perfil.js      # Perfil do usuário
│   ├── pedidos.js     # Meus pedidos
│   ├── restaurante/[id].js  # Detalhes do restaurante
│   ├── admin.js       # Painel administrativo
│   └── 404.js         # Página de erro
├── components/        # Componentes React reutilizáveis
│   ├── Header.js
│   ├── LoginForm.js
│   ├── RegisterForm.js
│   ├── RestaurantCard.js
│   ├── ProductCard.js
│   ├── Cart.js
│   ├── OrderList.js
│   └── Layout.js
├── contexts/          # Contextos React (Auth)
│   └── AuthContext.js
├── hooks/             # Custom hooks
│   └── useAuth.js
├── lib/               # Utilitários
│   └── api.js         # Client da API
├── styles/            # CSS Modules
│   ├── globals.css
│   ├── components.css
│   └── *.module.css
└── public/            # Arquivos estáticos
```

## 🎨 Funcionalidades

### Para Clientes
- ✅ Login/Cadastro
- ✅ Visualizar restaurantes
- ✅ Ver cardápio
- ✅ Adicionar ao carrinho
- ✅ Fazer pedidos
- ✅ Acompanhar pedidos
- ✅ Gerenciar perfil

### Para Restaurantes
- ✅ Painel administrativo
- ✅ Gerenciar cardápio
- ✅ Acompanhar pedidos
- ✅ Atualizar status dos pedidos
- ✅ Ver estatísticas

## 🔌 Configuração da API

Crie um arquivo `.env.local` na raiz do projeto:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## 📱 Responsividade

O projeto é 100% responsivo e funciona perfeitamente em:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🎨 Design System

- **Cor Principal**: #ff6b35 (Laranja)
- **Cor Secundária**: #f7a500 (Amarelo)
- **Fundo**: #f5f5f5 (Cinza claro)
- **Texto**: #333 (Cinza escuro)

## 📦 Dependências

- **next**: Framework React
- **react**: Biblioteca UI
- **axios**: Cliente HTTP
- **next/router**: Roteamento

## 🔐 Autenticação

A autenticação é gerenciada através de:
- **Token JWT** armazenado no localStorage
- **AuthContext** para gerenciar estado global
- **Custom hook useAuth** para acessar contexto

## 📝 Exemplo de Uso

```javascript
import { useAuth } from '@/hooks/useAuth';

export default function MyComponent() {
  const { user, login, logout } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Bem-vindo, {user.nome}!</p>
          <button onClick={logout}>Sair</button>
        </>
      ) : (
        <p>Faça login para continuar</p>
      )}
    </div>
  );
}
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
npm install -g vercel
vercel
```

### Deploy Manual

```bash
npm run build
# Fazer upload da pasta .next
```

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do Next.js:
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)

---

Desenvolvido com ❤️ para o RangoRápido
