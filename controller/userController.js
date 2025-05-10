const { userModel } = require('../models');
const validator = require('validator');

// 🔐 Serializador: oculta la contraseña antes de responder
function serializeUser(user) {
  return {
    id: user.id,
    name: user.name,
    last: user.last,
    email: user.email
  };
}

const registrarUsuario = (req, res) => {
  const { name, last, email, password, confirmPassword } = req.body;

  if (!name || !last || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios', respuesta: 400 });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'El correo no es válido', respuesta: 400 });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Las contraseñas no coinciden', respuesta: 400 });
  }

  userModel.obtenerUsuarioPorEmail(email, (err, user) => {
    if (user) {
      return res.status(409).json({ message: 'El Usuario ya existe', respuesta: 409 });
    }

    userModel.crearUsuario(name, last, email, password, (err, newUserId) => {
      if (err) {
        return res.status(500).json({ message: 'Error al crear el usuario', respuesta: 500 });
      }

      const newUser = { id: newUserId, name, last, email };
      res.status(201).json({
        message: `Usuario creado correctamente. Tu nombre es: ${name}`,
        respuesta: 201,
        user: serializeUser(newUser)
      });
    });
  });
};

const loginUsuario = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios', respuesta: 400 });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ message: 'El correo no es válido', respuesta: 400 });
  }

  userModel.obtenerUsuarioPorEmail(email, (err, user) => {
    if (err || !user) {
      return res.status(409).json({ message: 'El Usuario no existe', respuesta: 409 });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: 'No es la contraseña correcta !!', respuesta: 400 });
    }

    res.status(200).json({
      message: `¡Logueado correctamente! Tu email es: ${user.email}`,
      respuesta: 200,
      user: serializeUser(user)
    });
  });
};

const eliminarUsuario = (req, res) => {
  const { id } = req.params;

  userModel.eliminarUsuarioPorId(id, (err) => {
    if (err) {
      return res.status(404).json({ message: 'Usuario no existe !!', respuesta: 404 });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente', respuesta: 200 });
  });
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  eliminarUsuario,
};
