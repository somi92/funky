var Funky = require("./../dist/funky.min");
var Students = require("./student");

var mockStudentService = function (id) {
    return Students.filter(e => e.id == id)[0];
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

var getName = function (student) {
    return Funky.read(Funky.prop("name"), student);
};

var logError = function (message) {
    return Funky.tap(console.log)("ERROR LOG >> " + message + "\n");
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
 * It represents the logical disjunction between Left and Right side, with bias on the Right side (used for wrapping
 * successful computation results, Left side used for errors). The Left side can also be mapped over with a function
 * or can throw an exception.
 */
function demoEitherMonad() {
    /**
     * Fetch the student from a service and print report
     */
    fetchStudent(mockStudentService, 100).map(printReport).orElse(logError);
    /**
     * Fetch the student from a service that will fail due to network issue and log an error
     */
    fetchStudent(mockExceptionStudentService, 100).map(printReport).orElse(logError);
    /**
     * Fetch the student from a service that will return null and throw an exception
     */
    var name = fetchStudent(mockNullStudentService, 100).map(getName).getOrElseThrow("Cannot get student name, data not found");
    console.log(name);
}

demoEitherMonad();