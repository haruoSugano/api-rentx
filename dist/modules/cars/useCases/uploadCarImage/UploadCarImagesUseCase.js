"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UploadCarImagesUseCase = void 0;
var _ICarsImagesRepository = require("@modules/cars/repositories/ICarsImagesRepository");
var _IStorageProvider = require("@shared/container/providers/StorageProvider/IStorageProvider");
var _tsyringe = require("tsyringe");
var _dec, _dec2, _dec3, _dec4, _dec5, _class;
let UploadCarImagesUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("CarsImagesRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("StorageProvider")(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ICarsImagesRepository.ICarsImagesRepository === "undefined" ? Object : _ICarsImagesRepository.ICarsImagesRepository, typeof _IStorageProvider.IStorageProvider === "undefined" ? Object : _IStorageProvider.IStorageProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UploadCarImagesUseCase {
  constructor(carImagesRepository, storageProvider) {
    this.carImagesRepository = carImagesRepository;
    this.storageProvider = storageProvider;
  }
  async execute({
    car_id,
    images_name
  }) {
    images_name.map(async image => {
      await this.carImagesRepository.create(car_id, image);
      await this.storageProvider.save(image, "cars");
    });
  }
}) || _class) || _class) || _class) || _class) || _class);
exports.UploadCarImagesUseCase = UploadCarImagesUseCase;