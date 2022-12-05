import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";
import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationController";

const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/",
    ensureAuthenticated,
    ensureAdmin,
    createCarController.handle
);

carsRoutes.post("/specifications/:id",
    ensureAuthenticated,
    ensureAdmin,
    createCarSpecificationController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

export { carsRoutes }