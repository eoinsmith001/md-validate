var chai = require('chai');
var expect = chai.expect;
var request = require('supertest');

describe('Populate the db', function() {
  var url      = 'http://localhost:3000';
  var endpoint = '/api/user';
  it('can add a user', function(done) {
    var newUser = {
      id: 44, 
      name: 'Ada'
    };
    request(url)
    .post(endpoint)
    .send(newUser)
    .expect(201)
    .end(function(err, user) {
      expect(err).to.not.exist;
      done();
    });
  });
});
