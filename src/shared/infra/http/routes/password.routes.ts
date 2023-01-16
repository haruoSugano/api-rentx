import { SendForgotPasswordMailController } from "@modules/accounts/useCases/sendForgotPassowrdMail/SendForgotPasswordMailController";
import { Router } from "express";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post("/password", sendForgotPasswordMailController.handle);

export { passwordRoutes };
