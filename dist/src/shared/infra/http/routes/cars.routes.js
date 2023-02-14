"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carsRoutes = void 0;
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var upload_1 = __importDefault(require("@config/upload"));
var CreateCarController_1 = require("@modules/cars/useCases/createCar/CreateCarController");
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var ListAvailableCarsController_1 = require("@modules/cars/useCases/listAvailableCars/ListAvailableCarsController");
var CreateCarSpecificationController_1 = require("@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationController");
var UploadCarImagesController_1 = require("@modules/cars/useCases/uploadCarImage/UploadCarImagesController");
var carsRoutes = (0, express_1.Router)();
exports.carsRoutes = carsRoutes;
var createCarController = new CreateCarController_1.CreateCarController();
var listAvailableCarsController = new ListAvailableCarsController_1.ListAvailableCarsController();
var createCarSpecificationController = new CreateCarSpecificationController_1.CreateCarSpecificationController();
var uploadCarImagesController = new UploadCarImagesController_1.UploadCarImagesController();
var upload = (0, multer_1.default)(upload_1.default);
carsRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarController.handle);
carsRoutes.post("/specifications/:id", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/images/:id", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, upload.array("images"), uploadCarImagesController.handle);
carsRoutes.get("/available", listAvailableCarsController.handle);
