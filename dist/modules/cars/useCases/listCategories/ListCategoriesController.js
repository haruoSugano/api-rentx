"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ListCategoriesController = void 0;
var _tsyringe = require("tsyringe");
var _ListCategoriesUseCase = require("./ListCategoriesUseCase");
class ListCategoriesController {
  async handle(request, response) {
    const listCategoryUseCase = _tsyringe.container.resolve(_ListCategoriesUseCase.ListCategoriesUseCase);
    const all = await listCategoryUseCase.execute();
    return response.json(all);
  }
}
exports.ListCategoriesController = ListCategoriesController;