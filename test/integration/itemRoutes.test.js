const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require("sinon");
const app = require("../../src/server");
const itemsData = require("../../src/data/itemsData");

chai.use(chaiHttp);
const { expect } = chai;

describe("routes/itemRoutes", function () {
  describe("GET /items", function () {
    let selectItemRecordsStub;
    beforeEach(function () {
      selectItemRecordsStub = sinon.stub(itemsData, "selectItemRecords");
    });
    afterEach(function () {
      selectItemRecordsStub.restore();
    });
    it("should return all items", function (done) {
      const items = [
        { id: 1, name: "test name", brand: "test brand" },
        { id: 2, name: "test name 2", brand: "test brand 2" },
      ];
      selectItemRecordsStub.resolves(items);
      chai
        .request(app)
        .get("/items")
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("success");
          expect(resp.body.data).to.eql(items);
          done();
        });
    });
  });

  describe("POST /items", function () {
    let insertItemRecordStub;
    beforeEach(function () {
      insertItemRecordStub = sinon.stub(itemsData, "insertItemRecord");
    });
    afterEach(function () {
      insertItemRecordStub.restore();
    });
    it("should return the new item including ID", function (done) {
      const newItem = {
        name: "new item name",
        brand: "new item brand",
      };
      insertItemRecordStub.resolves({ ...newItem, id: 1 });
      chai
        .request(app)
        .post("/items")
        .send(newItem)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("success");
          expect(resp.body.data).to.include(newItem);
          expect(resp.body.data).to.have.property("id");
          done();
        });
    });
    it("should return an error if no name is provided", function (done) {
      const newItem = {
        brand: "new item brand",
      };
      chai
        .request(app)
        .post("/items")
        .send(newItem)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(422);
          expect(resp.body.status).to.equal("error");
          done();
        });
    });
  });

  describe("PUT /items", function () {
    let updateItemRecordStub;
    beforeEach(function () {
      updateItemRecordStub = sinon.stub(itemsData, "updateItemRecord");
    });
    afterEach(function () {
      updateItemRecordStub.restore();
    });
    it("should return the updated item", function (done) {
      const modifiedItem = {
        id: 1,
        name: "modified name",
        brand: "modified brand",
      };
      updateItemRecordStub.resolves(modifiedItem);
      chai
        .request(app)
        .put("/items")
        .send(modifiedItem)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("success");
          expect(resp.body.data).to.eql(modifiedItem);
          done();
        });
    });
    it("should return an error if no item with ID exists", function (done) {
      const modifiedItem = {
        id: 1,
        name: "modified name",
        brand: "modified brand",
      };
      updateItemRecordStub.resolves(null);
      chai
        .request(app)
        .put("/items")
        .send(modifiedItem)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(404);
          expect(resp.body.status).to.equal("error");
          expect(resp.body).to.not.have.property("data");
          done();
        });
    });
    it("should return an error if no name is provided", function (done) {
      const modifiedItem = {
        id: 1,
        brand: "modified brand",
      };
      chai
        .request(app)
        .put("/items")
        .send(modifiedItem)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(422);
          expect(resp.body.status).to.equal("error");
          done();
        });
    });
  });

  describe("GET /items/:id", function () {
    let selectItemRecordsStub;
    beforeEach(function () {
      selectItemRecordsStub = sinon.stub(itemsData, "selectItemRecords");
    });
    afterEach(function () {
      selectItemRecordsStub.restore();
    });
    // afterEach(function () {});
    it("should return the item", function (done) {
      const itemId = "3";
      const items = [{ id: 3, name: "test name", brand: "test brand" }];
      selectItemRecordsStub.resolves(items);
      chai
        .request(app)
        .get(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("success");
          expect(resp.body.data).to.eql(items[0]);
          done();
        });
    });
    it("should return an error status if no item exists with ID", function (done) {
      const itemId = "3";
      selectItemRecordsStub.resolves([]);
      chai
        .request(app)
        .get(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(404);
          expect(resp.body.status).to.equal("error");
          expect(resp.body).to.not.have.property("data");
          done();
        });
    });
    it("should return an error status if ID is not a number", function (done) {
      const itemId = "string";
      chai
        .request(app)
        .get(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(422);
          expect(resp.body.status).to.equal("error");
          expect(resp.body).to.not.have.property("data");
          done();
        });
    });
  });

  describe("DELETE /items/:id", function () {
    let deleteItemRecordsStub;
    beforeEach(function () {
      deleteItemRecordsStub = sinon.stub(itemsData, "deleteItemRecords");
    });
    afterEach(function () {
      deleteItemRecordsStub.restore();
    });
    it("should return the deleted item's ID", function (done) {
      const itemId = "3";
      const itemIdAsNumber = parseInt(itemId, 10);
      deleteItemRecordsStub.resolves(itemIdAsNumber);
      chai
        .request(app)
        .delete(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(200);
          expect(resp.body.status).to.equal("success");
          expect(resp.body.data).to.eql(itemIdAsNumber);
          done();
        });
    });
    it("should return an error if no item with ID exists", function (done) {
      const itemId = "1";
      deleteItemRecordsStub.resolves(0);
      chai
        .request(app)
        .delete(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(404);
          expect(resp.body.status).to.equal("error");
          expect(resp.body).to.not.have.property("data");
          done();
        });
    });
    it("should return an error if ID is not a number", function (done) {
      const itemId = "string";
      chai
        .request(app)
        .delete(`/items/${itemId}`)
        .end((err, resp) => {
          expect(err).to.be.null;
          expect(resp).to.have.status(422);
          expect(resp.body.status).to.equal("error");
          expect(resp.body).to.not.have.property("data");
          done();
        });
    });
  });
});
