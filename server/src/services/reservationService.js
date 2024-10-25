import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { parseISO, isToday as isDateToday } from "date-fns";
import * as ReservationModel from "../models/reservationModel.js";

const TIMEZONE = "America/Costa_Rica";

export const createReservation = async (reservationData) => {
  const {
    field_id,
    date,
    start_time,
    end_time,
    user_name,
    user_lastname,
    user_phone,
    user_uuid,
  } = reservationData;

  const user = await ReservationModel.findOrCreateUser(
    user_uuid,
    user_name,
    user_lastname,
    user_phone
  );

  const reservation = await ReservationModel.createReservation(
    user.user_id,
    parseInt(field_id, 10),
    date,
    start_time,
    end_time
  );

  return reservation;
};

export const getAvailableHoursForFieldAndDate = async (field_id, date) => {
  try {
    const currentTime = new Date();
    const selectedDate = parseISO(date);

    const currentTimeInCR = toZonedTime(currentTime, TIMEZONE);
    const selectedDateInCR = toZonedTime(selectedDate, TIMEZONE);

    const isToday = isDateToday(selectedDateInCR);

    const reservations =
      await ReservationModel.getReservationsByFieldAndDate(
        parseInt(field_id, 10),
        formatInTimeZone(selectedDateInCR, TIMEZONE, "yyyy-MM-dd")
      );

    const occupiedHours = new Set(
      reservations.map((row) => row.start_time.slice(0, 5))
    );

    const allowedHours = [];

    for (let hour = 6; hour <= 23; hour++) {
      const hourString = hour.toString().padStart(2, "0") + ":00";
      const hourDate = toZonedTime(
        new Date(selectedDate).setHours(hour, 0, 0, 0),
        TIMEZONE
      );

      const isFutureHour = isToday ? hourDate > currentTimeInCR : true;

      if (!occupiedHours.has(hourString) && isFutureHour) {
        allowedHours.push(hourString);
      }
    }
    return allowedHours;
  } catch (error) {
    throw error;
  }
};

export const getReservationsByUserUUID = async (user_uuid) => {
  return await ReservationModel.getReservationsByUserUUID(user_uuid);
};

export const cancelReservation = async (reservation_id) => {
  return await ReservationModel.cancelReservation(reservation_id);
};

export const getReservationsByFieldAndDate = async (field_id, date) => {
  return await ReservationModel.getReservationsByFieldAndDate(field_id, date);
};

export const updatePassedReservations = async () => {
  return await ReservationModel.updatePassedReservations();
};

export const getReservationsByDate = async (date) => {
  return await ReservationModel.getReservationsByDate(date);
};
