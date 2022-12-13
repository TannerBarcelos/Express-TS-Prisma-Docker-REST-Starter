import request from 'supertest';
import { createServer } from '../../src/config/createServer';

const app = createServer();

describe('GET /api/posts/all', () => {
  it('Responds with an array of posts', async () => {
    const res = await request(app)
      .get('/api/posts/all')
      .set('Accept', 'application/json')
      .expect('content-type', /json/)
      .expect(200);
    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('length');
    for (let i = 0; i < res.body.data.length; i++) {
      expect(res.body.data[i]).toHaveProperty('content');
      expect(res.body.data[i]).toHaveProperty('authorId');
    }
  });
});
