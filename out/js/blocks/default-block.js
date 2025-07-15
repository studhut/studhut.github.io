import * as Utils from "../utils.js";
import { scene_reader } from "../file-dialog.js";
export class DefaultFileBlock {
    async readFromFile(file_buffer, block_length, block_id, block_offset, map_data) {
        this.block_id = block_id;
        this.block_length = block_length;
        this.block_offset = block_offset;
        this.file_buffer = file_buffer;
        this.map_data = map_data;
        console.log("Loaded " +
            Utils.blockIdToString(Utils.flipEndian(block_id)) +
            " of length " +
            this.block_length +
            " at " +
            Utils.toHex(block_offset));
    }
    async readPntr() {
        return await this.readPntrAt(this.file_buffer.position);
    }
    async readPntrAt(offset) {
        this.file_buffer.position = offset;
        var temp = await this.file_buffer.getInt32();
        if (scene_reader.PARSE_PNTR)
            return temp;
        if (temp == 0) {
            return 0;
        }
        else {
            return offset + temp;
        }
    }
}
