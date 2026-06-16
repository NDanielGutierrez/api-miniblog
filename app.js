require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'MiniBlog API corriendo' });
});

const authorsRoutes = require('./src/routes/author.routes');
app.use('/api/authors', authorsRoutes);

const postsRoutes = require('./src/routes/posts.routes');
app.use('/api/posts', postsRoutes);

const errorHandler = require('./src/midleware/errorHandler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});


module.exports = app;