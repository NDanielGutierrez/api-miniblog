const express = require('express');
const router = express.Router();
const posts = require('../services/posts.service');

// GET /api/posts
router.get('/', (req, res) => {
  const result = posts.getAll();
  res.json(result);
});

// GET /api/posts/:id
router.get('/:id', (req, res) => {
  const post = posts.getById(req.params.id);
  if (!post) return res.status(404).json({ error: 'Post no encontrado' });
  res.json(post);
});

// POST /api/posts
router.post('/', (req, res) => {
  const newPost = posts.create(req.body);
  res.status(201).json(newPost);
});

// PUT /api/posts/:id
router.put('/:id', (req, res) => {
  const updated = posts.update(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Post no encontrado' });
  res.json(updated);
});

// DELETE /api/posts/:id
router.delete('/:id', (req, res) => {
  const deleted = posts.remove(req.params.id);
  if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
  res.status(204).send();
});

module.exports = router;