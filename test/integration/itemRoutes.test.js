const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server");

chai.use(chaiHttp);
const { expect } = chai;

describe("routes/itemRoutes", function () {
  // describe("GET /items", function () {
  //   it("should return all items", function () {
  //     chai
  //       .request(app)
  //       .get("/items")
  //       .end((err, resp) => {
  //         expect(resp).to.have.status(200);
  //         expect(err).to.be.null;
  //         expect(resp.body.data).to.eql([
  //           { id: 1, name: "Backpack", brand: "Osprey" },
  //           { id: 2, name: "Shoes", brand: "Nike" },
  //           { id: 3, name: "Toothpaste", brand: "Colgate" },
  //         ]);
  //       });
  //   });
  // });

  describe("POST /items", function () {
    it("should return the new item with it's ID", function () {
      const newItem = {
        name: "test name 123",
        brand: "test brand",
      };
      chai
        .request(app)
        .post("/items")
        .send(newItem)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.data).to.include(newItem);
          expect(resp.body.data).to.have.property("id");
        });
    });
    it("should return an error if no name is provided", function () {
      const newItem = {
        brand: "test brand",
      };
      chai
        .request(app)
        .post("/items")
        .send(newItem)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(422);
          expect(resp.body.status).to.eql("error");
        });
    });
  });

  // describe("PUT /items", function () {
  //   it("should update the item", function () {});
  //   it("should return the updated item", function () {});
  //   it("should return an error if no item with ID exists", function () {});
  //   it("should return an error if no name is provided", function () {});
  // });

  // describe("GET /items/:id", function () {
  //   it("should return the item", function () {
  //     chai
  //       .request(app)
  //       .get("/items/2")
  //       .end((err, resp) => {
  //         expect(resp).to.have.status(200);
  //         expect(err).to.be.null;
  //         expect(resp.body.data).to.eql({
  //           id: 2,
  //           name: "Shoes",
  //           brand: "Nike",
  //         });
  //       });
  //   });
  //   it("should return an error if no item with ID exists", function () {
  //     chai
  //       .request(app)
  //       .get("/items/55")
  //       .end((err, resp) => {
  //         expect(resp).to.have.status(422);
  //         expect(err).to.be.null;
  //         expect(resp.body.status).to.eql("error");
  //       });
  //   });
  //   it("should return an error if id is not a number", function () {});
  // });

  // describe("DELETE /items/:id", function () {
  //   it("should delete the item", function () {});
  //   it("should return the deleted item", function () {});
  //   it("should return an error if no item with ID exists", function () {});
  //   it("should return an error if ID is not a number", function () {});
  // });
});
