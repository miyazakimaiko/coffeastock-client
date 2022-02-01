require("dotenv").config();
let chai = require("chai");
chaiHttp = require("chai-http")
let app = require("../app")

chai.should();
chai.use(chaiHttp);

describe('Custom Ranges API', () => {
  const endpoint = process.env.API_ENDPOINT;
  const existingUserId = 'fe045d0e-77ac-43fb-8850-9eb4f310e316'
  const wrongUserId = 'aaaaaaaaaaaaaaaaaaaaaaa';
  const existingRangeId = 1;
  const wrongRangeId = 30;
  /*
  * Test the GET ALL route
  */
  describe(`GET ${endpoint}/user/:userid/beans`, () => {
    it("should GET the beans with correct user ID", (done) => {
      chai.request(app)
        .get(`${endpoint}/user/${existingUserId}/beans`)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          done();
        })
    })
  })
})