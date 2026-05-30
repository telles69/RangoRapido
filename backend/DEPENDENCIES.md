# 📦 package-lock.json

Este arquivo é gerado automaticamente quando você instala as dependências com `npm install`.

Para instalar as dependências do projeto, execute:

```bash
cd backend
npm install
```

Isso irá:
1. Ler o arquivo `package.json`
2. Baixar todas as dependências especificadas
3. Gerar o arquivo `package-lock.json` com as versões exatas instaladas
4. Criar a pasta `node_modules/` com todos os pacotes

As dependências do projeto são:
- **express** - Framework web
- **sqlite3** - Driver do SQLite
- **jwt-simple** - Geração e verificação de JWT
- **bcryptjs** - Hash de senhas
- **dotenv** - Carregamento de variáveis de ambiente
- **cors** - Habilitação de CORS
- **nodemon** - Hot reload em desenvolvimento
