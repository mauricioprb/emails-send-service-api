
# 📧 API para Serviço de Envio de Emails

 serviço de API desenvolvido em **Node.js** com **Express** para envio de e-mails via **SMTP**. Ele permite o envio de e-mails personalizados com autenticação via token.

---

## 🚀 Funcionalidades

- Envio de e-mails com conteúdo HTML.
- Validação de token para autenticação.

---

## 📩 Endpoint

O endpoint para requisições é `/api/send-mail`

Atualmente o endpoint está em `email.categorizabrasil.com/api/send-email`

Disponível para aplicações e desenvolvedores do projeto de Categorização dos Serviços de Alimentação da Região Central

### Método: `POST`

Envia um email para o destinatário informado com autenticação via token.

### 🔒 Autenticação

É obrigatório incluir um **token JWT** válido no header \`Authorization\`.

Configure o `.env` do seu projeto para a ur da API e o token

```env
EMAIL_API_URL="https://email.categorizabrasil.com.br/api/send-email"
EMAIL_API_TOKEN="seu-token"
```

---

### 📝 Corpo da Requisição (JSON)

| Campo    | Tipo   | Obrigatório | Descrição                     |
|----------|--------|-------------|--------------------------------|
| to     | string | ✅          | E-mail do destinatário.        |
| subject | string | ✅          | Assunto do e-mail.             |
| html   | string | ✅          | Conteúdo HTML do e-mail.       |

---

### 📥 Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/api/send-email \
-H "Content-Type: application/json" \
-H "Authorization: Bearer SEU_TOKEN_AQUI" \
-d '{
  "to": "destinatario@exemplo.com",
  "subject": "Teste de envio de e-mail",
  "html": "<h1>Olá!</h1><p>Este é um e-mail de teste enviado pela API.</p>"
}'
```

---

### 📤 Exemplo de Resposta Bem-Sucedida (200 OK)

```json
{
  "message": "Email enviado com sucesso!"
}
```

---

## 📦 Instalação (Caso queira executar localmente)

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/emails-send-service-api.git
   cd emails-send-service-api
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Configure o arquivo `.env\`:**

   Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

   ```env
   SMTP_HOST=smtp.seuprovedor.com
   SMTP_PORT=587
   SMTP_USER=seu-email@exemplo.com
   SMTP_PASS=sua-senha

   DATABASE_URL="postgres://root:root@localhost:5432/emailService?schema=public"
   POSTGRES_USER="root"
   POSTGRES_PASSWORD="root"
   POSTGRES_DB="emailService"
   ```

5. **Execute a aplicação:**

   - Em modo de desenvolvimento:

     ```bash
     npm run dev
     ```

   - Em modo de produção:

     ```bash
     npm start
     ```

---

### ⚠️ Possíveis Erros

| Código | Erro                                     | Motivo                                           |
|--------|------------------------------------------|--------------------------------------------------|
| 400    | { "error": "Campos obrigatórios: to, subject, html" } | Faltam campos no corpo da requisição.            |
| 403    | { "error": "Token de autenticação obrigatório" }      | O header \`Authorization\` não foi fornecido.      |
| 403    | { "error": "Token inválido!" }                         | O token fornecido é inválido ou expirado.        |
| 500    | { "error": "Erro ao enviar e-mail" }                   | Erro interno ao tentar enviar o e-mail.          |

---

## 🗂️ Estrutura de Arquivos

\`\`\`plaintext
emails-send-service-api/
├── controllers/
│   └── EmailController.ts   # Lida com a lógica da rota de envio de e-mail.
├── services/
│   ├── EmailService.ts      # Responsável por enviar e-mails via SMTP.
│   └── TokenService.ts      # Valida tokens JWT.
├── routes/
│   └── emailRoutes.ts       # Define as rotas relacionadas a e-mails.
├── .env                     # Variáveis de ambiente.
├── package.json             # Dependências e scripts.
└── server.ts                # Ponto de entrada da aplicação.
\`\`\`
