"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const read_1 = require("../src/read");
const file = "../dist/uploads/student1/file1.js";
describe("reading test file", () => {
    it("test normal file", () => {
        let output = read_1.readFile(file, "utf8");
        chai_1.expect(output).to.equal("abc");
    });
});
//# sourceMappingURL=ReadTest.spec.js.map