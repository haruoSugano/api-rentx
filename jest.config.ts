import { pathsToModuleNameMapper } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";

export default {
    bail: true,
    clearMocks: true,
    coverageProvider: "v8",
    moduleNameMapper: pathsToModuleNameMapper(
        compilerOptions.paths,
        { prefix: "<rootDir>/src/" }
    ),
    preset: "ts-jest",
    testMatch: [
        "**/*.spec.ts"
    ],
};
