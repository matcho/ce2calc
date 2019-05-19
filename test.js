const lib = require("./ce2calc");

describe("additions", () => {
    const cases = [
        { a: "3",       b: "4",         r: "7" },
        { a: "3.5",     b: "0.04",      r: "3.54" }
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
        { a: "3.54",    b: "0.04",      r: "3.5" }
    ];
    for (const c of cases) {
        it (`${c.a} + ${c.b} = ${c.r}`, () => {
            expect(lib.minus(c.a, c.b)).toBe(c.r);
        });
    }
});

describe("multiplications", () => {
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

describe("divisions", () => {
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
