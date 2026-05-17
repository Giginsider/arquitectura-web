const db = require('../config/db');
 
/**
 * GET /api/clientes
 * Lista todos los entrenadores registrados.
 */
const obtenerTodos = async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id_cliente, nombre, email, telefono, created_at FROM cliente'
    );
    res.status(200).json({ ok: true, data: rows });
  } catch (error) {
    console.error('Error al obtener clientes:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};
 
/**
 * GET /api/clientes/:id
 * Busca un entrenador específico por su ID.
 */
const obtenerPorId = async (req, res) => {
  try {
    const { id } = req.params;
 
    // Validamos que el ID sea numérico
    if (isNaN(id)) {
      return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });
    }
 
    // Consulta PARAMETRIZADA con "?" — previene inyección SQL
    const [rows] = await db.query(
      'SELECT id_cliente, nombre, email, telefono, created_at FROM cliente WHERE id_cliente = ?',
      [id]
    );
 
    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Entrenador no encontrado' });
    }
 
    res.status(200).json({ ok: true, data: rows[0] });
  } catch (error) {
    console.error('Error al obtener cliente:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};
 
/**
 * POST /api/clientes
 * Registra un nuevo entrenador en el Centro Pokémon.
 */
const crear = async (req, res) => {
  try {
    const { nombre, email, telefono } = req.body;
 
    // Validación de campos obligatorios
    if (!nombre || !email) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Los campos nombre y email son obligatorios'
      });
    }
 
    // Validación simple de formato de email
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El email no tiene un formato válido'
      });
    }
 
    const [result] = await db.query(
      'INSERT INTO cliente (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono || null]
    );
 
    res.status(201).json({
      ok: true,
      mensaje: 'Entrenador registrado correctamente',
      data: { id_cliente: result.insertId, nombre, email, telefono }
    });
  } catch (error) {
    // Capturamos el error específico de email duplicado → 409 Conflict
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya existe un entrenador registrado con ese email'
      });
    }
    console.error('Error al crear cliente:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};
 
/**
 * PUT /api/clientes/:id
 * Actualiza los datos de un entrenador existente.
 */
const actualizar = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
 
    if (isNaN(id)) {
      return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });
    }
 
    if (!nombre || !email) {
      return res.status(400).json({
        ok: false,
        mensaje: 'Los campos nombre y email son obligatorios'
      });
    }
 
    const [result] = await db.query(
      'UPDATE cliente SET nombre = ?, email = ?, telefono = ? WHERE id_cliente = ?',
      [nombre, email, telefono || null, id]
    );
 
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Entrenador no encontrado' });
    }
 
    res.status(200).json({ ok: true, mensaje: 'Entrenador actualizado correctamente' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        ok: false,
        mensaje: 'Ya existe otro entrenador con ese email'
      });
    }
    console.error('Error al actualizar cliente:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};
 
/**
 * DELETE /api/clientes/:id
 * Elimina a un entrenador del registro.
 */
const eliminar = async (req, res) => {
  try {
    const { id } = req.params;
 
    if (isNaN(id)) {
      return res.status(400).json({ ok: false, mensaje: 'El ID debe ser numérico' });
    }
 
    const [result] = await db.query(
      'DELETE FROM cliente WHERE id_cliente = ?',
      [id]
    );
 
    if (result.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Entrenador no encontrado' });
    }
 
    res.status(200).json({ ok: true, mensaje: 'Entrenador eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar cliente:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};
 
module.exports = {
  obtenerTodos, obtenerPorId, crear, actualizar, eliminar
};
