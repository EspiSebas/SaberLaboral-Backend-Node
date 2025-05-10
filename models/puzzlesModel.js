const db = require('../configuration/db');

db.run(`
  CREATE TABLE IF NOT EXISTS puzzles  (
       id INTEGER PRIMARY KEY,
      tipo TEXT,
      datos TEXT,
      retroalimentacion TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla:', err.message);
  } else {
    console.log('Tabla "puzzles" creada o ya existe.');
  }
}); 