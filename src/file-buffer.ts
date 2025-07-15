import * as Utils from "./utils.js";

export class FileBuffer {
    public chunk_size: number;
    public position: number;
    private file: Blob;

    constructor(file: Blob, chunk_size: number) {
        this.chunk_size = chunk_size;
        this.file = file;
    }

    public async getChunk(start: number, end: number): Promise<Int8Array> {
        var chunk: ArrayBuffer = await this.file
            .slice(start, end + 1)
            .arrayBuffer();
        var chunk_array: Int8Array = new Int8Array(chunk);

        return chunk_array;
    }

    public async getInt32(): Promise<number> {
        var chunk: Int8Array = await this.getChunk(
            this.position,
            this.position + 3
        );
        var parsed: number = Utils.parseInt8Array(chunk);
        this.position += 4;

        return parsed;
    }
}
