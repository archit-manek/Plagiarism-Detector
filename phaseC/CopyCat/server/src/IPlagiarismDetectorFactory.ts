import { IPlagiarismDetector } from "./IPlagiarismDetector";

/**
* The Creator class of the Factory Pattern.
* It creates a PlagiarismDetector which builds the AST, traverses it
* and build the 4-string representation.
*/
export interface IPlagiarismDetectorFactory {

  /**
  * Get the Program source for this Detector.
  */
  getProgramSource(): string

  /**
  * Get the Detector(Product) that this Creator (Factory) creates.
  */
  getDetector(): IPlagiarismDetector
}