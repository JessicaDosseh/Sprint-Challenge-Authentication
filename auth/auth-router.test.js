const server = require('../api/server');
const request = require('supertest');
const router = require('./auth-router');

describe('server', () => {
  describe('register', () => {
      it('should return 500', () => {
          return request(server).post('/api/auth/register')
          .then(res => {
              expect(res.status).toBe(500)
          })
      });

      //  CHANGE USERNAME FOR A NEW TEST!
      it('should return 201', () => {
          return request(server).post('/api/auth/register')
          .send({username: 'testinguser', password: 'test'})
          .then(res => {
              expect(res.status).toBe(201)
          })
      });
  });

  describe('login', () => {
      it('should return 401', () => {
          return request(server).post('/api/auth/login')
          .send({username: 'bad', password: 'credentials'})
          .then(res => {
              expect(res.status).toBe(401)
          })
      });

      //  CHANGE USERNAME ACCORDING TO REGISTER!
      it('should return 200', () => {
          return request(server).post('/api/auth/login')
          .send({username: 'testinguser', password: 'test'})
          .then(res => {
              expect(res.status).toBe(200)
          })
      })
  })
});