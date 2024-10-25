import express from "express";

import { getAllFields } from "../controllers/fieldsController.js";

const fieldsRoutes = express.Router();

fieldsRoutes.get("/fields", getAllFields);

export default fieldsRoutes;
