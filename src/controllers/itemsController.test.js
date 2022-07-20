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
      const items = [
        { id: 1, name: "test name 1", brand: "test brand 1" },
        { id: 2, name: "test name 2", brand: "test brand 2" },
      ];
      const req = {};
      getItemsStub.returns(items);
      await itemsController.get(req, res);
      expect(getItemsStub).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: items,
      });
    });
    it("should return an error message, 400 error code, and error status on error", async function () {
      const req = {};
      const errorMessage = "Test error message";
      getItemsStub.throws(new Error(errorMessage));
      await itemsController.get(req, res);
      expect(getItemsStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: errorMessage,
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
      createItemStub.returns({ id: 1, ...req.body });
      await itemsController.post(req, res);
      expect(createItemStub).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: { id: 1, ...req.body },
      });
    });
    it("should return an error message, 400 error code, and error status on error", async function () {
      const req = {
        body: {
          name: "test name",
          brand: "test brand",
        },
      };
      const errorMessage = "Test error message";
      createItemStub.throws(new Error(errorMessage));
      await itemsController.post(req, res);
      expect(createItemStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: errorMessage,
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
      updateItemStub.returns(req.body);
      await itemsController.put(req, res);
      expect(updateItemStub).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: req.body,
      });
    });
    it("should return an error message, 400 error code, and error status on error", async function () {
      const req = {
        body: {
          id: 1,
          name: "test name",
          brand: "test brand",
        },
      };
      const errorMessage = "Test error message";
      updateItemStub.throws(new Error(errorMessage));
      await itemsController.put(req, res);
      expect(updateItemStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: errorMessage,
      });
    });
    it("should return an error message, 404 error code, and error status if no items exist with provided ID", async function () {
      const req = {
        body: {
          id: 1,
          name: "test name",
          brand: "test brand",
        },
      };
      updateItemStub.returns(null);
      await itemsController.put(req, res);
      expect(updateItemStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: `No item with ID ${req.body.id} exists`,
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
      const item = { id: 1, name: "test name", brand: "test brand" };
      getItemWithIdStub.returns(item);
      await itemsController.getWithId(req, res);
      expect(getItemWithIdStub).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: item,
      });
    });
    it("should return an error message, 400 error code, and error status on error", async function () {
      const req = { params: { id: "1" } };
      const errorMessage = "Test error message";
      getItemWithIdStub.throws(new Error(errorMessage));
      await itemsController.getWithId(req, res);
      expect(getItemWithIdStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: errorMessage,
      });
    });
    it("should return an error message, 404 error code, and error status if no items exist with provided ID", async function () {
      const req = { params: { id: "3" } };
      getItemWithIdStub.returns(null);
      await itemsController.getWithId(req, res);
      expect(getItemWithIdStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "No item with ID 3 exists",
      });
    });
    it("should return an error message, 422 error code, and error status if ID is not a number", async function () {
      const req = { params: { id: "a" } };
      await itemsController.getWithId(req, res);
      expect(getItemWithIdStub).to.not.have.been.called;
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
      const req = { params: { id: "3" } };
      deleteItemWithIdStub.returns(1);
      await itemsController.deleteWithId(req, res);
      expect(deleteItemWithIdStub).to.have.been.calledOnce;
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: 3,
      });
    });
    it("should return an error message, 400 error code, and error status on error", async function () {
      const req = { params: { id: "1" } };
      const errorMessage = "Test error message";
      deleteItemWithIdStub.throws(new Error(errorMessage));
      await itemsController.deleteWithId(req, res);
      expect(deleteItemWithIdStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(400);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: errorMessage,
      });
    });
    it("should return an error message, 404 error code, and error status if no items exist with provided ID", async function () {
      const req = { params: { id: "3" } };
      deleteItemWithIdStub.returns(null);
      await itemsController.deleteWithId(req, res);
      expect(deleteItemWithIdStub).to.have.been.calledOnce;
      expect(res.statusCode).to.equal(404);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "No item with ID 3 exists",
      });
    });
    it("should return an error message, 422 error code, and error status if ID is not a number", async function () {
      const req = { params: { id: "a" } };
      await itemsController.deleteWithId(req, res);
      expect(deleteItemWithIdStub).to.not.have.been.called;
      expect(res.statusCode).to.equal(422);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
        message: "Item ID is not a number",
      });
    });
  });
});
