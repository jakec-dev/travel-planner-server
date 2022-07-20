const chai = require("chai");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const itemsService = require("./itemsService");
const itemsData = require("../data/itemsData");

chai.use(sinonChai);
const { expect } = chai;

describe("services/itemsService.js", function () {
  describe("getItems", function () {
    let selectItemRecordsStub;
    beforeEach(function () {
      selectItemRecordsStub = sinon.stub(itemsData, "selectItemRecords");
    });
    afterEach(function () {
      selectItemRecordsStub.restore();
    });
    it("should return all items", async function () {
      const allItems = [
        { id: 1, name: "test name 1", brand: "test brand 1" },
        { id: 2, name: "test name 2", brand: "test brand 2" },
      ];
      selectItemRecordsStub.resolves(allItems);
      const result = await itemsService.getItems();
      expect(selectItemRecordsStub).to.have.been.calledOnce;
      expect(result).to.eql(allItems);
    });
  });

  describe("createItem", function () {
    let insertItemRecordStub;
    beforeEach(function () {
      insertItemRecordStub = sinon.stub(itemsData, "insertItemRecord");
    });
    afterEach(function () {
      insertItemRecordStub.restore();
    });
    it("should return the new item", async function () {
      const newItem = {
        name: "test name",
        brand: "test brand",
      };
      const returnedNewItem = { id: 1, ...newItem };
      insertItemRecordStub.resolves(returnedNewItem);
      const result = await itemsService.createItem(newItem);
      expect(insertItemRecordStub).to.have.been.calledOnce;
      expect(result).to.eql(returnedNewItem);
    });
  });

  describe("updateItem", function () {
    let updateItemRecordStub;
    beforeEach(function () {
      updateItemRecordStub = sinon.stub(itemsData, "updateItemRecord");
    });
    afterEach(function () {
      updateItemRecordStub.restore();
    });
    it("should return the modified item", async function () {
      const modifiedItem = {
        id: 1,
        name: "modified test name",
        brand: "test brand",
      };
      updateItemRecordStub.resolves(modifiedItem);
      const result = await itemsService.updateItem(modifiedItem);
      expect(updateItemRecordStub).to.have.been.calledOnce;
      expect(result).to.eql(modifiedItem);
    });
    it("should return null if no item with ID exists", async function () {
      const modifiedItem = {
        id: 4,
        name: "modified test name",
        brand: "test brand",
      };
      updateItemRecordStub.resolves(null);
      const result = await itemsService.updateItem(modifiedItem);
      expect(updateItemRecordStub).to.have.been.calledOnce;
      expect(result).to.eql(null);
    });
  });

  describe("getItemWithId", function () {
    let selectItemRecordsStub;
    beforeEach(function () {
      selectItemRecordsStub = sinon.stub(itemsData, "selectItemRecords");
    });
    afterEach(function () {
      selectItemRecordsStub.restore();
    });
    it("should return the item", async function () {
      const item = { id: 1, name: "test name", brand: "test brand" };
      selectItemRecordsStub.resolves([item]);
      const result = await itemsService.getItemWithId(item.id);
      expect(selectItemRecordsStub).to.have.been.calledOnce;
      expect(result).to.eql(item);
    });
    it("should return null if no item with ID exists", async function () {
      selectItemRecordsStub.resolves([]);
      const result = await itemsService.getItemWithId(1);
      expect(selectItemRecordsStub).to.have.been.calledOnce;
      expect(result).to.eql(null);
    });
  });

  describe("deleteItemWithId", function () {
    let deleteItemRecordsStub;
    beforeEach(function () {
      deleteItemRecordsStub = sinon.stub(itemsData, "deleteItemRecords");
    });
    afterEach(function () {
      deleteItemRecordsStub.restore();
    });
    it("should return the deleted item's ID", async function () {
      const itemId = 3;
      deleteItemRecordsStub.resolves(1);
      const result = await itemsService.deleteItemWithId(itemId);
      expect(deleteItemRecordsStub).to.have.been.calledOnce;
      expect(result).to.eql(itemId);
    });
    it("should return null if no item with ID exists", async function () {
      deleteItemRecordsStub.resolves(0);
      const result = await itemsService.deleteItemWithId(1);
      expect(deleteItemRecordsStub).to.have.been.calledOnce;
      expect(result).to.eql(null);
    });
  });
});
