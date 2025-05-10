const db = require('../configuration/db');

db.run(`
  CREATE TABLE IF NOT EXISTS progreso  (
      id INTEGER PRIMARY KEY,
      puntos INTEGER DEFAULT 0,
      nivel INTEGER DEFAULT 1
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla:', err.message);
  } else {
    console.log('Tabla "progreso" creada o ya existe.');
  }
}); 