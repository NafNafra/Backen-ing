"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = exports.ConfigsService = exports.ConfigsModule = void 0;
var configs_module_1 = require("./configs.module");
Object.defineProperty(exports, "ConfigsModule", { enumerable: true, get: function () { return configs_module_1.ConfigsModule; } });
var configs_service_1 = require("./configs.service");
Object.defineProperty(exports, "ConfigsService", { enumerable: true, get: function () { return configs_service_1.ConfigsService; } });
var configuration_1 = require("./configuration");
Object.defineProperty(exports, "configuration", { enumerable: true, get: function () { return __importDefault(configuration_1).default; } });
//# sourceMappingURL=index.js.map