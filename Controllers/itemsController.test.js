const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const itemsController = require("./itemsController");

chai.use(sinonChai);
const { expect } = chai;

describe("Controllers/itemsController.js", function () {
  describe("addItem()", function () {
    it("should return the created item for valid requests", function () {
      const res = { json: sinon.spy() };
      const req = {
        body: {
          id: 56,
          name: "test name",
          brand: "test brand",
        },
      };
      itemsController.addItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: req.body,
      });
    });
    it("should return an error if item ID already exists", function () {
      const res = { json: sinon.spy() };
      const req = {
        body: {
          id: 1,
          name: "test name",
          brand: "test brand",
        },
      };
      itemsController.addItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
      });
    });
  });

  describe("deleteItem()", function () {
    it("should return the deleted item for valid requests", function () {
      const res = { json: sinon.spy() };
      const req = {
        params: {
          id: 1,
        },
      };
      itemsController.deleteItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: { id: 1, name: "Backpack", brand: "Osprey" },
      });
    });
    it("should return an error if no item ID exists", function () {
      const res = { json: sinon.spy() };
      const req = {
        params: {
          id: 4,
        },
      };
      itemsController.deleteItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
      });
    });
  });

  describe("getItem()", function () {
    it("should return the item for valid requests", function () {
      const res = { json: sinon.spy() };
      const req = {
        params: {
          id: 1,
        },
      };
      itemsController.getItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: { id: 1, name: "Backpack", brand: "Osprey" },
      });
    });
    it("should return an error if no item ID exists", function () {
      const res = { json: sinon.spy() };
      const req = {
        params: {
          id: 4,
        },
      };
      itemsController.getItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
      });
    });
  });

  describe("getItems()", function () {
    it("should return all items", function () {
      const res = { json: sinon.spy() };
      const req = {};
      itemsController.getItems(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: [
          { id: 1, name: "Backpack", brand: "Osprey" },
          { id: 2, name: "Shoes", brand: "Nike" },
          { id: 3, name: "Toothpaste", brand: "Colgate" },
        ],
      });
    });
  });

  describe("updateItem()", function () {
    it("should return the updated item for valid requests", function () {
      const res = { json: sinon.spy() };
      const req = {
        body: {
          id: 1,
          name: "test name",
          brand: "test brand",
        },
      };
      itemsController.updateItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "success",
        data: req.body,
      });
    });
    it("should return an error if item ID doesn't exist", function () {
      const res = { json: sinon.spy() };
      const req = {
        body: {
          id: 12,
          name: "test name",
          brand: "test brand",
        },
      };
      itemsController.updateItem(req, res);
      expect(res.json).to.have.been.calledWithMatch({
        status: "error",
      });
    });
  });
});
