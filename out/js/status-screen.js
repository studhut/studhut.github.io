export const status_screen = document.getElementById("status-screen");
if (!status_screen) {
    console.warn("No status screen found.");
}
export function showStatusScreen(text) {
    status_screen.innerText = text;
    status_screen.style.display = "flex";
}
export function hideStatusScreen() {
    status_screen.style.display = "none";
}
