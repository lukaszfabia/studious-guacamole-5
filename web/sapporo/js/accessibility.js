/* jshint esversion: 6 */
function toggleTheme() {
    // get curr theme from local storage
    let isDark = localStorage.getItem("isDark");

    if (isDark === 'true') {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";

        localStorage.setItem("isDark", 'false');
    } else {

        document.body.style.backgroundColor = "#333333";
        document.body.style.color = "white";

        localStorage.setItem("isDark", 'true');
    }
}

function setFont() {
    const select = document.getElementById("font");
    const font = select.value;

    switch (font) {
        case "Arial":
            document.body.classList.remove("font-verdana");
            document.body.classList.remove("font-courier");
            document.body.classList.add("font-arial");
            break;

        case "Verdana":
            document.body.classList.remove("font-arial");
            document.body.classList.remove("font-courier");
            document.body.classList.add("font-verdana");
            break;

        case "Courier":
            document.body.classList.remove("font-arial");
            document.body.classList.remove("font-verdana");
            document.body.classList.add("font-courier");
            break;

        default:
            break;
    }
}

function setFontColor() {
    const select = document.getElementById("fontColor");
    const color = select.value;
    console.log(color);

    document.body.style.color = color;
}