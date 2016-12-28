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

}