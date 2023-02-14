"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Car = void 0;
var typeorm_1 = require("typeorm");
var uuid_1 = require("uuid");
var Category_1 = require("./Category");
var Specification_1 = require("./Specification");
var Car = /** @class */ (function () {
    function Car() {
        if (!this.id) {
            this.id = (0, uuid_1.v4)();
            this.available = true;
        }
    }
    __decorate([
        (0, typeorm_1.PrimaryColumn)(),
        __metadata("design:type", String)
    ], Car.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Car.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Car.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Car.prototype, "daily_rate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Boolean)
    ], Car.prototype, "available", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Car.prototype, "license_plate", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", Number)
    ], Car.prototype, "fine_amount", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Car.prototype, "brand", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Category_1.Category; }),
        (0, typeorm_1.JoinColumn)({ name: "category_id" }),
        __metadata("design:type", Category_1.Category)
    ], Car.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.Column)(),
        __metadata("design:type", String)
    ], Car.prototype, "category_id", void 0);
    __decorate([
        (0, typeorm_1.ManyToMany)(function () { return Specification_1.Specification; }),
        (0, typeorm_1.JoinTable)({
            name: "specifications_cars",
            joinColumns: [{ name: "car_id" }],
            inverseJoinColumns: [{ name: "specification_id" }]
        }),
        __metadata("design:type", Array)
    ], Car.prototype, "specifications", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Car.prototype, "created_at", void 0);
    Car = __decorate([
        (0, typeorm_1.Entity)("cars"),
        __metadata("design:paramtypes", [])
    ], Car);
    return Car;
}());
exports.Car = Car;
