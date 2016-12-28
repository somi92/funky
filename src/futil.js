/**
 * Futil module containing some utility functions.
 * @module futil 
 */

/**
 * Check if item is object.
 * @param item: Item to be checked.
 * @return Boolean indicating whether an item is object or not. 
 */
function isObject(item) {
    return (item !== undefined && item !== null && typeof item === 'object' && !Array.isArray(item));
}

/**
 * Does a deep clone of an object returning a new instance. It uses JSON 
 * under the hood, so it only clones member properties and not member 
 * functions (methods). 
 * @param obj: An object to be cloned.
 * @return New instance of an object or 'undefined' if parameter provided
 * is 'undefined'.
 */
function deepClone(obj) {
    if (obj === undefined || obj === null)
        return undefined;
    return JSON.parse(JSON.stringify(obj));
}

export {
    isObject,
    deepClone
}