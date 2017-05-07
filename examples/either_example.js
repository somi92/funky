var Funky = require("./../dist/funky.min");
var Student = require("./student");

var mockStudentService = function (id) {
    return Student;
}

var mockNullStudentService = function (id) {
    return null;
}

var mockExceptionStudentService = function (id) {
    throw new Error("Could not reach the server");
}

var printReport = function (student) {
    return Funky.tap((student) => {
        console.log("------------------------------");
        console.log("Name: " + student.name);
        console.log("School: " + student.school);
        console.log("Year: " + student.year);
        console.log("------------------------------\n");
    })(student);
}

var logError = function (message) {
    return Funky.tap(console.log)("Error >> " + message + "\n");
}

function fetchStudent(service, id) {
    try {
        return Funky.Either.fromNullable(service(id));
    } catch (e) {
        return Funky.Either.left(e.message);
    }
}

/**
 * Either monad is used to wrap computations that may fail and provide additional information about the failure.
 */
function demoEitherMonad() {
    /**
     * Fetch the student from a service
     */
    fetchStudent(mockStudentService, 100).map(printReport).orElse(logError);
    /**
     * Fetch the student from a service that will return null
     */
    fetchStudent(mockNullStudentService, 100).map(printReport).orElse(logError);
    /**
     * Fetch the student from a service that will fail due to network issue
     */
    fetchStudent(mockExceptionStudentService, 100).map(printReport).orElse(logError);
}

demoEitherMonad();