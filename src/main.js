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

const box = new Canvas.Box(1, 1, 1, 0xffffff);
canvas.add(box.mesh);

const light = new Canvas.HemisphereLight(0xffffff, 0x000000, 5);
canvas.add(light.light);

canvas.renderer.setAnimationLoop(function() {
    box.mesh.rotation.x += 0.01;
    box.mesh.rotation.y += 0.01;

    canvas.render();
});