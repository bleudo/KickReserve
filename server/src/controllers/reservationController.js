import * as reservationService from "../services/reservationService.js";

export const createReservation = async (req, res) => {
  try {
    const reservationData = req.body;
    const reservation = await reservationService.createReservation(
      reservationData
    );
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error in createReservation:", error);
    res.status(500).json({ error: "Error creating reservation" });
  }
};

export const getAvailableHoursForFieldAndDate = async (req, res) => {
  const { field_id, date } = req.params;
  try {
    const hours = await reservationService.getAvailableHoursForFieldAndDate(
      field_id,
      date
    );
    res.status(200).json(hours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting available hours" });
    console.log(field_id);
  }
};

export const getReservationsByUserUUID = async (req, res) => {
  const { user_uuid } = req.params;
  if (!user_uuid) {
    return res.status(400).json({ error: "user_uuid is required" });
  }
  try {
    const reservations = await reservationService.getReservationsByUserUUID(
      user_uuid
    );
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({ error: "Error getting user reservations" });
  }
};

export const cancelReservation = async (req, res) => {
  const { reservation_id } = req.params;
  try {
    const cancelledReservation = await reservationService.cancelReservation(
      reservation_id
    );
    if (cancelledReservation) {
      res.status(200).json(cancelledReservation);
    } else {
      res.status(404).json({ error: "Reservation not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error cancelling reservation" });
  }
};

export const getReservationsByFieldAndDate = async (req, res) => {
  const { field_id, date } = req.params;
  try {
    const reservations = await reservationService.getReservationsByFieldAndDate(
      field_id,
      date
    );
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: "Error getting reservations" });
  }
};
