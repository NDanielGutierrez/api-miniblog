const request = require('supertest');
const app = require('../app');
const pool = require('../src/db');

describe('Posts API', () => {

    test('GET /api/posts - devuelve lista de posts', async () => {
        const res = await request(app).get('/api/posts');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('POST /api/posts - crea un post', async () => {
        const res = await request(app)
            .post('/api/posts')
            .send({ title: 'Test Post', content: 'Contenido de prueba', author_id: 1, published: false });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
    });

    test('GET /api/posts/:id - devuelve 404 si no existe', async () => {
        const res = await request(app).get('/api/posts/9999');
        expect(res.statusCode).toBe(404);
    });
afterAll(async () => {
await pool.end();
});
});