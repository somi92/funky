const Flow = require("../src/flow");

describe("testing flow", () => {
    it("creates identity lense and evaluates it", () => {
        expect(Flow.id(10)).toBe(10);
        expect(Flow.id("string")).toBe("string");
        expect(Flow.id({ a: 1, b: "abc"})).toEqual({ a: 1, b: "abc"});
    });
});
