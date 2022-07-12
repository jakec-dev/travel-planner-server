// /* eslint-disable prefer-promise-reject-errors */
// const chai = require("chai");
// const sinon = require("sinon");
// const mysql = require("mysql2");
// const sinonChai = require("sinon-chai");
// const itemsData = require("./itemsData");
// const pool = require("../utils/dbPool");

// chai.use(sinonChai);
// const { expect } = chai;

// describe("data/itemsData.js", function () {
//   describe("selectItemRecords", function () {
//     it.only("should return all items when called without arguments", async function () {
//       const poolStub = { query: sinon.stub().resolves({ rowCount: 1 }) };
//       const createPoolStub = sinon.stub(mysql, "createPool").returns(poolStub);
//       const queryStub = sinon.stub(pool, "query").y(poolStub.query);
//       //   queryStub.returns([
//       //     { id: 1, name: "test name 1", brand: "test brand 2" },
//       //     { id: 2, name: "test name 2", brand: "test brand 2" },
//       //   ]);
//       //   console.log("RESULT: " + JSON.stringify(queryStub()));

//       const result = await itemsData.selectItemRecords();
//       console.log("RESULT: " + JSON.stringify(result));
//       expect(result).to.eql({ rowCount: 1 });
//       sinon.assert.callledWith(queryStub, "SELECT * FROM items");
//       createPoolStub.restore();
//       queryStub.restore();
//     });
//   });
// });
