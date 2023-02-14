"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationUseCase = void 0;
var _tsyringe = require("tsyringe");
var _AppError = require("@shared/errors/AppError");
var _ISpecificationCategoriesRepository = require("@modules/cars/repositories/ISpecificationCategoriesRepository");
var _dec, _dec2, _dec3, _dec4, _class;
let CreateSpecificationUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("SpecificationRepository")(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _ISpecificationCategoriesRepository.ISpecificationsRepository === "undefined" ? Object : _ISpecificationCategoriesRepository.ISpecificationsRepository]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class CreateSpecificationUseCase {
  constructor(specificationRepository) {
    this.specificationRepository = specificationRepository;
  }
  async execute({
    name,
    description
  }) {
    const specificationAlreadyExists = await this.specificationRepository.findByName(name);
    if (specificationAlreadyExists) {
      throw new _AppError.AppError("Specification already exists!");
    }
    await this.specificationRepository.create({
      name,
      description
    });
  }
}) || _class) || _class) || _class) || _class);
exports.CreateSpecificationUseCase = CreateSpecificationUseCase;