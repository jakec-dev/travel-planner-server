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
    it("should return all items and success status on success", async function () {
      selectItemRecordsStub.resolves([
        { id: 1, name: "test name 1", brand: "test brand 1" },
        { id: 2, name: "test name 2", brand: "test brand 2" },
      ]);
      expect(await itemsService.getItems()).to.eql({
        status: "success",
        data: [
          { id: 1, name: "test name 1", brand: "test brand 1" },
          { id: 2, name: "test name 2", brand: "test brand 2" },
        ],
      });
    });
    it("should return an error message and error status on error", async function () {
      selectItemRecordsStub.rejects(new Error("Test error message"));
      const result = await itemsService.getItems();
      expect(result).to.eql({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
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
    it("should return the created item and success status on success", async function () {
      insertItemRecordStub.resolves({
        id: 1,
        name: "test name",
        brand: "test brand",
      });
      const result = await itemsService.createItem({
        name: "test name",
        brand: "test brand",
      });
      expect(result).to.eql({
        status: "success",
        data: { id: 1, name: "test name", brand: "test brand" },
      });
    });
    it("should return an error message and error status on error", async function () {
      insertItemRecordStub.rejects(new Error("Test error message"));
      const result = await itemsService.createItem();
      expect(result).to.eql({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
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
    it("should return the modified item and success status on success", async function () {
      updateItemRecordStub.resolves({
        affectedRows: 1,
        changedRows: 1,
      });
      const result = await itemsService.updateItem({
        id: 1,
        name: "modified test name",
        brand: "test brand",
      });
      expect(result).to.eql({
        status: "success",
        data: { id: 1, name: "modified test name", brand: "test brand" },
      });
    });
    it("should return an error message and error status on error", async function () {
      updateItemRecordStub.rejects(new Error("Test error message"));
      const result = await itemsService.updateItem();
      expect(result).to.include({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
    });
    it("should return an error message, 404 error type and error status if no items exist with provided ID", async function () {
      updateItemRecordStub.resolves({
        affectedRows: 0,
        changedRows: 0,
      });
      const result = await itemsService.updateItem({
        id: 1,
        name: "modified test name",
        brand: "test brand",
      });
      expect(result).to.eql({
        status: "error",
        errorType: 404,
        errorMessage: "No item with ID 1 exists",
      });
    });
    it("should return the modified item and success status if the modified item is the same as the original item", async function () {
      updateItemRecordStub.resolves({
        affectedRows: 1,
        changedRows: 0,
      });
      const result = await itemsService.updateItem({
        id: 1,
        name: "modified test name",
        brand: "test brand",
      });
      expect(result).to.eql({
        status: "success",
        data: { id: 1, name: "modified test name", brand: "test brand" },
      });
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
    it("should return the modified item and success status on success", async function () {
      selectItemRecordsStub.resolves([
        { id: 1, name: "test name", brand: "test brand" },
      ]);
      const result = await itemsService.getItemWithId(1);
      expect(result).to.eql({
        status: "success",
        data: { id: 1, name: "test name", brand: "test brand" },
      });
    });
    it("should return an error message and error status on error", async function () {
      selectItemRecordsStub.rejects(new Error("Test error message"));
      const result = await itemsService.getItemWithId(1);
      expect(result).to.include({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
    });
    it("should return an error message, 404 error type and error status if no items exist with provided ID", async function () {
      selectItemRecordsStub.resolves([]);
      const result = await itemsService.getItemWithId(1);
      expect(result).to.eql({
        status: "error",
        errorType: 404,
        errorMessage: "No item with ID 1 exists",
      });
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
    it("should return the deleted item's ID and success status on success", async function () {
      deleteItemRecordsStub.resolves({ affectedRows: 1 });
      const result = await itemsService.deleteItemWithId(1);
      expect(result).to.eql({
        status: "success",
        data: 1,
      });
    });
    it("should return an error message and error status on error", async function () {
      deleteItemRecordsStub.rejects(new Error("Test error message"));
      const result = await itemsService.deleteItemWithId(1);
      expect(result).to.eql({
        status: "error",
        errorType: 400,
        errorMessage: "Test error message",
      });
    });
    it("should return an error message and error status if no items exist with provided ID", async function () {
      deleteItemRecordsStub.resolves({ affectedRows: 0 });
      const result = await itemsService.deleteItemWithId(1);
      expect(result).to.eql({
        status: "error",
        errorType: 404,
        errorMessage: "No item with ID 1 exists",
      });
    });
  });
});
