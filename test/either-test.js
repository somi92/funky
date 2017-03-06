import { Either, Right, Left } from "../src/either";
import { expect, assert } from "chai";
import { spy } from "sinon";

describe("testing Either monad", () => {

    it("static method 'right' returns object of 'Right' type", function () {
        var either = Either.right("value");
        expect(either instanceof Right).to.equal(true);
    });

    it("static method 'left' returns object of 'Left' type", function () {
        var either = Either.left("value");
        expect(either instanceof Left).to.equal(true);
    });

    it("static method 'of' returns object of correct type", () => {
        var eitherVal = Either.of("value");
        expect(eitherVal instanceof Right).to.equal(true);
        var eitherNull = Either.of(null);
        expect(eitherNull instanceof Left).to.equal(true);
    });

    it("'value' getter returns correct value", () => {
        var either1 = Either.of("value");
        expect(either1.value).to.equal("value");
        var either2 = Either.of(null);
        assert.throws(() => { either2.value }, TypeError, "No value in Left");
    });

    it("'map' method returns the correct object", () => {
        var either1 = Either.of(1);
        var func = (val) => val + 1;
        var res1 = either1.map(func);
        expect(res1 instanceof Right).to.equal(true);
        expect(res1.value).to.equal(2);
        var either2 = Either.of(null);
        var res2 = either2.map(func);
        expect(res2 instanceof Left).to.equal(true);
        assert.throws(() => { either2.value }, TypeError, "No value in Left");
    });

    it("'chain' method returns the correct object", () => {
        var either1 = Either.of(1);
        var func = (val) => val + 1;
        var res1 = either1.chain(func);
        expect(res1 instanceof Either).to.equal(false);
        expect(res1).to.equal(2);
        var either2 = Either.of(null);
        var res2 = either2.chain(func);
        expect(res2 instanceof Left).to.equal(true);
        assert.throws(() => { either2.value }, TypeError, "No value in Left");
    });

    it("'filter' method returns the correct object", () => {
        var either1 = Either.of(1);
        var func = (val) => val + 1;
        var funcNull = (val) => null;
        var res1 = either1.filter(func);
        expect(res1 instanceof Right).to.equal(true);
        expect(res1.value).to.equal(1);
        var res2 = either1.filter(funcNull);
        expect(res2 instanceof Left).to.equal(true);
        assert.throws(() => { res2.value }, TypeError, "No value in Left");
        var either3 = Either.of(null);
        var res3 = either3.filter(func);
        expect(res3 instanceof Left).to.equal(true);
        assert.throws(() => { res3.value }, TypeError, "No value in Left");
    });

    it("'getOrElse' method returns the correct object", () => {
        var either1 = Either.of(1);
        var res1 = either1.getOrElse();
        expect(res1 instanceof Either).to.equal(false);
        expect(res1).to.equal(1);
        var either2 = Either.of(null);
        var res2 = either2.getOrElse(100);
        expect(res2 instanceof Either).to.equal(false);
        expect(res2).to.equal(100);
    });

    it("'getOrElseThrow' method returns the correct object", () => {
        var either1 = Either.of(1);
        var res1 = either1.getOrElseThrow();
        expect(res1 instanceof Either).to.equal(false);
        expect(res1).to.equal(1);
        var either2 = Either.of(null);
        assert.throws(() => { either2.getOrElseThrow("Error message") }, Error, "Error message");
    });

    it("'isRight' getter returns boolean indicating if object is of Right type", () => {
        var either1 = Either.of(1);
        expect(either1 instanceof Right).to.equal(true);
        expect(either1.isRight).to.equal(true);
        var either2 = Either.of(null);
        expect(either2 instanceof Right).to.equal(false);
        expect(either2.isRight).to.equal(false);
    });

    it("'isLeft' getter returns boolean indicating if object is of Left type", () => {
        var either1 = Either.of(1);
        expect(either1 instanceof Left).to.equal(false);
        expect(either1.isLeft).to.equal(false);
        var either2 = Either.of(null);
        expect(either2 instanceof Left).to.equal(true);
        expect(either2.isLeft).to.equal(true);
    });
});