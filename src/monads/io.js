/**
 * @class IO
 */
class IO {

    constructor(effect) {
        if (!(effect instanceof Function)) {
            throw new Error('Function required for IO');
        }
        this.effect = effect;
    }

    static of(val) {
        return new IO(() => val);
    }

    static from(func) {
        return new IO(func);
    }

    map(func) {
        var self = this;
        return new IO(function () {
            return func(self.effect());
        });
    }

    chain(func) {
        return func(this.effect());
    }

    run() {
        return this.effect();
    }
}

export {
    IO
}