import pool from "../config/db.js";

export const createReservation = async (
  userId,
  field_id,
  date,
  start_time,
  end_time
) => {
  try {
    const result = await pool.query(
      "INSERT INTO reservations (user_id, field_id, date, start_time, end_time) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [userId, field_id, date, start_time, end_time]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const findOrCreateUser = async (
  user_uuid,
  user_name,
  user_lastname,
  user_phone
) => {
  try {
    let userResult = await pool.query(
      "SELECT user_id, uuid FROM users WHERE uuid = $1",
      [user_uuid]
    );
    if (userResult.rows.length === 0) {
      userResult = await pool.query(
        "INSERT INTO users (uuid, name, lastname, phone) VALUES ($1, $2, $3, $4) RETURNING user_id, uuid",
        [user_uuid, user_name, user_lastname, user_phone]
      );
    }
    return userResult.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getAvailableHoursForFieldAndDate = async (field_id, date) => {
  try {
    const result = await pool.query(
      "SELECT start_time FROM reservations WHERE field_id = $1 AND date = $2 AND status = 'active' ORDER BY start_time",
      [field_id, date]
    );
    return result.rows;
  } catch (error) {
    console.log(field_id)
    throw error;
  }
};

export const getReservationsByUserUUID = async (user_uuid) => {  
  if (!user_uuid) {
    throw new Error('user_uuid is undefined or null');
  }
  try {
    const result = await pool.query(
      `SELECT r.*, f.name as field_name,
       CASE 
          WHEN r.date < CURRENT_DATE OR (r.date = CURRENT_DATE AND r.start_time < CURRENT_TIME) THEN 'passed'
          ELSE r.status
       END as current_status
       FROM reservations r 
       JOIN users u ON r.user_id = u.user_id 
       JOIN fields f ON r.field_id = f.field_id 
       WHERE u.uuid = $1 
       ORDER BY r.date, r.start_time`,
      [user_uuid]
    );
    console.log('Query result:', result.rows);
    return result.rows;
  } catch (error) {
    console.error('Model error:', error);
    throw error;
  }
};

export const cancelReservation = async (reservation_id) => {
  try {
    const result = await pool.query(
      "UPDATE reservations SET status = 'cancelled' WHERE reservation_id = $1 RETURNING *",
      [reservation_id]
    );
    return result.rows[0];
  } catch (error) {
    throw error;
  }
};

export const getReservationsByFieldAndDate = async (field_id, date) => {
  try {
    const result = await pool.query(
      "SELECT * FROM reservations WHERE field_id = $1 AND date = $2 AND status = 'active' ",
      [field_id, date]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const updatePassedReservations = async () => {
  try {
    const result = await pool.query(
      `UPDATE reservations 
       SET status = 'passed'
       WHERE date < CURRENT_DATE
       AND status IN ('active', 'cancelled')
       RETURNING *`
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};

export const getReservationsByDate = async (date) => {
  try {
    const result = await pool.query(
      `SELECT r.*, f.name as field_name, u.name as user_name, u.phone as user_phone 
       FROM reservations r 
       JOIN fields f ON r.field_id = f.field_id 
       JOIN users u ON r.user_id = u.user_id 
       WHERE r.date = $1`,
      [date]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
};
