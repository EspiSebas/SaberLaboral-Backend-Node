const db = require('../configuration/db');

db.run(`
  CREATE TABLE IF NOT EXISTS quizzes  (
      id INTEGER PRIMARY KEY,
      pregunta TEXT,
      opciones TEXT,
      respuesta_correcta TEXT,
      retroalimentacion TEXT
  )
`, (err) => {
  if (err) {
    console.error('Error al crear la tabla:', err.message);
  } else {
    console.log('Tabla "quizzes" creada o ya existe.');
  }
}); 