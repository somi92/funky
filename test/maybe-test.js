import { Maybe, Just, Nothing } from "../src/maybe";
import { expect, assert } from "chai";
import { spy } from "sinon";

describe("testing Maybe monad", () => {

    it("static method 'just' of Maybe returns object of 'Just' type", () => {
        var maybe = Maybe.just("value");
        expect(maybe instanceof Just).to.equal(true);
    });

    it("static method 'nothing' of Maybe returns object of 'Nothing' type", () => {
        var maybe = Maybe.nothing("value");
        expect(maybe instanceof Nothing).to.equal(true);
    });

    it("static method 'of' of Maybe returns object of correct type", () => {
        var maybeVal = Maybe.of("value");
        expect(maybeVal instanceof Just).to.equal(true);
        var maybeNull = Maybe.of(null);
        expect(maybeNull instanceof Nothing).to.equal(true);
    });

    it("value getter returns correct value", () => {
        var maybe1 = Maybe.of("value");
        expect(maybe1.value).to.equal("value");
        var maybe2 = Maybe.of(null);
        assert.throws(() => { maybe2.value }, TypeError, "No value in Nothing");
    });
});