/**
 *
 * @param {Number} a
 * @returns {String}
 */
export const intToHexCode = (a) => {
    let hex_string = a.toString(16);

    return hex_string;
};

/**
 *
 * @param {String} c
 * @returns {String}
 */
export const charToInt = (c) => {
    let hex_string = c.charCodeAt(0);

    return hex_string;
};

/**
 *
 * @param {String} s
 * @returns {Array<Number>}
 */
export const strToInt = (s) => {
    let hex_array = [];

    for (let i = 0; i < s.length; i++) {
        let hex_char = charToInt(s[i]);

        hex_array.push(hex_char);
    }

    return hex_array;
};

/**
 *
 * @param {Number} i
 * @returns {String}
 */
export const intToStr = (i) => {
    let ASCII_string = String.fromCharCode(i);

    return ASCII_string;
};

/**
 *
 * @param {Array<Number>} array
 * @param {Number} start
 * @param {Number} end
 * @returns {String}
 */
export const ASCIIFromRange = (array, start, end) => {
    let string = "";

    for (let i = start; i < end + 1; i++) {
        if (i > array.length) {
            console.warn("Reading over array size: stopping.");
        }

        string += intToStr(array[i]);
    }

    return string;
};
