/**
 * @class Maybe
 */
class Maybe {

    constructor(val) {
        this._val = val;
    }

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

    get value() {
        return this._val;
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
        super(val);
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

    getOrElse(_) {
        return this._val;
    }

    filter(f) {
        return Maybe.fromNullable(f(this._val) ? this._val : null);
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

    map(_) {
        return this;
    }

    chain(_) {
        return this;
    }

    getOrElse(other) {
        return other;
    }

    filter(f) {
        return this;
    }

    get isNothing() {
        return true;
    }
}

export {
    Maybe,
    Just,
    Nothing
};