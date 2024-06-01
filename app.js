import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";
import "dotenv/config"
import authRouter from "./routes/authRouter.js";
const app = express();




app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter);

app.use((_,res) => {
  res.status(404).json({message: "Route not found"})
})

app.use((error, req, res, next) => {
const {status = 500, message = "Server error"} = error;
res.status(status).json({message});
})



export default app;
