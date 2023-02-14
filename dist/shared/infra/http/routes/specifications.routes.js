"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.specificationRoutes = void 0;
var _CreateSpecificationController = require("@modules/cars/useCases/createSpecification/CreateSpecificationController");
var _express = require("express");
var _ensureAdmin = require("@shared/infra/http/middlewares/ensureAdmin");
var _ensureAuthenticated = require("@shared/infra/http/middlewares/ensureAuthenticated");
const specificationRoutes = (0, _express.Router)();
exports.specificationRoutes = specificationRoutes;
const createSpecificationController = new _CreateSpecificationController.CreateSpecificationController();
specificationRoutes.post("/", _ensureAuthenticated.ensureAuthenticated, _ensureAdmin.ensureAdmin, createSpecificationController.handle);