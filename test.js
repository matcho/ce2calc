const lib = require("./ce2calc");

describe("padding :", () => {
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

describe("position to dot :", () => {
    const cases = [
        { a: "45",          i: 1,     p: 0 },
        { a: "45",          i: 0,     p: 1 },
        { a: "4.5",         i: 2,     p: -1 },
        { a: "4.5",         i: 1,     p: undefined },
        { a: "12324.5",     i: 1,     p: 3 },
        { a: "0.00000001",  i: 3,     p: -2 },
    ];
    for (const c of cases) {
        it (`positionToDot ${c.a}, ${c.i} => ${c.p}`, () => {
            expect(lib.positionToDot(c.a, c.i)).toEqual(c.p);
        });
    }
});

describe("shift by power of ten :", () => {
    const cases = [
        { n: "20",        p: -2,  r: "0.2" },
        { n: "3",         p: 4,   r: "30000" },
        { n: "3",         p: -2,  r: "0.03" },
        { n: "-3",        p: -2,  r: "-0.03" },
        { n: "2533",      p: -2,  r: "25.33" },
        { n: "2.30023",   p: 2,   r: "230.023" },
        { n: "2.30023",   p: 7,   r: "23002300" },
        { n: "2.30023",   p: -4,  r: "0.000230023" },
        { n: "-2.30023",  p: -4,  r: "-0.000230023" },
    ];
    for (const c of cases) {
        it (`shiftByPowerOfTen ${c.n}, ${c.p} => ${c.r}`, () => {
            expect(lib.shiftByPowerOfTen(c.n, c.p)).toEqual(c.r);
        });
    }
});

describe("additions :", () => {
    const cases = [
        { a: "3",       b: "4",         r: "7" },
        { a: "3",       b: "8",         r: "11" },
        { a: "3.5",     b: "0.04",      r: "3.54" },
        { a: "3",       b: "-4",         r: "-1" },
    ];
    for (const c of cases) {
        it (`${c.a} + ${c.b} = ${c.r}`, () => {
            expect(lib.plus(c.a, c.b)).toBe(c.r);
        });
    }
});

describe("substractions :", () => {
    const cases = [
        { a: "12",      b: "4",         r: "8" },
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

describe("multiplications :", () => {
    const cases = [
        { a: "2",       b: "16",        r: "32" },
        { a: "16",      b: "2",         r: "32" },
        { a: "3",       b: "4",         r: "12" },
        { a: "3",       b: "-4",        r: "-12" },
        { a: "3.5",     b: "0.04",      r: "0.14" },
        { a: "0.03",    b: "10",        r: "0.3" },
    ];
    for (const c of cases) {
        it (`${c.a} * ${c.b} = ${c.r}`, () => {
            expect(lib.times(c.a, c.b)).toBe(c.r);
        });
    }
});

describe("divisions :", () => {
    const cases = [
        { a: "12",       b: "4",         r: "3" },
        { a: "0.14",     b: "0.04",      r: "3.5" }
    ];
    for (const c of cases) {
        it (`${c.a} / ${c.b} = ${c.r}`, () => {
            const res = lib.dividedby(c.a, c.b)
            expect(res).toBe(c.r);
        });
    }
});

describe("power :", () => {
    const cases = [
        { a: "0",       b: "423",    r: "0" },
        { a: "-8.2823", b: "0",      r: "1" },
        { a: "3.5",     b: "1",      r: "3.5" },
        { a: "1",       b: "14",     r: "1" },
        { a: "2",       b: "10",     r: "1024" },
        { a: "-4",      b: "2",      r: "16" },
        { a: "-4",      b: "3",      r: "-64" },
        { a: "2",       b: "-3",     r: "0.125" },
    ];
    for (const c of cases) {
        it (`${c.a} ^ ${c.b} = ${c.r}`, () => {
            expect(lib.power(c.a, c.b)).toBe(c.r);
        });
    }
});