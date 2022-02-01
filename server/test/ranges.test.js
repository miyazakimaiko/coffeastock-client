require("dotenv").config();
let chai = require("chai");
chaiHttp = require("chai-http")
let app = require("../app")

chai.should();
chai.use(chaiHttp);

describe('Custom Ranges API', () => {
  const endpoint = process.env.API_ENDPOINT;
  const existingUserId = '88b6bbc1-bfa4-462c-8691-73c021eeb5f3'
  const wrongUserId = 'aaaaaaaaaaaaaaaaaaaaaaa';
  const existingRangeId = 1;
  const wrongRangeId = 30;
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

  describe(`GET ${endpoint}/user/:userid/range/:rangename/:id`, () => {
    it("should FIND an entry of the each range of a user", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/origin/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
        response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/farm/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/variety/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/process/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/roaster/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/aroma/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/grinder/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/method/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/water/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/range/palate/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(true);
          done();
        })
    });

    it("should NOT FIND entry of a range with wrong entry ID", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/origin/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/farm/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/variety/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/process/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/roaster/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/aroma/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/grinder/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/method/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/water/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
        })
      chai.request(app)
        .get(`${endpoint}/user/${existingRangeId}/range/palate/${wrongRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);
          done();
        })
    });

    it("should NOT FIND entry of a range with wrong user ID", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/origin/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/farm/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/variety/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/process/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/roaster/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/aroma/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/grinder/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/method/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/water/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);        })
      chai.request(app)
        .get(`${endpoint}/user/${wrongUserId}/range/palate/${existingRangeId}`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('boolean');
          response.body.should.be.a('boolean').eq(false);          done();
        })
    });
  });
})