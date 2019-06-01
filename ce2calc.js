'use strict';

// utility methods for numerical strings

/** returns true if str is negative (starts with "-") */
const isNegative = (str) => {
    return str.charAt(0) === "-";
};

/** returns true if str is positive (does not start with "-") */
const isPositive = (str) => {
    return str.charAt(0) !== "-";
};

/** returns true if str is even */
const isEven = (str) => {
    return Number(str.charAt(str.length - 1)) % 2 === 0;
};

/** returns true if str is odd */
const isOdd = (str) => {
    return Number(str.charAt(str.length - 1)) % 2 === 1;
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
 * Returns the integer part of given numerical string, without
 * the possible leading "-"
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
        return "";
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
            b = negativePart(b) + integerPart(b) + "." + decimalPart(b).padEnd(decA, '0');
        } else if (decB > decA) {
            a = negativePart(a) + integerPart(a) + "." + decimalPart(a).padEnd(decB, '0');
        }
    }
    return [ a, b ];
};

/**
 * Returns true if a > b
 * @param {string} a 
 * @param {string} b 
 */
const greaterThan = (a, b) => {
    [ a, b ] = padLeft(a, b);
    [ a, b ] = padRight(a, b);
    return a > b;
};

/**
 * Returns true if a < b
 * @param {string} a 
 * @param {string} b 
 */
const lowerThan = (a, b) => {
    [ a, b ] = padLeft(a, b);
    [ a, b ] = padRight(a, b);
    return a < b;
};

/**
 * Returns b if b < a, otherwise returns a
 * @param {string} a 
 * @param {string} b 
 */
const min = (a, b) => {
    return lowerThan(b, a) ? b : a;
};

/**
 * Returns b if b > a, otherwise returns a
 * @param {string} a 
 * @param {string} b 
 */
const max = (a, b) => {
    return greaterThan(b, a) ? b : a;
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
    const withLeadingZero = (
        withoutTrailingDot.charAt(0) === "."
        ? "0" + withoutTrailingDot
        : withoutTrailingDot
    );
    return withLeadingZero;
};

/**
 * Returns the position of the ${i}th caracter of ${a},
 * relatively to the decimal separator ("dot") of ${a}
 * ex:
 *  * 45, 1 => 0
 *  * 45, 0 => 1
 *  * 4.5, 2 => -1
 *  * 4.5, 1 => undefined
 *  * 12324.5, 1 => 3
 *  * 0.00000001, 3 => -2
 * @param {string} a 
 * @param {number} i position of the tested digit
 */
const positionToDot = (a, i) => {
    const pos = a.indexOf(".");
    const l = a.length;
    if (pos !== -1) {
        if (pos === i) {
            return undefined; // @TODO throw error ?
        } else {
            if (pos < i) {
                return (pos - i);
            } else { // pos > i
                return (pos - i - 1);
            }
        }
    } else {
        return l - (i + 1);
    }
};

/**
 * Multiplies n by 10^p
 * ex:
 *  * "3", 4 => 30000
 *  * "3", -2 => 0.03
 *  * "2533", -2 => 25.33
 *  * "2.30023", 2 => 230.023
 *  * "2.30023", 7 => 23002300
  * * "2.30023", -4 => 0.000230023
 * @param {string} n 
 * @param {number} p 
 */
const shiftByPowerOfTen = (n, p) => {
    if (p === 0) {
        return n;
    }
    const absN = abs(n);
    const l = absN.length;
    const dp = decimalPart(n);
    const ip = integerPart(n);
    const il = integerLength(n);
    const dl = decimalLength(n);
    const np = negativePart(n);
    // cases
    if (dp === "") {
        if (p > 0) {
            return np + absN.padEnd(l + p, '0');
        } else { // p < 0
            const absP = Math.abs(p);
            if (il > absP) {
                return np + absN.substring(0, absP) + "." + absN.substring(absP);
            } else {
                return np + "0." + absN.padStart(l + absP - 1, '0');
            }
        }
    } else { // dp !== ""
        if (p > 0) {
            // move decimal separator to the right
            let newDp = dp;
            if (dl > p) {
                newDp = dp.substring(0, p) + "." + dp.substring(p);
            } else {
                newDp = dp.padEnd(p, '0');
            }
            return np + ip + newDp;
        } else { // p < 0
            // move decimal separator to the left
            let newIp = ip;
            const absP = Math.abs(p);
            if (il > absP) {
                newIp = ip.substring(0, il - absP) + "." + ip.substring(il - absP);
            } else {
                newIp = "0." + ip.padStart(absP, '0');
            }
            return np + newIp + dp;
        }
    }
}

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
        sum = String(mod) + sum;
    }
    if (ret === 1) {
        sum = "1" + sum;
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
    // -a * -b => a * b
    if (isNegative(a) && isNegative(b)) {
        return times(abs(a), abs(b));
    }
    // -a * b => -(a * b)
    if (isNegative(a)) {
        return "-" + times(abs(a), b);
    }
    if (isNegative(b)) {
        return "-" + times(a, abs(b));
    }
    // general case
    let product = "0";
    let ret = 0;
    for (let i = a.length - 1; i >= 0; i--) {
        const ai = a.charAt(i);
        if (ai === ".") {
            continue;
        }
        const ptd = positionToDot(a, i);
        // multiply a's current digit with b
        let sum = "";
        for (let j = b.length - 1; j >= 0; j--) {
            const bj = b.charAt(j);
            if (bj === ".") {
                sum = "." + sum;
                continue;
            }
            const p = Number(ai) * Number(bj) + ret;
            const mod = p % 10;
            ret = Math.floor(p / 10);
            sum = String(mod) + sum;
        }
        if (ret > 0) {
            sum = String(ret) + sum;
            ret = 0;
        }
        // adjust sum by a power of 10 equal to ptd
        sum = shiftByPowerOfTen(sum, ptd);
        // add the resulting sum
        product = plus(product, sum);
    }

    return clean(product);

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

/** The power operation */
const power = (a, b) => {
    // specific cases
    if (a === "0") {
        return "0";
    }
    if (a === "1") {
        return "1";
    }
    if (b === "0") {
        return "1";
    }
    if (b === "1") {
        return a;
    }
    // a^-b = 1 / a^b
    if (lowerThan(b, "0")) {
        return dividedby(1, power(a, abs(b)));
    }
    // general case
    let result = a;
    for (let i=0; i < Number(b)-1; i++) {
        result = times(result, a);
    }
    return result;
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
    power: power,
    abs: abs,
    isNegative: isNegative,
    isPositive: isPositive,
    isEven: isEven,
    isOdd: isOdd,
    greaterThan: greaterThan,
    lowerThan: lowerThan,
    min: min,
    max: max,
    // for testing only
    padLeft: padLeft,
    padRight: padRight,
    positionToDot: positionToDot,
    shiftByPowerOfTen: shiftByPowerOfTen
};
