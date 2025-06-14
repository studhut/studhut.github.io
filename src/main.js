import { FileDialog } from "./file-dialog.js";
import * as Canvas from "./canvas.js";

const open_button = document.getElementById("open-button");

if (!open_button) {
    console.warn("No open button found.");
}

open_button.onclick = function() {
    var file_dialog = new FileDialog(".gsc");
    file_dialog.open();
}

export const canvas = new Canvas.CanvasRenderer("render-window");

canvas.renderer.setAnimationLoop(function() {
    canvas.render();
});