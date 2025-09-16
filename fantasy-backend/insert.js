// insert.js
const pool = require("./database");

(async () => {
  try {
    await pool.query(`
      INSERT INTO jugadores (nombre, posicion, puntos, imagen, titular)
      VALUES
      -- TITULARES
      ('Ralf Fährmann', 'POR', 0, 'https://upload.wikimedia.org/wikipedia/commons/0/09/Ralf_Faehrmann.jpg', true),
      ('Sepp van den Berg', 'DFC', 0, 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Sepp_van_den_Berg.jpg', true),
      ('Thomas Ouwejan', 'LI', 0, 'https://upload.wikimedia.org/wikipedia/commons/5/55/Thomas_Ouwejan.jpg', true),
      ('Cedric Brunner', 'LD', 0, 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Cedric_Brunner.jpg', true),
      ('Marcin Kamiński', 'DFC', 0, 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Marcin_Kaminski.jpg', true),
      ('Tom Krauß', 'MC', 0, 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Tom_Krauss.jpg', true),
      ('Danny Latza', 'MCD', 0, 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Danny_Latza.jpg', true),
      ('Dominick Drexler', 'MCO', 0, 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Dominick_Drexler.jpg', true),
      ('Marius Bülter', 'LW', 0, 'https://upload.wikimedia.org/wikipedia/commons/0/08/Marius_Buelter.jpg', true),
      ('Kenan Karaman', 'RW', 0, 'https://upload.wikimedia.org/wikipedia/commons/0/0f/Kenan_Karaman.jpg', true),
      ('Simon Terodde', 'DC', 0, 'https://upload.wikimedia.org/wikipedia/commons/5/55/Simon_Terodde.jpg', true),

      -- SUPLENTES
      ('Justin Heekeren', 'POR', 0, 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Justin_Heekeren.jpg', false),
      ('Leo Greiml', 'DFC', 0, 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Leo_Greiml.jpg', false),
      ('Henning Matriciani', 'LD', 0, 'https://upload.wikimedia.org/wikipedia/commons/6/65/Henning_Matriciani.jpg', false),
      ('Florian Flick', 'MC', 0, 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Florian_Flick.jpg', false),
      ('Soichiro Kozuki', 'RW', 0, 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Soichiro_Kozuki.jpg', false),
      ('Sebastian Polter', 'DC', 0, 'https://upload.wikimedia.org/wikipedia/commons/7/74/Sebastian_Polter.jpg', false),
      ('Rodrigo Zalazar', 'MCO', 0, 'https://upload.wikimedia.org/wikipedia/commons/4/48/Rodrigo_Zalazar.jpg', false);
    `);
    console.log("✅ Jugadores titulares y suplentes insertados");
  } catch (err) {
    console.error("❌ Error insertando jugadores", err);
  } finally {
    pool.end();
  }
})();
