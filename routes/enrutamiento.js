const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Equivalente a router.register(r'register', views.register)
router.get('/register', userController.getAllUsers); // GET all users 
router.post('/register', userController.createUser); // POST (crear usuario básico)

// Equivalente a path('registrar_usuario/', ...)
router.post('/registrar_usuario', userController.registrarUsuario);

router.post('/login_usuario', userController.loginUsuario);

router.delete('/deleteUser/:id', userController.deleteUser);

module.exports = router;
