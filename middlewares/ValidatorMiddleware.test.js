const chai = require("chai");
const sinon = require("sinon");
const ValidatorMiddleware = require("./ValidatorMiddleware");

const { expect } = chai;

describe("middlewares/ValidatorMiddleware", function () {
  describe("function invocation", function () {
    let mw;
    beforeEach(function () {
      mw = ValidatorMiddleware("newItem");
    });
    it("should throw an error for invalid validator argument", function () {
      expect(() => ValidatorMiddleware("invalid validator")).to.throw;
    });
    it("should return a function", function () {
      expect(mw).to.be.a("function");
    });
    it("should accept three arguments", function () {
      expect(mw.length).to.equal(3);
    });
  });

  describe("newItem schema", function () {
    let mw;
    beforeEach(function () {
      mw = ValidatorMiddleware("newItem");
    });
    it("should validate with valid inputs", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            name: "test name",
            brand: "test brand",
          },
        },
        {
          status: () => ({ json: respSpy }),
        },
        nextSpy
      );
      expect(nextSpy).to.be.calledOnce;
    });
    it("should still validate if brand is not provided", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            name: "test name",
          },
        },
        {
          status: () => ({ json: respSpy }),
        },
        nextSpy
      );
      expect(nextSpy).to.be.calledOnce;
    });
    it("should fail to validate if no name is provided", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {},
        },
        {
          status: () => ({ json: respSpy }),
        },
        nextSpy
      );
      expect(respSpy).to.be.calledWithMatch({ status: "error" });
      expect(nextSpy).to.not.be.calledOnce;
    });
    it("should fail to validate if extra attributes are provided", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            name: "test name",
            extraAttribute: "this should fail",
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

  describe("existingItem schema", function () {
    let mw;
    beforeEach(function () {
      mw = ValidatorMiddleware("existingItem");
    });
    it("should validate with valid inputs", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            id: 1,
            name: "test name",
            brand: "test brand",
          },
        },
        {
          status: () => ({ json: respSpy }),
        },
        nextSpy
      );
      expect(nextSpy).to.be.calledOnce;
    });
    it("should still validate if brand is not provided", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            id: 1,
            name: "test name",
          },
        },
        {
          status: () => ({ json: respSpy }),
        },
        nextSpy
      );
      expect(nextSpy).to.be.calledOnce;
    });
    it("should fail to validate if no ID is provided", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            name: "test name",
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
    it("should fail to validate if no name is provided", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            id: 1,
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
    it("should fail to validate if extra attributes are provided", function () {
      const nextSpy = sinon.spy();
      const respSpy = sinon.spy();
      mw(
        {
          body: {
            id: 1,
            name: "test name",
            extraAttribute: "this should fail",
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
});
