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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RentalsRepository = void 0;
var typeorm_1 = require("typeorm");
var Rental_1 = require("../entities/Rental");
var RentalsRepository = /** @class */ (function () {
    function RentalsRepository() {
        this.repository = (0, typeorm_1.getRepository)(Rental_1.Rental);
    }
    RentalsRepository.prototype.findOpenRentalByCar = function (car_id) {
        return __awaiter(this, void 0, void 0, function () {
            var openByCar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne({
                            where: { car_id: car_id, end_date: null },
                        })];
                    case 1:
                        openByCar = _a.sent();
                        return [2 /*return*/, openByCar];
                }
            });
        });
    };
    RentalsRepository.prototype.findOpenRentalByUser = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var openByUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne({
                            where: { user_id: user_id, end_date: null },
                        })];
                    case 1:
                        openByUser = _a.sent();
                        return [2 /*return*/, openByUser];
                }
            });
        });
    };
    RentalsRepository.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rental;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne(id)];
                    case 1:
                        rental = _a.sent();
                        return [2 /*return*/, rental];
                }
            });
        });
    };
    RentalsRepository.prototype.findByUserId = function (user_id) {
        return __awaiter(this, void 0, void 0, function () {
            var rentals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.find({
                            where: { user_id: user_id },
                            relations: ["car"]
                        })];
                    case 1:
                        rentals = _a.sent();
                        return [2 /*return*/, rentals];
                }
            });
        });
    };
    RentalsRepository.prototype.create = function (_a) {
        var user_id = _a.user_id, car_id = _a.car_id, expected_return_date = _a.expected_return_date, total = _a.total, id = _a.id, end_date = _a.end_date;
        return __awaiter(this, void 0, void 0, function () {
            var rental;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        rental = this.repository.create({
                            user_id: user_id,
                            car_id: car_id,
                            expected_return_date: expected_return_date,
                            total: total,
                            id: id,
                            end_date: end_date
                        });
                        return [4 /*yield*/, this.repository.save(rental)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, rental];
                }
            });
        });
    };
    return RentalsRepository;
}());
exports.RentalsRepository = RentalsRepository;
