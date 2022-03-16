import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201);
});

it('return a 400 with an invalid email', async () =>{
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: 'password'
    })
    .expect(400);
})


it('return a 400 with an invalid password', async () =>{
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'testtest.com',
      password: '1'
    })
    .expect(400);
})

it('return a 400 with missing email password', async () =>{
  await request(app)
    .post('/api/users/signup')
    .send({ email: "sadsa@gmc.com"
    })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({
    })
    .expect(400);
})

it('duplicate email', async () => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email:'test@test.com',
    password:'asdsad'
  })
  .expect(201);
  return request(app)
  .post('/api/users/signup')
  .send({
    email:'test@test.com',
    password:'asdsad'
  })
  .expect(400);
  
})

it('set a cookie after signup',async () => {
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email:'tzest@test.com',
    password:'asdsad'
  })
  .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
  
})