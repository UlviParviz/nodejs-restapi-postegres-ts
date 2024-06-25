import { Request, Response } from "express";
import postgresClient from "../config/db";

// Create User
export const createUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const text =
      "INSERT INTO users (email, password, fullname) VALUES ($1, crypt($2, gen_salt('bf')), $3) RETURNING *";
    const values = [req.body.email, req.body.password, req.body.fullname];

    const { rows } = await postgresClient.query(text, values);

    return res.status(201).json({ createdUser: rows[0] });
  } catch (error) {
    console.log("Error occurred", (error as Error).message);
    return res.status(400).json({ message: (error as Error).message });
  }
};

// Get Users
export const getUsers = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const text = "SELECT * FROM users ORDER BY id ASC";

    const { rows } = await postgresClient.query(text);

    return res.status(200).json(rows);
  } catch (error) {
    console.log("Error occured", (error as Error).message);
    return res.status(400).json({ message: (error as Error).message });
  }
};

// Get Single User
export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const text = "SELECT * FROM users WHERE id = $1";

    const values = [id];

    const { rows } = await postgresClient.query(text, values);
    if (!rows.length)
      return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ user: rows[0] });
  } catch (error) {
    console.log("Error occurred", (error as Error).message);
    return res.status(400).json({ message: (error as Error).message });
  }
};


//Update User
export const updateUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
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
    const text = `UPDATE users SET ${fields.join(
      ", "
    )} WHERE id = $${queryIndex} RETURNING *`;

    const { rows } = await postgresClient.query(text, values);
    if (!rows.length)
      return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ updatedUser: rows[0] });
  } catch (error) {
    console.log("Error occurred", (error as Error).message);
    return res.status(400).json({ message: (error as Error).message });
  }
};

// Delete User
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    const text = "DELETE FROM users WHERE id = $1 RETURNING *";

    const values = [id];

    const { rows } = await postgresClient.query(text, values);
    if (!rows.length)
      return res.status(404).json({ message: "User not found." });

    return res.status(200).json({ deletedUser: rows[0] });
  } catch (error) {
    console.log("Error occured", (error as Error).message);
    return res.status(400).json({ message: (error as Error).message });
  }
};
