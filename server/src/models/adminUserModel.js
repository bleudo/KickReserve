import pool from "../config/db.js";

export const registerAdminUser = async (username, passwordHash) => {
  const result = await pool.query(
    "INSERT INTO admin_users (username, password_hash) VALUES ($1, $2) RETURNING *",
    [username, passwordHash]
  );
  return result.rows[0];
};

export const findAdminUserByUsername = async (username) => {
  const result = await pool.query(
    "SELECT * FROM admin_users WHERE username = $1",
    [username]
  );
  return result.rows[0];
};

export const getReservationsByDate = async (formattedDate) => {
  const result = await pool.query(
    `SELECT r.*, f.name as field_name, u.name as user_name, u.phone as user_phone,
     CASE
         WHEN r.date < CURRENT_DATE THEN 'passed'
         ELSE r.status
      END as current_status
      FROM reservations r 
      JOIN fields f ON r.field_id = f.field_id 
      JOIN users u ON r.user_id = u.user_id 
      WHERE r.date = $1
      ORDER BY r.start_time`,
    [formattedDate]
  );
  return result.rows;
};

export const updateReservation = async (formattedDate, start_time, reservation_id) => {
  const result = await pool.query(
    `UPDATE reservations 
     SET date = $1, start_time = $2
     WHERE reservation_id = $3
     RETURNING *`,
    [formattedDate, start_time, reservation_id]
  );
  return result.rows[0];
};

export const getReservationsByFieldAndDate = async (field_id, formattedDate) => {
  const result = await pool.query(
    "SELECT start_time FROM reservations WHERE field_id = $1 AND date = $2 AND status = 'active' ORDER BY start_time",
    [field_id, formattedDate]
  );
  return result.rows;
};
