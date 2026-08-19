import express from "express";
import cors from "cors";
import healthCheckRouter from "./routes/healthCheck.route";
import userRouter from "./routes/user.routes";
import authRouter from "./routes/auth.route";
import newsRouter from "./routes/news.route";
import { clerkMiddleware } from "@clerk/express";
import cookieParser from "cookie-parser";
import path from "path";
import helmet from "helmet";
import { errorHandler } from "./middleware/errorHandler.middleware";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Accept",
      "Origin",
      "Access-Control-Allow-Origin",
    ],
  }),
);
app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use(helmet());
app.use(clerkMiddleware());
app.use(express.urlencoded({ extended: true, limit: "20kb" }));
app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api/v1/healthCheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/news", newsRouter);
app.use(errorHandler);

export default app;
