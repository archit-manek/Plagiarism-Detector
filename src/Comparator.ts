abstract class Comparator {

  protected programOne: File
  protected programTwo: File
  protected results: String

  abstract getSimilarity(): String

}

export default Comparator