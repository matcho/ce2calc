'use strict';

// utility methods for numerical strings

/** returns true if str is negative (starts with "-") */
const isNegative = (str) => {
    return str.charAt(0) === "-";
};

/** returns true if str represents infinity (positive or not) */
const isInfinite = (str) => {
    return str === "∞" || str === "-∞";
};

/**
 * Returns the absolute value of str (|str|)
 * @param string str 
 */
const abs = (str) => {
    if (str.isNegative()) {
        return str.substring(1);
    } else {
        return str;
    }
};

/**
 * Returns the opposite value of str (-str)
 * @param string str 
 */
const opposite = (str) => {
    if (str.isNegative()) {
        return str.substring(1);
    } else {
        return "-" + str;
    }
};

/**
 * Returns the integer part of given numerical string
 * @param string str 
 */
const integerPart = (str) => {
    if (str.indexOf(".") >= 0) {
        return str.substr(0, str.indexOf("."));
    } else {
        return str;
    }
};

/**
 * Returns the decimal part of given numerical string
 * @param string str 
 */
const decimalPart = (str) => {
    if (str.indexOf(".") >= 0) {
        return str.substr(str.indexOf(".") + 1);
    } else {
        return 0;
    }
};

/**
 * Pads a or b with "0"s on the left (integer) side, so that a and b
 * have the same length, preserving the numerical value
 * @param string a
 * @param string b
 * @returns string[2] modified a and b
 */
const padLeft = (a, b) => {
    if (integerLength(a) > integerLength(b)) {
        b = integerPart(b).padStart(integerLength(a), '0') + "." + decimalPart(b);
    } else {
        a = integerPart(a).padStart(integerLength(b), '0') + "." + decimalPart(a);
    }
    return [ a, b ];
};

/**
 * Pads a or b with "0"s on the right (decimal) side, so that a and b
 * have the same length, preserving the numerical value
 * @param string a
 * @param string b
 * @returns string[2] modified a and b
 */
const padRight = (a, b) => {
    let decA = decimalLength(a);
    let decB = decimalLength(b);
    if (decA > 0 || decB > 0) {
        if (decA === 0) {
            a = a + ".";
        }
        if (decB === 0) {
            b = b + ".";
        }
        if (decA > decB) {
            b = integerPart(b) + "." + decimalPart(b).padEnd(decA, 0);
        } else if (decB > decA) {
            a = integerPart(a) + "." + decimalPart(a).padEnd(decB, 0);
        }
    }
    return [ a, b ];
};

/**
 * Returns the length of the integer part of str
 * @param string str 
 */
const integerLength = (str) => {
    const ip = integerPart(str);
    return ip ? ip.length : 0;
};

/**
 * Returns the length of the decimal part of str
 * @param string str 
 */
const decimalLength = (str) => {
    const dp = decimalPart(str);
    return dp ? dp.length : 0;
};

// the 4 base operations

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
    [ a, b ] = padLeft(a, b);
    [ a, b ] = padRight(a, b);
    // compute
    let sum = "";
    let ret = 0;
    for (let i = a.length - 1; i >= 0; i--) {
        if (a.charAt(i) === ".") {
            // b.charAt(i) === "." too
            sum = "." + sum;
            continue;
        }
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
