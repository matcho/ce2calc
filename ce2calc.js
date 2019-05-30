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
    if (isNegative(str)) {
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
    if (isNegative(str)) {
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
    let ip = str;
    if (str.indexOf(".") >= 0) {
        ip = str.substr(0, str.indexOf("."));
    }
    if (isNegative(ip)) {
        ip = abs(ip);
    }
    return ip;
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
 * Returns the negation part of given numerical string ("-" or "")
 * @param string str 
 */
const negativePart = (str) => {
    if (str.length > 0 && str.charAt(0) === "-") {
        return "-";
    } else {
        return "";
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
        const dpB = decimalPart(b);
        b = negativePart(b) + integerPart(b).padStart(integerLength(a), '0')
        if (dpB) {
            b += "." + dpB;
        }
    } else {
        const dpA = decimalPart(a);
        a = negativePart(a) + integerPart(a).padStart(integerLength(b), '0');
        if (dpA) {
            a += "." + dpA;
        }
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
            b = negativePart(b) + integerPart(b) + "." + decimalPart(b).padEnd(decA, 0);
        } else if (decB > decA) {
            a = negativePart(a) + integerPart(a) + "." + decimalPart(a).padEnd(decB, 0);
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

/**
 * Removes leading and trailing "0"s, and possible trailing "."
 * @param string str 
 */
const clean = (str) => {
    const withoutZeroes = str.replace(/^0+|0+$/g, '');
    const withoutTrailingDot = (
        withoutZeroes.charAt(withoutZeroes.length - 1) === "."
        ? withoutZeroes.substring(0, withoutZeroes.length - 1)
        : withoutZeroes
    );
    return withoutTrailingDot;
};

// the 4 base operations

/** The addition operation */
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
        const mod = s % 10;
        ret = (s > 9) ? 1 : 0;
        sum = mod + sum;
    }
    return clean(sum);
};

/** The substraction operation */
const minus = (a, b) => {
    // specific cases
    if (a === "0") {
        return opposite(b);
    }
    if (b === "0") {
        return a;
    }
    // a - (-b) => a + b
    if (isNegative(b)) {
        return plus(a, abs(b));
    }
    // -a - b => -(a + b)
    if (isNegative(a)) {
        return "-" + plus(abs(a), b);
    }
    // general case
    [ a, b ] = padLeft(a, b);
    [ a, b ] = padRight(a, b);
    // compute
    let difference = "";
    let ret = 0;
    for (let i = a.length - 1; i >= 0; i--) {
        if (a.charAt(i) === ".") {
            // b.charAt(i) === "." too
            difference = "." + difference;
            continue;
        }
        if (a.charAt(i) === "-" || b.charAt(i) === "-") {
            continue;
        }
        let n = Number(a.charAt(i));
        if (n === 0) {
            n = 10;
        }
        const s = n - Number(b.charAt(i)) - ret;
        ret = (s < 0 || n === 10) ? 1 : 0;
        difference = abs(String(s)) + difference;
    }
    if (ret === 1) {
        difference = "-" + difference;
    }
    return clean(difference);
};

/** The multiplication operation */
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

/** The division operation */
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
    dividedby: dividedby,
    padLeft: padLeft,
    padRight: padRight
};
