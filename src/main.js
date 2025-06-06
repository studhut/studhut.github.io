class FileDialog {
    constructor(id="file-dialog") {
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
            console.warn("No loading screen found.")
        }
        
        var file = e.target.files[0];
        if (!file) {console.log("No file found"); return;}

        console.log(file);

        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;

            console.log(readAsHex(contents));

            if (loading_screen) {loading_screen.style.display = "none";}
        };

        reader.readAsText(file);
    }
}

function readAsHex(str) {
    let hex = [];
    for (let i = 0; i < str.length; i++) {
        const byte = str.charCodeAt(i);

        hex.push(byte);
    }

    return hex;
}

let save_file_dialog = new FileDialog("save-dialog");

save_file_dialog.html_element.addEventListener("input", function(e) {
    save_file_dialog.read(e);
});