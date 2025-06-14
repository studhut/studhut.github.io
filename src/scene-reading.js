import * as Hex from "./hex.js";

export class SceneReader {
    constructor(file) {
        this.file = file;
        this.scene_format = "?";

        this.CHUNK_SIZE = 8 * 1024; // 8KB

        this.header_loc = -1;
        this.buffer_pos = -1; // position where the file is read from
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
        const header_slice = await this.readSlice(0, 3);
        const header = Hex.arrToHex(new Uint8Array(await header_slice.slice.arrayBuffer()).reverse());
        const header_int = parseInt(header, 16);
        const header_string = Hex.hexToAscii(Hex.toLittle(header));

        if (header_string == "NU20") { // LIJ1/LB1
            this.scene_format = "LIJ";
            this.header_loc = 0;
        } else { // TCS
            this.scene_format = "TCS";
            this.header_loc = header_int + 4;
        }

        console.log("Scene Format:", this.scene_format);
        console.log("NU20 Location:", Hex.intToHex(this.header_loc, 4, true));
    }
}
