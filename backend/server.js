import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import dbConnection from "./dbConfig/dbConnection.js";
import authRouter from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());

// call the dbConnection
dbConnection();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRoutes);

// error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
