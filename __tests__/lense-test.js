const Lense = require("../src/lense");

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
        expect(propLense()).toBe(prop);
    });

    it("creates a nested property lense and evaluates it", () => {
        var nestedProp = ["prop1", "prop2", "prop3"];
        var propLense = Lense.prop(nestedProp);
        expect(propLense()).toBe(nestedProp);
    });

    it("creates a property lense with no value and expects \"undefined\"", () => {
        var propLense = Lense.prop();
        expect(propLense()).toBe(undefined);
    });

    it("reads an object through property lense", () => {
        var propLense = Lense.prop("prop1");
        expect(Lense.read(propLense, testObj)).toBe("value1");
    });

    it("reads an object through nested property lense", () => {
        var nestedPropertyLense = Lense.prop(["prop3", "prop32", "prop322", "prop3221"]);
        expect(Lense.read(nestedPropertyLense, testObj)).toBe("value3221");
    });
});