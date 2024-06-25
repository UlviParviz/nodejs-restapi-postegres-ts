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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
const db_1 = __importDefault(require("../config/db"));
// Create User
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = "INSERT INTO users (email, password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING *";
        const values = [req.body.email, req.body.password, req.body.fullname];
        const { rows } = yield db_1.default.query(text, values);
        return res.status(201).json({ createdUser: rows[0] });
    }
    catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});
exports.createUser = createUser;
// Get Users
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const text = "SELECT * FROM users ORDER BY id ASC";
        const { rows } = yield db_1.default.query(text);
        return res.status(200).json(rows);
    }
    catch (error) {
        console.log("Error occured", error.message);
        return res.status(400).json({ message: error.message });
    }
});
exports.getUsers = getUsers;
// Get Single User
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const text = "SELECT * FROM users WHERE id = $1";
        const values = [id];
        const { rows } = yield db_1.default.query(text, values);
        if (!rows.length)
            return res.status(404).json({ message: "User not found." });
        return res.status(200).json({ user: rows[0] });
    }
    catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});
exports.getUser = getUser;
//Update User
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { email, fullname, password } = req.body;
        const fields = [];
        const values = [];
        let queryIndex = 1;
        if (email) {
            fields.push(`email = $${queryIndex++}`);
            values.push(email);
        }
        if (fullname) {
            fields.push(`fullname = $${queryIndex++}`);
            values.push(fullname);
        }
        if (password) {
            fields.push(`password = crypt($${queryIndex++}, gen_salt('bf'))`);
            values.push(password);
        }
        if (fields.length === 0) {
            return res
                .status(400)
                .json({ message: "No fields provided for update." });
        }
        values.push(id); // Add the id as the last parameter
        const text = `UPDATE users SET ${fields.join(", ")} WHERE id = $${queryIndex} RETURNING *`;
        const { rows } = yield db_1.default.query(text, values);
        if (!rows.length)
            return res.status(404).json({ message: "User not found." });
        return res.status(200).json({ updatedUser: rows[0] });
    }
    catch (error) {
        console.log("Error occurred", error.message);
        return res.status(400).json({ message: error.message });
    }
});
exports.updateUser = updateUser;
// Delete User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const text = "DELETE FROM users WHERE id = $1 RETURNING *";
        const values = [id];
        const { rows } = yield db_1.default.query(text, values);
        if (!rows.length)
            return res.status(404).json({ message: "User not found." });
        return res.status(200).json({ deletedUser: rows[0] });
    }
    catch (error) {
        console.log("Error occured", error.message);
        return res.status(400).json({ message: error.message });
    }
});
exports.deleteUser = deleteUser;
