require("babel-register");
require("babel-polyfill");

const { join } = require("path");

require("dotenv").config({
  path: join(process.cwd(), ".env")
});
process.env.NODE_ENV = 'test';
require('../../server')
console.log(process.env.DATABASE_NAME_TEST, 'ds5ds5d45')
let typeModel = require("../components/pricing/type/models/type.model");
let { typeFaker } = require("./fakers/pricing-types")
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = 'http://localhost:3001/v1/';
let should = chai.should();
const { expect } = chai;

chai.use(chaiHttp);

describe("Pricing Types", () => {

  let data = [];

  beforeEach(async function () {
    data = await typeModel.query().insert(typeFaker.type);
  });

  describe("/GET Pricing Types List", () => {
    it("it should GET all pricing types.", done => {
      chai
        .request(server)
        .get("pricing/type")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Listed Successfully!");
          res.body.should.have.property("data").be.a("array");
          done();
        });
    });
  });

  describe("/GET Pricing Type Details", () => {
    it("it should GET pricing type detail by Id", done => {
      chai
        .request(server)
        .get("pricing/type/" + data.FORPP01_PRICING_TYPE_D)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Pricing Master Details.");
          res.body.should.have.property("data").be.a("array");
          done();
        });
    });
  });

  describe('/Post Pricing Type', () => {
    it('it should POST pricing type.', (done) => {
      chai.request(server)
        .post('/pricing/type')
        .send(typeFaker.payload)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Added Successfully!')
          res.body.should.have.property('data').be.a('object')
          done();
        });
    });
  });

  describe('/PUT Pricing Type', () => {
    it('it should UPDATE pricing type.', done => {
      chai
        .request(server)
        .put("pricing/type/" + data.FORPP01_PRICING_TYPE_D)
        .send(typeFaker.payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Updated Successfully!')
          done();
        });
    })
  })

  describe('/DELETE Pricing Type', () => {
    it('it should DELETE pricing type.', done => {
      chai
        .request(server)
        .delete("pricing/type/" + data.FORPP01_PRICING_TYPE_D)
        .end((err, res) => {
          res.should.have.status(204);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Deleted Successfully!')
          done();
        });
    })
  })


});
