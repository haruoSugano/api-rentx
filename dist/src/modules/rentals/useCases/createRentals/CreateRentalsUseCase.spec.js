"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var RentalsRepositoryInMemory_1 = require("@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory");
var DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var AppError_1 = require("@shared/errors/AppError");
var CreateRentalsUseCase_1 = require("./CreateRentalsUseCase");
var CarsRepositoryInMemory_1 = require("@modules/cars/repositories/in-memory/CarsRepositoryInMemory");
var createRentalsUseCase;
var rentalsRepositoryInMemory;
var dayjsDateProvider;
var carsRepositoryInMemory;
describe("Create Rental", function () {
    var dayAdd24hours = (0, dayjs_1.default)().add(1, "day").toDate();
    beforeEach(function () {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory_1.RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory_1.CarsRepositoryInMemory();
        createRentalsUseCase = new CreateRentalsUseCase_1.CreateRentalsUseCase(rentalsRepositoryInMemory, dayjsDateProvider, carsRepositoryInMemory);
    });
    it("should be able to create a new rental", function () { return __awaiter(void 0, void 0, void 0, function () {
        var car, rental;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, carsRepositoryInMemory.create({
                        name: "Test",
                        description: "Car test",
                        daily_rate: 100,
                        license_plate: "test",
                        fine_amount: 40,
                        category_id: "123456",
                        brand: "brand"
                    })];
                case 1:
                    car = _a.sent();
                    return [4 /*yield*/, createRentalsUseCase.execute({
                            user_id: "12345",
                            car_id: car.id,
                            expected_return_date: dayAdd24hours,
                        })];
                case 2:
                    rental = _a.sent();
                    expect(rental).toHaveProperty("id");
                    expect(rental).toHaveProperty("start_date");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create a new rental if there is another open to the same user", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rentalsRepositoryInMemory.create({
                        car_id: "987",
                        expected_return_date: dayAdd24hours,
                        user_id: "12345",
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(createRentalsUseCase.execute({
                            user_id: "12345",
                            car_id: "12121212",
                            expected_return_date: dayAdd24hours,
                        })).rejects.toEqual(new AppError_1.AppError("There's a rental in progress for use!"))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create a new rental if there is another open to the same car", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, rentalsRepositoryInMemory.create({
                        car_id: "test",
                        expected_return_date: dayAdd24hours,
                        user_id: "123456",
                    })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(createRentalsUseCase.execute({
                            user_id: "789",
                            car_id: "test",
                            expected_return_date: dayAdd24hours,
                        })).rejects.toEqual(new AppError_1.AppError("Car is unavailable"))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to create a new rental with invalid return time", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(createRentalsUseCase.execute({
                        user_id: "12354",
                        car_id: "12121212",
                        expected_return_date: (0, dayjs_1.default)().toDate(),
                    })).rejects.toEqual(new AppError_1.AppError("Invalide return time!"))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
