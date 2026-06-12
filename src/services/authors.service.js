let authors = [
  { id: 1, name: 'Ana García', email: 'ana@example.com', bio: 'Desarrolladora full-stack apasionada por Node.js' },
  { id: 2, name: 'Carlos Ruiz', email: 'carlos@example.com', bio: 'Escritor técnico especializado en bases de datos' },
  { id: 3, name: 'María López', email: 'maria@example.com', bio: 'Ingeniera de software con foco en APIs REST' }
];

const getAll = () => authors;

const getById = (id) => authors.find(a => a.id === parseInt(id));

const create = (body) => {
  const newAuthor = { id: authors.length + 1, ...body };
  authors.push(newAuthor);
  return newAuthor;
};

const update = (id, body) => {
  const index = authors.findIndex(a => a.id === parseInt(id));
  if (index === -1) return null;
  authors[index] = { ...authors[index], ...body };
  return authors[index];
};

const remove = (id) => {
  const index = authors.findIndex(a => a.id === parseInt(id));
  if (index === -1) return null;
  return authors.splice(index, 1)[0];
};

module.exports = { getAll, getById, create, update, remove };