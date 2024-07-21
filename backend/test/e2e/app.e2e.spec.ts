import { Server } from 'http';
import request from 'supertest';

import app from '@/app';

describe('App E2E', () => {
  let server: Server;

  beforeAll((done) => {
    server = app.listen(3003, () => {
      done();
    });
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return 200 OK', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Hello World');
  });
});
