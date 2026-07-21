import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import uploadRoutes from "./routes/uploadRoutes.js";
import campaignRoutes from "./routes/campaignRoutes.js";
// import templateRoutes from "./routes/templateRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use("/api/upload", uploadRoutes);

app.use("/api/campaign", campaignRoutes); 

// app.use("/api/template", templateRoutes);

export default app;