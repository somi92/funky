import * as Flow from "../src/flow";
import { expect } from "chai";

describe("testing flow", () => {
    it("creates identity lense and evaluates it", () => {
        var obj = { i: 10, s: "abc"};
        var arr = ["a", "b", 1, 2];
        expect(Flow.id(10)).equal(10);
        expect(Flow.id(true)).equal(true);
        expect(Flow.id("string")).equal("string");
        expect(Flow.id(obj)).equal(obj);
        expect(Flow.id(obj)).deep.equal(obj);
        expect(Flow.id(arr)).equal(arr);
        expect(Flow.id(arr)).deep.equal(arr);
    });
});
