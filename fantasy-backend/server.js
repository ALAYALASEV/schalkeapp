const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(cors());
app.use(express.json());

// GET jugadores + formación
app.get("/jugadores", (req, res) => {
  const jugadores = db.prepare("SELECT * FROM jugadores").all();
  const formacion = db.prepare("SELECT valor FROM configuracion WHERE clave = 'formacion'").get();
  res.json({ jugadores, formacion: formacion ? formacion.valor : "4-3-3" });
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

// PUT para actualizar titular/suplente de un jugador concreto
app.put("/jugadores/:id", (req, res) => {
  const { id } = req.params;
  const { titular } = req.body;
  db.prepare(`UPDATE jugadores SET titular = ? WHERE id = ?`).run(titular ? 1 : 0, id);
  res.json({ success: true });
});

// PUT para guardar plantilla completa
app.put("/plantilla", (req, res) => {
  const { jugadores } = req.body;

  const update = db.prepare(
    `UPDATE jugadores SET titular = ?, posicion = ? WHERE id = ?`
  );

  const transaction = db.transaction((jugadores) => {
    for (const j of jugadores) {
      update.run(j.titular ? 1 : 0, j.posicion, j.id);
    }
  });

  transaction(jugadores);

  res.json({ success: true, message: "Plantilla guardada ✅" });
});

// PUT para cambiar formación
app.put("/formacion", (req, res) => {
  const { formacion } = req.body;
  db.prepare(`
    INSERT INTO configuracion (clave, valor)
    VALUES ('formacion', ?)
    ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor
  `).run(formacion);

  res.json({ success: true, formacion });
});

// Crear tabla de configuración si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS configuracion (
    clave TEXT PRIMARY KEY,
    valor TEXT
  )
`).run();

// Servidor escuchando
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
