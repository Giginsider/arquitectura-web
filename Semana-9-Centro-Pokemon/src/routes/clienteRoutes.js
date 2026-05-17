const express = require('express');
const router = express.Router();
const {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar
} = require('../controllers/clienteController');
 
router.get('/',       obtenerTodos);   // Listar todos
router.get('/:id',    obtenerPorId);   // Buscar uno
router.post('/',      crear);          // Crear
router.put('/:id',    actualizar);     // Actualizar
router.delete('/:id', eliminar);       // Eliminar
 
module.exports = router;
