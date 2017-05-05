/**
 * @class Either
 */
class Either {

    constructor(val) {
        this._val = val;
    }

    static right(obj) {
        return new Right(obj);
    }

    static left(obj) {
        return new Left(obj);
    }

    static of(obj) {
        return obj ? Either.right(obj) : Either.left(obj);
    }

    get value() {
        return this._val;
    }
}

/**
 * @class Right
 */
class Right extends Either {

    constructor(val) {
        super(val);
    }

    get value() {
        return this._val;
    }

    map(func) {
        return Either.of(func(this._val));
    }

    chain(func) {
        return func(this._val);
    }

    filter(func) {
        return Either.of(func(this._val) ? this._val : null);
    }

    orElse(_) {
        return this;
    }

    getOrElse(_) {
        return this._val;
    }

    getOrElseThrow(_) {
        return this._val;
    }

    get isRight() {
        return true;
    }

    get isLeft() {
        return false;
    }
}

/**
 * @class Left
 */
class Left extends Either {

    constructor(val) {
        super(val);
    }

    get value() {
        throw new TypeError("No value in Left");
    }

    map(_) {
        return this;
    }

    chain(_) {
        return this;
    }

    filter(_) {
        return this;
    }

    orElse(f) {
        return f(this._val);
    }

    getOrElse(other) {
        return other;
    }

    getOrElseThrow(err) {
        throw new Error(err);
    }

    get isRight() {
        return false;
    }

    get isLeft() {
        return true;
    }
}

export {
    Either,
    Right,
    Left
};