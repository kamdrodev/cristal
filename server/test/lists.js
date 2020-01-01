import mocha from 'mocha';
import supertest from 'supertest';

import app from '../src/server.js';
import config from './config.js';

describe('get lists', () => {

  let token;

  before((done) => {
    supertest(app)
      .post(`${config.prefix}/auth/sign-in`)
      .send({
        email: 'morgana@morgana.com',
        password: 'morganapassword'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          token = res.body.token;
          done()
        }
      });
  });

  it('without jwt token - it should have status 401', (done) => {
      supertest(app)
        .get(`${config.prefix}/lists`)
        .expect(401)
        .end((err, res) => {
          if (err) {
            return done(err);
          } else {
            done();
          }
        });
  }).timeout(10000);

  it('with jwt - it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
  }).timeout(10000);
});


describe('crud - list', () => {
  
  let token;
  let list;

  before((done) => {
    supertest(app)
      .post(`${config.prefix}/auth/sign-in`)
      .send({
        email: 'morgana@morgana.com',
        password: 'morganapassword'
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          token = res.body.token;
          done()
        }
      });
    });


  // create list
  it('create list - with jwt - it should have status 200', (done) => {
    supertest(app)
      .post(`${config.prefix}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'nice list',
        firstLanguage: 'french',
        secondLanguage: 'japanese'
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);

  

  it('create list - without jwt - it should have status 401', (done) => {
    supertest(app)
      .post(`${config.prefix}/lists`)
      .send({
        title: 'awesome list',
        firstLanguage: 'french',
        secondLanguage: 'japanese'
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);


  // get all lists
  it('get all list - with jwt - it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          list = res.body.lists[0];
          done();
        }
      });
    }).timeout(10000);

  it('get all list - without jwt - it should have status 401', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists`)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
   }).timeout(10000);

  it('get list - with jwt - it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists/${list._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);

  it('get list - without jwt - it should have status 401', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists/${list._id}`)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);
  
  it('update list - with jwt - it should have status 200', (done) => {
    supertest(app)
      .put(`${config.prefix}/lists/${list._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: list.title,
      })
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);

  it('update list - without jwt - it should have status 401', (done) => {
    supertest(app)
      .put(`${config.prefix}/lists/${list._id}`)
      .send({
        title: 'new list',
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);

  it('delete list - with jwt - it should have status 200', (done) => {
    supertest(app)
      .delete(`${config.prefix}/lists/${list._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);

  it('delete list - without jwt - it should have status 401', (done) => {
    supertest(app)
      .delete(`${config.prefix}/lists/${list._id}`)
      .send({
        title: 'new list',
      })
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);

});
