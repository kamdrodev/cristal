import supertest from 'supertest';
import mocha from 'mocha';
import mongoose from 'mongoose';

import app from '../src/server.js';
import config from './config.js';


// test route '/'
describe('sign-up', () => {
  before(() => {
    mongoose.connection.dropDatabase(() => {

    });
  });

  it('process sign-up - it should has status 200', (done) => {
    supertest(app)
      .post(`${config.prefix}/auth/sign-up`)
      .send({username: 'morgana', email: 'morgana@morgana.com', password: 'morganapassword'})
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done()
        }
      });
  }).timeout(10000);

  it('process sign-up - it should has status 403', (done) => {
    supertest(app)
      .post(`${config.prefix}/auth/sign-up`)
      .send({username: 'morgana', email: 'morgana@morgana.com', password: 'morganapassword'})
      .set('Accept', 'application/json')
      .expect(403)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done()
        }
      });
  }).timeout(10000);

  it('process sign in - it should has status 200', (done) => {
    supertest(app)
      .post(`${config.prefix}/auth/sign-in`) 
      .send({username: 'morgana', email: 'morgana@morgana.com', password: 'morganapassword'})
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          return done()
        }
      });
  }).timeout(10000);
  
});


  
