const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Datos de prueba con titulares, suplentes y coordenadas en el campo
let jugadores = [
  // Portero
  { id: 1, nombre: "Juan Pérez", posicion: "POR", puntos: 25, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 5, left: 50 } },

  // Defensas titulares
  { id: 2, nombre: "Mario López", posicion: "LD", puntos: 18, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 20, left: 80 } },
  { id: 5, nombre: "Andrés Torres", posicion: "DFC", puntos: 17, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 20, left: 50 } },
  { id: 8, nombre: "Diego Fernández", posicion: "DFC", puntos: 16, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 20, left: 20 } },
  { id: 12, nombre: "Pablo Jiménez", posicion: "LI", puntos: 15, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 20, left: 10 } },

  // Mediocentros titulares
  { id: 3, nombre: "Carlos Ruiz", posicion: "MCD", puntos: 20, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 40, left: 50 } },
  { id: 6, nombre: "Sergio Jiménez", posicion: "MD", puntos: 22, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 40, left: 30 } },
  { id: 13, nombre: "Jorge Martínez", posicion: "MI", puntos: 19, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 40, left: 10 } },

  // Delanteros titulares
  { id: 4, nombre: "Luis García", posicion: "DC", puntos: 15, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 60, left: 50 } },
  { id: 7, nombre: "Javier Morales", posicion: "LW", puntos: 19, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 60, left: 20 } },
  { id: 10, nombre: "Fernando Castillo", posicion: "RW", puntos: 18, imagen: "/imagenes/imagen.png", titular: true, coords: { bottom: 60, left: 80 } },

  // Suplentes
  { id: 14, nombre: "Suplente 1", posicion: "POR", puntos: 10, imagen: "/imagenes/imagen.png", titular: false },
  { id: 15, nombre: "Suplente 2", posicion: "DFC", puntos: 12, imagen: "/imagenes/imagen.png", titular: false },
  { id: 16, nombre: "Suplente 3", posicion: "MD", puntos: 13, imagen: "/imagenes/imagen.png", titular: false },
  { id: 17, nombre: "Suplente 4", posicion: "DC", puntos: 14, imagen: "/imagenes/imagen.png", titular: false },
  { id: 18, nombre: "Suplente 5", posicion: "DC", puntos: 14, imagen: "/imagenes/imagen.png", titular: false },
  { id: 19, nombre: "Suplente 6", posicion: "DC", puntos: 14, imagen: "/imagenes/imagen.png", titular: false },
];

app.get("/jugadores", (req, res) => {
  res.json(jugadores);
});

app.listen(4000, () => {
  console.log("Servidor backend escuchando en http://localhost:4000");
});
