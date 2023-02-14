"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var AppError_1 = require("@shared/errors/AppError");
var UsersRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersRepositoryInMemory");
var CreateUserUseCase_1 = require("../createUser/CreateUserUseCase");
var AuthenticateUseCase_1 = require("./AuthenticateUseCase");
var DayjsDateProvider_1 = require("@shared/container/providers/DateProvider/implementations/DayjsDateProvider");
var UsersTokenRepositoryInMemory_1 = require("@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory");
var authenticateUserUseCase;
var createUserUseCase;
var usersRepositoryInMemory;
var usersTokensRepositoryInMemory;
var dateProvider;
describe("Authenticate User", function () {
    beforeEach(function () {
        usersRepositoryInMemory = new UsersRepositoryInMemory_1.UsersRepositoryInMemory();
        usersTokensRepositoryInMemory = new UsersTokenRepositoryInMemory_1.UsersTokensRepositoryInMemory;
        dateProvider = new DayjsDateProvider_1.DayjsDateProvider();
        authenticateUserUseCase = new AuthenticateUseCase_1.AuthenticateUseCase(usersRepositoryInMemory, usersTokensRepositoryInMemory, dateProvider);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(usersRepositoryInMemory);
    });
    it("should be able to authenticate an user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        driver_license: "000123",
                        email: "user@teste.com.br",
                        password: "1234",
                        name: "User test"
                    };
                    return [4 /*yield*/, createUserUseCase.execute(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authenticateUserUseCase.execute({
                            email: user.email,
                            password: user.password,
                        })];
                case 2:
                    result = _a.sent();
                    expect(result).toHaveProperty("token");
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to authenticate an nonexistent user", function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, expect(authenticateUserUseCase.execute({
                        email: "false@test.com",
                        password: "1234",
                    })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect"))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should not be able to authenticate with incorrect password", function () { return __awaiter(void 0, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    user = {
                        driver_license: "9999",
                        email: "user@test.com",
                        password: "1234",
                        name: "User Test Error"
                    };
                    return [4 /*yield*/, createUserUseCase.execute(user)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, expect(authenticateUserUseCase.execute({
                            email: user.email,
                            password: "incorrect"
                        })).rejects.toEqual(new AppError_1.AppError("Email or password incorrect!"))];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
