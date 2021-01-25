import { CodeComparator } from "./src/Comparator";
import { Filter } from "./src/Filter";
import { PlagiarismDetectorFactory } from "./src/PlagiarismDetectorFactory";
import { ProgramString } from "./src/ProgramStrings";

const express = require("express");
const app = express();
const mysql = require("mysql");
const fileupload = require("express-fileupload");
const cors = require("cors");
var fs = require("fs");
const path = require("path");

app.use(cors());
app.use(express.json());
app.use(fileupload());

/**
 * This establishes a connection between the database that stores login information and the system.
 */
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "testing",
  database: "loginsystem",
});

let diffLinesOne: Map<string, Array<string>>;
let diffLinesTwo: Map<string, Array<string>>;

/**
 * This function reads all the files that have been uploaded for student one in the UI or client.
 */
export function readStudentOne(): Map<string, string> {
  let studentOneDictionary = new Map();

  const directoryPath = path.join(__dirname, "uploads/student1");
  let filenames = fs.readdirSync(directoryPath);

  filenames.forEach((singleFile) => {
    let finalPath = path.join(directoryPath, singleFile);
    let studentOneFile = fs.readFileSync(finalPath).toString();

    studentOneDictionary[singleFile] = studentOneFile;
  });
  return studentOneDictionary;
}

/**
 * This function reads all of the files that have been uploaded for the second student in the UI or the client.
 */
export function readStudentTwo(): Map<string, string> {
  let studentTwoDictionary = new Map();

  const directoryPath = path.join(__dirname, "uploads/student2");
  let filenames = fs.readdirSync(directoryPath);

  filenames.forEach((singleFile) => {
    let finalPath = path.join(directoryPath, singleFile);
    let studentOneFile = fs.readFileSync(finalPath).toString();
    studentTwoDictionary[singleFile] = studentOneFile;
  });
  return studentTwoDictionary;
}

/**
 * This function deletes all the files that have been uploaded for the student one in the path for uploads.
 */
function deleteFilesForStudentOne(): void {
  const directoryPath = path.join(__dirname, "uploads/student1");
  let filenames = fs.readdirSync(directoryPath);

  filenames.forEach((file) => {
    let finalPath = path.join(directoryPath, file);
    fs.unlinkSync(finalPath);
  });
}

/**
 * This function deletes all the files that have been uploaded for student two in the path.
 */
function deleteFilesForStudentTwo(): void {
  const directoryPath = path.join(__dirname, "uploads/student2");
  let filenames = fs.readdirSync(directoryPath);

  filenames.forEach((file) => {
    let finalPath = path.join(directoryPath, file);
    fs.unlinkSync(finalPath);
  });
}

/**
 * This function is used to populate the filter based on the selection criteria on the UI.
 *
 * @param filter1 this is a boolean that determines whether or not this filter is applied to the plagairsm detector.
 * @param filter2 this is a boolean that determines whether or not this filter is applied to the plagairsm detector.
 */
export function populateFilter(
  filter1: boolean,
  filter2: boolean
): Array<Filter> {
  let filter = [];
  if (filter1) {
    filter.push(Filter.IGNORE_LITERALS);
  }
  if (filter2) {
    filter.push(Filter.IGNORE_VARIABLE_NAMES);
  }
  return filter;
}

/**
 * This function runs plagarism check on the files that have been uploaded by both students, and the similarity
 * depends on the filter criteria that is passed through as a parameter of the function.
 *
 * @param filter1 this applies the filter that is applied depending on the boolean value generated from the UI.
 * @param filter2 this applies the filter that is applied depending on the boolean value generated from the UI.
 */
export function runPlagiarism(filter1: boolean, filter2: boolean): number {
  let filter = populateFilter(filter1, filter2);

  // read student files from the uploads directory
  let studentOneFiles = readStudentOne();
  let studentTwoFiles = readStudentTwo();

  // these hold the 4-string representations of all the files of the two programs
  let programOneStrings: Array<ProgramString> = [];
  let programTwoStrings: Array<ProgramString> = [];

  for (var file in studentOneFiles) {
    programOneStrings.push(
      new PlagiarismDetectorFactory(studentOneFiles[file], filter, file)
        .getDetector()
        .getStringRepresentation()
    );
  }

  for (var file in studentTwoFiles) {
    programTwoStrings.push(
      new PlagiarismDetectorFactory(studentTwoFiles[file], filter, file)
        .getDetector()
        .getStringRepresentation()
    );
  }

  // the similarities between every file of student one with every file of student two
  let compareResults = [];

  let linesToHighlightOne = [];
  let linesToHighlightTwo = [];

  // clear the highlights for a new compare
  diffLinesOne = new Map();
  diffLinesTwo = new Map();

  // comparison between every file of student one with every file of student two
  for (var studentOne of programOneStrings) {
    for (var studentTwo of programTwoStrings) {
      let comparator = new CodeComparator(
        studentOne.getAllStrings(),
        studentTwo.getAllStrings()
      );
      compareResults.push(comparator.getSimilarity());

      // get the lines to highlight on UI, lines to be hihglighted are sent as strings separated by commas for each file
      linesToHighlightOne = comparator.getLinesToHighlightOne(
        studentOne.getFileStructure(),
        studentTwo.getFileStructure()
      );
      linesToHighlightTwo = comparator.getLinesToHighlightTwo(
        studentOne.getFileStructure(),
        studentTwo.getFileStructure()
      );

      if (Array.isArray(linesToHighlightOne) && linesToHighlightOne.length) {
        if (studentOne.getName() in diffLinesOne) {
          diffLinesOne[studentOne.getName()] += linesToHighlightOne.join(",");
        } else {
          diffLinesOne[studentOne.getName()] = linesToHighlightOne.join(",");
        }
      }

      if (Array.isArray(linesToHighlightTwo) && linesToHighlightTwo.length) {
        if (studentTwo.getName() in diffLinesTwo) {
          diffLinesTwo[studentTwo.getName()] += linesToHighlightTwo.join(",");
        }
        diffLinesTwo[studentTwo.getName()] = linesToHighlightTwo.join(",");
      }
    }
  }

  // take the average similarity
  let computeSimilarity = (results) =>
    results.reduce((a, b) => a + b) / results.length;
  let similarity = computeSimilarity(compareResults) * 100;

  return similarity;
}

app.post("/upload/student1", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  var file = req.files.file;
  file.mv(`${__dirname}/uploads/student1/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: file.name,
      filePath: `/uploads/student1/${file.name}`,
    });
  });
});

app.post("/upload/student2", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  const file = req.files.file;
  file.mv(`${__dirname}/uploads/student2/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
    res.json({
      fileName: file.name,
      filePath: `/uploads/student2/${file.name}`,
    });
  });
});

app.post("/uploadTextOne", (req, res) => {
  const text = req.body.text;
  const directoryPath = path.join(
    __dirname,
    "uploads/student1/FileUploadedViaInputArea_VeryDifferentFileName.js"
  );
  fs.writeFileSync(directoryPath, text);
});

app.post("/uploadTextTwo", (req, res) => {
  const text = req.body.text;
  const directoryPath = path.join(
    __dirname,
    "uploads/student2/FileUploadedViaInputArea_VeryDifferentFileName.js"
  );
  fs.writeFileSync(directoryPath, text);
});

app.post("/create", (req, res) => {
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;

  db.query(
    "INSERT INTO users (Email, FirstName, LastName, Password) VALUES (?,?,?,?)",
    [email, firstName, lastName, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ message: "User already exists!" });
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.post("/compare", (req, res) => {
  const filter1 = req.body.filter1;
  const filter2 = req.body.filter2;
  try {
    const result = runPlagiarism(filter1, filter2);
    res.json({ finalResult: result });
  } catch (err) {
    if (err instanceof SyntaxError) {
      res.json({ err: "Invalid File, code has syntax errors !" });
    }
  }
});

app.post("/review", (req, res) => {
  const resultStudentOne = readStudentOne();
  const resultStudentTwo = readStudentTwo();

  if (
    Object.keys(resultStudentOne).length == Object.keys(diffLinesOne).length &&
    Object.keys(resultStudentTwo).length == Object.keys(diffLinesTwo).length
  ) {
    var resultStudentOneValues = Object.keys(resultStudentOne).map(function (
      key
    ) {
      return resultStudentOne[key];
    });

    var resultStudentTwoValues = Object.keys(resultStudentTwo).map(function (
      key
    ) {
      return resultStudentTwo[key];
    });

    var linesForStudentOneValues = Object.keys(diffLinesOne).map(function (
      key
    ) {
      return diffLinesOne[key];
    });

    var linesForStudentTwoValues = Object.keys(diffLinesTwo).map(function (
      key
    ) {
      return diffLinesTwo[key];
    });

    res.json({
      codeStudent1: resultStudentOneValues,
      codeStudent2: resultStudentTwoValues,
      linesStudent1: linesForStudentOneValues,
      linesStudent2: linesForStudentTwoValues,
    });
  } else {
    res.json({
      codeStudent1: resultStudentOneValues,
      codeStudent2: resultStudentTwoValues,
    });
  }
});

app.post("/logout", (req, res) => {
  deleteFilesForStudentOne();
  deleteFilesForStudentTwo();
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE Email = ? AND Password = ?",
    [email, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination!" });
      }
    }
  );
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
