import bcrypt from "bcrypt";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";
import { parseISO } from "date-fns";
import * as adminUserModel from "../models/adminUserModel.js";

const TIMEZONE = "America/Costa_Rica";

export const registerAdminUser = async (username, password) => {
  const passwordHash = await bcrypt.hash(password, 10);
  return await adminUserModel.registerAdminUser(username, passwordHash);
};

export const authenticateAdminUser = async (username, password) => {
  const adminUser = await adminUserModel.findAdminUserByUsername(username);
  if (adminUser && (await bcrypt.compare(password, adminUser.password_hash))) {
    return adminUser;
  }
  return null;
};

export const getReservationsByDateAdmin = async (date) => {
  const selectedDate = parseISO(date);
  const formattedDate = formatInTimeZone(selectedDate, TIMEZONE, "yyyy-MM-dd");
  return await adminUserModel.getReservationsByDate(formattedDate);
};

export const updateReservationAdmin = async (
  date,
  start_time,
  reservation_id
) => {
  const selectedDate = parseISO(date);
  const formattedDate = formatInTimeZone(selectedDate, TIMEZONE, "yyyy-MM-dd");
  return await adminUserModel.updateReservation(
    formattedDate,
    start_time,
    reservation_id
  );
};

export const getAvailableHoursAdmin = async (field_id, date) => {
  const currentTime = new Date();
  const selectedDate = parseISO(date);
  const currentTimeInCR = toZonedTime(currentTime, TIMEZONE);
  const selectedDateInCR = toZonedTime(selectedDate, TIMEZONE);
  const formattedDate = formatInTimeZone(
    selectedDateInCR,
    TIMEZONE,
    "yyyy-MM-dd"
  );

  const isToday =
    formatInTimeZone(currentTimeInCR, TIMEZONE, "yyyy-MM-dd") === formattedDate;

  const reservations = await adminUserModel.getReservationsByFieldAndDate(
    field_id,
    formattedDate
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
};
