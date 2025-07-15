import * as Utils from "./utils.js";
export class FileBuffer {
    constructor(file, chunk_size) {
        this.chunk_size = chunk_size;
        this.file = file;
    }
    async getChunk(start, end) {
        var chunk = await this.file
            .slice(start, end + 1)
            .arrayBuffer();
        var chunk_array = new Int8Array(chunk);
        return chunk_array;
    }
    async getInt32() {
        var chunk = await this.getChunk(this.position, this.position + 3);
        var parsed = Utils.parseInt8Array(chunk);
        this.position += 4;
        return parsed;
    }
}
