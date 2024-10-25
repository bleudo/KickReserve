import express from "express";

import {
  createReservation,
  getAvailableHoursForFieldAndDate,
  cancelReservation,
  getReservationsByFieldAndDate,
  getReservationsByUserUUID,
} from "../controllers/reservationController.js";

const reservationRoutes = express.Router();

reservationRoutes.post("/reserve", createReservation);
reservationRoutes.get(
  "/available-hours/:field_id/:date",
  getAvailableHoursForFieldAndDate
);
reservationRoutes.delete("/cancel/:reservation_id", cancelReservation);
reservationRoutes.get(
  "/reservations/:field_id/:date",
  getReservationsByFieldAndDate
);
reservationRoutes.get("/reservations/:user_uuid", getReservationsByUserUUID);

export default reservationRoutes;
