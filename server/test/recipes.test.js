require("dotenv").config();
let chai = require("chai");
chaiHttp = require("chai-http")
let app = require("../app")

chai.should();
chai.use(chaiHttp);

describe('Recipes API', () => {
  const endpoint = process.env.API_ENDPOINT;
  const existingUserId = 'd14607a6-aabd-4f06-9956-83b4fc229053';
  const existingCoffeeBeanId = '8cdf2273-b8e9-40d8-8a98-64bd0ac7196e';
  const wrongCoffeeBeanId = 'testtesttesttesttest';

  describe(`GET ${endpoint}/user/:userid/bean/:productid/recipes`, () => {
    it("should GET the recipes with correct bean_id", (done) => {
      chai.request(app)
      .get(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipes`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('array');
        done();
      })
    })
    it("should NOT GET the recipes with wrong bean_id", (done) => {
      chai.request(app)
      .get(`${endpoint}/user/${existingUserId}/bean/${wrongCoffeeBeanId}/recipes`)
      .end((err, response) => {
        response.should.have.status(500);
        done();
      })
    })
  })

  describe(`POST ${endpoint}/user/:user_id/bean/:bean_id/recipe`, () => {
    it("should return success if all fields are valid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-01",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18.5",
        "water_weight": "200",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "23:59:59",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(200);
        done();
      })
    });

    it("should return error if bean_id is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${wrongCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-01",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18.5",
        "water_weight": "200",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(500);
        done();
      })
    });

    it("should return error if brew_date is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "test",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18.5",
        "water_weight": "200",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Brew Date');
        done();
      })
    });

    it("should return error if grind_size is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "test",
        "grounds_weight": "18.5",
        "water_weight": "200",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Grind Size');
        done();
      })
    });

    it("should return error if grind_size is negative number", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "-1",
        "grounds_weight": "18.5",
        "water_weight": "200",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Grind Size');
        done();
      })
    });

    it("should return error if grounds_weight is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "test",
        "water_weight": "200",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Grounds Weight');
        done();
      })
    });

    it("should return error if grounds_weight is negative number", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "-10",
        "water_weight": "200",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Grounds Weight');
        done();
      })
    });

    it("should return error if water_weight is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "test",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Water Weight');
        done();
      })
    });

    it("should return error if water_weight is negative number", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "-1.1",
        "water": "2",
        "water_temp": "91",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Water Weight');
        done();
      })
    });

    it("should return error if water_temp is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "test",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Water Temperature');
        done();
      })
    });

    it("should return error if water_temp is negative number", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "-1",
        "yield_weight": "180",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Water Temperature');
        done();
      })
    });

    it("should return error if yield_weight is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "test",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Yield Weight');
        done();
      })
    });

    it("should return error if yield_weight is negative number", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "-10",
        "extraction_time": "00:03:58",
        "tds": "9.1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Yield Weight');
        done();
      })
    });

    it("should return error if tds is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "test",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid TDS');
        done();
      })
    });

    it("should return error if tds is negative number", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "-1",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid TDS');
        done();
      })
    });

    it("should return error if extraction_time is invalid", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "24:00:00",
        "tds": "9",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Extraction Time');
        done();
      })
    });

    it("should return error if palate is not an object", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "9",
        "palate_rates": [{
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        }],
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Palate Rates');
        done();
      })
    });

    it("should return error if method is empty", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": null,
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "9",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Method');
        done();
      })
    });

    it("should return error if method is not an integer", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "test",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "9",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Method');
        done();
      })
    });

    it("should return error if grinder is not an integer", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "test",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "9",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Grinder');
        done();
      })
    });

    it("should return error if water is not an integer", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "2",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "test",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "9",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Water');
        done();
      })
    });

    it("should return error if palate is longer than 400 characters", (done) => {
      chai.request(app)
      .post(`${endpoint}/user/${existingUserId}/bean/${existingCoffeeBeanId}/recipe`)
      .send({
        "brew_date": "2021-12-12",
        "method": "1",
        "grinder": "1",
        "grind_size": "10",
        "grounds_weight": "18",
        "water_weight": "200.2",
        "water": "2",
        "water_temp": "90",
        "yield_weight": "180.1",
        "extraction_time": "00:03:58",
        "tds": "9",
        "palate_rates": {
          "1": "5.5",
          "2": "6",
          "3": "4.0",
          "4": "8",
          "5": "9"
        },
        "memo": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,"
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.have.property('message', 'Invalid Memo');
        done();
      })
    });
  })
})