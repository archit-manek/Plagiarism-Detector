import { ProgramString } from "./../src/ProgramStrings";
import { PlagiarismDetector } from "./../src/PlagiarismDetector";
import { expect } from "chai";

let filter = [];
let program = `var answer = 6 * 7;
console.log("Hello World");`;
let emptyProgram = "";

const detector = new PlagiarismDetector(program, filter, "one");
const detectorTwo = new PlagiarismDetector(emptyProgram, filter, "two");
// const detectorThree = new PlagiarismDetector(nullProgram, filter, "three");

describe("Detector test", () => {
  it("getFileStructure", () => {
    let output = detector.getStringRepresentation().getFileStructure();
    expect(output).to.have.members(["Program", "ExpressionStatement"]);
  });
  it("getLines", () => {
    let output = detector.getStringRepresentation().getLines();
    expect(output).to.have.members([1, 2]);
  });
  it("getLiterals", () => {
    let output = detector.getStringRepresentation().getLiterals();
    expect(output).to.have.members([6, 7, "Hello World"]);
  });
  it("getLines", () => {
    let output = detector.getStringRepresentation().getTokens();
    expect(output).to.have.members([
      "Program",
      "VariableDeclaration",
      "VariableDeclarator",
      "Identifier",
      "BinaryExpression",
      "NumericLiteral",
      "NumericLiteral",
      "ExpressionStatement",
      "CallExpression",
      "MemberExpression",
      "Identifier",
      "Identifier",
      "StringLiteral",
    ]);
  });
  it("getIdentifiers", () => {
    let output = detector.getStringRepresentation().getIdentifiers();
    expect(output).to.have.members([
      "87aefdc58b7a29819489c10438e58b7163071272e5fd951e4fa4057322b447f75096ae04a2b122ec61549a5810aa6b6a3025b5c300f169c1de036146cc4b7e4c",
      "eed55db3ffa1983455e1c1b291f6d4d48009bbf43338657ac7a49631126140f126f0a95456b60535e3a7902acd712a62044b445972a8b6c1e79c7cbbb80bc01f",
      "873bcc37e512b7da86476367769c932009fc1bee59c929879f10ac89df541124db5010ae7297ec71db8f71a09adccd27c002f00fcfc93ca7e157105e7505f24d",
    ]);
  });
  // Getting head of node as file
  it("getAST", () => {
    let output = detector.getAST().type;
    expect(output).to.equal("File");
  });
});

describe("emptyDetector", () => {
  it("getFileStructure", () => {
    let output = detectorTwo.getStringRepresentation().getFileStructure();
    expect(output).to.have.members(["Program"]);
  });
  it("getLines", () => {
    let output = detectorTwo.getStringRepresentation().getLines();
    expect(output).to.have.members([1]);
  });
  it("getLiterals", () => {
    let output = detectorTwo.getStringRepresentation().getLiterals();
    expect(output).to.have.members([]);
  });
  it("getLines", () => {
    let output = detectorTwo.getStringRepresentation().getTokens();
    expect(output).to.have.members(["Program"]);
  });
  it("getIdentifiers", () => {
    let output = detectorTwo.getStringRepresentation().getIdentifiers();
    expect(output).to.have.members([]);
  });
});
