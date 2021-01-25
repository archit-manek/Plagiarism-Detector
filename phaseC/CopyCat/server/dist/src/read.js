"use strict";
// let fs = require("fs");
Object.defineProperty(exports, "__esModule", { value: true });
exports.readFile = void 0;
// fs.readFile("../uploads/student1/test.js", "utf8", function (err, data) {
//   if (err) console.log("Error");
//   else {
//     let stringConversion = data.toString();
//     console.log(stringConversion);
//   }
// });
//var stringConversion = ""
function readFile(filePath, options) {
    let fs = require("fs");
    var stringConversion = "";
    fs.readFile(filePath, options, function (err, data) {
        console.log("in here");
        if (err)
            console.log("Error: ", err);
        else {
            stringConversion = data.toString();
            console.log("STRING INSIDE: ", stringConversion);
            return stringConversion;
        }
    });
    console.log("STRING: ", stringConversion);
    return stringConversion;
    /* console.log("STRING: ", stringConversion)
    return stringConversion;
    //console.log("STRING: ", stringConversion)
    //return stringConversion; */
}
exports.readFile = readFile;
//# sourceMappingURL=read.js.map