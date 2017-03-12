import * as Lense from "../../src/lenses/lense";
import { expect } from "chai";

const testObj = {
    prop1: "value1",
    prop2: "value2",
    prop3: {
        prop31: "value31",
        prop32: {
            prop321: "value321",
            prop322: {
                prop3221: "value3221"
            }
        }
    }
};

describe("testing lense", () => {

    describe("testing 'prop'", () => {
        it("creates a property lense and evaluates it", () => {
            var prop = "testProp";
            var propLense = Lense.prop(prop);
            expect(propLense()).deep.equal(prop);
        });

        it("creates a nested property lense and evaluates it", () => {
            var nestedProp = ["prop1", "prop2", "prop3"];
            var propLense = Lense.prop(nestedProp);
            expect(propLense()).deep.equal(nestedProp);
        });

        it("creates a property lense with no value and expects 'undefined'", () => {
            var propLense = Lense.prop();
            expect(propLense()).deep.equal(undefined);
        });
    });

    describe("testing 'read'", () => {
        it("reads an object through property lense", () => {
            var propLense = Lense.prop("prop1");
            expect(Lense.read(propLense, testObj)).deep.equal("value1");
        });

        it("reads an object through nested property lense", () => {
            var nestedPropertyLense = Lense.prop(["prop3", "prop32", "prop322", "prop3221"]);
            var nestedPropertyLense2 = Lense.prop(["prop3", "prop32"]);
            expect(Lense.read(nestedPropertyLense, testObj)).deep.equal("value3221");
            expect(Lense.read(nestedPropertyLense2, testObj)).deep.equal(testObj["prop3"]["prop32"]);
        });

        it("reads an object through incorrect lense and returns 'undefined'", () => {
            var nestedPropertyLense1 = Lense.prop("prop44");
            var nestedPropertyLense2 = Lense.prop(["prop3", "prop33"]);
            var nestedPropertyLense3 = Lense.prop(["prop4", "prop32"]);
            expect(Lense.read(nestedPropertyLense1, testObj)).equal(undefined);
            expect(Lense.read(nestedPropertyLense2, testObj)).equal(undefined);
            expect(Lense.read(nestedPropertyLense3, testObj)).equal(undefined);
        });

        it("returns 'undefined' when given 'undefined' parameters", () => {
            var propLense = Lense.prop("prop1");
            expect(Lense.read(undefined, testObj)).equal(undefined);
            expect(Lense.read(propLense, undefined)).equal(undefined);
        });

        it("returns a clone of an object when given an empty lense", () => {
            var result = Lense.read(() => [], testObj);
            expect(result).not.equal(testObj);
            expect(result).deep.equal(testObj);
        });

        it("checks that reading operation does not mutate object", () => {
            var nestedPropertyLense = Lense.prop(["prop3", "prop32"]);
            expect(Lense.read(() => [], testObj)).not.equal(testObj);
            expect(Lense.read(nestedPropertyLense, testObj)).not.equal(testObj["prop3"]["prop32"]);
        });
    });

    describe("testing 'write'", () => {

        it("writes to an object through property lense", () => {
            var propLense = Lense.prop("prop1");
            expect(Lense.write(propLense, testObj, "newValue1")["prop1"]).deep.equal("newValue1");
        });

        it("writes to an object through nested property lense", () => {
            var nestedPropertyLense1 = Lense.prop(["prop3", "prop32", "prop322", "prop3221"]);
            var nestedPropertyLense2 = Lense.prop(["prop3", "prop32"]);
            var newObject = {
                newProp321: "newValue321",
                newProp322: {
                    newProp3221: "newValue3221"
                }
            };
            expect(Lense.write(nestedPropertyLense1, testObj,
                "newValue3221")["prop3"]["prop32"]["prop322"]["prop3221"]).deep.equal("newValue3221");
            expect(Lense.write(nestedPropertyLense2, testObj,
                newObject)["prop3"]["prop32"]).deep.equal(newObject);
        });

        it("writes to an object through incorrect lense and returns 'undefined'", () => {
            var nestedPropertyLense1 = Lense.prop(["prop44", "prop3"]);
            var nestedPropertyLense2 = Lense.prop(["prop3", "prop32", "prop323", "prop322"]);
            expect(Lense.write(nestedPropertyLense1, testObj, "newValue")).equal(undefined);
            expect(Lense.write(nestedPropertyLense2, testObj, "newValue")).equal(undefined);
        });

        it("writes a new property to an object through a lense ending with new property", () => {
            var newObject = {
                newProp321: "newValue321",
                newProp322: {
                    newProp3221: "newValue3221"
                }
            };
            var nestedPropertyLense1 = Lense.prop("prop4");
            var nestedPropertyLense2 = Lense.prop(["prop3", "prop32", "prop322"]);
            expect(Lense.write(nestedPropertyLense1, testObj, "value4")
            ["prop4"]).equal("value4");
            expect(Lense.write(nestedPropertyLense2, testObj, newObject)
            ["prop3"]["prop32"]["prop322"]).equal(newObject);
        });

        it("returns 'undefined' when given 'undefined' parameters or an empty lense", () => {
            var propLense = Lense.prop("prop1");
            expect(Lense.write(undefined, testObj, "newValue")).equal(undefined);
            expect(Lense.write(propLense, undefined, "newValue")).equal(undefined);
            expect(Lense.write(() => [], testObj, "newValue")).equal(undefined);
        });

        it("checks that writing operation does not mutate object", () => {
            var newObject = {
                prop321: "value321",
                prop322: {
                    prop3221: "value3221"
                }
            };
            var propLense = Lense.prop("prop1");
            var nestedPropertyLense = Lense.prop(["prop3", "prop32"]);
            var result1 = Lense.write(propLense, testObj, "value1");
            var result2 = Lense.write(nestedPropertyLense, testObj, newObject);
            expect(result1).deep.equal(testObj);
            expect(result1).not.equal(testObj);
            expect(result2["prop3"]["prop32"]).deep.equal(testObj["prop3"]["prop32"]);
            expect(result2["prop3"]["prop32"]).not.equal(testObj["prop3"]["prop32"]);
            expect(result2["prop3"]["prop32"]).deep.equal(newObject);
            expect(result2["prop3"]["prop32"]).equal(newObject);
        });
    });
});