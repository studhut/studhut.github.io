export const parseInt8Array = (array: Int8Array, offset: number = 0) => {
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

export const flipEndian = (num: number): number => {
    var b0: number = (num >> 24) & 0xff;
    var b1: number = (num >> 8) & 0xff00;
    var b2: number = (num << 8) & 0xff0000;
    var b3: number = num << 24;

    return b0 | b1 | b2 | b3;
}

export const blockIdToString = (block_id: number): string => {
    var s: string = 
        String.fromCharCode(block_id >> 24) +
        String.fromCharCode((block_id >> 16) & 255) +
        String.fromCharCode((block_id >> 8) & 255) +
        String.fromCharCode(block_id & 255);
    
    return s;
};
