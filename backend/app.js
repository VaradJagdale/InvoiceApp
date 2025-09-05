import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorHandler } from "./error/error.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT"],
}));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Invoice OCR + AI Summary API is running 🚀");
});

dbConnection();

app.use("/api/v1", invoiceRoutes);

app.use(errorHandler);

export default app;
