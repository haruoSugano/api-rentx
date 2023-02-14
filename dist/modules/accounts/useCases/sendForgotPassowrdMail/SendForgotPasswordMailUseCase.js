"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SendForgotPasswordMailUseCase = void 0;
var _uuid = require("uuid");
var _tsyringe = require("tsyringe");
var _path = require("path");
var _IUsersRepository = require("@modules/accounts/repositories/IUsersRepository");
var _IUsersTokensRepository = require("@modules/accounts/repositories/IUsersTokensRepository");
var _AppError = require("@shared/errors/AppError");
var _IDateProvider = require("@shared/container/providers/DateProvider/IDateProvider");
var _IMailProvider = require("@shared/container/providers/MailProvider/IMailProvider");
var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;
let SendForgotPasswordMailUseCase = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)("UsersRepository")(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)("UsersTokensRepository")(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)("DayjsDateProvider")(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)("EtherealMailProvider")(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.IUsersRepository === "undefined" ? Object : _IUsersRepository.IUsersRepository, typeof _IUsersTokensRepository.IUsersTokensRepository === "undefined" ? Object : _IUsersTokensRepository.IUsersTokensRepository, typeof _IDateProvider.IDateProvider === "undefined" ? Object : _IDateProvider.IDateProvider, typeof _IMailProvider.IMailProvider === "undefined" ? Object : _IMailProvider.IMailProvider]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SendForgotPasswordMailUseCase {
  constructor(usersRepository, usersTokensRepository, dateProvider, mailProvider) {
    this.usersRepository = usersRepository;
    this.usersTokensRepository = usersTokensRepository;
    this.dateProvider = dateProvider;
    this.mailProvider = mailProvider;
  }
  async execute(email) {
    const user = await this.usersRepository.findByEmail(email);
    const templatePath = (0, _path.resolve)(__dirname, "..", "..", "views", "emails", "forgotPassword.hbs");
    if (!user) {
      throw new _AppError.AppError("User does not exists");
    }
    const token = (0, _uuid.v4)();
    const expires_date = this.dateProvider.addHours(3);
    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });
    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };
    await this.mailProvider.sendMail(email, "Recuperaçao de senha", variables, templatePath);
  }
}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.SendForgotPasswordMailUseCase = SendForgotPasswordMailUseCase;