export const parseUint8Array = (
    array: Uint8Array | Uint16Array | Uint32Array,
    offset: number = 0
) => {
    const view: DataView = new DataView(
        array.buffer,
        array.byteOffset,
        array.byteLength
    );
    return view.getUint32(offset, true);
};

export const toHex = (num: number) => {
    return "0x" + num.toString(16).toUpperCase();
};
