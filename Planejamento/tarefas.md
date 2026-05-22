Aqui está o arquivo `tarefas.md` atualizado, focando apenas nas responsabilidades e com a nova divisão de papéis que você pediu (Érico no Front-end e João no Back-end).

---

### **Arquivo: `tarefas.md**`

# Quebra de Tarefas da Equipe - RangoRápido

Como a nossa equipe é composta por dois integrantes (**Érico** e **João**), decidimos dividir o projeto separando as camadas de atuação para que possamos trabalhar em paralelo com mais eficiência.

---

## Responsabilidades de Cada Integrante

### **Érico (Responsável pelo Front-end)**

Ficará encarregado de toda a parte visual e de interação com o usuário na nossa aplicação. Suas principais responsabilidades incluem:

* Configuração inicial do projeto Front-end (HTML/CSS/JavaScript ou framework escolhido, como React/Vue).
* Desenvolvimento da identidade visual (paleta de cores, tipografia e responsividade para dispositivos móveis).
* Criação de todas as telas da aplicação:
* Tela de Login e Cadastro (para clientes e restaurantes).
* Tela Home (listagem e busca de restaurantes).
* Tela de Cardápio (listagem dos pratos do restaurante selecionado).
* Carrinho de Compras e fluxo de Checkout (finalização do pedido).
* Painel Administrativo do Restaurante (para gerenciar cardápio e ver pedidos).


* Gerenciamento de estado local (ex: manter os itens do carrinho salvos enquanto o usuário navega).
* Consumo da API desenvolvida no back-end (realizar as requisições HTTP usando `fetch` ou `axios` e tratar os dados na tela).

### **João (Responsável pelo Back-end)**

Assumirá a construção da API, a segurança e a persistência dos dados do sistema. Suas principais responsabilidades incluem:

* Configuração inicial do servidor (utilizando Node.js e Express) e conexão estruturada com o banco de dados.
* Modelagem das tabelas do banco de dados e criação da camada de *Repositories*.
* Desenvolvimento de todas as rotas da API (Endpoints), *Controllers* e *Services* para as entidades do sistema (`Usuario`, `Restaurante`, `Produto`, `Pedido`).
* Implementação da lógica e regras de negócio (ex: cálculo de totais, validação de disponibilidade de itens).
* Criação de *Middlewares* de segurança, como autenticação de usuários e controle de acesso via token (JWT), garantindo que apenas os donos dos restaurantes possam alterar seus cardápios.
* Documentação e testes dos endpoints (usando ferramentas como Postman ou Insomnia) para garantir que o Front-end receba os dados no formato correto.
