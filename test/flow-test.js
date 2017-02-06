import * as Flow from "../src/flow";
import { expect } from "chai";
import { spy } from "sinon";

describe("testing flow", () => {
    it("creates identity combinator and evaluates it", () => {
        var obj = { i: 10, s: "abc" };
        var arr = ["a", "b", 1, 2];
        expect(Flow.id(10)()).equal(10);
        expect(Flow.id(true)()).equal(true);
        expect(Flow.id("string")()).equal("string");
        expect(Flow.id(obj)()).equal(obj);
        expect(Flow.id(obj)()).deep.equal(obj);
        expect(Flow.id(arr)()).equal(arr);
        expect(Flow.id(arr)()).deep.equal(arr);
    });

    it("executes a tap combinator with valid function", () => {
        var func1 = spy();
        var result1 = Flow.tap(func1)("arg");
        expect(func1.calledOnce).equal(true);
        expect(func1.firstCall.args[0]).equal("arg");
        expect(result1).equal("arg");

        var func2 = spy();
        var result2 = Flow.tap(func2)("arg1", "arg2", "arg3");
        expect(func2.calledOnce).equal(true);
        expect(func2.firstCall.args[0]).equal("arg1");
        expect(func2.firstCall.args[1]).equal("arg2");
        expect(func2.firstCall.args[2]).equal("arg3");
        expect(result2).deep.equal(["arg1", "arg2", "arg3"]);
    });

    it("executes a tap combinator and skips invalid function", () => {
        expect(Flow.tap(undefined)("arg")).equal("arg");
        expect(Flow.tap("func")("arg")).equal("arg");
        expect(Flow.tap({})("arg")).equal("arg");
        expect(Flow.tap(100)("arg")).equal("arg");

        expect(Flow.tap(undefined)("arg1", "arg2", "arg3"))
            .deep.equal(["arg1", "arg2", "arg3"]);
        expect(Flow.tap("func")("arg1", "arg2", "arg3"))
            .deep.equal(["arg1", "arg2", "arg3"]);
        expect(Flow.tap({})("arg1", "arg2", "arg3"))
            .deep.equal(["arg1", "arg2", "arg3"]);
        expect(Flow.tap(100)("arg1", "arg2", "arg3"))
            .deep.equal(["arg1", "arg2", "arg3"]);
    });

    it("executes an alt combinator with valid functions", () => {
        var func1 = function (num) { return false; };
        var func2 = function (num) { return num; };
        
        var result = Flow.alt(func1, func2)(1);
        expect(result).equal(1);
        result = Flow.alt(func2, func1)(1);
        expect(result).equal(1);
    });

    it("executes an alt combinator with invalid functions", () => {
        var func1 = function (num) { return false; };
        var func2 = function (num) { return num; };
        
        var result = Flow.alt(undefined, func2)(1);
        expect(result).equal(undefined);
        result = Flow.alt(func1, undefined)(1);
        expect(result).equal(undefined);
    });

    it("executes an seq combinator with valid functions", () => {
        var func1 = spy();
        var func2 = spy();
        var func3 = spy();

        var arg1 = (a) => func1(a);
        var arg2 = (a) => func2(a);
        var arg3 = (a) => func3(a);

        Flow.seq(arg1, arg2, arg3)("arg");
        expect(func1.firstCall.args[0]).to.equal("arg");
        expect(func2.firstCall.args[0]).to.equal("arg");
        expect(func3.firstCall.args[0]).to.equal("arg");
    });

    it("executes an seq combinator and skips invalid functions", () => {
        var func1 = spy();
        var func2 = spy();
        var func3 = spy();

        var arg1 = (a) => func1(a);
        var arg2 = (a) => func2(a);
        var arg3 = (a) => func3(a);

        Flow.seq("func1", func2, undefined)("arg");
        expect(func1.called).to.equal(false);
        expect(func2.firstCall.args[0]).to.equal("arg");
        expect(func3.called).to.equal(false);
    });

    it("executes a fork combinator with valid functions", () => {
        var func1 = spy();
        var func2 = spy();
        var func3 = spy();

        var arg1 = (a) => func1(a);
        var arg2 = (a) => a + 10;
        var arg3 = (a) => a + 20;

        Flow.fork(func1, arg2, arg3)(1);
        expect(func1.called).to.equal(true);
        expect(func1.firstCall.args[0]).to.equal(11);
        expect(func1.firstCall.args[1]).to.equal(21);
    });

    it("executes a fork combinator with invalid function and returns 'undefined'", () => {
        var func1 = spy();
        var func2 = spy();
        var func3 = spy();

        var arg1 = (a) => func1(a);
        var arg2 = (a) => a + 10;
        var arg3 = (a) => a + 20;

        Flow.fork(func1, arg2, arg3)(1);
        expect(func1.called).to.equal(true);
        expect(func1.firstCall.args[0]).to.equal(11);
        expect(func1.firstCall.args[1]).to.equal(21);
    });
});
