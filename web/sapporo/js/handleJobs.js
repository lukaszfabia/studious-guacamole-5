// createElement appendChild removeChild insertBefore, createTextNode, parentNode
/* jshint esversion: 6 */
function addNewLanguage() {
    const inputLang = document.getElementById("lang");
    const lang = inputLang.value.trim();


    if (lang === "") {
        alert("Please provide language e.g. Go");
        return;
    }

    const list = document.getElementById("lang-list");

    const element = document.createElement("li");

    const textNode = document.createTextNode(lang);
    element.appendChild(textNode);

    const btn = document.createElement("button");
    btn.textContent = "x";
    btn.style.backgroundColor = "red";
    btn.style.borderRadius = "40px";
    btn.style.marginLeft = "10px";

    // add remove btn by parent node
    btn.addEventListener("click", function () {
        const parent = btn.parentNode;
        list.removeChild(parent);
    });

    element.appendChild(btn);

    list.appendChild(element);

    const firstItem = list.firstChild;
    if (firstItem) {
        list.insertBefore(element, firstItem);
    } else {
        list.appendChild(element);
    }

    inputLang.value = "";
}
