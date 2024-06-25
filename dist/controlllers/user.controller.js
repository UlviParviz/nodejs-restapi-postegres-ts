"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
// Create User
const createUser = async (req, res) => {
    try {
        const text = "INSERT INTO users (email, password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING *";
        const values = [req.body.email, req.body.password, req.body.fullname];
        const { rows } = await db_1.default.query(text, values);
        return res.status(201).json({ createdUser: rows[0] });
    }
    catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
};
exports.createUser = createUser;
// Get Users
const getUsers = async (req, res) => {
    try {
        const text = "SELECT * FROM users ORDER BY id ASC";
        const { rows } = await db_1.default.query(text);
        return res.status(200).json(rows);
    }
    catch (error) {
        console.log("Error occured", error.message);
        return res.status(400).json({ message: error.message });
    }
};
exports.getUsers = getUsers;
