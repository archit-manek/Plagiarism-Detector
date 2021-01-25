import { expect } from "chai";
import { ProgramString } from "../src/ProgramStrings";

let program = new ProgramString("one");
let program1 = new ProgramString("two");

describe("Program Strings Test", () => {
  it("getName", () => {
    expect(program.getName()).to.equal("one");
  });
  it("getFileStructure", () => {
    program.appendFileStructure("d");
    let structure = program.getFileStructure();
    expect(structure).to.have.members(["d"]);
  });
  it("getLines", () => {
    program.appendLine(5);
    let lines = program.getLines();
    expect(lines).to.have.members([5]);
  });
  it("getIdentifiers", () => {
    program.appendIdentifiers("sf");
    let identifier = program.getIdentifiers();
    expect(identifier).to.have.members(["sf"]);
  });
  it("getLiterals", () => {
    program.appendLiterals("xyz");
    let literals = program.getLiterals();
    expect(literals).to.have.members(["xyz"]);
  });
  it("getTokens", () => {
    program.appendTokens("abc");
    let tokens = program.getTokens();
    expect(tokens).to.have.members(["abc"]);
  });
  it("toString", () => {
    program.appendTokens("abc");
    let toString = program.toString();
    expect(toString).to.equal(
      "--------------------------------\n\nFile Structure: d\n\nIdentifiers: sf\n\nLiterals: xyz\n\nTokens: abc,abc\n\n"
    );
  });
  it("allStrings", () => {
    program.appendTokens("abc");
    let allStrings = program.getAllStrings();
    expect(allStrings).to.have.members(["d", "sf", "xyz", "abcabcabc"]);
  });
});

describe("Program Strings Test (Edge Cases)", () => {
  it("FileStructure, empty string", () => {
    program1.appendFileStructure("");
    let structure = program1.getFileStructure();
    expect(structure).to.have.members([""]);
  });
  it("Lines, negative number", () => {
    program1.appendLine(-3);
    let structure = program1.getLines();
    expect(structure).to.have.members([-3]);
  });
  it("Identifiers, null value", () => {
    program1.appendIdentifiers(null);
    let structure = program1.getIdentifiers();
    expect(structure).to.have.members([null]);
  });
  it("toString", () => {
    program1.appendTokens("abc");
    let structure = program1.toString();
    expect(structure).to.equal(
      "--------------------------------\n\nFile Structure: \n\nIdentifiers: \n\nLiterals: \n\nTokens: abc\n\n"
    );
  });
  it("allStrings", () => {
    program1.appendTokens("abc");
    let structure = program1.getAllStrings();
    expect(structure).to.have.members(["", "", "", "abcabc"]);
  });
});
