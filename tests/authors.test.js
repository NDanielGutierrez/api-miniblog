const request = require('supertest');
const app = require('../app');
const pool = require('../src/db');

let createdAuthorId;

describe('Authors API', () => {

    afterEach(async () => {
    if (createdAuthorId) {
      await pool.query('DELETE FROM authors WHERE id = $1', [createdAuthorId]);
      createdAuthorId = null;
    }
  });

    test('GET /api/authors - devuelve lista de autores', async () => {
        const res = await request(app).get('/api/authors');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('GET /api/authors/:id - devuelve un autor', async () => {
        const res = await request(app).get('/api/authors/1');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('email');
    });

    test('POST /api/authors - crea un autor', async () => {
        const res = await request(app)
            .post('/api/authors')
            .send({ name: 'Test User', email: 'test@test.com', bio: 'Tester' });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        createdAuthorId = res.body.id;
    });

    test('GET /api/authors/:id - devuelve 404 si no existe', async () => {
        const res = await request(app).get('/api/authors/9999');
        expect(res.statusCode).toBe(404);
    });
afterAll(async () => {
await pool.end();
});
});