import * as Hex from "./hex-utils.js";
import * as Project from "./project.js";
import * as Status from "./status-screen.js";

export class SceneReader {
    public file: Blob;
    public project: Project.Project;

    public CHUNK_SIZE: number;

    public header_loc: number;
    public buffer_pos: number;
    public pntr_loc: number;

    public NU20_INT: number;
    public nu20_loc: number;

    public PARSE_PNTR: boolean;

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
        await this.loadPointers();
    }

    async getChunk(start: number, end: number) {
        var chunk: ArrayBuffer = await this.file
            .slice(start, end + 1)
            .arrayBuffer();
        var chunk_array: Int8Array = new Int8Array(chunk);

        return chunk_array;
    }

    async getInt32() {
        var chunk: Int8Array = await this.getChunk(
            this.buffer_pos,
            this.buffer_pos + 3
        );
        var parsed: number = Hex.parseInt8Array(chunk);
        this.buffer_pos += 4;

        return parsed;
    }

    async getSceneFormat() {
        var header: number = Hex.parseInt8Array(await this.getChunk(0, 3));

        if (header == this.NU20_INT) {
            // LIJ1/LB1
            this.project.project_format = Project.FORMATS.LIJ1;
            this.nu20_loc = 0;
        } else {
            // TCS
            this.project.project_format = Project.FORMATS.TCS;
            this.buffer_pos = 0;
            this.nu20_loc = header + 4;
        }

        console.log("Project Format:", this.project.project_format);
        console.log("NU20 Location:", Hex.toHex(this.nu20_loc));
    }

    async loadPointers() {
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
        } else {
            this.PARSE_PNTR = false;
        }
    }

    async parsePNTRs() {
		Status.showStatusScreen("Loading pointers...");
        var num_pntrs: number = await this.getInt32();
        console.log("# of PNTRs:", num_pntrs);

        for (var i: number = 0; i < num_pntrs; i++) {
            var pos: number = this.buffer_pos;
            console.log(`Buffer Pos[${i}]:`, Hex.toHex(pos));
            var pntr_offset: number = await this.getInt32();
            console.log(`PNTR Offset[${i}]:`, Hex.toHex(pntr_offset));

            var pntr: number = pntr_offset + pos;
            console.log(`PNTR Location[${i}]:`, Hex.toHex(pntr));
            this.buffer_pos = pntr;

            var offset: number = await this.getInt32();
            if (offset != 0) {
                console.log(`Offset[${i}]:`, Hex.toHex(offset));
            }

            this.buffer_pos = pos + 4;
            console.log(`New Buffer Pos[${i}]:`, Hex.toHex(this.buffer_pos));
        }
		Status.hideStatusScreen();
    }

    async loadBlocks() {
        this.buffer_pos = this.header_loc - 8;
        this.buffer_pos = this.nu20_loc + 0x20;

        while (this.file.size - this.buffer_pos > 0) {

        }
    }
}
