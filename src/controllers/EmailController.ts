import { Request, Response } from "express";
import { EmailService } from "../services/EmailService";
import { TokenService } from "../services/TokenService";

export class EmailController {
  private emailService: EmailService;
  private tokenService: TokenService;

  constructor() {
    this.emailService = new EmailService();
    this.tokenService = new TokenService();
  }

  sendEmail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { authorization } = req.headers;
      const { to, subject, html } = req.body;

      if (!authorization) {
        res.status(403).json({ error: "Token de autenticação obrigatório" });
        return;
      }

      const isValidToken = await this.tokenService.validateToken(authorization);

      if (!isValidToken) {
        res.status(403).json({ error: "Token inválido!" });
        return;
      }

      if (!to || !subject || !html) {
        res.status(400).json({ error: "Campos obrigatórios: to, subject, html" });
        return;
      }

      await this.emailService.sendEmail(to, subject, html);
      res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao enviar e-mail" });
    }
  };
}
