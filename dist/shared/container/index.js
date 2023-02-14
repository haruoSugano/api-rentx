"use strict";

var _tsyringe = require("tsyringe");
require("@shared/container/providers");
var _CategoriesRepository = require("../../modules/cars/infra/typeorm/repositories/CategoriesRepository");
var _SpecificationsRepository = require("@modules/cars/infra/typeorm/repositories/SpecificationsRepository");
var _UserRepository = require("@modules/accounts/infra/typeorm/repositories/UserRepository");
var _CarsRepository = require("@modules/cars/infra/typeorm/repositories/CarsRepository");
var _CarsImagesRepository = require("@modules/cars/infra/typeorm/repositories/CarsImagesRepository");
var _RentalsRepository = require("@modules/rentals/infra/typeorm/repositories/RentalsRepository");
var _UsersTokensRepository = require("@modules/accounts/infra/typeorm/repositories/UsersTokensRepository");
_tsyringe.container.registerSingleton("CategoriesRepository", _CategoriesRepository.CategoriesRepository);
_tsyringe.container.registerSingleton("SpecificationRepository", _SpecificationsRepository.SpecificationRepository);
_tsyringe.container.registerSingleton("UsersRepository", _UserRepository.UsersRepository);
_tsyringe.container.registerSingleton("CarsRepository", _CarsRepository.CarsRepository);
_tsyringe.container.registerSingleton("CarsImagesRepository", _CarsImagesRepository.CarsImagesRepository);
_tsyringe.container.registerSingleton("RentalsRepository", _RentalsRepository.RentalsRepository);
_tsyringe.container.registerSingleton("UsersTokensRepository", _UsersTokensRepository.UsersTokensRepository);