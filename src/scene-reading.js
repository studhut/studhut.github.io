export class SceneReader {
    constructor(file) {
        this.file = file;
        this.scene_format = "?";
    }

    readSlice(start, end) {
        var slice = this.file.slice(start, end + 1);
        var return_content = {slice: slice, start: start, end: end };

        console.log(return_content);

        return return_content;
    }

    async getSceneFormat() {
        var header_slice = this.readSlice(0, 3);
        var header = await header_slice.slice.text();

        if (header == "NU20") {
            this.scene_format = "LIJ";
            console.log("Scene Format:", this.scene_format);
        }
    }
}
