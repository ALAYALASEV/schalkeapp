const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// GET jugadores
app.get("/jugadores", (req, res) => {
  const jugadores = db.prepare("SELECT * FROM jugadores").all();
  res.json(jugadores);
});

// POST para añadir un jugador
app.post("/jugadores", (req, res) => {
  const { nombre, posicion, puntos, imagen, titular } = req.body;
  const stmt = db.prepare(`
    INSERT INTO jugadores (nombre, posicion, puntos, imagen, titular)
    VALUES (?, ?, ?, ?, ?)
  `);
  const result = stmt.run(nombre, posicion, puntos, imagen, titular ? 1 : 0);
  res.json({ id: result.lastInsertRowid });
});

// PUT para actualizar titular/suplente
app.put("/jugadores/:id", (req, res) => {
  const { id } = req.params;
  const { titular } = req.body;
  db.prepare(`UPDATE jugadores SET titular = ? WHERE id = ?`).run(titular ? 1 : 0, id);
  res.json({ success: true });
});

// 🔹 Servidor escuchando
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
