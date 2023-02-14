"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UsersTokensRepositoryInMemory = void 0;
var _UserTokens = require("@modules/accounts/infra/typeorm/entities/UserTokens");
class UsersTokensRepositoryInMemory {
  constructor() {
    this.usersTokens = [];
  }
  async create({
    expires_date,
    refresh_token,
    user_id
  }) {
    const userToken = new _UserTokens.UserTokens();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });
    this.usersTokens.push(userToken);
    return userToken;
  }
  async findByUserIdAndRefreshToken(user_id, refresh_token) {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === user_id);
    return userToken;
  }
  async deleteById(id) {
    const userToken = this.usersTokens.find(userToken => userToken.user_id === id);
    this.usersTokens.splice(this.usersTokens.indexOf(userToken));
  }
  async findByRefreshToken(refresh_token) {
    const userToken = this.usersTokens.find(userToken => userToken.refresh_token === refresh_token);
    return userToken;
  }
}
exports.UsersTokensRepositoryInMemory = UsersTokensRepositoryInMemory;