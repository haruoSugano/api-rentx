"use strict";

var _AppError = require("@shared/errors/AppError");
var _UsersRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var _CreateUserUseCase = require("../createUser/CreateUserUseCase");
var _AuthenticateUseCase = require("./AuthenticateUseCase");
var _DayjsDateProvider = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var _UsersTokenRepositoryInMemory = require("@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");
let authenticateUserUseCase;
let createUserUseCase;
let usersRepositoryInMemory;
let usersTokensRepositoryInMemory;
let dateProvider;
describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new _UsersRepositoryInMemory.UsersRepositoryInMemory();
    usersTokensRepositoryInMemory = new _UsersTokenRepositoryInMemory.UsersTokensRepositoryInMemory();
    dateProvider = new _DayjsDateProvider.DayjsDateProvider();
    authenticateUserUseCase = new _AuthenticateUseCase.AuthenticateUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
    createUserUseCase = new _CreateUserUseCase.CreateUserUseCase(usersRepositoryInMemory);
  });
  it("should be able to authenticate an user", async () => {
    const user = {
      driver_license: "000123",
      email: "user@teste.com.br",
      password: "1234",
      name: "User test"
    };
    await createUserUseCase.execute(user);
    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(result).toHaveProperty("token");
  });
  it("should not be able to authenticate an nonexistent user", async () => {
    await expect(authenticateUserUseCase.execute({
      email: "false@test.com",
      password: "1234"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect"));
  });
  it("should not be able to authenticate with incorrect password", async () => {
    const user = {
      driver_license: "9999",
      email: "user@test.com",
      password: "1234",
      name: "User Test Error"
    };
    await createUserUseCase.execute(user);
    await expect(authenticateUserUseCase.execute({
      email: user.email,
      password: "incorrect"
    })).rejects.toEqual(new _AppError.AppError("Email or password incorrect!"));
  });
});