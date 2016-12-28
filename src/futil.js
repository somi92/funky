/**
 * 
 */
var Futil = (function () {

    var isObject = (item) => {
        return (item !== undefined && item !== null && typeof item === 'object' && !Array.isArray(item));
    };

    var deepClone = (obj) => {
        if (obj === undefined || obj === null)
            return undefined;
        return JSON.parse(JSON.stringify(obj));
    };

    return {
        isObject: isObject,
        deepClone: deepClone
    };

})();

module.exports = Futil;