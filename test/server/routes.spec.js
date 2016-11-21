const request = require('supertest');
const app = require('../../config/app');

describe('Index route', () => {
  it('loads successfully', (done) => {
    request(app).get('/').expect(200, done);
  });

  it('/users loads successfully', (done) => {
    request(app).get('/users').expect(200, done);
  });
});
