import { SceneReader } from "./scene-reading.js";

export class FileDialog {
    /**
     *
     * @param {string} accept
     */
    constructor(accept /* string */) {
        this.accept /* string */ = accept;

        this.html_element /* HTMLInputElement */ =
            document.createElement("input");
        this.html_element.accept = this.accept;
        this.html_element.type = "file";

        this.html_element.oninput = this.load;
    }

    open() {
        this.html_element.click();
    }

    async load(event) {
        var file = event.target.files[0];
        console.log("Loading Level:", file.name);

        var scene_reader = new SceneReader(file);

        scene_reader.getSceneFormat();
    }
}
