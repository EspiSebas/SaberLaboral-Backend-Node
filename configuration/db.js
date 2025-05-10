const sqlite3 = require('sqlite3').verbose();  // Importar sqlite3
const path = require('path');

// Crear la conexión a la base de datos
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión a la base de datos SQLite establecida');
  }
});


module.exports = db;