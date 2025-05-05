import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { initializeDatabase } from "./db/db.connect.js";

import eventRoutes from "./routes/event.routes.js";

const app = express();
dotenv.config({ path: "./.env" });
const PORT = process.env.PORT;

initializeDatabase();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use("/api/event", eventRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is hot and ready to serve!" });
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  res
    .status(statusCode)
    .json({ message: "Internal server error!", error: error.message });
});

app.listen(PORT, () => {
  console.log("Server is hot!");
});
