
# 📧 API para Serviço de Envio de Emails

 serviço de API desenvolvido em **Node.js** com **Express** para envio de emails via **SMTP**. Ele permite o envio de emails personalizados com autenticação via token.

---

## 🚀 Funcionalidades

- Envio de emails com conteúdo HTML.
- Validação de token para autenticação.

---

## 📩 Endpoint

| **Método** | **Endpoint**                                            | **Descrição**                                  |
|------------|----------------------------------------------------------|--------------------------------------------------|
| `POST`     | `/api/send-mail`                                         | Envia um email para o destinatário informado.   |

### 🔑 **Cabeçalhos**

| **Chave**      | **Valor**                    | **Descrição**                          |
|----------------|------------------------------|------------------------------------------|
| `Authorization`| `Bearer <seu-token>`         | Token JWT para autenticação.            |
| `Content-Type` | `application/json`          | Tipo de conteúdo da requisição.         |

### 🔒 Autenticação

É obrigatório incluir um **token JWT** válido no header `Authorization`.

Configure o `.env` do seu projeto para a ur da API e o token

```env
EMAIL_API_URL="https://dominio.com/api/send-email"
EMAIL_API_TOKEN="seu-token"
```

---

### 📝 Corpo da Requisição (JSON)

| Campo    | Tipo   | Obrigatório | Descrição                     |
|----------|--------|-------------|--------------------------------|
| `to`     | string | ✅          | email do destinatário.        |
| `subject` | string | ✅          | Assunto do email.             |
| `html`   | string | ✅          | Conteúdo HTML do email.       |

---

### 📥 Exemplo de Requisição

```bash
curl -X POST http://localhost:3000/api/send-email 
-H "Content-Type: application/json" 
-H "Authorization: Bearer SEU_TOKEN_AQUI" 
-d '{
  "to": "destinatario@exemplo.com",
  "subject": "Teste de envio de email",
  "html": "<h1>Olá!</h1><p>Este é um email de teste enviado pela API.</p>"
}'
```

---

### 📤 Exemplo de Resposta Bem-Sucedida (`200 OK`)

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

3. **Configure o arquivo `.env`:**

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
4. **Execute o docker-compose e as migrations**

   - Executar o container docker através de:

     ```bash
     npm run dev:docker
     ```

     - Execute as migrations do Prisma:
       
       ```bash
       npm run dev:migrate
       ```

6. **Execute a aplicação:**

   - Em modo de desenvolvimento:

     ```bash
     npm run dev
     ```
     
---

### ⚠️ Possíveis Erros

| Código | Erro                                     | Motivo                                           |
|--------|------------------------------------------|--------------------------------------------------|
| `400`    | { "error": "Campos obrigatórios: to, subject, html" } | Faltam campos no corpo da requisição.            |
| `403`    | { "error": "Token de autenticação obrigatório" }      | O header `Authorization` não foi fornecido.      |
| `403`    | { "error": "Token inválido!" }                         | O token fornecido é inválido ou expirado.        |
| `500`    | { "error": "Erro ao enviar email" }                   | Erro interno ao tentar enviar o email.          |
