import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const carsRoutes = Router();

let createCarController = new CreateCarController();

carsRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

export { carsRoutes }