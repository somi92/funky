import * as Lense from "../src/lense";

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

    it("creates a property lense and evaluates it", () => {
        var prop = "testProp";
        var propLense = Lense.prop(prop);
        expect(propLense()).toEqual(prop);
    });

    it("creates a nested property lense and evaluates it", () => {
        var nestedProp = ["prop1", "prop2", "prop3"];
        var propLense = Lense.prop(nestedProp);
        expect(propLense()).toEqual(nestedProp);
    });

    it("creates a property lense with no value and expects 'undefined'", () => {
        var propLense = Lense.prop();
        expect(propLense()).toEqual(undefined);
    });

    it("reads an object through property lense", () => {
        var propLense = Lense.prop("prop1");
        expect(Lense.read(propLense, testObj)).toEqual("value1");
    });

    it("reads an object through nested property lense", () => {
        var nestedPropertyLense = Lense.prop(["prop3", "prop32", "prop322", "prop3221"]);
        var nestedPropertyLense2 = Lense.prop(["prop3", "prop32"]);
        expect(Lense.read(nestedPropertyLense, testObj)).toEqual("value3221");
        expect(Lense.read(nestedPropertyLense2, testObj)).toEqual(testObj["prop3"]["prop32"]);
    });

    it("reads an object through incorrect lense and returns 'undefined'", () => {
        var nestedPropertyLense1 = Lense.prop("prop44");
        var nestedPropertyLense2 = Lense.prop(["prop3", "prop33"]);
        expect(Lense.read(nestedPropertyLense1, testObj)).toBe(undefined);
        expect(Lense.read(nestedPropertyLense2, testObj)).toBe(undefined);
    });

    it("checks that reading operation returns new instance", () => {
        var nestedPropertyLense = Lense.prop(["prop3", "prop32"]);
        expect(Lense.read(() => [], testObj)).not.toBe(testObj);
        expect(Lense.read(nestedPropertyLense, testObj)).not.toBe(testObj["prop3"]["prop32"]);
    });

    it("writes to an object through property lense", () => {
        var propLense = Lense.prop("prop1");
        expect(Lense.write(propLense, testObj, "newValue1")["prop1"]).toEqual("newValue1");
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
            "newValue3221")["prop3"]["prop32"]["prop322"]["prop3221"]).toEqual("newValue3221");
        expect(Lense.write(nestedPropertyLense2, testObj, 
            newObject)["prop3"]["prop32"]).toEqual(newObject);
    });
});