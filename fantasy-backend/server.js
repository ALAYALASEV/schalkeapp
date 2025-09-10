const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Datos de prueba con posiciones más realistas
let jugadores = [
  // Portero
  { "id": 1, "nombre": "Juan Pérez", "posicion": "POR", "puntos": 25 },

  // Defensas
  { "id": 2, "nombre": "Mario López", "posicion": "LD", "puntos": 18 },
  { "id": 5, "nombre": "Andrés Torres", "posicion": "DFC", "puntos": 17 },
  { "id": 8, "nombre": "Diego Fernández", "posicion": "DFC", "puntos": 16 },
  { "id": 12, "nombre": "Pablo Jiménez", "posicion": "LI", "puntos": 15 },

  // Mediocentros
  { "id": 3, "nombre": "Carlos Ruiz", "posicion": "MCD", "puntos": 20 },
  { "id": 6, "nombre": "Sergio Jiménez", "posicion": "MC", "puntos": 22 },
  { "id": 9, "nombre": "Raúl Sánchez", "posicion": "MCO", "puntos": 21 },
  { "id": 13, "nombre": "Jorge Martínez", "posicion": "MI", "puntos": 19 },

  // Delanteros
  { "id": 4, "nombre": "Luis García", "posicion": "DC", "puntos": 15 },
  { "id": 7, "nombre": "Javier Morales", "posicion": "LW", "puntos": 19 },
  { "id": 10, "nombre": "Fernando Castillo", "posicion": "RW", "puntos": 18 }
];

app.get("/jugadores", (req, res) => {
  res.json(jugadores);
});

app.listen(4000, () => {
  console.log("Servidor backend escuchando en http://localhost:4000");
});
