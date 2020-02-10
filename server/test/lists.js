import mocha from 'mocha';
import supertest from 'supertest';


import mongoose from 'mongoose';
import app from '../src/server.js';
import config from './config.js';


describe('lists', () => {
  let token = '';
  let list;

  before(() => {
    mongoose.connection.dropDatabase(() => {

    });
  });

  before((done) => {
    supertest(app)
      .post(`${config.prefix}/auth/sign-up`)
      .send({username: config.account.username, email: config.account.email, password: config.account.password}) 
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  });

  before((done) => {
    supertest(app)
      .post(`${config.prefix}/auth/sign-in`)
      .send({email: config.account.email, password: config.account.password}) 
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          console.log('Everything is ok');
          console.log(res.body);
          console.log('!!!!', token);
          token = res.body.token;
          done()
        }
      });
  });

  it('with jwt - it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.log('%#$#$#', token);
          done(err);
        } else {
          console.log('%#$#$#', token);
          done()
        }
      });
  }).timeout(10000);

  it('without jwt - it should have status 401', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists`)
      .expect(401)
      .end((err, res) => {
        if (err) {
          console.log('%#$#$#', token);
          done(err);
        } else {
          console.log('%#$#$#', token);
          done()
        }
      });
  }).timeout(10000);
});
