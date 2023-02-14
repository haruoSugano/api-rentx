"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rentalRoutes = void 0;
var _express = require("express");
var _CreateRentalsController = require("@modules/rentals/useCases/createRentals/CreateRentalsController");
var _DevolutionRentalsController = require("@modules/rentals/useCases/devolutionRental/DevolutionRentalsController");
var _ensureAuthenticated = require("../middlewares/ensureAuthenticated");
var _ListRentalsByUserController = require("@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController");
const rentalRoutes = (0, _express.Router)();
exports.rentalRoutes = rentalRoutes;
const createRentalController = new _CreateRentalsController.CreateRentalsController();
const devolutionRentalController = new _DevolutionRentalsController.DevolutionRentalController();
const listRentalsByUserController = new _ListRentalsByUserController.ListRentalsByUserController();
rentalRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, createRentalController.handle);
rentalRoutes.post("/devolution/:id", _ensureAuthenticated.ensureAuthenticated, devolutionRentalController.handle);
rentalRoutes.get("/user", _ensureAuthenticated.ensureAuthenticated, listRentalsByUserController.handle);