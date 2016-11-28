const app = require('../../config/app');
const request = require('supertest')(app);

describe('Index route', () => {
  it('loads successfully', (done) => {
    request.get('/').expect(200, done);
  });

  it('/users loads successfully', (done) => {
    request.get('/users').expect(200, done);
  });
});
