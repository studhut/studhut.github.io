import { FileDialog } from "./file-dialog.js";

const open_button /* HTMLButtonElement */ = document.getElementById("open-button");

if (!open_button) {
    console.warn("No open button found.");
}

open_button.onclick = function() {
    var file_dialog /* FileDialog */ = new FileDialog(".gsc");
    file_dialog.open();
}