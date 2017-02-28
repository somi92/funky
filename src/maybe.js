/**
 * @class Maybe
 */
class Maybe {

    static just(obj) {
        return new Just(obj);
    }

    static nothing() {
        return new Nothing();
    }

    static fromNullable(obj) {
        return obj ? Maybe.just(obj) : Maybe.nothing();
    }

    static of(obj) {
        return Maybe.just(obj);
    }

    get isJust() {
        return false;
    }

    get isNothing() {
        return false;
    }
}

/**
 * @class Just
 */
class Just extends Maybe {

    constructor(val) {
        super();
        this._val = val;
    }

    get value() {
        return this._val;
    }

    map(func) {
        return Maybe.fromNullable(func(this._val));
    }

    chain(func) {
        return func(this._val);
    }

    getOrElse() {
        return this._val;
    }

    get isJust() {
        return true;
    }
}

/**
 * @class Nothing
 */
class Nothing extends Maybe {

    get value() {
        throw new TypeError("No value in Nothing");
    }
    
    map(func) {
        return this;
    }

    chain(func) {
        return this;
    }

    getOrElse(other) {
        return other;
    }
    
    isNothing() {
        return true;
    }
}

export {
    Maybe,
    Just,
    Nothing
};