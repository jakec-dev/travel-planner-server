const chai = require("chai");
const sinon = require("sinon");
const ValidatorMiddleware = require("./ValidatorMiddleware");

const { expect } = chai;

describe("Middlewares/ValidatorMiddleware", function () {
  describe("request handler creation", function () {
    let mw;
    beforeEach(function () {
      mw = ValidatorMiddleware("item");
    });
    it("should return a function", function () {
      expect(mw).to.be.a("function");
    });
    it("should accept three arguments", function () {
      expect(mw.length).to.equal(3);
    });
    it("should throw an error for invalid arguments", function () {
      expect(() => ValidatorMiddleware("invalid validator")).to.throw;
    });
  });

  describe("request handler calling", function () {
    it("should call next() once", function () {
      const mw = ValidatorMiddleware("item");
      const nextSpy = sinon.spy();
      mw({}, {}, nextSpy);
      expect(nextSpy.calledOnce).to.be.true;
    });
  });
});
