import { FileDialog } from "./file-dialog.js";
import * as Canvas from "./canvas.js";

const open_button: HTMLButtonElement = document.getElementById("open-button") as HTMLButtonElement;

if (!open_button) {
    console.warn("No open button found.");
}

open_button.onclick = function() {
    var file_dialog: FileDialog = new FileDialog(".gsc");
    file_dialog.open();
}

// export const canvas: Canvas.CanvasRenderer = new Canvas.CanvasRenderer("render-window");

// canvas.renderer.setAnimationLoop(function() {
//     canvas.render();
// });
