export const arrToHex = (array, pad0x=false) => {
    var hex = array
        .reduce((acc, byte) => acc + byte.toString(16).padStart(2, "0"), "")
        .toUpperCase();

    if (pad0x) {
        hex = "0x" + hex;
    }

    return hex;
};

export const split = (hex) => {
    const array = hex.match(/.{1,2}/g);

    return array;
};

export const hexToAscii = (hex) => {
    const byte_strings = split(hex);
    const byte_nums = byte_strings.map((b) => parseInt(b, 16));
    const byte_array = new Uint8Array(byte_nums);

    return new TextDecoder().decode(byte_array);
};

export const intToHex = (num, byte_length, pad0x=false) => {
    const bytes = [];

    for (let b = 0; b < byte_length; b++) {
        const byte = num & 0xff;
        bytes.push(byte.toString(16).padStart(2, "0"));
        num = num >> 8;
    }

    var hex_string = bytes.join("").toUpperCase();

    if (pad0x) {
        hex_string = "0x" + hex_string;
    }

    return hex_string;
};

export const toLittle = (hex) => {
    const bytes = split(hex);
    const reversed = bytes.reverse();

    return reversed.join("");
};
