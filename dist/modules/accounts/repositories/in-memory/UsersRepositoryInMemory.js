"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersRepositoryInMemory = void 0;
var _User = require("@modules/accounts/infra/typeorm/entities/User");
class UsersRepositoryInMemory {
  constructor() {
    this.users = [];
  }
  async create({
    driver_license,
    email,
    name,
    password
  }) {
    const user = new _User.User();
    Object.assign(user, {
      driver_license,
      email,
      name,
      password
    });
    this.users.push(user);
  }
  async findByEmail(email) {
    return this.users.find(user => user.email === email);
  }
  async findById(id) {
    return this.users.find(user => user.id === id);
  }
}
exports.UsersRepositoryInMemory = UsersRepositoryInMemory;