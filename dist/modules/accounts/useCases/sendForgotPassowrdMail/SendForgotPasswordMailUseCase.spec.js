"use strict";

var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _UsersTokenRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _MailProviderInMemory = require("@shared/container/providers/MailProvider/in-memory/MailProviderInMemory");
var _AppError = require("@shared/errors/AppError");
var _SendForgotPasswordMailUseCase = require("./SendForgotPasswordMailUseCase");
let sendForgotPasswordMailUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
let mailProvider;
describe("Send forgot mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    usersTokensRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokensRepositoryInMemory();
    mailProvider = new _MailProviderInMemory.MailProviderInMemory();
    sendForgotPasswordMailUseCase = new _SendForgotPasswordMailUseCase.SendForgotPasswordMailUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider, mailProvider);
  });
  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");
    await usersRepositoryInMemory.create({
      driver_license: "123456",
      email: "user@example.com",
      name: "example",
      password: "password"
    });
    await sendForgotPasswordMailUseCase.execute("user@example.com");
    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send a email if user does not exists", async () => {
    await expect(sendForgotPasswordMailUseCase.execute("erro@example.com")).rejects.toEqual(new _AppError.AppError("User does not exists"));
  });
  it("should be able to create an users token", async () => {
    const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create");
    await usersRepositoryInMemory.create({
      driver_license: "9876544",
      email: "usuario@example.com",
      name: "exampleUsuario",
      password: "password"
    });
    await sendForgotPasswordMailUseCase.execute("usuario@example.com");
    expect(generateTokenMail).toBeCalled();
  });
});