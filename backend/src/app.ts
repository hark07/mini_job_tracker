import express from "express";
import cors from "cors";
import applicationRoutes from "./routes/application.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/applications", applicationRoutes);

export default app;
