import * as Hex from "./hex.js";

export class SceneReader {
    constructor(file) {
        this.file = file;
        this.scene_format = "?";

        this.CHUNK_SIZE = 8 * 1024; // 8KB

        this.header_loc = -1;
    }

    readSlice(start, end, log = false) {
        var slice = this.file.slice(start, end + 1);
        var return_content = { slice: slice, start: start, end: end };

        if (log) {
            console.log(return_content);
        }

        return return_content;
    }

    async getSceneFormat() {
        var header_slice = await this.readSlice(0, 3);
        var header = await header_slice.slice.text();

        if (header == "NU20") {
            this.scene_format = "LIJ";
            this.header_loc = 0;
        } else {
            await this.findSceneHeader();
        }

        console.log("Scene Format:", this.scene_format);
        console.log("Header Location:", Hex.intToHex(this.header_loc));
    }

    async findSceneHeader() {
        var offset = 0;

        while (offset < this.file.size) {
            offset += this.CHUNK_SIZE;

            var chunk_slice = await this.readSlice(
                offset,
                offset + this.CHUNK_SIZE
            );
            var chunk = await chunk_slice.slice.text();

            if (chunk.includes("NU20")) {
                this.header_loc = chunk.indexOf("NU20") + offset;
                this.scene_format = "TCS";

                return;
            }
        }
    }
}
