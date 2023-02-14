"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ensureAdmin = ensureAdmin;
var _UserRepository = require("@modules/accounts/infra/typeorm/repositories/UserRepository");
var _AppError = require("@shared/errors/AppError");
async function ensureAdmin(request, response, next) {
  const {
    id
  } = request.user;
  const usersRepository = new _UserRepository.UsersRepository();
  const user = await usersRepository.findById(id);
  if (!user.isAdmin) {
    throw new _AppError.AppError("User isn't admin!");
  }
  return next();
}