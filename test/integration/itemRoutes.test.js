const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../../server");

chai.use(chaiHttp);
const { expect } = chai;

//
// TO DO:
// Look into https://stackoverflow.com/questions/57176000/sinon-js-stub-http-request / https://www.npmjs.com/package/proxyquire
// for mocking http requests
//

describe("routes/itemRoutes", function () {
  describe("GET /items", function () {
    it("should return all items", function () {
      chai
        .request(app)
        .get("/items")
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("success");
          expect(resp.body.data).to.be.an("array");
          if (resp.body.data.length > 0) {
            resp.body.data.forEach((item) => {
              expect(item).to.have.property("id").that.is.a("number");
              expect(item).to.have.property("name").that.is.a("string");
              expect(item).to.have.property("brand").that.is.a("string");
            });
          }
        });
    });
  });

  describe("GET /items/:id", function () {
    it("should return the item", function () {
      const itemId = "3";
      chai
        .request(app)
        .get(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("success");
          expect(resp.body.data).to.be.an("object");
          expect(resp.body.data)
            .to.have.property("id")
            .that.equals(parseInt(itemId, 10));
          expect(resp.body.data).to.have.property("name");
          expect(resp.body.data).to.have.property("brand");
        });
    });
    it("should return an error status if no item exists with ID", function () {
      const itemId = "2";
      chai
        .request(app)
        .get(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("error");
          expect(resp.body).to.not.have.property("data");
        });
    });
    it("should return an error status if ID is not a number", function () {
      const itemId = "a";
      chai
        .request(app)
        .get(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("error");
          expect(resp.body).to.not.have.property("data");
        });
    });
  });

  // describe("POST /items", function () {
  //   it("should return the new item with it's ID", function () {
  //     const newItem = {
  //       name: "test name 123",
  //       brand: "test brand",
  //     };
  //     chai
  //       .request(app)
  //       .post("/items")
  //       .send(newItem)
  //       .end((err, resp) => {
  //         expect(err).to.be.null;
  //         expect(resp).to.have.status(200);
  //         expect(resp.body.data).to.include(newItem);
  //         expect(resp.body.data).to.have.property("id");
  //       });
  //   });
  //   it("should return an error if no name is provided", function () {
  //     const newItem = {
  //       brand: "test brand",
  //     };
  //     chai
  //       .request(app)
  //       .post("/items")
  //       .send(newItem)
  //       .end((err, resp) => {
  //         expect(err).to.be.null;
  //         expect(resp).to.have.status(422);
  //         expect(resp.body.status).to.eql("error");
  //       });
  //   });
  // });

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
