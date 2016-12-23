const Util = require("../src/util");

describe("testing util", () => {

    describe("testing 'isObject'", () => {

        it("checks if 'undefined' and 'null' are objects", () => {
            expect(Util.isObject(undefined)).toBe(false);
            expect(Util.isObject(null)).toBe(false);
        });

        it("checks if primitives are objects", () => {
            expect(Util.isObject(1)).toBe(false);
            expect(Util.isObject(1.2)).toBe(false);
            expect(Util.isObject(true)).toBe(false);
            expect(Util.isObject("string")).toBe(false);
        });

        it("checks if array is object", () => {
            var arr = [1, "2", true, 4.5];
            expect(Util.isObject(arr)).toBe(false);
        });

        it("checks if object is object", () => {
            var obj1 = new Object();
            var obj2 = { a: 1, b: { c: "s" } };
            expect(Util.isObject(obj1)).toBe(true);
            expect(Util.isObject(obj2)).toBe(true);
        });
    });

    describe("testing 'deepClone'", () => {

        it("clones flat object and returns new instance", () => {
            var obj = { a: 1, b: 2, c: "3" };
            var clone = Util.deepClone(obj);
            expect(clone).not.toBe(obj);
            expect(clone).toEqual(obj);
        });

        it("clones 'one-level' object and returns new instance", () => {
            var obj = { 
                a: {
                    a1: {
                        a11: {
                            a111: "a111",
                            a112: {
                                a1121: "a1121"
                            }
                        }
                    }
                }, 
                b: 2, 
                c: { 
                    c1: 3 
                } 
            };
            var clone = Util.deepClone(obj);
            expect(clone).not.toBe(obj);
            expect(clone["a"]).not.toBe(obj["a"]);
            expect(clone["a"]["a1"]).not.toBe(obj["a"]["a1"]);
            expect(clone["a"]["a1"]["a11"]).not.toBe(obj["a"]["a1"]["a11"]);
            expect(clone["a"]["a1"]["a11"]["a112"]).not.toBe(obj["a"]["a1"]["a11"]["a112"]);
            expect(clone["c"]).not.toBe(obj["c"]);
            expect(clone).toEqual(obj);
        });
    });

});