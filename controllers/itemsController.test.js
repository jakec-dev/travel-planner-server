const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const itemsController = require("./itemsController");
const itemsService = require("../services/itemsService");

chai.use(sinonChai);
const { expect } = chai;

describe("controllers/itemsController.js", function () {
  let res;
  beforeEach(function () {
    res = {
      status(s) {
        this.statusCode = s;
        return this;
      },
      json: sinon.spy(),
    };
  });
  describe("get", function () {
    let getItemsStub;
    beforeEach(function () {
      getItemsStub = sinon.stub(itemsService, "getItems");
    });
    afterEach(function () {
      getItemsStub.restore();
    });
    it("should return all items and success status on success", async function () {
      const req = {};
      getItemsStub.returns({
        status: "success",
        data: [
          { id: 1, name: "test name 1", brand: "test brand 1" },
          { id: 2, name: "test name 2", brand: "test brand 2" },
        ],
      });
      await itemsController.get(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: [
          { id: 1, name: "test name 1", brand: "test brand 1" },
          { id: 2, name: "test name 2", brand: "test brand 2" },
        ],
      });
    });
    it("should return an error message and error status on error", async function () {
      const req = {};
      getItemsStub.returns({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
      await itemsController.get(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Test error message",
      });
    });
  });

  describe("post", function () {
    let createItemStub;
    beforeEach(function () {
      createItemStub = sinon.stub(itemsService, "createItem");
    });
    afterEach(function () {
      createItemStub.restore();
    });
    it("should return the created item and success status on success", async function () {
      const req = {
        body: {
          name: "test name",
          brand: "test brand",
        },
      };
      createItemStub.returns({
        status: "success",
        data: { id: 1, ...req.body },
      });
      await itemsController.post(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: { id: 1, ...req.body },
      });
    });
    it("should return an error message and error status on error", async function () {
      const req = {
        body: {
          name: "test name",
          brand: "test brand",
        },
      };
      createItemStub.returns({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
      await itemsController.post(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Test error message",
      });
    });
  });

  describe("put", function () {
    let updateItemStub;
    beforeEach(function () {
      updateItemStub = sinon.stub(itemsService, "updateItem");
    });
    afterEach(function () {
      updateItemStub.restore();
    });
    it("should return the modified item and success status on success", async function () {
      const req = {
        body: {
          id: 1,
          name: "test name",
          brand: "test brand",
        },
      };
      updateItemStub.returns({
        status: "success",
        data: req.body,
      });
      await itemsController.put(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: req.body,
      });
    });
    it("should return an error message and error status on error", async function () {
      const req = {
        body: {
          id: 1,
          name: "test name",
          brand: "test brand",
        },
      };
      updateItemStub.returns({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
      await itemsController.put(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Test error message",
      });
    });
  });

  describe("getWithId", function () {
    let getItemWithIdStub;
    beforeEach(function () {
      getItemWithIdStub = sinon.stub(itemsService, "getItemWithId");
    });
    afterEach(function () {
      getItemWithIdStub.restore();
    });
    it("should return the item and success status on success", async function () {
      const req = { params: { id: "1" } };
      getItemWithIdStub.returns({
        status: "success",
        data: { id: 1, name: "test name", brand: "test brand" },
      });
      await itemsController.getWithId(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: { id: 1, name: "test name", brand: "test brand" },
      });
    });
    it("should return an error message and error status on error", async function () {
      const req = { params: { id: "1" } };
      getItemWithIdStub.returns({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
      await itemsController.getWithId(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Test error message",
      });
    });
    it("should return an error message and error status if ID is not a number", async function () {
      const req = { params: { id: "a" } };
      await itemsController.getWithId(req, res);
      expect(res.statusCode).to.equal(422);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Item ID is not a number",
      });
    });
  });

  describe("deleteWithId", function () {
    let deleteItemWithIdStub;
    beforeEach(function () {
      deleteItemWithIdStub = sinon.stub(itemsService, "deleteItemWithId");
    });
    afterEach(function () {
      deleteItemWithIdStub.restore();
    });
    it("should return the deleted item's ID and success status on success", async function () {
      const req = { params: { id: "1" } };
      deleteItemWithIdStub.returns({
        status: "success",
        data: 1,
      });
      await itemsController.deleteWithId(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: 1,
      });
    });
    it("should return an error message and error status on error", async function () {
      const req = { params: { id: "1" } };
      deleteItemWithIdStub.returns({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
      await itemsController.deleteWithId(req, res);
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Test error message",
      });
    });
    it("should return an error message and error status if ID is not a number", async function () {
      const req = { params: { id: "a" } };
      await itemsController.deleteWithId(req, res);
      expect(res.statusCode).to.equal(422);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Item ID is not a number",
      });
    });
  });
});
