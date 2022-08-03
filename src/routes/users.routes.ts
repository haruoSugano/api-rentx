import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/CreateUserController";

const usersRoutes = Router();

const createUserController = new CreateUserController();

usersRoutes.post("/", createUserController.handle);

export { usersRoutes };