import * as Hex from "./hex-utils.js";
import * as Header from "./header.js";

class FileDialog {
    constructor(id = "file-dialog") {
        this.id = id;

        this.html_element = document.createElement("input");
        this.html_element.type = "file";

        this.html_element.accept = ".gsc";
    }

    open() {
        this.html_element.click();
    }

    read(e) {
        let loading_screen = document.getElementById("loading-screen");

        if (loading_screen) {
            loading_screen.style.display = "block";
        } else {
            console.warn("No loading screen found.");
        }

        var file = e.target.files[0];
        if (!file) {
            console.log("No file found");
            return;
        }

        console.log(file);

        var reader = new FileReader();
        reader.readAsText(file);

        reader.onload = function (e) {
            var contents = e.target.result;

            var content_array = Hex.strToInt(contents);

            if (loading_screen) {
                loading_screen.style.display = "none";
            }

            // Determine scene format (TCS or LIJ)
            let leading_four = Hex.ASCIIFromRange(content_array, 0, 3);

            Header.checkNU20Header(leading_four);
            console.log(Header.SCENE_FORMAT);
        };
    }
}

let open_file_dialog = new FileDialog("open-dialog");

open_file_dialog.html_element.addEventListener("input", function (e) {
    open_file_dialog.read(e);
});

let open_button = document.getElementById("open-button");

open_button.onclick = function () {
    open_file_dialog.open();
};
