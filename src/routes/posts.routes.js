const express = require('express');
const router = express.Router();
const posts = require('../services/posts.service');

// GET /api/posts
router.get('/', async (req, res, next) => {
  try {
    const result = await posts.getAll();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const post = await posts.getById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(post);
  } catch (error) {
    next(error);
  }
});

// POST /api/posts
router.post('/', async (req, res, next) => {
  try {
    const { title, content, author_id } = req.body;
    if (!title || !content || !author_id) {
      return res.status(400).json({ error: 'title, content y author_id son requeridos' });
    }
    const newPost = await posts.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
});
// PUT /api/posts/:id
router.put('/:id', async (req, res, next) => {
  try {
    const { title, content, published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ error: 'title y content son requeridos' });
    }
    const updated = await posts.update(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: 'Post no encontrado' });
    res.json(updated);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await posts.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Post no encontrado' });
    res.status(204).send();
  } catch (error) {
    next(error);
    }
});

module.exports = router;