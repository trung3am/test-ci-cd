import request from 'supertest';
import { app } from '../../app';

it('email does not existed', async () => {
  await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'password'
  })
  .expect(400);
})

it('no password supplied', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'asd123'
  })
  .expect(201);

  return request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'azsd123'
  })
  .expect(400);
})
it('valid signin', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'test@test.com',
    password: 'asd123'
  })
  .expect(201);

  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email: 'test@test.com',
    password: 'asd123'
  })
  .expect(201);
  
  expect(response.get('Set-Cookie')).toBeDefined();
  // return console.log(response.get('Set-Cookie'));
})

