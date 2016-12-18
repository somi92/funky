var Lense = (function () {

    var prop = function (propName) {
        return function () {
            return propName;
        };
    };

    var read = function (propLense, obj) {
        var lense = propLense();
        if (!Array.isArray(lense))
            return obj[lense];
        propLense().forEach(function (prop) {
            if (typeof (obj) === 'object')
                obj = obj[prop];
        });
        return obj;
    }

    var write = function (propLense, obj, value) {

    }

    return {
        prop: prop,
        read: read,
        write: write
    };

})();

module.exports = Lense;