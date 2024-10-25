import pool from "../config/db.js";

// Obtener todos los campos
export const getAllFields = async () => {
  const result = await pool.query("SELECT * FROM fields");
  return result.rows;
};
