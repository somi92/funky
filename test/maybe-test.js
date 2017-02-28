import { Maybe, Just, Nothing } from "../src/maybe";
import { expect } from "chai";
import { spy } from "sinon";

describe("testing Maybe monad", () => {
    
    it("value getter returns the correct value", () => {
        var just = new Just("value");
        expect(just.value).to.equal("value");
    });
});