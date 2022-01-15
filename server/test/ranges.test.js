require("dotenv").config();
let chai = require("chai");
chaiHttp = require("chai-http")
let app = require("../app")

chai.should();
chai.use(chaiHttp);

describe('Custom Ranges API', () => {
  const endpoint = process.env.API_ENDPOINT;
  const existingUserId = 'fe045d0e-77ac-43fb-8850-9eb4f310e316'
  const wrongUserId = 'aaaaaaaaaaaaaaaaaaaaaaa'

  /*
  * Test the GET ALL route
  */
  describe(`GET ${endpoint}/user/:userid/ranges`, () => {
    it("should GET the ranges with correct user ID", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/ranges`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        })
    })

    it("should fail to GET the ranges with wrong user ID", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/ranges`)
        .end((err, response) => {
          response.should.have.status(404);
          done();
        })
    })
  })

  describe(`GET ${endpoint}/user/:userid/range/:rangename`, () => {
    it("should GET each range of a user", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/origin`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/farm`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/variety`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/process`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/roaster`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/aroma`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/grinder`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/method`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/water`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/palate`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        })
    })

    it("should fail to GET each range of a user with wrong user ID", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/origin`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/farm`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/variety`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/process`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/roaster`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/aroma`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/grinder`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/method`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/water`)
        .end((err, response) => {
          response.should.have.status(500);
        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/palate`)
        .end((err, response) => {
          response.should.have.status(500);
          done();
        })
    })
  });
})