import { FileBuffer } from "../file-buffer.js";
import { Nu2MapData } from "../map-data/nu2-map-data.js";
import { DefaultFileBlock } from "./default-block.js";

export class PortalFileBlock extends DefaultFileBlock {
    override async readFromFile(
        file_buffer: FileBuffer,
        block_length: number,
        block_id: number,
        block_offset: number,
        map_data: Nu2MapData
    ) {
        super.readFromFile(file_buffer, block_length, block_id, block_offset, map_data);
        // Left off here (Line 16 on github)
    }
}
