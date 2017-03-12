/**
 * Module implementing functional combinators for flow of control.
 */

/**
 * Identity combinator which creates a function that returns the item 
 * passed as a parameter.
 * @param Identity item.
 * @return Function returning an item given as a parameter.
 */
export function id(item) {
    return function () {
        return item;
    };
}

/**
 * K-combinator used to bridge void functions.
 * @param Target function that needs to be bridged.
 * @return Function which applies its args to target function and
 * returns them.
 */
export function tap(func) {
    return function (...args) {
        if (typeof func === 'function')
            func.apply(this, args);
        if (args.length === 1)
            return args[0];
        return args;
    };
}

/**
 * OR-combinator used for simple conditional logic.
 * @param func1 which return value is returned if it evaluates to true
 * @param func2 which return value is returned if func1 doesnt evalute
 * to true
 * @return Return value of func1 if it evaluates to true or return value
 * of func2
 */
export function alt(func1, func2) {
    return function (arg) {
        if (typeof func1 !== 'function' || typeof func2 !== 'function')
            return undefined;
        return func1(arg) || func2(arg);
    };
}

/**
 * S-combinator used to loop over a sequence of functions
 * @param sequence of functions with arity of one
 * @return Function which takes one parameter and runs the sequence
 * of function against a given a parameter
 */
export function seq() {
    const funcs = Array.prototype.slice.call(arguments);
    return function (arg) {
        funcs.forEach(function (fn) {
            if (typeof fn == 'function') {
                fn(arg);
            }
        });
    };
}

/**
 * @param join function which takes two arguments
 * @param func1 function which takes one argument
 * @param func2 function which takes one argument
 * @return Function which takes one argument, applies it to
 * func1 and func2 and calls join with results
 */
export function fork(join, func1, func2) {
    return function (val) {
        if (typeof join !== 'function')
            return undefined;
        return join(func1(val), func2(val));
    };
}