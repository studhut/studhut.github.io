import * as Hex from "./hex-utils.js";
import * as Project from "./project.js";
import * as Status from "./status-screen.js";
export class SceneReader {
    constructor(file) {
        this.file = file;
        this.project = new Project.Project();
        this.CHUNK_SIZE = 8 * 1024; // 8KB
        this.header_loc = -1;
        this.buffer_pos = -1; // position where the file is read from
        this.pntr_loc = -1;
        this.NU20_INT = 808605006;
        this.nu20_loc = -1;
        this.PARSE_PNTR = true; // parse pointers at beginning (cuz tcs is dumb)
    }
    async loadScene() {
        await this.getSceneFormat();
        await this.loadBlocks();
    }
    async getChunk(start, end) {
        var chunk = await this.file
            .slice(start, end + 1)
            .arrayBuffer();
        var chunk_array = new Int8Array(chunk);
        return chunk_array;
    }
    async getInt32() {
        var chunk = await this.getChunk(this.buffer_pos, this.buffer_pos + 3);
        var parsed = Hex.parseInt8Array(chunk);
        this.buffer_pos += 4;
        return parsed;
    }
    async getSceneFormat() {
        var header = Hex.parseInt8Array(await this.getChunk(0, 3));
        if (header == this.NU20_INT) {
            // LIJ1/LB1
            this.project.project_format = Project.FORMATS.LIJ1;
            this.nu20_loc = 0;
        }
        else {
            // TCS
            this.project.project_format = Project.FORMATS.TCS;
            this.buffer_pos = 0;
            this.nu20_loc = header + 4;
        }
        console.log("Project Format:", this.project.project_format);
        console.log("NU20 Location:", Hex.toHex(this.nu20_loc));
    }
    async loadBlocks() {
        Status.showStatusScreen("Loading Pointers...");
        this.buffer_pos = this.nu20_loc + 0x18;
        console.log("NU20 + 0x18:", Hex.toHex(this.buffer_pos));
        this.pntr_loc = this.buffer_pos + (await this.getInt32());
        console.log("PNTR Location:", Hex.toHex(this.pntr_loc));
        this.header_loc = this.buffer_pos + (await this.getInt32());
        console.log("Header Location:", Hex.toHex(this.header_loc));
        if (this.project.project_format == Project.FORMATS.TCS) {
            this.buffer_pos = this.pntr_loc;
            this.PARSE_PNTR = true;
            await this.parsePNTRs();
        }
        else {
            this.PARSE_PNTR = false;
        }
        Status.hideStatusScreen();
    }
    async parsePNTRs() {
        var num_pntrs = await this.getInt32();
        console.log("# of PNTRs:", num_pntrs);
        for (var i = 0; i < num_pntrs; i++) {
            var pos = this.buffer_pos;
            console.log(`Buffer Pos[${i}]:`, Hex.toHex(pos));
            var pntr_offset = await this.getInt32();
            console.log(`PNTR Offset[${i}]:`, Hex.toHex(pntr_offset));
            var pntr = pntr_offset + pos;
            console.log(`PNTR Location[${i}]:`, Hex.toHex(pntr));
            this.buffer_pos = pntr;
            var offset = await this.getInt32();
            if (offset != 0) {
                console.log(`Offset[${i}]:`, Hex.toHex(offset));
            }
            this.buffer_pos = pos + 4;
            console.log(`New Buffer Pos[${i}]:`, Hex.toHex(this.buffer_pos));
        }
    }
}
