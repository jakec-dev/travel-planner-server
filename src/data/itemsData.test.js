const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const itemsData = require("./itemsData");
const db = require("../utils/db");

chai.use(sinonChai);
const { expect } = chai;

describe("data/itemsData.js", function () {
  let queryStub;
  beforeEach(function () {
    queryStub = sinon.stub(db, "query");
  });
  afterEach(function () {
    queryStub.restore();
  });
  describe("selectItemRecords", function () {
    it("should return all items when called without arguments", async function () {
      const items = [
        { id: 1, name: "test name 1", brand: "test brand 1" },
        { id: 2, name: "test name 2", brand: "test brand 2" },
      ];
      queryStub.returns(items);
      const result = await itemsData.selectItemRecords();
      expect(result).to.eql(items);
      expect(queryStub).to.be.calledWith("SELECT * FROM items", undefined);
    });
    it("should return a single item when called with a single ID", async function () {
      const item = { id: 1, name: "test name 1", brand: "test brand 1" };
      queryStub.returns([item]);
      const result = await itemsData.selectItemRecords(item.id);
      expect(result).to.eql(item);
      expect(queryStub).to.be.calledWith(
        "SELECT * FROM items WHERE id IN (?)",
        [1]
      );
    });
    it("should return an array of items when called with an array of IDs", async function () {
      const items = [
        { id: 1, name: "test name 1", brand: "test brand 1" },
        { id: 3, name: "test name 3", brand: "test brand 3" },
      ];
      queryStub.returns(items);
      const result = await itemsData.selectItemRecords([1, 3]);
      expect(result).to.eql(items);
      expect(queryStub).to.be.calledWith(
        "SELECT * FROM items WHERE id IN (?)",
        [[1, 3]]
      );
    });
    it("should return null if no items with ID exists", async function () {
      queryStub.resolves([]);
      const result = await itemsData.selectItemRecords(1);
      expect(result).to.eql(null);
    });
  });

  describe("insertItemRecord", function () {
    it("should return the new item", async function () {
      const newItem = {
        name: "test name",
        brand: "test brand",
        weight: 20,
        url: "https://www.example.com",
        price: 123.45,
        notes: "test notes",
      };
      queryStub.returns({ insertId: 1 });
      const result = await itemsData.insertItemRecord(newItem);
      expect(result).to.eql({ ...newItem, id: 1 });
      expect(queryStub).to.be.calledWith(
        "INSERT INTO items (name, brand, weight, url, price, notes) VALUES (?, ?, ?, ?, ?, ?)",
        [
          newItem.name,
          newItem.brand,
          newItem.weight,
          newItem.url,
          newItem.price,
          newItem.notes,
        ]
      );
    });
  });

  describe("updateItemRecord", function () {
    it("should return the new item", async function () {
      const modifiedItem = {
        id: 2,
        name: "modified name",
        brand: "test brand",
      };
      queryStub.returns({ affectedRows: 1 });
      const result = await itemsData.updateItemRecord(modifiedItem);
      expect(result).to.eql(modifiedItem);
      expect(queryStub).to.be.calledWith(
        "UPDATE items SET name = ?, brand = ? WHERE id = ?",
        [modifiedItem.name, modifiedItem.brand, modifiedItem.id]
      );
    });
    it("should return null if no item exists with provided ID", async function () {
      const modifiedItem = {
        id: 2,
        name: "modified name",
        brand: "test brand",
      };
      queryStub.returns({ affectedRows: 0 });
      const result = await itemsData.updateItemRecord(modifiedItem);
      expect(result).to.eql(null);
      expect(queryStub).to.be.calledWith(
        "UPDATE items SET name = ?, brand = ? WHERE id = ?",
        [modifiedItem.name, modifiedItem.brand, modifiedItem.id]
      );
    });
  });

  describe("deleteItemRecords", function () {
    it("should return total item records when called without arguments", async function () {
      queryStub.returns({ affectedRows: 3 });
      const result = await itemsData.deleteItemRecords();
      expect(result).to.eql(3);
      expect(queryStub).to.be.calledWith("DELETE FROM items", undefined);
    });
    it("should return 1 when called with a single ID", async function () {
      const itemId = 3;
      queryStub.returns({ affectedRows: 1 });
      const result = await itemsData.deleteItemRecords(itemId);
      expect(result).to.eql(1);
      expect(queryStub).to.be.calledWith("DELETE FROM items WHERE id IN (?)", [
        itemId,
      ]);
    });
    it("should return number of affected rows when called with an array of IDs", async function () {
      const itemIds = [1, 3, 5, 7];
      queryStub.returns({ affectedRows: 3 });
      const result = await itemsData.deleteItemRecords(itemIds);
      expect(result).to.eql(3);
      expect(queryStub).to.be.calledWith("DELETE FROM items WHERE id IN (?)", [
        [1, 3, 5, 7],
      ]);
    });
  });
});
