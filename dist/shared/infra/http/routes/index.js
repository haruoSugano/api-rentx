"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = void 0;
var _express = require("express");
var _authenticate = require("./authenticate.routes");
var _categories = require("./categories.routes");
var _specifications = require("./specifications.routes");
var _users = require("./users.routes");
var _cars = require("./cars.routes");
var _rental = require("./rental.routes");
var _password = require("./password.routes");
const router = (0, _express.Router)();
exports.router = router;
router.use("/categories", _categories.categoriesRoutes);
router.use("/specification", _specifications.specificationRoutes);
router.use("/users", _users.usersRoutes);
router.use("/rentals", _rental.rentalRoutes);
router.use("/cars", _cars.carsRoutes);
router.use("/password", _password.passwordRoutes);
router.use(_authenticate.authenticateRoutes);