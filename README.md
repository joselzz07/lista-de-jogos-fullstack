#  Lista de Jogos Full-Stack

Projeto final desenvolvido em Node.js e PostgreSQL, composto por uma API REST e uma interface web para gerenciamento e visualização de uma lista de jogos.

---

##  Tecnologias Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript
- **Backend:** Node.js, Express, JWT (JSON Web Token)
- **Banco de Dados:** PostgreSQL (duas tabelas relacionadas via Foreign Key)
- **Deploy:** Render (Backend) / Vercel (Frontend)

---

##  Dados para Teste (Acesso Avaliador)

Para testar as rotas protegidas por autenticação JWT durante a avaliação:

- **E-mail:** admin@teste.com
- **Senha:** 123456

---

##  Estrutura do Projeto (Arquitetura MVC)

lista-de-jogos-fullstack/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── middlewares/   # Autenticação JWT e tratamentos de erro
│   └── .env.example
└── frontend/               # Interface web integrada à API REST

---

##  Como Executar Localmente

### Pré-requisitos
- Node.js e npm instalados
- Instância do PostgreSQL em execução

### 1. Clonar o Repositório
git clone https://github.com/joselzz07/lista-de-jogos-fullstack.git
cd lista-de-jogos-fullstack

### 2. Configurar e Executar o Backend
cd backend
npm install
# Crie um arquivo .env baseado no .env.example (DATABASE_URL, JWT_SECRET, PORT)
npm start

### 3. Executar o Frontend
cd ../frontend
# Abra o arquivo index.html no navegador ou utilize a extensão Live Server

---

##  Autor

Desenvolvido por **José Luiz Jacinto dos Santos** ([@joselzz07](https://github.com/joselzz07)).
