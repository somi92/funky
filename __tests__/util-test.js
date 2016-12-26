const Futil = require("../src/futil");

describe("testing util", () => {

    describe("testing 'isObject'", () => {

        it("checks if 'undefined' and 'null' are objects", () => {
            expect(Futil.isObject(undefined)).toBe(false);
            expect(Futil.isObject(null)).toBe(false);
        });

        it("checks if primitives are objects", () => {
            expect(Futil.isObject(1)).toBe(false);
            expect(Futil.isObject(1.2)).toBe(false);
            expect(Futil.isObject(true)).toBe(false);
            expect(Futil.isObject("string")).toBe(false);
        });

        it("checks if array is object", () => {
            const arr = [1, "2", true, 4.5];
            expect(Futil.isObject(arr)).toBe(false);
        });

        it("checks if object is object", () => {
            const obj1 = new Object();
            const obj2 = { a: 1, b: { c: "s" } };
            expect(Futil.isObject(obj1)).toBe(true);
            expect(Futil.isObject(obj2)).toBe(true);
        });
    });

    describe("testing 'deepClone'", () => {

        it("clones flat object and returns new instance", () => {
            const obj = { a: 1, b: 2, c: "3" };
            const clone = Futil.deepClone(obj);
            expect(clone).not.toBe(obj);
            expect(clone).toEqual(obj);
        });

        it("clones complex object and returns new instance", () => {
            const obj = {
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
            const clone = Futil.deepClone(obj);
            expect(clone).not.toBe(obj);
            expect(clone["a"]).not.toBe(obj["a"]);
            expect(clone["a"]["a1"]).not.toBe(obj["a"]["a1"]);
            expect(clone["a"]["a1"]["a11"]).not.toBe(obj["a"]["a1"]["a11"]);
            expect(clone["a"]["a1"]["a11"]["a112"]).not.toBe(obj["a"]["a1"]["a11"]["a112"]);
            expect(clone["c"]).not.toBe(obj["c"]);
            expect(clone).toEqual(obj);
        });

        it("clones flat array and returns new instance", () => {
            const flatArr = [1, "2", true, { a: "a" }];
            const clone = Futil.deepClone(flatArr);
            expect(clone).not.toBe(flatArr);
            expect(clone).toEqual(flatArr);
        });

        it("clones complex array and returns new instance", () => {
            const complexArr = [
                [1, "2", true],
                {
                    a: "a",
                    b: [1, 2],
                    c: {
                        c1: "c1"
                    }
                },
                3
            ];
            const clone = Futil.deepClone(complexArr);
            expect(clone[0]).not.toBe(complexArr[0]);
            expect(clone[1]).not.toBe(complexArr[1]);
            expect(clone[1]["b"]).not.toBe(complexArr[1]["b"]);
            expect(clone[1]["c"]).not.toBe(complexArr[1]["c"]);
            expect(clone).toEqual(complexArr);
        });

        // TODO: test undefined clone
    });

});