var Futil = (function () {

    var isObject = (item) => {
        return (item !== undefined && item !== null && typeof item === 'object' && !Array.isArray(item));
    };

    var deepClone = (obj) => {
        return JSON.parse(JSON.stringify(obj));
    };

    return {
        isObject: isObject,
        deepClone: deepClone
    };

})();

module.exports = Futil;