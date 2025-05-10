import initSqlJs from 'sql.js';

let db;

(async () => {
  const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.wasm` });
  db = new SQL.Database();
  db.run(`
    CREATE TABLE quizzes (
      id INTEGER PRIMARY KEY,
      pregunta TEXT,
      opciones TEXT,
      respuesta_correcta TEXT,
      retroalimentacion TEXT
    );
    CREATE TABLE desafios (
      id INTEGER PRIMARY KEY,
      situacion TEXT,
      opciones TEXT,
      respuesta_correcta TEXT,
      retroalimentacion TEXT
    );
    CREATE TABLE puzzles (
      id INTEGER PRIMARY KEY,
      tipo TEXT,
      datos TEXT,
      retroalimentacion TEXT
    );
    CREATE TABLE progreso (
      id INTEGER PRIMARY KEY,
      puntos INTEGER DEFAULT 0,
      nivel INTEGER DEFAULT 1
    );
  `);

  const initialQuizzes = [
    { id: 1, pregunta: '¿Cuál es el salario mínimo en 2025?', opciones: JSON.stringify(['1,300,000 COP', '1,423,500 COP']), respuesta_correcta: '1,423,500 COP', retroalimentacion: 'Correcto.' }
  ];
  const stmt = db.prepare('INSERT INTO quizzes (id, pregunta, opciones, respuesta_correcta, retroalimentacion) VALUES (?, ?, ?, ?, ?)');
  initialQuizzes.forEach(quiz => stmt.run([quiz.id, quiz.pregunta, quiz.opciones, quiz.respuesta_correcta, quiz.retroalimentacion]));
  stmt.free();
})();

export const getDB = () => db;