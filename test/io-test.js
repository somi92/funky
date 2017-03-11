import { IO } from "../src/io";
import { expect, assert } from "chai";
import { spy } from "sinon";

describe("testing IO monad", () => {

    it("static method 'of' returns instance of 'IO' with function returning the given parameter", () => {
        var io = IO.of("value");
        expect(io instanceof IO).to.equal(true);
        expect(io.effect()).to.equal("value");
    });

    it("static method 'from' returns instance of 'IO' with a given function", () => {
        var io = IO.from(() => 100);
        expect(io instanceof IO).to.equal(true);
        expect(io.effect()).to.equal(100);
        assert.throws(() => { IO.from(100) }, Error, "Function required for IO");
    });

    it("'map' method applies the given function on monad value and wrapps the result as 'IO' instance", () => {
        var io = IO.from(() => 10).map((val) => val * 5);
        expect(io instanceof IO).to.equal(true);
        expect(io.effect()).to.equal(50);
    });

    it("'chain' method applies the given function on monad value and returns the result", () => {
        var io = IO.from(() => 10).chain((val) => val * 5);
        expect(io instanceof IO).to.equal(false);
        expect(io).to.equal(50);
    });

    it("'run' method runs the monad value function and return its result", () => {
        var io = IO.from(() => 10).run();
        expect(io instanceof IO).to.equal(false);
        expect(io).to.equal(10);
    });
});