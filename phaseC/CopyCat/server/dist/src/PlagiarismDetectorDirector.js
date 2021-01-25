"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlagiarismDetectorDirector = void 0;
const PlagiarismDetectorConcreteBuilder_1 = require("./PlagiarismDetectorConcreteBuilder");
//include imports to access student files
// Initializes builders for each program
class PlagiarismDetectorDirector {
    //private programTwo: PlagiarismDetectorConcreteBuilder
    //private filter: Array<Filter>
    // hard-coding the string source code for testing
    constructor(programSource, filter) {
        //this.programOneSource = programOneSource
        //this.programTwoSource = programTwoSource
        this.programSource = programSource;
        this.filter = filter;
        this.programOne = new PlagiarismDetectorConcreteBuilder_1.PlagiarismDetectorConcreteBuilder(this.programSource, filter);
        //this.programTwo = new PlagiarismDetectorConcreteBuilder(this.programTwoSource, "Program Two", filter)
    }
    getProgramSource() {
        return this.programSource;
    }
    /* getProgramTwoSource() {
      return this.programTwoSource
    } */
    getProgram() {
        return this.programOne;
    }
}
exports.PlagiarismDetectorDirector = PlagiarismDetectorDirector;
//# sourceMappingURL=PlagiarismDetectorDirector.js.map