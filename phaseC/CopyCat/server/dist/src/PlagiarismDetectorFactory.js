"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlagiarismDetectorFactory = void 0;
const PlagiarismDetector_1 = require("./PlagiarismDetector");
/**
* A class that implements the IPlagiarismDetectorFactory interface.
* This is the concrete creator of the Factory Pattern which creates
* the concrete product PlagiarismDetector.
*/
class PlagiarismDetectorFactory {
    constructor(programSource, filter, filename) {
        this.programSource = programSource;
        this.filter = filter;
        this.filename = filename;
        this.programOne = new PlagiarismDetector_1.PlagiarismDetector(this.programSource, this.filter, this.filename);
    }
    /**
    * Get the Program source for this Detector.
    */
    getProgramSource() {
        return this.programSource;
    }
    /**
    * Get the Detector(Product) that this Creator (Factory) creates.
    */
    getDetector() {
        return this.programOne;
    }
}
exports.PlagiarismDetectorFactory = PlagiarismDetectorFactory;
//# sourceMappingURL=PlagiarismDetectorFactory.js.map