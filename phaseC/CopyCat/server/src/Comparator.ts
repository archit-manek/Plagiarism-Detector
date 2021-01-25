import * as stringSimilarity from "string-similarity";

/**
 * This class checks for the similarity between the corresponding strings of each program
 * and calculates the overall similarity based on a formula.
 */
export class CodeComparator {
  private fileStructureSimilarity: number;
  private identifierSimilarity: number;
  private literalsSimilarity: number;
  private tokenSimilarity: number;

  constructor(
    private sourceOne: Array<string>,
    private sourceTwo: Array<string>
  ) {
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
    this.fileStructureSimilarity = stringSimilarity.compareTwoStrings(
      this.sourceOne[0],
      this.sourceTwo[0]
    );
    this.identifierSimilarity = stringSimilarity.compareTwoStrings(
      this.sourceOne[1],
      this.sourceTwo[1]
    );
    this.literalsSimilarity = stringSimilarity.compareTwoStrings(
      this.sourceOne[2],
      this.sourceTwo[2]
    );
    this.tokenSimilarity = stringSimilarity.compareTwoStrings(
      this.sourceOne[3],
      this.sourceTwo[3]
    );
  }

  /**
   * Get the lines to highlight for the first program on the UI where similarity is detected.
   * As the filestructure indicates the first token of each line, it is used to get the lines.
   */
  getLinesToHighlightOne(
    fileStructureOne: Array<string>,
    fileStructureTwo: Array<string>
  ) {
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
  getLinesToHighlightTwo(
    fileStructureOne: Array<string>,
    fileStructureTwo: Array<string>
  ) {
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
  getSimilarity(): number {
    return +(
      (this.fileStructureSimilarity +
        this.identifierSimilarity +
        2 * this.literalsSimilarity +
        10 * this.tokenSimilarity) /
      14
    ).toFixed(4);
  }
}
