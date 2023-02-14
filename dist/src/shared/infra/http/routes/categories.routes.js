"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesRoutes = void 0;
var CreateCategoryController_1 = require("@modules/cars/useCases/createCategory/CreateCategoryController");
var ImportCategoryController_1 = require("@modules/cars/useCases/importCategory/ImportCategoryController");
var ListCategoriesController_1 = require("@modules/cars/useCases/listCategories/ListCategoriesController");
var express_1 = require("express");
var multer_1 = __importDefault(require("multer"));
var ensureAdmin_1 = require("@shared/infra/http/middlewares/ensureAdmin");
var ensureAuthenticated_1 = require("@shared/infra/http/middlewares/ensureAuthenticated");
var categoriesRoutes = (0, express_1.Router)();
exports.categoriesRoutes = categoriesRoutes;
var upload = (0, multer_1.default)({
    dest: "./tmp"
});
var createCategoryController = new CreateCategoryController_1.CreateCategoryController();
var importCategoryController = new ImportCategoryController_1.ImportCategoryController();
var listCategoriesController = new ListCategoriesController_1.ListCategoriesController();
categoriesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, createCategoryController.handle);
categoriesRoutes.get("/", listCategoriesController.handle);
categoriesRoutes.post("/import", upload.single("file"), ensureAuthenticated_1.ensureAuthenticated, ensureAdmin_1.ensureAdmin, importCategoryController.handle);
