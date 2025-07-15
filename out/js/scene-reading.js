import * as Utils from "./utils.js";
import * as Project from "./project.js";
import * as Status from "./status-screen.js";
import { FileBuffer } from "./file-buffer.js";
export class SceneReader {
    constructor(file) {
        this.file = file;
        this.project = new Project.Project();
        this.buffer = new FileBuffer(this.file, this.CHUNK_SIZE);
        this.CHUNK_SIZE = 8 * 1024; // 8KB
        this.header_loc = -1;
        this.buffer.position = -1; // position where the file is read from
        this.pntr_loc = -1;
        this.NU20_INT = 808605006;
        this.nu20_loc = -1;
        this.PARSE_PNTR = true; // parse pointers at beginning (cuz tcs is dumb)
    }
    async loadScene() {
        await this.getSceneFormat();
        await this.loadPointers();
        await this.loadBlocks();
    }
    // async getChunk(start: number, end: number) {
    //     var chunk: ArrayBuffer = await this.file
    //         .slice(start, end + 1)
    //         .arrayBuffer();
    //     var chunk_array: Int8Array = new Int8Array(chunk);
    //     return chunk_array;
    // }
    // async getInt32() {
    //     var chunk: Int8Array = await this.getChunk(
    //         this.buffer.position,
    //         this.buffer.position + 3
    //     );
    //     var parsed: number = Utils.parseInt8Array(chunk);
    //     this.buffer.position += 4;
    //     return parsed;
    // }
    async getSceneFormat() {
        var header = Utils.parseInt8Array(await this.buffer.getChunk(0, 3));
        if (header == this.NU20_INT) {
            // LIJ1/LB1
            this.project.project_format = Project.FORMATS.LIJ1;
            this.nu20_loc = 0;
        }
        else {
            // TCS
            this.project.project_format = Project.FORMATS.TCS;
            this.buffer.position = 0;
            this.nu20_loc = header + 4;
        }
        console.log("Project Format:", this.project.project_format);
        console.log("NU20 Location:", Utils.toHex(this.nu20_loc));
    }
    async loadPointers() {
        this.buffer.position = this.nu20_loc + 0x18;
        console.log("NU20 + 0x18:", Utils.toHex(this.buffer.position));
        this.pntr_loc = this.buffer.position + (await this.buffer.getInt32());
        console.log("PNTR Location:", Utils.toHex(this.pntr_loc));
        this.header_loc = this.buffer.position + (await this.buffer.getInt32());
        console.log("Header Location:", Utils.toHex(this.header_loc));
        if (this.project.project_format == Project.FORMATS.TCS) {
            this.buffer.position = this.pntr_loc;
            this.PARSE_PNTR = true;
            await this.parsePNTRs();
        }
        else {
            this.PARSE_PNTR = false;
        }
    }
    async parsePNTRs() {
        Status.showStatusScreen("Loading pointers...");
        var num_pntrs = await this.buffer.getInt32();
        console.log("# of PNTRs:", num_pntrs);
        for (var i = 0; i < num_pntrs; i++) {
            var pos = this.buffer.position;
            console.log(`Buffer Pos[${i}]:`, Utils.toHex(pos));
            var pntr_offset = await this.buffer.getInt32();
            console.log(`PNTR Offset[${i}]:`, Utils.toHex(pntr_offset));
            var pntr = pntr_offset + pos;
            console.log(`PNTR Location[${i}]:`, Utils.toHex(pntr));
            this.buffer.position = pntr;
            var offset = await this.buffer.getInt32();
            if (offset != 0) {
                console.log(`Offset[${i}]:`, Utils.toHex(offset));
            }
            this.buffer.position = pos + 4;
            console.log(`New Buffer Pos[${i}]:`, Utils.toHex(this.buffer.position));
        }
        Status.hideStatusScreen();
    }
    async loadBlocks() {
        this.buffer.position = this.header_loc - 8;
        await this.loadBlockAtCurrentPos(true);
        this.buffer.position = this.nu20_loc + 0x20;
        while (this.file.size - this.buffer.position > 0) {
            if (!(await this.loadBlockAtCurrentPos(false)))
                break;
        }
    }
    async loadBlockAtCurrentPos(load_game_scene) {
        var save_pntr = this.buffer.position;
        var block_id = await this.buffer.getInt32();
        var block_size = await this.buffer.getInt32();
        var block_name = Utils.blockIdToString(Utils.flipEndian(block_id));
        console.log(block_name);
        if (block_size > 1e8)
            return false;
        if (block_size == 0)
            console.log("Read zero-size block");
        if ((block_id = this.NU20_INT))
            return false;
        var block = () => {
            switch (block_name) {
                case "PORT":
                    return;
                case "DISP":
                    return;
                case "TST0":
                    return;
                case "NTBL":
                    return;
                case "BNDS":
                    return;
                case "SST0":
                    return;
                case "BINH":
                    return;
                case "GSNH":
                    if (load_game_scene)
                        return;
                    else
                        return;
                case "INID":
                    return;
                case "MS00":
                    return;
                default:
                    return;
            }
        };
        this.buffer.position = save_pntr + block_size;
        return true;
    }
}
