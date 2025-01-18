import { Router } from "express";
import { EmailController } from "../controllers/EmailController";

const emailRouter = Router();
const emailController = new EmailController();

emailRouter.post("/send-email", emailController.sendEmail);

export default emailRouter;
