import { Router } from "express";

import { CreateRentalsController } from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const rentalRoutes = Router();

const createRentalController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);

export { rentalRoutes };