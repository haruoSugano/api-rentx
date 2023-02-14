"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RentalsRepository = void 0;
var _typeorm = require("typeorm");
var _Rental = require("../entities/Rental");
class RentalsRepository {
  constructor() {
    this.repository = void 0;
    this.repository = (0, _typeorm.getRepository)(_Rental.Rental);
  }
  async findOpenRentalByCar(car_id) {
    const openByCar = await this.repository.findOne({
      where: {
        car_id,
        end_date: null
      }
    });
    return openByCar;
  }
  async findOpenRentalByUser(user_id) {
    const openByUser = await this.repository.findOne({
      where: {
        user_id,
        end_date: null
      }
    });
    return openByUser;
  }
  async findById(id) {
    const rental = await this.repository.findOne(id);
    return rental;
  }
  async findByUserId(user_id) {
    const rentals = await this.repository.find({
      where: {
        user_id
      },
      relations: ["car"]
    });
    return rentals;
  }
  async create({
    user_id,
    car_id,
    expected_return_date,
    total,
    id,
    end_date
  }) {
    const rental = this.repository.create({
      user_id,
      car_id,
      expected_return_date,
      total,
      id,
      end_date
    });
    await this.repository.save(rental);
    return rental;
  }
}
exports.RentalsRepository = RentalsRepository;