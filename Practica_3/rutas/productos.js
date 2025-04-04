const express = require('express');
const router = express.Router();
const productoControlador = require('../controladores/productoControlador');

router.get('/', productoControlador.listarProductos);
router.post('/guardar', productoControlador.guardarProducto);
router.post('/editar/:id', productoControlador.editarProducto);
router.get('/eliminar/:id', productoControlador.eliminarProducto);

module.exports = router;
