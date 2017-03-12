import * as Futil from "../../src/futil";

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
 * Reads an object through a given property lense.
 * @param propLense: A property lense function returning property name or
 * a path to nested property.
 * @param obj: Object to which the lense is applied.
 * @return A value obtained through a given lense or a deep copy if a lense
 * is empty. 'undefined' if any of parameters is 'undefined' or if a lense 
 * with invalid path is given.
 */
export function read(propLense, obj) {
    if (propLense === undefined || obj === undefined)
        return undefined;
    var lense = propLense();
    var objClone = Futil.deepClone(obj);
    if (!Array.isArray(lense))
        lense = [lense];
    return readInner(lense, objClone);
}

function readInner(lense, obj) {
    if (lense === undefined || obj === undefined)
        return undefined;
    if (lense.length === 0)
        return obj;
    obj = obj[lense[0]];
    lense.shift();
    return readInner(lense, obj);
}

/**
 * Creates a deep copy of an object and writes a given value through 
 * a given property lense.
 * @param propLense: A property lense function returning property name or
 * a path to nested property.
 * @param obj: Object to which the lense is applied.
 * @param value: A value that is being written.
 * @return A new instance of an object with value written to it through the given
 * lense. 'undefined' if any of parameters is 'undefined', if a lense with invalid
 * path is given or if a lense is empty.
 */
export function write(propLense, obj, value) {
    if (propLense === undefined || obj === undefined)
        return undefined;
    var lense = propLense();
    var objClone = Futil.deepClone(obj);
    if (!Array.isArray(lense))
        lense = [lense];
    return writeInner(lense, objClone, value, objClone);
}

function writeInner(lense, obj, value, returnValue) {
    if (lense === undefined || obj === undefined)
        return undefined;
    if (lense.length === 0)
        return undefined;
    if (lense.length === 1) {
        obj[lense[0]] = value;
        return returnValue;
    }
    obj = obj[lense[0]];
    lense.shift();
    return writeInner(lense, obj, value, returnValue);
}