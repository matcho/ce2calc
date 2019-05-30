const lib = require("./ce2calc");

describe("padding", () => {
    const cases = [
        { a: "3",       b: "4",         la: "3",        lb: "4",              ra: "3",             rb: "4" },
        { a: "3.5",     b: "0.04",      la: "3.5",      lb: "0.04",           ra: "3.50",          rb: "0.04" },
        { a: "-3423",   b: "4.515",     la: "-3423",    lb: "0004.515",       ra: "-3423.000",     rb: "4.515" },
        { a: "012320",  b: "-1.000001", la: "012320",   lb: "-000001.000001", ra: "012320.000000", rb: "-1.000001" },
    ];
    for (const c of cases) {
        it (`padLeft ${c.a}, ${c.b} => ${c.la}, ${c.lb}`, () => {
            expect(lib.padLeft(c.a, c.b)).toEqual([ c.la, c.lb ]);
        });
        it (`padRight ${c.a}, ${c.b} => ${c.ra}, ${c.rb}`, () => {
            expect(lib.padRight(c.a, c.b)).toEqual([ c.ra, c.rb ]);
        });
    }
});

describe("additions", () => {
    const cases = [
        { a: "3",       b: "4",         r: "7" },
        { a: "3.5",     b: "0.04",      r: "3.54" },
        { a: "3",       b: "-4",         r: "-1" },
    ];
    for (const c of cases) {
        it (`${c.a} + ${c.b} = ${c.r}`, () => {
            expect(lib.plus(c.a, c.b)).toBe(c.r);
        });
    }
});

describe("substractions", () => {
    const cases = [
        { a: "7",       b: "4",         r: "3" },
        { a: "3.54",    b: "0.04",      r: "3.5" },
        { a: "1",    b: "8",      r: "-7" },
        { a: "0",    b: "3",      r: "-3" },
        { a: "2.01",    b: "-3",      r: "5.01" },
        { a: "-3",    b: "0.04",      r: "-3.04" }
    ];
    for (const c of cases) {
        it (`${c.a} - ${c.b} = ${c.r}`, () => {
            expect(lib.minus(c.a, c.b)).toBe(c.r);
        });
    }
});

xdescribe("multiplications", () => {
    const cases = [
        { a: "3",       b: "4",         r: "12" },
        { a: "3.5",     b: "0.04",      r: "0.14" }
    ];
    for (const c of cases) {
        it (`${c.a} + ${c.b} = ${c.r}`, () => {
            expect(lib.times(c.a, c.b)).toBe(c.r);
        });
    }
});

xdescribe("divisions", () => {
    const cases = [
        { a: "12",       b: "4",         r: "3" },
        { a: "0.14",     b: "0.04",      r: "3.5" }
    ];
    for (const c of cases) {
        it (`${c.a} + ${c.b} = ${c.r}`, () => {
            expect(lib.dividedby(c.a, c.b)).toBe(c.r);
        });
    }
});
