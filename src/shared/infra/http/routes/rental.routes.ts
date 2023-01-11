import { Router } from "express";

import { CreateRentalsController } from "@modules/rentals/useCases/createRentals/CreateRentalsController";
import { DevolutionRentalController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalsController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController";

const rentalRoutes = Router();

const createRentalController = new CreateRentalsController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle);

export { rentalRoutes };