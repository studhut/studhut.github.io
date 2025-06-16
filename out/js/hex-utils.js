export const parseInt8Array = (array, offset = 0) => {
    const view = new DataView(array.buffer, array.byteOffset, array.byteLength);
    return view.getInt32(offset, true);
};
export const toHex = (num) => {
    return "0x" + num.toString(16).toUpperCase();
};
