export const PI = 3.141;

/**
 * Converts degrees to radians.
 * @param {Number} angle 
 * @returns {Number}
 */
export const degToRad = (angle) => {
    return angle * PI / 180;
}

/**
 * Converts radians to degrees.
 * @param {Number} angle 
 * @returns {Number}
 */
export const radToDeg = (angle) => {
    return angle * 180 / PI;
}