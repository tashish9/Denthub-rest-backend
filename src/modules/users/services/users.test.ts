import request from 'supertest';
import { app } from '../../../app';

describe('Testing User routers', () => {
  test('/signin', async () =>   {
    const response = await request(app).post('/signin');
    expect(response.statusCode).toBe(200);
  });
});
// happy path and error path 
