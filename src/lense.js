import * as Futil from "futil";

/**
 * 
 */
export function prop(propName) {
    return function () {
        return propName;
    };
}

export function read(propLense, obj) {
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

export function write(propLense, obj, value) {
    var lense = propLense();
    var objClone = Futil.deepClone(obj);
    if (!Array.isArray(lense)) {
        objClone[lense] = value;
        return objClone;
    }
    var temp = objClone;
    temp = lense.reduce((previous, current) => {
        var isObject = Futil.isObject(previous[current]);
        // if (isObject)
            previous = previous[current];
        return previous;
    }, objClone);
    console.log(temp);
    temp = value;
    console.log(temp);
    return objClone;
}