const express = require('express');
const router = express.Router();
const authors = require('../services/authors.service');

// GET /api/authors
router.get('/', async (req, res, next) => {
    try {
        const result = await authors.getAll();
        res.json(result);
    } catch (error) {
        next(error);
    }
});

// GET /api/authors/:id
router.get('/:id', async (req, res, next) => {
    try {
        const author = await authors.getById(req.params.id);
        if (!author) return res.status(404).json({ error: 'Autor no encontrado' });
        res.json(author);
    } catch (error) {
        next(error);
    }
});

// POST /api/authors
router.post('/', async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'name y email son requeridos' });
        }
        const newAuthor = await authors.create(req.body);
        res.status(201).json(newAuthor);
    } catch (error) {
        next(error);
    }
});
// PUT /api/authors/:id
router.put('/:id', async (req, res, next) => {
    try {
        const { name, email, bio } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'name y email son requeridos' });
        }
        const updated = await authors.update(req.params.id, req.body);
        if (!updated) return res.status(404).json({ error: 'Author no encontrado' });
        res.json(updated);
    } catch (error) {
        next(error);

    }
});

// DELETE /api/authors/:id
router.delete('/:id', async (req, res, next) => {
    try {
        const deleted = await authors.remove(req.params.id);
        if (!deleted) return res.status(404).json({ error: 'Autor no encontrado' });
        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

module.exports = router;