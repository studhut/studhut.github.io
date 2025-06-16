export const parseInt8Array = (
    array: Int8Array,
    offset: number = 0
) => {
    const view: DataView = new DataView(
        array.buffer,
        array.byteOffset,
        array.byteLength
    );
    return view.getInt32(offset, true);
};

export const toHex = (num: number) => {
    return "0x" + num.toString(16).toUpperCase();
};
