const { expect } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../server");

chai.use(chaiHttp);

describe("Routes/itemRoutes", function () {
  describe("GET /items", function () {
    it("returns all items", function () {
      chai
        .request(app)
        .get("/items")
        .end((_err, resp) => {
          expect(resp.body.data).to.eql([
            { id: 1, name: "Backpack", brand: "Osprey" },
            { id: 2, name: "Shoes", brand: "Nike" },
            { id: 3, name: "Toothpaste", brand: "Colgate" },
          ]);
        });
    });
  });

  describe("GET /items/:id", function () {
    it("returns item if ID exists", function () {
      chai
        .request(app)
        .get("/items/2")
        .end((_err, resp) => {
          expect(resp.body.data).to.eql({
            id: 2,
            name: "Shoes",
            brand: "Nike",
          });
        });
    });
  });
});
