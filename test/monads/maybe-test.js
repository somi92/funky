import { Maybe, Just, Nothing } from "../../src/monads/maybe";
import { expect, assert } from "chai";
import { spy } from "sinon";

describe("testing Maybe monad", () => {

    it("static method 'just' returns instance of 'Just'", () => {
        var maybe = Maybe.just("value");
        expect(maybe instanceof Just).to.equal(true);
    });

    it("static method 'nothing' returns instance of 'Nothing'", () => {
        var maybe = Maybe.nothing("value");
        expect(maybe instanceof Nothing).to.equal(true);
    });

    it("static method 'of' returns 'Just' or 'Nothing' depending on the value passed", () => {
        var maybeVal = Maybe.of("value");
        expect(maybeVal instanceof Just).to.equal(true);
        var maybeNull = Maybe.of(null);
        expect(maybeNull instanceof Nothing).to.equal(true);
    });

    it("'value' getter returns value from monad or throws error", () => {
        var maybe1 = Maybe.of("value");
        expect(maybe1.value).to.equal("value");
        var maybe2 = Maybe.of(null);
        assert.throws(() => { maybe2.value }, TypeError, "No value in Nothing");
    });

    it("'map' method applies the given function on monad value and returns wrapped result", () => {
        var maybe1 = Maybe.of(1);
        var func = (val) => val + 1;
        var res1 = maybe1.map(func);
        expect(res1 instanceof Just).to.equal(true);
        expect(res1.value).to.equal(2);
        var maybe2 = Maybe.of(null);
        var res2 = maybe2.map(func);
        expect(res2 instanceof Nothing).to.equal(true);
        assert.throws(() => { maybe2.value }, TypeError, "No value in Nothing");
    });

    it("'chain' method applies the given function on monad value and returns result", () => {
        var maybe1 = Maybe.of(1);
        var func = (val) => val + 1;
        var res1 = maybe1.chain(func);
        expect(res1 instanceof Maybe).to.equal(false);
        expect(res1).to.equal(2);
        var maybe2 = Maybe.of(null);
        var res2 = maybe2.chain(func);
        expect(res2 instanceof Nothing).to.equal(true);
        assert.throws(() => { maybe2.value }, TypeError, "No value in Nothing");
    });

    it("'getOrElse' method returns monad value or alternative object depending on monad type", () => {
        var maybe1 = Maybe.of(1);
        var res1 = maybe1.getOrElse(100);
        expect(res1 instanceof Maybe).to.equal(false);
        expect(res1).to.equal(1);
        var maybe2 = Maybe.of(null);
        var res2 = maybe2.getOrElse(100);
        expect(res2 instanceof Maybe).to.equal(false);
        expect(res2).to.equal(100);
    });

    it("'isJust' getter returns boolean indicating if monad is of Just type", () => {
        var maybe1 = Maybe.of(1);
        expect(maybe1 instanceof Just).to.equal(true);
        expect(maybe1.isJust).to.equal(true);
        var maybe2 = Maybe.of(null);
        expect(maybe2 instanceof Just).to.equal(false);
        expect(maybe2.isJust).to.equal(false);
    });

    it("'isNothing' getter returns boolean indicating if monad is of Nothing type", () => {
        var maybe1 = Maybe.of(1);
        expect(maybe1 instanceof Nothing).to.equal(false);
        expect(maybe1.isNothing).to.equal(false);
        var maybe2 = Maybe.of(null);
        expect(maybe2 instanceof Nothing).to.equal(true);
        expect(maybe2.isNothing).to.equal(true);
    });
});