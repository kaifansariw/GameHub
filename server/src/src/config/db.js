import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl:
        process.env.NODE_ENV === "production"
        ? { rejectedUauthorized : false} : false,
});

pool.on("connect", () => {
    console.log("PostgreSQL connected");
});

pool.on("error", () => {
    console.log("Unexpected PostgreSQL error:" , err);
});

export default pool;