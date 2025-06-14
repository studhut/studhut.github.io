import * as Hex from "./hex-utils.js";
import * as Project from "./project.js";
export class SceneReader {
    constructor(file) {
        this.file = file;
        this.project = new Project.Project();
        this.CHUNK_SIZE = 8 * 1024; // 8KB
        this.header_loc = -1;
        this.buffer_pos = -1; // position where the file is read from
        this.pntr_loc = -1;
        this.NU20_INT = 808605006;
    }
    async loadScene() {
        await this.getSceneFormat();
    }
    async getChunk(start, end) {
        var chunk = await this.file.slice(start, end + 1).arrayBuffer();
        var chunk_array = new Uint8Array(chunk);
        return chunk_array;
    }
    async getSceneFormat() {
        var header = Hex.parseUint8Array(await this.getChunk(0, 3));
        if (header == this.NU20_INT) {
            // LIJ1/LB1
            this.project.project_format = Project.FORMATS.LIJ1;
            this.header_loc = 0;
        }
        else {
            // TCS
            this.project.project_format = Project.FORMATS.TCS;
            this.header_loc = header + 4;
        }
        console.log("Project Format:", this.project.project_format);
        console.log("NU20 Location:", Hex.toHex(this.header_loc));
    }
}
