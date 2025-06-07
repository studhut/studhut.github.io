export var SCENE_FORMAT = "TCS";

/**
 * @param {String} s
 * @returns {Boolean}
 */
export const checkNU20Header = (s) => {
    if (s == "NU20") {
        SCENE_FORMAT = "LIJ";

        return true;
    } else {
        SCENE_FORMAT = "TCS";

        return false;
    }
};
