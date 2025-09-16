const express = require("express");
const cors = require("cors");
const db = require("./database"); // este es tu pool de pg

const app = express();
app.use(cors());
app.use(express.json());

// GET jugadores + formación
app.get("/jugadores", async (req, res) => {
  try {
    const jugadores = await db.query("SELECT * FROM jugadores");
    const formacion = await db.query(
      "SELECT valor FROM configuracion WHERE clave = 'formacion'"
    );

    res.json({
      jugadores: jugadores.rows,
      formacion: formacion.rows.length > 0 ? formacion.rows[0].valor : "4-3-3",
    });
  } catch (err) {
    console.error("❌ Error en GET /jugadores:", err);
    res.status(500).json({ error: "Error obteniendo jugadores" });
  }
});

// POST para añadir un jugador
app.post("/jugadores", async (req, res) => {
  try {
    const { nombre, posicion, puntos, imagen, titular } = req.body;

    const result = await db.query(
      `INSERT INTO jugadores (nombre, posicion, puntos, imagen, titular)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [nombre, posicion, puntos, imagen, titular ? true : false]
    );

    res.json({ id: result.rows[0].id });
  } catch (err) {
    console.error("❌ Error en POST /jugadores:", err);
    res.status(500).json({ error: "Error añadiendo jugador" });
  }
});

// PUT para actualizar titular/suplente de un jugador concreto
app.put("/jugadores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { titular } = req.body;

    await db.query(`UPDATE jugadores SET titular = $1 WHERE id = $2`, [
      titular ? true : false,
      id,
    ]);

    res.json({ success: true });
  } catch (err) {
    console.error("❌ Error en PUT /jugadores/:id:", err);
    res.status(500).json({ error: "Error actualizando jugador" });
  }
});

// PUT para guardar plantilla completa
app.put("/plantilla", async (req, res) => {
  const { jugadores } = req.body;

  try {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      for (const j of jugadores) {
        await client.query(
          `UPDATE jugadores SET titular = $1, posicion = $2 WHERE id = $3`,
          [j.titular ? true : false, j.posicion, j.id]
        );
      }

      await client.query("COMMIT");
      res.json({ success: true, message: "Plantilla guardada ✅" });
    } catch (err) {
      await client.query("ROLLBACK");
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("❌ Error en PUT /plantilla:", err);
    res.status(500).json({ error: "Error guardando plantilla" });
  }
});

// PUT para cambiar formación
app.put("/formacion", async (req, res) => {
  try {
    const { formacion } = req.body;

    await db.query(
      `INSERT INTO configuracion (clave, valor)
       VALUES ('formacion', $1)
       ON CONFLICT (clave) DO UPDATE SET valor = EXCLUDED.valor`,
      [formacion]
    );

    res.json({ success: true, formacion });
  } catch (err) {
    console.error("❌ Error en PUT /formacion:", err);
    res.status(500).json({ error: "Error guardando formación" });
  }
});

// Crear tabla de configuración si no existe
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS configuracion (
        clave TEXT PRIMARY KEY,
        valor TEXT
      )
    `);
    console.log("✅ Tabla 'configuracion' lista");
  } catch (err) {
    console.error("❌ Error creando tabla configuracion:", err);
  }
})();

// Servidor escuchando
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
});
