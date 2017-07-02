const request = require('supertest');
const expect = require('chai').expect;

const app = require('..');
const jp = 'junkproject';

describe('Failstore server', () => {

  beforeEach(() => {
    //TODO: bounce the server
  });

  describe('POST a record', (done) => {
    it('POSTs a record', () => {
      request(app)
        .post(jp)
        .send({project: jp, failures: [{format: 'TBD'}]})
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) { done(err); }
          done();
        })
    });
  });

  describe('GET a record', (done) => {
    it('GETs a record', () => {
      request(app)
        .get(jp)
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) { done(err); }
          done();
        })
    });
  });

  describe('PUT a record', (done) => {
    it('PUTs a record', () => {
      request(app)
        .put(jp)
        .send({project: jp, updated: 'yup', failures: [{format: 'TBD'}]})
        .expect("Content-type", /json/)
        .expect(200)
        .end((err, res) => {
          if (err) { done(err); }
          done();
        })

      request(app)
        .get(jp)
        .expect(200)
        .end((err, res) => {
          if (err) { done(err); }
          done();
        })
    });
  });
});
