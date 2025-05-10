const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');


// POST (crear usuario básico)
router.post('/registrar_usuario', userController.registrarUsuario);
router.post('/login_usuario', userController.loginUsuario);
router.delete('/deleteUser/:id', userController.eliminarUsuario);
router.get('/usuarios',userController.obtenerTodosUsuarios)

module.exports = router;
