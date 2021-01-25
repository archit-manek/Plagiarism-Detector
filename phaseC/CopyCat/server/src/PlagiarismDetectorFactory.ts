import { Filter } from "./Filter"
import { IPlagiarismDetector } from "./IPlagiarismDetector"
import { IPlagiarismDetectorFactory } from "./IPlagiarismDetectorFactory"
import { PlagiarismDetector } from "./PlagiarismDetector"

/**
* A class that implements the IPlagiarismDetectorFactory interface.
* This is the concrete creator of the Factory Pattern which creates
* the concrete product PlagiarismDetector.
*/
export class PlagiarismDetectorFactory implements IPlagiarismDetectorFactory {  

  private programOne: IPlagiarismDetector

  constructor(private programSource: string, private filter: Array<Filter>, private filename:string) {
    this.programOne = new PlagiarismDetector(this.programSource, this.filter, this.filename)
  }

  /**
  * Get the Program source for this Detector.
  */
  getProgramSource(): string {
    return this.programSource
  }

  /**
  * Get the Detector(Product) that this Creator (Factory) creates.
  */
  getDetector(): IPlagiarismDetector {
    return this.programOne
  }

}