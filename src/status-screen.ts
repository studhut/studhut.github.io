export const status_screen: HTMLDivElement = document.getElementById(
    "status-screen"
) as HTMLDivElement;

if (!status_screen) {
    console.warn("No status screen found.");
}

export function showStatusScreen(text: string) {
    status_screen.innerText = text;
    status_screen.style.display = "flex";
}

export function hideStatusScreen() {
    status_screen.style.display = "none";
}
