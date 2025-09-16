// database.js
require("dotenv").config();
const { Pool } = require("pg");

// Conexión al pool de PostgreSQL (Render)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // necesario en Render
  },
});

// Crear tablas si no existen
(async () => {
  try {
    // Tabla jugadores
    await pool.query(`
      CREATE TABLE IF NOT EXISTS jugadores (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        posicion TEXT NOT NULL,
        puntos INTEGER DEFAULT 0,
        imagen TEXT,
        titular BOOLEAN DEFAULT FALSE
      );
    `);

    // Tabla configuración
    await pool.query(`
      CREATE TABLE IF NOT EXISTS configuracion (
        clave TEXT PRIMARY KEY,
        valor TEXT
      );
    `);

    console.log("✅ Tablas 'jugadores' y 'configuracion' listas en PostgreSQL");
  } catch (err) {
    console.error("❌ Error creando las tablas", err);
  }
})();

module.exports = pool;
