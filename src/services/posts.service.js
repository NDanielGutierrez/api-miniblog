const pool = require('../db');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM posts ORDER BY id');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (body) => {
  const { title, content, author_id, published } = body;
  const result = await pool.query(
    'INSERT INTO posts (title, content, author_id, published) VALUES ($1, $2, $3, $4) RETURNING *',
    [title, content, author_id, published]
  );
  return result.rows[0];
};

const update = async (id, body) => {
  const { title, content, published } = body;
  const result = await pool.query(
    'UPDATE posts SET title = $1, content = $2, published = $3 WHERE id = $4 RETURNING *',
    [title, content, published, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM posts WHERE id = $1 RETURNING *', [id]
  );
  return result.rows[0];
};

module.exports = { getAll, getById, create, update, remove };