import request from 'supertest';
import { app } from '../../app';

it('current user',async () => {
  const cookie = await global.signin();
    const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .set('Cookie', cookie)
      .expect(200);
    expect(response.body.currentUser.email).toEqual('test@test.com')
})

it('responds null with unauthenticated', async () => {
  const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200);
      expect(response.body.currentUser).toEqual(null);
})