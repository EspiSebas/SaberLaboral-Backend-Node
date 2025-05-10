const db = require('../configuration/db');

db.run(`
  CREATE TABLE IF NOT EXISTS desafios  (
       id INTEGER PRIMARY KEY,
      situacion TEXT,
      opciones TEXT,
      respuesta_correcta TEXT,
      retroalimentacion TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla:', err.message);
  } else {
    console.log('Tabla "desafios" creada o ya existe.');
  }
}); 