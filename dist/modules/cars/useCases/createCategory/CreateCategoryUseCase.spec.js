"use strict";

var _AppError = require("@shared/errors/AppError");
var _CategoriesRepositoryInMemory = require("@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory");
var _CreateCategoryUseCase = require("./CreateCategoryUseCase");
let createCategoryUseCase;
let categoriesRepositoryInMemory;
describe("Create Category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new _CategoriesRepositoryInMemory.CategoriesRepositoryInMemory();
    createCategoryUseCase = new _CreateCategoryUseCase.CreateCategoryUseCase(categoriesRepositoryInMemory);
  });
  it("should be able to create a new category", async () => {
    const catetory = {
      name: "Category Test",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: catetory.name,
      description: catetory.description
    });
    const categoryCreated = await categoriesRepositoryInMemory.findByName(catetory.name);
    expect(categoryCreated).toHaveProperty("id");
  });
  it("should not be able to create a new category with name exists", async () => {
    const catetory = {
      name: "Category Test",
      description: "Category description Test"
    };
    await createCategoryUseCase.execute({
      name: catetory.name,
      description: catetory.description
    });
    await expect(createCategoryUseCase.execute({
      name: catetory.name,
      description: catetory.description
    })).rejects.toEqual(new _AppError.AppError("Category Already exists! "));
  });
});