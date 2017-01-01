import * as Futil from "../src/futil";

/**
 * Module implementing basic lense functionalities.
 */

/**
 * Creates a property lense function.
 * @param propName: A string value representing property name, or an array
 * of string values representing path of nested property.
 * @return A closure function that returns the property/properties
 * given to it. 
 */
export function prop(propName) {
    return function () {
        return propName;
    };
}

/**
 * Reads a given object through a given property lense.
 * @param propLense: A property lense function returning property name or
 * a path to nested property.
 * @param obj: Object to which the lense is applied.
 * @return TODO
 */
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
    temp = value;
    return objClone;
}