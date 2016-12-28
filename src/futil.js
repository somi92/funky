/**
 * 
 */
export function isObject(item) {
    return (item !== undefined && item !== null && typeof item === 'object' && !Array.isArray(item));
};

export function deepClone(obj) {
    if (obj === undefined || obj === null)
        return undefined;
    return JSON.parse(JSON.stringify(obj));
};