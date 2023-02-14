"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsRepositoryInMemory = void 0;
var _Car = require("@modules/cars/infra/typeorm/entities/Car");
class CarsRepositoryInMemory {
  constructor() {
    this.cars = [];
  }
  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    id
  }) {
    const car = new _Car.Car();
    Object.assign(car, {
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      id
    });
    this.cars.push(car);
    return car;
  }
  async findByLicensePlate(license_plate) {
    return this.cars.find(car => car.license_plate === license_plate);
  }
  async findAvailable(brand, category_id, name) {
    const cars = this.cars.filter(car => {
      if (car.available === true || brand && car.brand === brand || category_id && car.category_id === category_id || name && car.name === name) {
        return car;
      }
      return null;
    });
    return cars;
  }
  async findById(id) {
    return this.cars.find(car => car.id === id);
  }
  async updateAvailable(id, available) {
    const findIndex = this.cars.findIndex(car => car.id === id);
    this.cars[findIndex].available = available;
  }
}
exports.CarsRepositoryInMemory = CarsRepositoryInMemory;