import { mailTransporter } from "../config/mailConfig";

export class EmailService {
  async sendEmail(to: string, subject: string, html: string): Promise<void> {
    await mailTransporter.sendMail({
      from: `"Suporte LABED" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
  }
}
