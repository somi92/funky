const Flow = require("../src/flow");

describe("testing flow", () => {
    it("creates identity lense and evaluates it", () => {
        var obj = { i: 10, s: "abc"};
        var arr = ["a", "b", 1, 2];
        expect(Flow.id(10)).toBe(10);
        expect(Flow.id(true)).toBe(true);
        expect(Flow.id("string")).toBe("string");
        expect(Flow.id(obj)).toBe(obj);
        expect(Flow.id(obj)).toEqual(obj);
        expect(Flow.id(arr)).toBe(arr);
        expect(Flow.id(arr)).toEqual(arr);
    });
});
