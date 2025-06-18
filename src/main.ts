import { FileDialog } from "./file-dialog.js";

const open_button: HTMLButtonElement = document.getElementById(
    "open-button"
) as HTMLButtonElement;

if (!open_button) {
    console.warn("No open button found.");
}

open_button.onclick = function () {
    var file_dialog: FileDialog = new FileDialog(".shproj");
    file_dialog.open();
};

document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key == "o") || e.key == "O") {
        e.preventDefault();

        console.log("Open project");

        var file_dialog: FileDialog = new FileDialog(".shproj");
        file_dialog.open();
    }
});

const import_button: HTMLButtonElement = document.getElementById(
    "import-button"
) as HTMLButtonElement;

if (!import_button) {
    console.warn("No open button found.");
}

import_button.onclick = function () {
    var file_dialog: FileDialog = new FileDialog(".gsc");
    file_dialog.html_element.oninput = file_dialog.load;
    
    file_dialog.open();
};

document.addEventListener("keydown", (e) => {
    if ((e.ctrlKey && e.key == "i") || e.key == "I") {
        e.preventDefault();

        console.log("Import level");

        var file_dialog: FileDialog = new FileDialog(".gsc");
        file_dialog.html_element.oninput = file_dialog.load;
        
        file_dialog.open();
    }
});
