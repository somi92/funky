var Lense = (function () {

    var prop = function(propName) {
        return () => {
            return propName;
        };
    };

    var read = function(propLense, obj) {
        var lense = propLense();
        if (!Array.isArray(lense))
            return obj[lense];
        propLense().forEach(function(prop) {
            if (typeof(obj) === 'object') 
                obj = obj[prop];
        });
        return obj;
    }

    return {
        prop: prop,
        read: read
    }

})();

module.exports = Lense;