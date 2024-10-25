import express from "express";
import dotenv from "dotenv";
import setupReservationCron from "./src/config/updateReservationCron.js";
import { setupMiddlewares } from "./middlewares/index.js";
import { setupRoutes } from "./src/routes/index.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();

setupMiddlewares(app);

setupRoutes(app);

setupReservationCron();

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
