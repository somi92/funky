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
    return Funky.Either
        .of(student)
        .map(getGrades)
        .map(calculateAverage)
        .map((val) => "\t\t" + val)
        .map(Funky.tap(console.log))
        .orElse((value) => {
            console.log("\tError calculating grade average, object value: " + value);
        });
}

function demoEitherMonad() {
    console.log("Either monad is used to wrap computations that may fail and provide additional information about the failure.");
    console.log("\n");
    console.log("\nCalculate average grade for a given student: ");
    console.log("\tName: " + Student.name);
    var grades = "";
    Student.grades.forEach(function (e) {
        grades += " " + e;
    });
    console.log("\tGrades: " + grades);
    console.log("\tAverage grade: ");
    calculateAverageGrade(Student);
    Student.grades = null;
    console.log("\nCalculate average grade for a student with null grades: ");
    calculateAverageGrade(Student);
    console.log("--------------------------------------------------------------------------------------------------------");
}

demoEitherMonad();