import { SceneReader } from "./scene-reading.js";

export class FileDialog {
    public accept: string
    public html_element: HTMLInputElement;

    constructor(accept: string) {
        this.accept = accept;

        this.html_element = document.createElement("input");
        this.html_element.accept = this.accept;
        this.html_element.type = "file";

        this.html_element.oninput = this.load;
    }

    open() {
        this.html_element.click();
    }

    async load(event: any) {
        var file = event.target.files[0];
        console.log("Loading Level:", file.name);

        var scene_reader: SceneReader = new SceneReader(file);

        scene_reader.loadScene();
    }
}
