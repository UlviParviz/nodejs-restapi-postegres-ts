"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const env_1 = require("./env");
const postgresClient = new pg_1.default.Pool({
    connectionString: env_1.DB_CONNECTION_STRING
});
exports.default = postgresClient;
