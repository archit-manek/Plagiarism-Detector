"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeComparator = void 0;
const stringSimilarity = __importStar(require("string-similarity"));
/**
 * This class checks for the similarity between the corresponding strings of each program
 * and calculates the overall similarity based on a formula.
 */
class CodeComparator {
    constructor(sourceOne, sourceTwo) {
        this.sourceOne = sourceOne;
        this.sourceTwo = sourceTwo;
        this.fileStructureSimilarity = 0;
        this.identifierSimilarity = 0;
        this.literalsSimilarity = 0;
        this.tokenSimilarity = 0;
        this.compare();
    }
    /**
     * Get the similarity between each type of the 4-string representation of the 2 programs.
     * This uses a string similarity library to compare strings.
     */
    compare() {
        this.fileStructureSimilarity = stringSimilarity.compareTwoStrings(this.sourceOne[0], this.sourceTwo[0]);
        this.identifierSimilarity = stringSimilarity.compareTwoStrings(this.sourceOne[1], this.sourceTwo[1]);
        this.literalsSimilarity = stringSimilarity.compareTwoStrings(this.sourceOne[2], this.sourceTwo[2]);
        this.tokenSimilarity = stringSimilarity.compareTwoStrings(this.sourceOne[3], this.sourceTwo[3]);
    }
    /**
     * Get the lines to highlight for the first program on the UI where similarity is detected.
     * As the filestructure indicates the first token of each line, it is used to get the lines.
     */
    getLinesToHighlightOne(fileStructureOne, fileStructureTwo) {
        let lines = [];
        for (var i in fileStructureOne) {
            if (fileStructureTwo.includes(fileStructureOne[i])) {
                lines.push(parseInt(i) + 1);
            }
        }
        return lines;
    }
    /**
     * Get the lines to highlight for the second program on the UI where similarity is detected.
     * As the filestructure indicates the first token of each line, it is used to get the lines.
     */
    getLinesToHighlightTwo(fileStructureOne, fileStructureTwo) {
        let lines = [];
        for (var i in fileStructureTwo) {
            if (fileStructureOne.includes(fileStructureTwo[i])) {
                lines.push(parseInt(i) + 1);
            }
        }
        return lines;
    }
    /**
     * Get the overall similarity of both the programs with a formula.
     */
    getSimilarity() {
        return +((this.fileStructureSimilarity +
            this.identifierSimilarity +
            2 * this.literalsSimilarity +
            10 * this.tokenSimilarity) /
            14).toFixed(4);
    }
}
exports.CodeComparator = CodeComparator;
//# sourceMappingURL=Comparator.js.map