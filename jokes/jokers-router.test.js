const server = require('../api/server');
const request = require('supertest');
const router = require('./jokes-router');

describe('server', () => {
    describe('get jokes', () => {
        it('should return 401 due to authentication', () => {
            return request(server).get('/api/jokes')
            .then(res => {
                expect(res.status).toBe(401)
            })
        });

        it('should be type of JSON', () => {
            return request(server).get('/api/jokes')
                .expect('Content-Type', /json/)
        })
    })
})