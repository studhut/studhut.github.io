import { DefaultFileBlock } from "./default-block.js";
export class PortalFileBlock extends DefaultFileBlock {
    async readFromFile(file_buffer, block_length, block_id, block_offset, map_data) {
        super.readFromFile(file_buffer, block_length, block_id, block_offset, map_data);
        // Left off here (Line 16 on github)
    }
}
