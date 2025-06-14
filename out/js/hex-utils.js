export const parseUint8Array = (array, offset = 0) => {
    const view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getUint32(offset, true);
};
export const toHex = (num) => {
    return "0x" + num.toString(16).toUpperCase();
};
