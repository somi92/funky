import * as Futil from "../src/futil";
import { expect } from "chai";

describe("testing util", () => {

    describe("testing 'isObject'", () => {

        it("checks if 'undefined' and 'null' are objects", () => {
            expect(Futil.isObject(undefined)).equal(false);
            expect(Futil.isObject(null)).equal(false);
        });

        it("checks if primitives are objects", () => {
            expect(Futil.isObject(1)).equal(false);
            expect(Futil.isObject(1.2)).equal(false);
            expect(Futil.isObject(true)).equal(false);
            expect(Futil.isObject("string")).equal(false);
        });

        it("checks if array is object", () => {
            const arr = [1, "2", true, 4.5];
            expect(Futil.isObject(arr)).equal(false);
        });

        it("checks if object is object", () => {
            const obj1 = new Object();
            const obj2 = { a: 1, b: { c: "s" } };
            expect(Futil.isObject(obj1)).equal(true);
            expect(Futil.isObject(obj2)).equal(true);
        });
    });

    describe("testing 'deepClone'", () => {

        it("clones flat object and returns new instance", () => {
            const obj = { a: 1, b: 2, c: "3" };
            const clone = Futil.deepClone(obj);
            expect(clone).not.equal(obj);
            expect(clone).deep.equal(obj);
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
            expect(clone).not.equal(obj);
            expect(clone["a"]).not.equal(obj["a"]);
            expect(clone["a"]["a1"]).not.equal(obj["a"]["a1"]);
            expect(clone["a"]["a1"]["a11"]).not.equal(obj["a"]["a1"]["a11"]);
            expect(clone["a"]["a1"]["a11"]["a112"]).not.equal(obj["a"]["a1"]["a11"]["a112"]);
            expect(clone["c"]).not.equal(obj["c"]);
            expect(clone).deep.equal(obj);
        });

        it("clones flat array and returns new instance", () => {
            const flatArr = [1, "2", true, { a: "a" }];
            const clone = Futil.deepClone(flatArr);
            expect(clone).not.equal(flatArr);
            expect(clone).deep.equal(flatArr);
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
            expect(clone[0]).not.equal(complexArr[0]);
            expect(clone[1]).not.equal(complexArr[1]);
            expect(clone[1]["b"]).not.equal(complexArr[1]["b"]);
            expect(clone[1]["c"]).not.equal(complexArr[1]["c"]);
            expect(clone).deep.equal(complexArr);
        });

        it("clones undefined", () => {
            const clone = Futil.deepClone(undefined);
            expect(clone).deep.equal(undefined);
        });
    });

});