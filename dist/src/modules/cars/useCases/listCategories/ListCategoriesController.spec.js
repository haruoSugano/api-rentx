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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var bcrypt_1 = require("bcrypt");
var uuid_1 = require("uuid");
var app_1 = require("@shared/infra/http/app");
var typeorm_1 = __importDefault(require("@shared/infra/typeorm"));
var connection;
describe("List Categories", function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var id, password;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, typeorm_1.default)()];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.runMigrations()];
                case 2:
                    _a.sent();
                    id = (0, uuid_1.v4)();
                    return [4 /*yield*/, (0, bcrypt_1.hash)("admin", 8)];
                case 3:
                    password = _a.sent();
                    return [4 /*yield*/, connection.query("\n            INSERT INTO USERS(id, name, email, password, \"isAdmin\", created_at, driver_license )\n            VALUES('".concat(id, "', 'admin', 'admin@rentx.com.br', '").concat(password, "', true, 'now()', 'XXXXXX')\n        "))];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, connection.dropDatabase()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, connection.close()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    it("should be able to list all categories", function () { return __awaiter(void 0, void 0, void 0, function () {
        var responseToken, refresh_token, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/sessions").send({
                        email: "admin@rentx.com.br",
                        password: "admin",
                    })];
                case 1:
                    responseToken = _a.sent();
                    refresh_token = responseToken.body.refresh_token;
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.app).post("/categories").send({
                            name: "Category Supertest",
                            description: "Category Supertest",
                        }).set({
                            Authorization: "Bearer " + refresh_token
                        })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, (0, supertest_1.default)(app_1.app).get("/categories")];
                case 3:
                    response = _a.sent();
                    expect(response.status).toBe(200);
                    expect(response.body.length).toBe(1);
                    expect(response.body[0]).toHaveProperty("id");
                    expect(response.body[0].name).toEqual("Category Supertest");
                    return [2 /*return*/];
            }
        });
    }); });
});
