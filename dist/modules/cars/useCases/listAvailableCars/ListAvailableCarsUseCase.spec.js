"use strict";

var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var _ListAvailableCarsUseCase = require("./ListAvailableCarsUseCase");
let listAvailableCarsUseCase;
let carsRepositoryInMemory;
describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    listAvailableCarsUseCase = new _ListAvailableCarsUseCase.ListAvailableCarsUseCase(carsRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car01",
      "description": "Car description",
      "daily_rate": 1000.00,
      "license_plate": "CVR-1234",
      "fine_amount": 250,
      "brand": "Car_Brand",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({});
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car02",
      "description": "Car description",
      "daily_rate": 1000.00,
      "license_plate": "CVR-1234",
      "fine_amount": 250,
      "brand": "Car_brand_test",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car_brand_test"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car03",
      "description": "Car description",
      "daily_rate": 1000.00,
      "license_plate": "CVR-1234",
      "fine_amount": 250,
      "brand": "Car_Brand",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      name: "Car03"
    });
    expect(cars).toEqual([car]);
  });
  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      "name": "Car04",
      "description": "Car description",
      "daily_rate": 1000.00,
      "license_plate": "CVR-1234",
      "fine_amount": 250,
      "brand": "Car_Brand",
      "category_id": "category_id"
    });
    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category_id"
    });
    expect(cars).toEqual([car]);
  });
});