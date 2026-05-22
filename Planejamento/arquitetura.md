Aqui está o conteúdo do arquivo `arquitetura.md` com o planejamento técnico estruturado para a entrega. Mantive a linguagem técnica adequada, mas com a perspectiva do nosso grupo apresentando as decisões arquiteturais do projeto.

---

### **Arquivo: `arquitetura.md**`

# Planejamento Técnico - RangoRápido (Etapa 1)

Este documento descreve a base arquitetural que definimos para o back-end da nossa aplicação de delivery, garantindo que o código fique organizado, fácil de manter e de escalar no futuro.

---

## 1. Estrutura de Pastas

Optamos por uma estrutura baseada em camadas (Layered Architecture), separando as responsabilidades para não misturar regras de negócio com rotas ou acesso a dados. A raiz do nosso projeto (dentro da pasta `src`) ficará organizada assim:

```text
/src
  ├── /config          # Configurações gerais (banco de dados, variáveis de ambiente)
  ├── /controllers     # Lida com as requisições HTTP e respostas
  ├── /middlewares     # Interceptadores de requisições (ex: autenticação)
  ├── /models          # Definição das entidades/esquemas do banco de dados
  ├── /repositories    # Arquivos responsáveis por acessar e manipular o banco de dados
  ├── /routes          # Definição dos endpoints da API
  ├── /services        # Regras de negócio e lógica principal da aplicação
  ├── /utils           # Funções auxiliares (ex: formatação de datas, gerador de tokens)
  ├── app.js           # Configuração principal do servidor Express/aplicação
  └── server.js        # Arquivo de inicialização (entry point)

```

---

## 2. Descrição das Responsabilidades

Para garantir a **divisão de responsabilidades** (Separation of Concerns), cada camada terá um papel estrito:

* **Controllers:** São a "porta de entrada". Eles recebem as requisições HTTP (Request) feitas pelo front-end, extraem os dados (como parâmetros e corpo da requisição), repassam para o *Service* correspondente e, no final, devolvem a resposta HTTP (Response) com o código de status correto (ex: `200 OK`, `400 Bad Request`). Eles não tomam decisões de negócio.
* **Services:** É o "coração" do sistema, onde ficam as regras de negócio. Se um pedido precisa calcular o frete, ou se precisamos verificar se um prato está disponível antes de fechar o carrinho, é aqui que essa lógica acontece. O *Service* recebe os dados do *Controller*, processa e chama os *Repositories* se precisar salvar ou ler algo.
* **Repositories:** Camada responsável exclusivamente pela comunicação com o banco de dados. Qualquer operação de CRUD (Create, Read, Update, Delete) fica isolada aqui. Isso é ótimo porque se no futuro quisermos trocar de banco de dados, só precisamos alterar essa pasta.
* **Middlewares:** São funções que "interceptam" a requisição antes de ela chegar ao *Controller*. Vamos utilizá-los principalmente para segurança e validação. Por exemplo: um middleware de autenticação que checa se o usuário enviou um token válido antes de deixá-lo finalizar um pedido.

---

## 3. Organização das Rotas

As rotas da nossa API serão organizadas por domínio, facilitando a navegação.

* **`/api/usuarios`**
* `POST /` -> Criar nova conta de cliente.
* `POST /login` -> Autenticação.
* `GET /perfil` -> Ver dados da conta (protegido por middleware).


* **`/api/restaurantes`**
* `GET /` -> Listar todos os restaurantes disponíveis.
* `GET /:id` -> Detalhes de um restaurante específico.


* **`/api/produtos`**
* `GET /restaurante/:id` -> Listar o cardápio de um restaurante.
* `POST /` -> Cadastrar novo prato (Acesso restrito ao Admin do restaurante).


* **`/api/pedidos`**
* `POST /` -> Finalizar um novo pedido.
* `GET /` -> Listar o histórico de pedidos do usuário logado.
* `PUT /:id/status` -> Atualizar o status do pedido (Acesso restrito ao Admin do restaurante).



---

## 4. Entidades do Sistema

Nossas principais entidades (que vão virar tabelas no banco de dados) mapeiam o funcionamento básico de um delivery:

* **Usuário (Cliente):** Armazena quem está usando o app. (Atributos: `id`, `nome`, `email`, `senha_hash`, `telefone`, `endereco_principal`).
* **Restaurante:** O estabelecimento que vende os pratos. (Atributos: `id`, `nome_fantasia`, `cnpj`, `endereco`, `categoria_principal`).
* **Produto (Prato):** O item do cardápio. (Atributos: `id`, `nome`, `descricao`, `preco`, `imagem_url`, `restaurante_id`).
* **Pedido:** O registro de uma compra finalizada. (Atributos: `id`, `usuario_id`, `restaurante_id`, `status` [ex: Pendente, Preparando, Saiu para Entrega, Entregue], `valor_total`, `data_pedido`).
* **ItemPedido:** Entidade auxiliar que detalha o que foi pedido, pois um pedido pode ter vários produtos. (Atributos: `id`, `pedido_id`, `produto_id`, `quantidade`, `preco_unitario`).

---

## 5. Relacionamento entre Entidades

Para estruturar nosso banco de dados relacional, definimos as seguintes regras de cardinalidade:

* **Usuário 1 : N Pedidos:** Um usuário pode realizar vários pedidos ao longo do tempo, mas um pedido específico sempre pertence a apenas um usuário.
* **Restaurante 1 : N Produtos:** Um restaurante possui vários produtos cadastrados no seu cardápio, mas um produto pertence exclusivamente a um restaurante.
* **Restaurante 1 : N Pedidos:** O restaurante recebe múltiplos pedidos, mas cada pedido é direcionado a apenas um restaurante por vez. (Não é possível pedir de dois restaurantes diferentes no mesmo "carrinho" / "pedido").
* **Pedido 1 : N ItemPedido:** Um único pedido pode conter vários itens diferentes (ex: 1 Pizza e 2 Refrigerantes).
* **Produto 1 : N ItemPedido:** Um produto específico do cardápio (ex: Coca-Cola) pode aparecer em vários itens de pedidos de clientes diferentes.

---

*Nota do grupo: Arquivo pronto para commit na pasta "Planejamento"!*