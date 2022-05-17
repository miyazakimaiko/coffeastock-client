require("dotenv").config();
let chai = require("chai");
chaiHttp = require("chai-http")
let app = require("../app")

chai.should();
chai.use(chaiHttp);

describe('Beans API', () => {
  const endpoint = process.env.API_ENDPOINT;
  const existingUserId = 'dbc49e6c-d79e-4741-9fc4-90a26f8924f7'
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
          response.body.should.be.a('array');
          done();
        })
    })
  });

  describe(`POST ${endpoint}/user/:userid/bean`, () => {
    it("should return error if Name input is empty", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "",
          "single_origin": true,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Name');
          done();
        })
    });
    it("should return error if Name input is longer than 60 characters", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aen",
          "single_origin": true,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Name');
          done();
        })
    });
    it("should return error if Single Origin is not boolean", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": "test",
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Single Origin');
          done();
        })
    });

    it("should return error if blend ratio is not JSON object", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "blend_ratio": 10,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Blend Ratio');
          done();
        })
    });

    it("should return error if origin is not an array", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": 1, 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Origin');
          done();
        })
    });

    it("should return error if farm is not an array", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [3, 3], 
          "farm": 1, 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Farm');
          done();
        })
    });

    it("should return error if variety is not an array", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [3, 3], 
          "farm": [1, 3], 
          "variety": 1, 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Variety');
          done();
        })
    });

    it("should return error if process is not an array", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [3, 3], 
          "farm": [1, 3], 
          "variety": [1, 3], 
          "process": 1, 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Process');
          done();
        })
    });

    it("should return error if roaster is not an array", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [3, 3], 
          "farm": [1, 3], 
          "variety": [1, 3], 
          "process": [1, 3], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": "test",
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Roaster');
          done();
        })
    });

    it("should return error if aroma is not an array", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [3, 3], 
          "farm": [1, 3], 
          "variety": [1, 3], 
          "process": [1, 3], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 3, 5],
          "roast_level": 8.5,
          "roast_date": "2021-10-12",
          "aroma": "[1, 3, 5]",
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Aroma');
          done();
        })
    });

    it("should return error if roast level is not 0 - 10", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 12,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Roast Level');
          done();
        })
    });
    it("should return error if roast level is not 0 - 10", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 82.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": ["test"],
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Roast Level');
          done();
        })
    });
    it("should return error if grade is not 0 - 100", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 102.5,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 10,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Grade');
          done();
        })
    });
    it("should return error if grade is not 0 - 100", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": "test",
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 9.5,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Testing..."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Grade');
          done();
        })
    });
    it("should return error if memo is too long", (done) => {
      chai.request(app)
        .post(`${endpoint}/user/${existingUserId}/bean`)
        .send({
          "label": "Test",
          "single_origin": true,
          "origin": [1, 2], 
          "farm": [3, 3], 
          "variety": [1, 3], 
          "process": [1, 2], 
          "altitude": "2000 MASL",
          "grade": 100,
          "harvest_period": "Oct 2020",
          "roaster": [1, 2],
          "roast_level": 10,
          "roast_date": "2021-10-12",
          "aroma": [1, 3, 5],
          "memo": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui."
        })
        .end((err, response) => {
          response.should.have.status(422);
          response.body.error.should.have.property('message', 'Invalid Memo');
          done();
        })
    });
  })
})