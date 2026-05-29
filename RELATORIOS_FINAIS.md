# Relatórios Finais - Projeto RangoRápido

---

## 📋 RELATÓRIO DO ÉRICO - DESENVOLVEDOR FRONTEND

### 1. Qual foi sua principal contribuição no trabalho?

Minha principal contribuição foi desenvolver toda a interface de usuário do RangoRápido do zero com Next.js e React. Isso incluiu desde a estrutura inicial do projeto, passando por todas as páginas do cliente e do restaurante, até os componentes reutilizáveis e o sistema de autenticação com Context API. Basicamente, criei a "cara" do aplicativo que os usuários interagem diariamente.

### 2. Quais partes do projeto você desenvolveu?

Fui responsável por praticamente todo o frontend:

- **Estrutura do Projeto**: Configurei Next.js 14, TypeScript, ESLint, variáveis de ambiente e aliases de paths
- **Autenticação**: Sistema completo de login, registro e gerenciamento de sessão com Context API
- **Páginas de Cliente**: Home com listagem de restaurantes, detalhe do restaurante com cardápio, histórico de pedidos, perfil do usuário
- **Admin do Restaurante**: Dashboard com estatísticas, gerenciamento de cardápio (CRUD de produtos), gerenciamento de pedidos
- **Componentes Reutilizáveis**: Header, Cart, ProductCard, RestaurantCard, Forms, etc.
- **Estilos**: Mais de 15 arquivos CSS Modules com design responsivo
- **Cliente HTTP**: Camada de API centralizada com Axios
- **Carrinho Persistente**: Sistema de localStorage para manter os itens salvos após refresh

### 3. Qual foi o trecho mais complicado do código? Explique o motivo.

O trecho mais complicado foi implementar a **persistência do carrinho com localStorage**. A complicação não estava em si na sintaxe, mas em entender o fluxo completo:

1. Precisei sincronizar o estado React com localStorage sem causar loops infinitos
2. Deveria carregar o carrinho ao montar o componente, mas preservar os dados entre páginas
3. Tinha que limpar o localStorage apenas após o checkout bem-sucedido
4. Diferentes restaurantes precisavam ter carrinhos independentes

Resolvi usando dois `useEffect` separados: um para carregar dados iniciais e outro apenas para sincronizar mudanças no carrinho. Isso garantiu que não houvesse conflitos e cada restaurante tivesse sua própria chave no localStorage.

### 4. Qual foi sua maior dificuldade técnica e como resolveu?

A maior dificuldade foi um **conflito de rotas no Next.js**. Eu tinha dois arquivos resolvendo para a mesma rota:
- `pages/admin.js` 
- `pages/admin/index.js`

Ambos tentavam usar o path `/admin`, causando um erro de compilação. A solução foi simples, mas levou um tempo para debugar: renomeei `pages/admin.js` para `pages/admin.old.js` e reorganizei as rotas dinâmicas e específicas na ordem correta (específicas primeiro, dinâmicas depois).

Aproveitei também para criar um `.env.local` com a URL da API, pois o Next.js não estava pegando as variáveis de ambiente corretamente.

### 5. Você utilizou IA em alguma parte? Se sim, explique exatamente como.

Sim, utilizei muito! O GitHub Copilot foi meu companheiro o tempo todo:

- **Geração de boilerplate**: Para criar estruturas repetitivas como CSS Modules, componentes de formulário
- **Revisão de lógica**: Quando estava implementando o carrinho persistente, pedi revisão do fluxo de `useEffect`
- **Refatoração**: Copilot sugeriu melhorias no código, como usar `Promise.all()` para carregar dados em paralelo
- **Debugging**: Quando surgia um erro, usava para entender a mensagem e gerar soluções potenciais
- **Esclarecer conceitos**: Perguntei sobre Context API vs Redux, qual era a melhor prática para este projeto

### 6. O que você aprendeu de novo com este trabalho?

Aprendi bastante! Principalmente:

- **Next.js moderno**: Roteamento baseado em arquivos, renderização dinâmica, variáveis de ambiente
- **State Management com Context**: Como estruturar uma aplicação sem Redux usando apenas Context API
- **Padrões de projeto**: Repository pattern, separação de responsabilidades entre componentes, hooks customizados
- **LocalStorage em React**: Sincronização entre estado e persistência sem causar loops
- **Debugging de integração frontend-backend**: Entender como token JWT é enviado, como middleware funciona no backend
- **CSS Modules em escala**: Organizar estilos em arquivos modulares sem conflitos de classe

### 7. Se tivesse mais tempo, o que melhoraria no projeto?

Muita coisa! Prioridades:

- **Toast Notifications**: Usar uma biblioteca como React Hot Toast em vez de `alert()` para melhor UX
- **Loading Skeletons**: Enquanto dados carregam, mostrar skeletons animados em vez de "Carregando..."
- **Error Boundaries**: Componentes de erro global para tratamentos mais robustos
- **Validação de formulários**: Usar Zod ou Yup para validação mais sofisticada e mensagens de erro claras
- **Search/Filter**: Buscar restaurantes por categoria, filtrar produtos por preço
- **Infinite Scroll**: Em vez de carregar tudo de uma vez, paginar resultados
- **Testes unitários**: Jest + React Testing Library para garantir qualidade
- **PWA**: Tornar offline-first, adicionar service workers
- **Acessibilidade**: Melhorar ARIA labels, contrast de cores, navegação por teclado
- **TypeScript mais rigoroso**: Usar tipos genéricos para componentes reutilizáveis

---

## 🔧 RELATÓRIO DO JOÃO TELLES - DESENVOLVEDOR BACKEND

### 1. Qual foi sua principal contribuição no trabalho?

Minha contribuição principal foi toda a estrutura de backend, banco de dados e APIs que alimentam o RangoRápido. Criei a "espinha dorsal" do projeto: todos os endpoints que o frontend consome, a autenticação segura com JWT, e o banco de dados que armazena os dados críticos. Sem o backend, o frontend seria apenas uma interface bonita sem funcionalidade.

### 2. Quais partes do projeto você desenvolveu?

Desenvolvi completamente:

- **Arquitetura do Backend**: Node.js com Express, estrutura em camadas (Controllers, Services, Repositories)
- **Banco de Dados**: SQLite com 5 tabelas relacionadas (usuarios, restaurantes, produtos, pedidos, itens_pedido)
- **Autenticação**: Sistema JWT com bcrypt para hash de senhas, middleware de autenticação
- **Repositórios de Dados**: Classes para abstrair queries SQL e manter lógica limpa
- **Endpoints das 4 entidades principais**: 
  - Usuários (register, login, perfil, atualizar)
  - Restaurantes (listar, detalhes, meu restaurante, atualizar)
  - Produtos (listar, criar, atualizar, deletar)
  - Pedidos (criar, listar, atualizar status)
- **Validação e Tratamento de Erros**: Middleware de autenticação, validação de dados, respostas padronizadas
- **Migrations automáticas**: Criar tabelas e constraints automaticamente ao iniciar

### 3. Qual foi o trecho mais complicado do código? Explique o motivo.

O trecho mais complicado foi implementar a **lógica de pedidos com itens relacionados**. Era complicado porque:

1. Um pedido tem muitos itens, e cada item tem muitas informações (produto_id, quantidade, preco_unitario)
2. Precisava garantir que o preço unitário fosse fixado no momento do pedido, não mudasse depois
3. Tinha que validar que todos os produtos existem e pertencem ao restaurante correto
4. Precisava fazer transações para garantir consistência: se algo falhasse, tudo era revertido

Outro trecho complicado foi a **rota `/meu-restaurante`**: a ordem das rotas em Express é crucial. Colocava `/:id` antes de `/meu-restaurante`, e a rota dinâmica capturava `meu-restaurante` como um ID, causando erro. Resolvendo, aprendi que rotas específicas devem vir ANTES das dinâmicas.

### 4. Qual foi sua maior dificuldade técnica e como resolveu?

A maior dificuldade foi **garantir que o usuário não pudesse acessar recursos que não pertenciam a ele**. Por exemplo:

- Um cliente não deveria conseguir acessar o cardápio de outro restaurante
- Um restaurante não deveria conseguir acessar pedidos de outro restaurante
- Precisava passar o `usuario_id` pelo middleware de autenticação para todas as requisições

Resolvi implementando um middleware `authenticate` que:
1. Valida o token JWT
2. Extrai o `usuario_id` do token
3. Anexa ao objeto `req.userId` para usar nas rotas
4. Protege rotas privadas

Depois, nas controllers, verifico se o restaurante ou pedido que está sendo acessado pertence ao usuário autenticado.

### 5. Você utilizou IA em alguma parte? Se sim, explique exatamente como.

Sim, utilizei bastante:

- **Geração de código boilerplate**: Estrutura de Controllers, Services, Repositories
- **Queries SQL**: Pedi ajuda para estruturar JOINs complexos entre tabelas
- **Tratamento de erros**: Sugestões de como estruturar respostas de erro consistentes
- **Validação de dados**: Como validar emails, senhas, campos obrigatórios
- **Estrutura do banco**: Sugestões de schema, relações entre tabelas, constraints
- **Debugging de autenticação**: Quando tokens não estavam sendo enviados corretamente

### 6. O que você aprendeu de novo com este trabalho?

Aprendi muito sobre desenvolvimento backend:

- **Padrão Repository**: Como abstrair a lógica de banco de dados para reutilizar código
- **Middleware em Express**: Como usar para autenticação, validação, tratamento de erro
- **JWT**: Como funciona tokenização, claims, expiração
- **SQLite promisificado**: Usar Promises em vez de callbacks com `.promisify()`
- **Validação no backend**: Nunca confiar nos dados do cliente, sempre validar
- **Segurança**: Hash de senhas, proteção de rotas, verificação de propriedade
- **RESTful API Design**: Conventions para status codes, nomenclatura de endpoints

### 7. Se tivesse mais tempo, o que melhoraria no projeto?

Muitas coisas para fazer o backend mais robusto:

- **Migrations com Knex.js ou Sequelize**: Em vez de SQL puro, usar um query builder
- **Testes unitários e integração**: Jest para testar repositories e services isoladamente
- **Logging estruturado**: Winston ou Pino para logs em arquivo, não apenas console.error()
- **Rate limiting**: Proteger contra brute force attacks em login
- **Validação com Joi ou Zod**: Schema validation para inputs
- **Transações no banco**: Para operações que envolvem múltiplas tabelas
- **Paginação**: Em endpoints que retornam muitos dados
- **Soft deletes**: Não deletar dados direto, apenas marcar como deletado
- **Auditoria**: Registrar quem mudou o quê e quando
- **Cache com Redis**: Para dados que não mudam frequentemente (restaurantes, produtos)
- **Docker**: Containerizar para deploy mais fácil
- **API Documentation**: Swagger/OpenAPI para documentar todos os endpoints
- **Tratamento de concorrência**: Quando múltiplos pedidos chegam simultaneamente

---

## 📊 Resumo do Projeto

**Frontend (Érico)**: 10 páginas, 10+ componentes, 15 CSS Modules, autenticação com Context API  
**Backend (João Telles)**: 4 entidades, 20+ endpoints, banco SQLite com 5 tabelas, autenticação JWT  

**Resultado**: Uma aplicação full-stack funcional de delivery de comida, onde clientes podem fazer pedidos e restaurantes gerenciam cardápio e pedidos. ✅
