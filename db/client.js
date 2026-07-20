import pg from "pg";
const db = new pg.Client(
  process.env.DATABASE_URL || "postgres://localhost/fullstack_employees",
);
export default db;
