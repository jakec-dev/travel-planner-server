// /* eslint-disable prefer-promise-reject-errors */
// const chai = require("chai");
// const sinon = require("sinon");
// const sinonChai = require("sinon-chai");
// const itemsData = require("./itemsData");
// const pool = require("../utils/dbPool");

// chai.use(sinonChai);
// const { expect } = chai;

// describe("data/itemsData.js", function () {
//   describe("selectItemRecords", function () {
//     it("should return all items when called without arguments", function () {
//       const queryStub = sinon.stub(pool, "query");
//       queryStub.returns([
//         { id: 1, name: "test name 1", brand: "test brand 2" },
//         { id: 2, name: "test name 2", brand: "test brand 2" },
//       ]);
//       console.log("RESULT: " + JSON.stringify(queryStub()));
//       const result = itemsData.selectItemRecords();
//       console.log("RESULT: " + JSON.stringify(result));
//       expect(result).to.eql([
//         { id: 1, name: "test name 1", brand: "test brand 2" },
//         { id: 2, name: "test name 2", brand: "test brand 2" },
//       ]);
//       queryStub.restore();
//     });
//   });
// });
