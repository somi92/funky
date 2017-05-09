var Funky = require("./../dist/funky.min");
var Students = require("./student");

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
        .fromNullable(student)
        .map(getGrades)
        .map(calculateAverage)
        .getOrElse("Cannot calculate average grade, null value provided");
}

/**
 * Maybe monad handles nullable values and enables the creation of null tolerant processing pipeline. 
 * Null checking logic is provided automatically, there is no need to use 'if' statements.
 */
function demoMaybeMonad() {
    /**
     * Calculate average grade for a given student
     */
    var gradeAverage = calculateAverageGrade(Students[0]);
    console.log("Average grade: " + gradeAverage);
    /**
     * Calculate average grade for a null student
     */
    var gradeAverageNull = calculateAverageGrade(null);
    console.log(gradeAverageNull);
}

demoMaybeMonad();