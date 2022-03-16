import request from 'supertest';
import { app } from '../../app';

it('clear cookie sign out', async ()=> {
  
  // await request(app)
  //   .post('/api/users/signup')
  //   .send({
  //     email: 'test@test.com',
  //     password: 'password'
  //   })
  //   .expect(201)

  const response = request(app)
  .post('/api/users/signout')
  .send({})
  .expect(200);
  expect(response.get('Set-Cookie'));
  return console.log(response.get('Set-Cookie'));
})