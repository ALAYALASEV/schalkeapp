const Database = require("better-sqlite3");

// Crea o abre un archivo de base de datos llamado schalke.db
const db = new Database("schalke.db");

// Crear la tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS jugadores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    posicion TEXT NOT NULL,
    puntos INTEGER DEFAULT 0,
    imagen TEXT,
    titular BOOLEAN DEFAULT 0
  )
`).run();

module.exports = db;
