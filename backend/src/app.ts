import express from "express";
import cors from "cors";
import applicationRoutes from "./routes/application.routes";

const app = express();

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://mini-job-tracker-frontend.vercel.app" // <-- change this
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// IMPORTANT: handle preflight requests
app.options("*", cors());

app.use(express.json());

// routes
app.use("/applications", applicationRoutes);

export default app;
