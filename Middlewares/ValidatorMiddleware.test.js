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
  });

  describe("request handler calling", function () {
    it("should call next() once", function () {
      const mw = ValidatorMiddleware("item");
      const nextSpy = sinon.spy();
      mw(
        {
          body: {
            id: 1,
            name: "required string",
          },
        },
        {},
        nextSpy
      );
      expect(nextSpy).to.be.calledOnce;
    });
    it("should respond with an error message if validation fails", function () {
      const mw = ValidatorMiddleware("item");
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            id: "incorrect string format",
          },
        },
        {
          status: () => ({ json: respSpy }),
        },
        nextSpy
      );
      expect(respSpy).to.be.calledWithMatch({ status: "error" });
      expect(nextSpy).to.not.be.calledOnce;
    });
  });

  describe("pattern testing", function () {
    it("should throw an error for invalid validator argument", function () {
      expect(() => ValidatorMiddleware("invalid validator")).to.throw;
    });
  });
});
