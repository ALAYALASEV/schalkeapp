const db = require("./database");

// Borrar jugadores previos
db.prepare("DELETE FROM jugadores").run();

const insert = db.prepare(
  "INSERT INTO jugadores (nombre, posicion, puntos, imagen, titular) VALUES (?, ?, ?, ?, ?)"
);

// Porteros
insert.run("Manuel Neuer", "POR", 90, "/imagenes/imagen.png", 0);
insert.run("Ralf Fährmann", "POR", 78, "/imagenes/imagen.png", 0);

// Defensas
insert.run("Sead Kolasinac", "LI", 78, "/imagenes/imagen.png", 0);
insert.run("Bastian Oczipka", "LI", 70, "/imagenes/imagen.png", 0);
insert.run("Maya Yoshida", "DFC", 75, "/imagenes/imagen.png", 0);
insert.run("Benedikt Höwedes", "DFC", 85, "/imagenes/imagen.png", 0);
insert.run("Matija Nastasić", "DFC", 74, "/imagenes/imagen.png", 0);
insert.run("Rafinha", "LD", 72, "/imagenes/imagen.png", 0);
insert.run("Atsuto Uchida", "LD", 77, "/imagenes/imagen.png", 0);

// Mediocampo
insert.run("Weston McKennie", "MC", 82, "/imagenes/imagen.png", 0);
insert.run("Julian Draxler", "MI", 84, "/imagenes/imagen.png", 0);
insert.run("Leon Goretzka", "MC", 87, "/imagenes/imagen.png", 0);
insert.run("Rodrigo Zalazar", "MD", 80, "/imagenes/imagen.png", 0);
insert.run("Mesut Özil", "MCD", 88, "/imagenes/imagen.png", 0);
insert.run("Amine Harit", "MC", 79, "/imagenes/imagen.png", 0);

// Delanteros
insert.run("Klaas-Jan Huntelaar", "DC", 89, "/imagenes/imagen.png", 0);
insert.run("Simon Terodde", "DC", 85, "/imagenes/imagen.png", 0);
insert.run("Jefferson Farfán", "RW", 86, "/imagenes/imagen.png", 0);
insert.run("Leroy Sané", "LW", 88, "/imagenes/imagen.png", 0);

console.log("✅ Jugadores iniciales insertados con titulares y suplentes en todas las posiciones.");
