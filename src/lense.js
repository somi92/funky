const Futil = require("futil");

/**
 * 
 */
var Lense = (function () {

    var prop = (propName) => {
        return function () {
            return propName;
        };
    };

    var read = (propLense, obj) => {
        var lense = propLense();
        var objClone = Futil.deepClone(obj);
        if (!Array.isArray(lense))
            return objClone[lense];
        lense.some((prop) => {
            var isObject = Futil.isObject(objClone);
            if (isObject)
                objClone = objClone[prop];
            return !isObject;
        });
        return objClone;
    }

    var write = (propLense, obj, value) => {
        
    }

    return {
        prop: prop,
        read: read,
        write: write
    };

})();

module.exports = Lense;