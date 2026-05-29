# 🚀 Setup Rápido - RangoRápido

## ⚡ Primeira Execução (5 minutos)

### Passo 1: Instalar Dependências do Backend

```bash
cd backend
npm install
```

Isso vai:
- Instalar todas as dependências (Express, SQLite, JWT, etc)
- Criar a pasta `node_modules/`

### Passo 2: Iniciar o Backend

```bash
npm start
```

Você deverá ver:
```
✓ Conectado ao SQLite
✓ Database tables initialized
✓ Servidor rodando na porta 3000
```

**✅ Backend está pronto em `http://localhost:3000`**

---

### Passo 3: Iniciar o Frontend (Nova Aba do Terminal)

Volte para a pasta raiz do projeto:

```bash
cd frontend
python -m http.server 8000
```

Ou com Node.js:
```bash
npx http-server
```

Você deverá ver:
```
Serving HTTP on http://localhost:8000
```

**✅ Frontend está pronto em `http://localhost:8000`**

---

### Passo 4: Acessar a Aplicação

Abra seu navegador e vá para: **`http://localhost:8000`**

---

## 📝 Dados de Teste

### Criar Conta Cliente

Na página de cadastro, preencha:
- **Nome:** João Silva
- **Email:** joao@test.com
- **Senha:** 123456
- **Telefone:** (11) 9 1234-5678
- **Endereço:** Rua A, 123 - São Paulo
- **Tipo:** Cliente

### Criar Conta Restaurante

Repita o processo com:
- **Nome:** Pizzaria Dom Pedro
- **Email:** pizzaria@test.com
- **Senha:** 123456
- **Telefone:** (11) 3000-0000
- **Endereço:** Av. Paulista, 1000
- **Tipo:** Restaurante

---

## 🔄 Fluxo de Teste

1. **Como Restaurante:**
   - Faça login com `pizzaria@test.com` / `123456`
   - Vá para "Cardápio"
   - Adicione alguns produtos:
     - Pizza Margherita - R$ 35.90
     - Pizza Calabresa - R$ 38.90
     - Refrigerante - R$ 5.90

2. **Como Cliente:**
   - Faça logout
   - Faça login com `joao@test.com` / `123456`
   - Veja os restaurantes na Home
   - Clique em um restaurante
   - Adicione itens ao carrinho
   - Finalize o pedido

3. **Como Restaurante:**
   - Faça login novamente como restaurante
   - Vá para "Pedidos"
   - Veja o pedido do cliente
   - Atualize o status para "Preparando", "Saiu para Entrega", "Entregue"

---

## 📚 Estrutura de Arquivos Criados

```
✅ backend/
   ✅ src/
      ✅ config/database.js
      ✅ controllers/ (4 arquivos)
      ✅ middlewares/auth.js
      ✅ repositories/ (4 arquivos)
      ✅ routes/ (4 arquivos)
      ✅ services/ (4 arquivos)
      ✅ utils/ (2 arquivos)
      ✅ app.js
      ✅ server.js
   ✅ package.json
   ✅ .env
   ✅ .gitignore

✅ frontend/
   ✅ index.html
   ✅ css/style.css
   ✅ js/api.js
   ✅ js/app.js

✅ Planejamento/ (arquivos originais)
✅ README.md
✅ API_EXAMPLES.md
```

---

## 🐛 Troubleshooting

### Backend não inicia

**Erro:** "Cannot find module 'express'"
```bash
# Solução: Instale as dependências
npm install
```

**Erro:** "Port 3000 already in use"
```bash
# Solução: Mude a porta no .env ou feche o processo:
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Frontend não conecta ao backend

**Erro:** "CORS error" ou "Cannot reach backend"
```bash
# Solução: Verifique se:
# 1. Backend está rodando em http://localhost:3000
# 2. Frontend está usando http://localhost:8000 (ou a porta correta)
# 3. CORS está habilitado no backend (já está configurado)
```

### Banco de dados vazio

O banco de dados é criado automaticamente na primeira execução em `backend/database/rangorapido.db`

Para resetar:
```bash
# Delete a pasta database
rm -r backend/database/

# Restart o servidor
npm start
```

---

## 📖 Próximas Etapas

1. **Adicione mais funcionalidades:**
   - Filtro de restaurantes por categoria
   - Busca de produtos
   - Avaliações de clientes
   - Cupons de desconto

2. **Melhore a interface:**
   - Use um framework como React ou Vue
   - Adicione animações
   - Implemente dark mode

3. **Deploy:**
   - Publique o backend em um serviço (Heroku, Render, Railway)
   - Publique o frontend em um CDN (Vercel, Netlify)

---

## 📞 Suporte

Para mais informações, consulte:
- [README.md](README.md) - Documentação completa
- [API_EXAMPLES.md](API_EXAMPLES.md) - Exemplos de requisições
- [Planejamento/](Planejamento/) - Documentação do projeto

---

## 🎉 Pronto!

Você tem agora um **sistema completo de delivery** funcionando localmente!

Se tiver dúvidas, verifique os arquivos de documentação ou teste os endpoints usando Postman.

**Divirta-se! 🚀**
