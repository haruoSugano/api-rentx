"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CarsImagesRepository = void 0;
var _typeorm = require("typeorm");
var _CarImage = require("../entities/CarImage");
class CarsImagesRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_CarImage.CarImage);
  }
  async create(car_id, images_name) {
    const carImage = this.repository.create({
      car_id,
      images_name
    });
    await this.repository.save(carImage);
    return carImage;
  }
}
exports.CarsImagesRepository = CarsImagesRepository;