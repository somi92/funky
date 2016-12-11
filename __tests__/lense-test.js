const Lense = require('../src/lense');

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

test('creates a property lense and evaluates it', () => {
    var prop = 'testProp';
    var propLense = Lense.prop(prop);
    expect(propLense()).toBe(prop);
});

test('creates a nested property lense and evaluates it', function() {
    var nestedProp = ['prop1', 'prop2', 'prop3'];
    var propLense = Lense.prop(nestedProp);
    expect(propLense()).toBe(nestedProp);
});

test('creates a property lense with no value and expects \'undefined\'', function() {
    var propLense = Lense.prop();
    expect(propLense()).toBe(undefined);
});

test('reads an object through property lense', function() {
    var propLense = Lense.prop('prop1');
    expect(Lense.read(propLense, testObj)).toBe('value1');
});

test('reads an object through nested property lense', function() {
    var nestedPropertyLense = Lense.prop(['prop3', 'prop32', 'prop322', 'prop3221']);
    expect(Lense.read(nestedPropertyLense, testObj)).toBe('value3221');
});