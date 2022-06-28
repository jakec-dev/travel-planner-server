const { expect } = require("chai");
const sinon = require("sinon");
const { addItem } = require("./itemsController");

describe("Controllers/itemsController.js", function () {
  describe("addItem()", function () {
    it("sends a succesful response when receiving a valid request", function () {
      const spy = sinon.spy();
      const req = {
        body: {
          id: 1,
          name: "test name",
          brand: "test brand",
        },
      };
      const res = { json: spy };

      addItem(req, res);

      expect(spy.calledWith(sinon.match.has("status", "success"))).to.be.true;
    });
  });
});
