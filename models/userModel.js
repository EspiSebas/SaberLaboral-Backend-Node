const db = require('./db');

// Función para crear la tabla si no existe
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  last TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);

// Crear un nuevo usuario en la base de datos
const crearUsuario = (name, last, email, password, callback) => {
  const sql = `INSERT INTO users (name, last, email, password) VALUES (?, ?, ?, ?)`;
  db.run(sql, [name, last, email, password], function(err) {
    if (err) {
      return callback(err); // Pasar el error al callback
    }
    callback(null, this.lastID); // Devolver el ID del usuario insertado
  });
};

// Obtener un usuario por su email
const obtenerUsuarioPorEmail = (email, callback) => {
  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], (err, row) => {
    if (err) {
      return callback(err); // Pasar el error al callback
    }
    callback(null, row); // Pasar el usuario encontrado al callback
  });
};

// Obtener un usuario por su ID (opcional, útil para obtener más información)
const obtenerUsuarioPorId = (id, callback) => {
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.get(sql, [id], (err, row) => {
    if (err) {
      return callback(err); // Pasar el error al callback
    }
    callback(null, row); // Pasar el usuario encontrado al callback
  });
};

// Eliminar un usuario por su ID
const eliminarUsuarioPorId = (id, callback) => {
  const sql = `DELETE FROM users WHERE id = ?`;
  db.run(sql, [id], function(err) {
    if (err) {
      return callback(err); // Pasar el error al callback
    }
    callback(null); // Todo salió bien
  });
};

module.exports = {
  crearUsuario,
  obtenerUsuarioPorEmail,
  obtenerUsuarioPorId,  // Agregado opcional
  eliminarUsuarioPorId
};
