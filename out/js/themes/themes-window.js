import { THEMES } from "./themes.js";
const DEFAULT_THEME = THEMES[4];
class ThemeButton {
    constructor(theme) {
        this.theme = theme;
        this.dom = document.createElement("button");
        this.dom.className = "theme-button";
    }
}
document.body.onload = (_e) => {
    const themes_button = document.querySelector("button[class='themes-button']");
    if (!themes_button) {
        console.warn("No themes button found.");
        return;
    }
    const root = document.querySelector(":root");
    if (!root) {
        console.warn("No root element found.");
        return;
    }
    setTheme(root, DEFAULT_THEME);
    const themes_window = document.getElementById("themes-window");
    if (!themes_window) {
        console.warn("No themes window found.");
        return;
    }
    const themes_exit_button = document.getElementById("themes-exit");
    if (!themes_exit_button) {
        console.warn("No exit button for themes window found.");
        return;
    }
    const themes_table = document.querySelector("table[id=themes-table]");
    if (!themes_table) {
        console.warn("No themes table found.");
        return;
    }
    themes_button.onclick = (_e) => {
        themes_window.style.display = "block";
    };
    themes_exit_button.onclick = (_e) => {
        themes_window.style.display = "none";
    };
    for (var i = 0; i < THEMES.length; i++) {
        var theme = THEMES[i];
        if (!theme) {
            console.warn("Error finding theme.");
            return;
        }
        var theme_button = new ThemeButton(theme);
        theme_button.dom.innerText = theme_button.theme.display_name;
        theme_button.dom.value = i.toString();
        var table_row = document.createElement("tr");
        var table_cell = document.createElement("td");
        themes_table.appendChild(table_row);
        table_row.appendChild(table_cell);
        table_cell.appendChild(theme_button.dom);
    }
    var theme_buttons = document.querySelectorAll("button[class='theme-button']");
    theme_buttons.forEach((input) => input.addEventListener("click", (e) => {
        setTheme(root, THEMES[parseInt(e.target["value"])]);
    }));
};
function setTheme(root, theme) {
    root.style.setProperty("--primary-color", theme.PRIMARY_COL);
    root.style.setProperty("--secondary-color", theme.SECOND_COL);
    root.style.setProperty("--tertiary-color", theme.TERTIARY_COL);
    root.style.setProperty("--font-color", theme.FONT_COL);
}
