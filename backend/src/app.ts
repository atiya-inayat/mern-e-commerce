import express from "express";
import type { Application, Request, Response } from "express";
import cors from "cors"; // cors allow frontend talk to backend
import helmet from "helmet"; // helmet protects your app by setting secure HTTP headers.
import morgan from "morgan"; // morgan logs request in terminal - it help during to see: which route was called, status code, response time
import dotenv from "dotenv"; // this loads envionment variable from .env file.

dotenv.config(); // activate dotenv - load variables from the .env file

const app: Application = express(); // creae express app with type Application

// Middlewares - something that runs before your route runs
app.use(helmet()); // Add security protection.
app.use(cors()); // Allow frontend to talk to backend.
app.use(morgan("dev")); // Log requests in terminal (dev mode).
app.use(express.json()); // It allows your backend to read JSON body.

// Root route for testing
app.get("/", (req: Request, res: Response) => {
  res.send("API is running...");
});

export default app;
