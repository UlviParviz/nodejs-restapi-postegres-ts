"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const env_1 = require("./config/env");
const user_router_1 = __importDefault(require("./routers/user.router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(user_router_1.default);
const PORT = env_1.PORTNo || 8000;
const DB_CONNECTION = env_1.DB_CONNECTION_STRING;
app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
    db_1.default.connect((err) => {
        if (err) {
            console.log("Connection Error: " + err.stack);
        }
        else {
            console.log("Connected to Postgres: " + DB_CONNECTION);
        }
    });
});
