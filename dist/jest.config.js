"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_jest_1 = require("ts-jest");
var tsconfig_json_1 = require("./tsconfig.json");
exports.default = {
    bail: true,
    clearMocks: true,
    coverageProvider: "v8",
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/src/modules/**/useCases/**/*.ts'
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text-summary", "lcov"],
    moduleNameMapper: (0, ts_jest_1.pathsToModuleNameMapper)(tsconfig_json_1.compilerOptions.paths, { prefix: "<rootDir>/src/" }),
    preset: "ts-jest",
    testMatch: [
        "**/*.spec.ts"
    ],
};
