import express, { Application } from "express";
import postgresClient from "./config/db";
import { DB_CONNECTION_STRING, PORTNo } from "./config/env";
import userRouter from "./routers/user.router";

const app : Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

const PORT = PORTNo || 8000;
const DB_CONNECTION = DB_CONNECTION_STRING;

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
  postgresClient.connect((err) => {
    if (err) {
      console.log("Connection Error: " + err.stack);
    } else {
      console.log("Connected to Postgres: " + DB_CONNECTION);
    }
  });
});
