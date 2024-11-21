function validatePasswordInput() {
    const passwordField = document.getElementById("password");

    if (!passwordField.value.trim()) {
        passwordField.style.boxShadow = "inset 0 0 5px 2px red";
    } else {
        passwordField.style.boxShadow = "none";
    }
}

document.getElementById("password").addEventListener("blur", validatePasswordInput);
