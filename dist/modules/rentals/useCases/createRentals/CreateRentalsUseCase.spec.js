"use strict";

var _dayjs = _interopRequireDefault(require("dayjs"));
var _RentalsRepositoryInMemory = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _AppError = require("@shared/errors/AppError");
var _CreateRentalsUseCase = require("./CreateRentalsUseCase");
var _CarsRepositoryInMemory = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
let createRentalsUseCase;
let rentalsRepositoryInMemory;
let dayjsDateProvider;
let carsRepositoryInMemory;
describe("Create Rental", () => {
  const dayAdd24hours = (0, _dayjs.default)().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new _RentalsRepositoryInMemory.RentalsRepositoryInMemory();
    dayjsDateProvider = new _DayjsDateProvider.DayjsDateProvider();
    carsRepositoryInMemory = new _CarsRepositoryInMemory.CarsRepositoryInMemory();
    createRentalsUseCase = new _CreateRentalsUseCase.CreateRentalsUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
  });
  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "123456",
      brand: "brand"
    });
    const rental = await createRentalsUseCase.execute({
      user_id: "12345",
      car_id: car.id,
      expected_return_date: dayAdd24hours
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "987",
      expected_return_date: dayAdd24hours,
      user_id: "12345"
    });
    await expect(createRentalsUseCase.execute({
      user_id: "12345",
      car_id: "12121212",
      expected_return_date: dayAdd24hours
    })).rejects.toEqual(new _AppError.AppError("There's a rental in progress for use!"));
  });
  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "test",
      expected_return_date: dayAdd24hours,
      user_id: "123456"
    });
    await expect(createRentalsUseCase.execute({
      user_id: "789",
      car_id: "test",
      expected_return_date: dayAdd24hours
    })).rejects.toEqual(new _AppError.AppError("Car is unavailable"));
  });
  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(createRentalsUseCase.execute({
      user_id: "12354",
      car_id: "12121212",
      expected_return_date: (0, _dayjs.default)().toDate()
    })).rejects.toEqual(new _AppError.AppError("Invalide return time!"));
  });
});