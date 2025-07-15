import { FileBuffer } from "../file-buffer.js";
import { Nu2MapData } from "../map-data/nu2-map-data.js";
import * as Utils from "../utils.js";
import { scene_reader } from "../file-dialog.js";

export class DefaultFileBlock {
    public file_buffer: FileBuffer;
    public block_length: number;
    public block_id: number;
    public block_offset: number;
    public map_data: Nu2MapData;

    public async readFromFile(
        file_buffer: FileBuffer,
        block_length: number,
        block_id: number,
        block_offset: number,
        map_data: Nu2MapData
    ) {
        this.block_id = block_id;
        this.block_length = block_length;
        this.block_offset = block_offset;
        this.file_buffer = file_buffer;
        this.map_data = map_data;

        console.log(
            "Loaded " +
                Utils.blockIdToString(Utils.flipEndian(block_id)) +
                " of length " +
                this.block_length +
                " at " +
                Utils.toHex(block_offset)
        );
    }

    public async readPntr(): Promise<number> {
        return await this.readPntrAt(this.file_buffer.position);
    }

    public async readPntrAt(offset: number): Promise<number> {
        this.file_buffer.position = offset;
        var temp: number = await this.file_buffer.getInt32();
        if (scene_reader.PARSE_PNTR) return temp;

        if (temp == 0) {
            return 0;
        } else {
            return offset + temp;
        }
    }
}
