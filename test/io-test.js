import { IO } from "../src/io";
import { expect, assert } from "chai";
import { spy } from "sinon";

describe("testing IO monad", () => {

    it("static method 'of' returns object of correct type", () => {
        var io = IO.of("value");
        expect(io instanceof IO).to.equal(true);
        expect(io.effect()).to.equal("value");
    });

    it("static method 'from' return object of correct type", () => {
        var io = IO.from(() => 100);
        expect(io instanceof IO).to.equal(true);
        expect(io.effect()).to.equal(100);
        assert.throws(() => { IO.from(100) }, Error, "Function required for IO");
    });

    it("'map' method returns object of correct type", () => {
        var io = IO.from(() => 10).map((val) => val * 5);
        expect(io instanceof IO).to.equal(true);
        expect(io.effect()).to.equal(50);
    });

    it("'chain' method returns object of correct type", () => {
        var io = IO.from(() => 10).chain((val) => val * 5);
        expect(io instanceof IO).to.equal(false);
        expect(io).to.equal(50);
    });

    it("'run' method returns object of correct type", () => {
        var io = IO.from(() => 10).run();
        expect(io instanceof IO).to.equal(false);
        expect(io).to.equal(10);
    });
});