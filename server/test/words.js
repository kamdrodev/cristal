import mocha from 'mocha';
import supertest from 'supertest';

import app from '../src/server.js';
import config from './config.js';

describe('crud words', () => {

  let token;
  let lists;
  let words;

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

  it('create list - without token - it should have status 200', (done) => {
    supertest(app)
      .post(`${config.prefix}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'french vocabulary list',
        firstLanguage: 'polish',
        secondLanguage: 'french',
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

  it('get all list - with jwt - it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          lists = res.body.lists[0];
          done();
        }
      });
    }).timeout(10000);

  it('create words - with token - it should have status 200', (done) => {
    supertest(app)
      .post(`${config.prefix}/words`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstLanguage: 'Dzień dobry',
        secondLanguage: 'bonjour',
        listId: lists._id,
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

  it('create words - without token - it should have status 401', (done) => {
    supertest(app)
      .post(`${config.prefix}/words`)
      .send({
        firstLanguage: 'Dzień dobry',
        secondLanguage: 'bonjour',
        listId: lists._id,
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

  it('get all list words - with jwt - it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists/${lists._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          words = res.body.words[0];
          done();
        }
      });
    }).timeout(10000);

  it('get all list words - without jwt - it should have status 401', (done) => {
    supertest(app)
      .get(`${config.prefix}/lists/${lists._id}`)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
    }).timeout(10000);

  it('get words - with jwt - it should have status 200', (done) => {
    supertest(app)
      .get(`${config.prefix}/words/${words._id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {

          console.log(res.body)
          done();
        }
      });
    }).timeout(10000);


  it('get words  - without jwt - it should have status 401', (done) => {
    supertest(app)
      .get(`${config.prefix}/words/${words._id}`)
      .expect(401)
      .end((err, res) => {
        if (err) {
          return done(err);
        } else {
          done();
        }
      });
      }).timeout(10000);

  it('update words - with jwt - it should have status 200', (done) => {
    supertest(app)
      .put(`${config.prefix}/words/${words._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        firstLanguage: 'Do widzenia',
        secondLanguage: 'Au revoir',
        listId: words.listId,
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

  it('update words - without jwt - it should have status 401', (done) => {
    supertest(app)
      .put(`${config.prefix}/words/${words._id}`)
      .send({
        firstLanguage: 'Do widzenia',
        secondLanguage: 'Au revoir',
        listId: words.listId,
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
  
  it('delete words - with jwt - it should have status 200', (done) => {
    supertest(app)
      .delete(`${config.prefix}/words/${words._id}`)
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

  it('delete words - without jwt - it should have status 401', (done) => {
    supertest(app)
      .delete(`${config.prefix}/words/${words._id}`)
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

