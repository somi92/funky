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
 * TODO description
 */
function demoIOMonad() {
    console.log(mockStorage[0]);
    console.log();
    Funky.IO.from(getStudentFromStorage(100)).map(upgradeYear).map(saveStudentToStorage).run();
    console.log(mockStorage[0]);
}

demoIOMonad();