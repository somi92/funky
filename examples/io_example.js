var Funky = require("./../dist/funky.min");
var Students = require("./student");

var mockStorage = Students;

var getStudentFromStorage = function (id) {
    return function () {
        return mockStorage.filter(e => e.id == id)[0];
    };
}

var saveStudentToStorage = function (student) {
    var index = mockStorage.findIndex(e => e.id == student.id);
    mockStorage[index] = student;
}

var upgradeYear = function (student) {
    student.year += 1;
    return student;
}

/**
 * IO monad wraps a function with side effects making it possible to chain together pure and impure
 * computations and executing them in one step.  
 */
function demoIOMonad() {
    console.log("Year: " + mockStorage[0].year);
    var updateComputation = Funky.IO.from(getStudentFromStorage(100)).map(upgradeYear).map(saveStudentToStorage);
    updateComputation.run();
    console.log("Year: " + mockStorage[0].year);
}

demoIOMonad();