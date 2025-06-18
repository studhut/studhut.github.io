import { SceneReader } from "./scene-reading.js";
import * as Status from "./status-screen.js";

export class FileDialog {
    public accept: string;
    public html_element: HTMLInputElement;

    constructor(accept: string) {
        this.accept = accept;

        this.html_element = document.createElement("input");
        this.html_element.accept = this.accept;
        this.html_element.type = "file";
    }

    open() {
        this.html_element.click();
    }

    async load(event: any) {
        Status.showStatusScreen("Loading file...");
        var file = event.target.files[0];
        console.log("Loading Level:", file.name);

        var scene_reader: SceneReader = new SceneReader(file);

        Status.hideStatusScreen();
        scene_reader.loadScene();
    }
}
