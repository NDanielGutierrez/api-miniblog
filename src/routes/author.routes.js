const express = require('express');
const router = express.Router();
const authors = require('../services/authors.service');

// GET /api/authors
router.get('/', (req, res) => {
  const result = authors.getAll();
  res.json(result);
});

// GET /api/authors/:id
router.get('/:id', (req, res) => {
  const author = authors.getById(req.params.id);
  if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(author);
});

// POST /api/authors
router.post('/', (req, res) => {
  const newAuthor = authors.create(req.body);
  res.status(201).json(newAuthor);
});

// PUT /api/authors/:id
router.put('/:id', (req, res) => {
  const updated = authors.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Autor no encontrado' });
  res.json(updated);
});

// DELETE /api/authors/:id
router.delete('/:id', (req, res) => {
  const deleted = authors.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Autor no encontrado' });
  res.status(204).send();
});

module.exports = router;