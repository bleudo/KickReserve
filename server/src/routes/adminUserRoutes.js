import express from "express";

import {
  authenticateAdminUser,
  registerAdminUser,
  getReservationsByDateAdmin,
  updateReservationAdmin,
  getAvailableHoursAdmin,
} from "../controllers/adminUserController.js";

const adminUsersRoutes = express.Router();

adminUsersRoutes.post("/admin/authenticate", authenticateAdminUser);
adminUsersRoutes.post("/admin/register", registerAdminUser);
adminUsersRoutes.get("/admin/dashboard/:date", getReservationsByDateAdmin);
adminUsersRoutes.put(
  "/admin/dashboard/:reservation_id",
  updateReservationAdmin
);
adminUsersRoutes.get(
  "/admin/dashboard/:field_id/:date",
  getAvailableHoursAdmin
);

export default adminUsersRoutes;
