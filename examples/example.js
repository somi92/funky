var Funky = require("./../dist/funky.min");
var Student = require("./student");

var gradesGetter = function (student) {
    return Funky.read(Funky.prop("grades"), student);
};

function getGrades(student) {
    return gradesGetter(student);
}

function calculateAverage(arr) {
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
        .getOrElse("Null value provided");
}

console.log(calculateAverageGrade(Student));
console.log(calculateAverageGrade(null));