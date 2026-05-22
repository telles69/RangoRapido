Aqui está o conteúdo do arquivo `rotas.md`, estruturado com tabelas para facilitar a leitura do professor e deixar claro quais rotas precisam de autenticação.

---

### **Arquivo: `rotas.md**`

# Definição das Rotas - RangoRápido

Este documento mapeia os endpoints (rotas) da nossa API, separados entre rotas públicas (que qualquer pessoa pode acessar sem estar logada) e rotas privadas (que exigem um token de autenticação JWT gerado no momento do login).

## 1. Rotas Públicas

Estas rotas são essenciais para que o usuário consiga conhecer a plataforma, navegar pelos restaurantes, ver os pratos disponíveis e, se desejar, criar sua conta.

| Rota | Método HTTP | Finalidade |
| --- | --- | --- |
| `/api/usuarios` | **POST** | Cadastrar um novo usuário (cliente ou dono de restaurante). |
| `/api/login` | **POST** | Realizar login na plataforma e retornar o token de autenticação. |
| `/api/restaurantes` | **GET** | Listar todos os restaurantes cadastrados (aparece na tela Home). |
| `/api/restaurantes/:id` | **GET** | Ver os detalhes de um restaurante específico (nome, endereço, categoria). |
| `/api/restaurantes/:id/produtos` | **GET** | Listar todo o cardápio (produtos) do restaurante selecionado. |

---

## 2. Rotas Privadas

Estas rotas exigem que o usuário envie um token válido no cabeçalho da requisição (`Authorization: Bearer <token>`). Algumas delas têm verificações adicionais (ex: apenas o dono do restaurante pode alterar um produto).

| Rota | Método HTTP | Finalidade |
| --- | --- | --- |
| `/api/usuarios/perfil` | **GET** | Visualizar os dados do próprio perfil logado (nome, endereço principal). |
| `/api/usuarios/perfil` | **PUT** | Atualizar dados cadastrais do próprio usuário (ex: mudar o telefone). |
| `/api/pedidos` | **POST** | Finalizar o carrinho e criar um novo pedido (Cliente). |
| `/api/pedidos` | **GET** | Listar o histórico de pedidos do usuário logado (Cliente). |
| `/api/pedidos/:id` | **GET** | Ver os detalhes e o status de um pedido específico. |
| `/api/produtos` | **POST** | Cadastrar um novo prato no cardápio (Restrito ao Admin do Restaurante). |
| `/api/produtos/:id` | **PUT** | Editar as informações ou o preço de um prato (Restrito ao Admin). |
| `/api/produtos/:id` | **DELETE** | Excluir um prato do cardápio (Restrito ao Admin). |
| `/api/restaurantes/pedidos` | **GET** | Painel do restaurante: lista os pedidos recebidos em tempo real (Admin). |
| `/api/pedidos/:id/status` | **PATCH** | Atualizar o status de um pedido (ex: de "Preparando" para "Saiu para entrega") (Admin). |

