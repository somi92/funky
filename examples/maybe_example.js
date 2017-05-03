var Funky = require("./../dist/funky.min");
var Student = require("./student");

var getGrades = function (student) {
    return Funky.read(Funky.prop("grades"), student);
};

var calculateAverage = function (arr) {
    var sum = 0;
    arr.forEach(function (e) {
        sum += e;
    });
    return sum / arr.length;
}

function calculateAverageGrade(student) {
    return Funky.Maybe
        .of(student)
        .map(getGrades)
        .map(calculateAverage)
        .getOrElse("Cannot calculate average grade, null value provided");
}

function demoMaybeMonad() {
    console.log("Maybe monad provides null tolerant processing pipeline. Null checking is provided automatically for wrapped values,");
    console.log("there is no need to use 'if' statements.\n");
    console.log("\nCalculate average grade for a given student: ");
    console.log("\tName: " + Student.name);
    var grades = "";
    Student.grades.forEach(function (e) {
        grades += " " + e;
    });
    console.log("\tGrades: " + grades);
    console.log("\tAverage grade: " + calculateAverageGrade(Student));
    console.log("\nCalculate average grade for a null student: ");
    console.log("\t" + calculateAverageGrade(null));
    console.log("--------------------------------------------------------------------------------------------------------");
}

demoMaybeMonad();