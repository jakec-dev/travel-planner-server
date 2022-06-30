const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp);
const { expect } = chai;

describe("Routes/itemRoutes", function () {
  describe("GET /items", function () {
    it("should return all items", function () {
      chai
        .request(app)
        .get("/items")
        .end((err, resp) => {
          expect(resp).to.have.status(200);
          expect(err).to.be.null;
          expect(resp.body.data).to.eql([
            { id: 1, name: "Backpack", brand: "Osprey" },
            { id: 2, name: "Shoes", brand: "Nike" },
            { id: 3, name: "Toothpaste", brand: "Colgate" },
          ]);
        });
    });
  });

  describe("POST /items", function () {
    it("should return the new item", function () {
      const newItem = {
        id: 5,
        name: "test name",
        brand: "test brand",
      };
      chai
        .request(app)
        .post("/items")
        .send(newItem)
        .end((err, resp) => {
          expect(resp).to.have.status(200);
          expect(err).to.be.null;
          expect(resp.body.data).to.eql(newItem);
        });
    });
    it("should return an error if no name is provided", function () {
      const newItem = {
        id: 5,
        brand: "test brand",
      };
      chai
        .request(app)
        .post("/items")
        .send(newItem)
        .end((err, resp) => {
          expect(resp).to.have.status(422);
          expect(err).to.be.null;
          expect(resp.body.status).to.eql("error");
        });
    });
  });

  describe("GET /items/:id", function () {
    it("should returns item if ID exists", function () {
      chai
        .request(app)
        .get("/items/2")
        .end((err, resp) => {
          expect(resp).to.have.status(200);
          expect(err).to.be.null;
          expect(resp.body.data).to.eql({
            id: 2,
            name: "Shoes",
            brand: "Nike",
          });
        });
    });
  });
});
