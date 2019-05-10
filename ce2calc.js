'use strict';

// enhance String methods

String.prototype.isNegative = () => {
    console.log("isNegative ?", this, typeof this, '' + this, typeof ('' + this), String(this));
    'use strict';
    return this.charAt(0) === "-";
};

String.prototype.isInfinite = () => {
    return this === "∞";
};

String.prototype.abs = () => {
    if (this.isNegative()) {
        return this.substring(1);
    } else {
        return this;
    }
};

const isNegative = (str) => {
    return str.charAt(0) === "-";
};

const isInfinite = (str) => {
    return str === "∞";
};

const abs = (str) => {
    if (str.isNegative()) {
        return str.substring(1);
    } else {
        return str;
    }
};

// the 4 operations

const plus = (a, b) => {
    // specific cases
    if (a === "0") {
        // 0 + x => x
        return b;
    }
    if (b === "0") {
        // x + 0 => x
        return a;
    }
    if (isNegative(a)) {
        // -3 + x => x - 3
        return minus(b, abs(a));
    }
    if (isNegative(b)) {
        // x + -4 => x - 4
        return minus(a, abs(b));
    }
    // general case
    if (a.length > b.length) {
        b = b.padStart(a.length, '0');
    } else {
        a = a.padStart(b.length, '0');
    }
    let sum = "";
    let ret = 0;
    for (let i = a.length - 1; i >= 0; i--) {
        const s = Number(a.charAt(i)) + Number(b.charAt(i)) + ret;
        const d = s % 10;
        ret = (s > 9) ? 1 : 0;
        sum = d + sum;
    }
    return sum;
};

const minus = (a, b) => {
    // specific cases
    if (a === "0") {
        if (isNegative(b)) {
            return b.substring(1);
        } else {
            return "-" + b;
        }
    }
    if (b === "0") {
        return a;
    }
    // general case
};

const times = (a, b) => {
    // specific cases
    if (a === "0" || b === "0") {
        return 0;
    }
    if (b === "1") {
        return a;
    }
    if (a === "1") {
        return b;
    }
    // general case
};

const dividedby = (a, b) => {
    // specific cases
    if (a === "0") {
        return 0;
    }
    if (b === "1") {
        return a;
    }
    if (b === "0") {
        return "∞";
    }
    // general case
};

// multiple arguments for plus() and times()

const ma_plus = (...args) => {
    let sum = "0";
    args.forEach((a) => {
        sum = plus(sum, a);
    });
    return sum;
};

const ma_times = (...args) => {
    let product = "1";
    args.forEach((a) => {
        product = times(product, a);
    });
    return product;
};

// API

module.exports = {
    plus: ma_plus,
    minus: minus,
    times: ma_times,
    dividedby: dividedby
};
