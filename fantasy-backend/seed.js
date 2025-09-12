const db = require("./database");

// Borrar jugadores previos (opcional, para limpiar antes de cargar)
db.prepare("DELETE FROM jugadores").run();

// Insertar jugadores de ejemplo
const insert = db.prepare("INSERT INTO jugadores (nombre, posicion, puntos, imagen, titular) VALUES (?, ?, ?, ?, ?)");

insert.run("Manuel Neuer", "POR", 90, "/imagenes/imagen.png", 0);
insert.run("Maya Yoshida", "DFC", 75, "/imagenes/imagen.png", 1);
insert.run("Sead Kolasinac", "DFC", 78, "/imagenes/imagen.png", 1);
insert.run("Rodrigo Zalazar", "MD", 80, "/imagenes/imagen.png", 1);
insert.run("Simon Terodde", "DC", 85, "/imagenes/imagen.png", 0);

console.log("✅ Jugadores iniciales insertados.");
