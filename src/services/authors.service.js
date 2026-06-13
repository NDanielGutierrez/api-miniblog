const pool = require('../db');

const getAll = async () => {
  const result = await pool.query('SELECT * FROM authors ORDER BY id');
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM authors WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async (body) => {
  const { name, email, bio } = body;
  const result = await pool.query(
    'INSERT INTO authors (name, email, bio) VALUES ($1, $2, $3) RETURNING *',
    [name, email, bio]
  );
  return result.rows[0];
};

const update = async (id, body) => {
  const { name, email, bio } = body;
  const result = await pool.query(
    'UPDATE authors SET name = $1, email = $2, bio = $3 WHERE id = $4 RETURNING *',
    [name, email, bio, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  const result = await pool.query(
    'DELETE FROM authors WHERE id = $1 RETURNING *', [id]
  );
  return result.rows[0];
};

module.exports = { getAll, getById, create, update, remove };