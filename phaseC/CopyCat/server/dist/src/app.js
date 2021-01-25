"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comparator_1 = require("./Comparator");
const Filter_1 = require("./Filter");
// console logging everything to test stuff
console.log("Starting Comparison!");
// hardcoding for testing
let studentOneFiles = [];
let studentTwoFiles = [];
/* let studentOneFileOne = `function square11() {
  // this is a lame comment
  let a = "hello"
}`

let studentOneFileTwo = `function square12() {
  let b = "world"
}`

let studentOneFileThree = `function square13(m) {
  return m * m;
}` */
// let programTwoSource = `function square(n) {
//   let c = "hello"
//   let d = "world"
//   return n * n;
// }`
// using ReadFile for testing
let path = require('path');
let filePathOne = path.resolve(__dirname, '../uploads/student1');
let filePathTwo = path.resolve(__dirname, '../uploads/student2');
//let studentOneFileOne = readFile(filePath, 'utf8')
let fs = require("fs");
let studentOneFileOne = fs.readFileSync(filePathOne + "/file1.js").toString();
let studentTwoFileOne = fs.readFileSync(filePathTwo + "/file2.js").toString();
/* fs.readFile(filePath, 'utf8', function (err, data) {
  console.log("in here")
  if (err)
    console.log("Error: ", err);
  else {
    studentOneFileOne = data.toString();
    }
}); */
//console.log("SJABDKJABFJSDBFJSADBFS: ", studentOneFileOne)
/* let studentTwoFileOne = `function square21() {
  let c = "hello"
  let d = "world"
}`

let studentTwoFileTwo = `function square22(a) {
  // lameee
  return a * a;
}` */
//studentOneFiles.push(studentOneFileOne, studentOneFileTwo, studentOneFileThree)
//if (typeof(studentOneFileOne) == 'string')
studentOneFiles.push(studentOneFileOne);
//studentTwoFiles.push(studentTwoFileOne, studentTwoFileTwo)
studentTwoFiles.push(studentTwoFileOne);
//console.log("Student one: ",studentOneFiles)
//console.log("Student two: ",studentTwoFiles)
// Set the filter as per the checkboxes on the UI, including both for testing
//let filter = []
let filter = [Filter_1.Filter.IGNORE_LITERALS, Filter_1.Filter.IGNORE_VARIABLE_NAMES];
// call the director of the Builder pattern
//let director: PlagiarismDetectorDirector
let programOneStrings = [];
let programTwoStrings = [];
/* for (var program of studentOneFiles) {
  programOneStrings.push(new PlagiarismDetectorDirector(program, filter).getProgram().getStringRepresentation());
} */
/* studentOneFiles.forEach(program => {
  programOneStrings.push(new PlagiarismDetectorFactory(program, filter).getDetector().getStringRepresentation());
})

studentTwoFiles.forEach(program => {
  programTwoStrings.push(new PlagiarismDetectorFactory(program, filter).getDetector().getStringRepresentation());
}) */
//let director = new PlagiarismDetectorDirector(studentOneFileOne, studentTwoFileOne, filter);
// get the Program instance (containing the 4-string representations) of the two source codes
//let programOneStrings = director.getProgram().getStringRepresentation()
//let programTwoStrings = director.getProgramTwo().getStringRepresentation()
//console.log("\n")
//console.log("Program One")
//console.log(programOneStrings)
//console.log("\n")
//console.log("Program Two")
//console.log(programTwoStrings)
// check the similarity between the two codes
let compareResults = [];
let diffLinesOne = [];
let diffLinesTwo = [];
//let comparator = new CodeComparator(studentOne.getAllStrings(), studentTwo.getAllStrings())
for (var studentOne of programOneStrings) {
    for (var studentTwo of programTwoStrings) {
        let comparator = new Comparator_1.CodeComparator(studentOne.getAllStrings(), studentTwo.getAllStrings());
        compareResults.push(comparator.getSimilarity());
        diffLinesOne.push(comparator.getLinesOne(studentOne.getFileStructure(), studentTwo.getFileStructure()));
        diffLinesTwo.push(comparator.getLinesTwo(studentOne.getFileStructure(), studentTwo.getFileStructure()));
    }
}
//let comparator = new CodeComparator(programOneStrings.getAllStrings(), programTwoStrings.getAllStrings())
//let similarity = comparator.getSimilarity()
console.log("Diff Lines One: ", diffLinesOne);
console.log("Diff Lines Two: ", diffLinesTwo);
console.log("Compare Results: ", compareResults);
/* function median(values){
  if(values.length ===0) return 0;

  values.sort(function(a,b){
    return a-b;
  });

  var half = Math.floor(values.length / 2);

  if (values.length % 2)
    return values[half];

  return (values[half - 1] + values[half]) / 2.0;
} */
let computeSimilarity = (results) => results.reduce((a, b) => a + b) / results.length;
let similarity = computeSimilarity(compareResults);
//let changes = comparator.getLines()
//let similarity = median(compareResults)
//console.log(computeSimilarity(compareResults));
console.log("\n");
console.log("Similarity on a scale of 0 to 1: ", similarity);
console.log("\n");
// convert back to code - place it in an appropriate future class
/* let codeOne = director.getProgramOneSource()
let astOne = director.getProgramOne().getAST()
let outputOne = generate(astOne, codeOne);
console.log("Output one: ", outputOne.code);

let codeTwo = director.getProgramTwoSource()
let astTwo = director.getProgramTwo().getAST()
let outputTwo = generate(astTwo, codeTwo);
console.log("Output two: ", outputTwo.code); */
// generate report, no code yet
//let generateReport(filter, similarity)
//# sourceMappingURL=app.js.map