import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";


const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const profileUserController = new ProfileUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), updateUserAvatarController.handle);

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle);

export { usersRoutes };