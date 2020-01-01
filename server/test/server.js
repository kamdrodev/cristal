import supertest from 'supertest';
import mocha from 'mocha';

import app from '../src/server.js';
import config from './config.js';

// test route '/'
describe('test /', () => {
  it('it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done();
        }
      });
  });
});
