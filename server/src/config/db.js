import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

export const connectDB = () => {
  return new Promise((resolve, reject) => {
    pool.connect((err) => {
      if (err) {
        console.error("Error connecting to database", error);
        reject(err);
      } else {
        console.log("Connected to database");
        resolve();
      }
    });
  });
};

export default pool;