/* jshint esversion: 6 */
document.addEventListener('DOMContentLoaded', function () {
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailHelp = document.getElementById('emailHelp');
    const passwordHelp = document.getElementById('passwordHelp');
    const form = document.getElementById('loginForm');

    emailInput.addEventListener('focus', function () {
        emailHelp.style.display = 'block';
    });

    passwordInput.addEventListener('focus', function () {
        passwordHelp.style.display = 'block';
    });

    emailInput.addEventListener('blur', function () {
        emailHelp.style.display = 'none';
    });

    passwordInput.addEventListener('blur', function () {
        passwordHelp.style.display = 'none';
    });

    form.addEventListener('submit', function (event) {
        const confirmation = confirm("Want to submit?");
        if (!confirmation) {
            event.preventDefault();
        }
    });

    form.addEventListener('reset', function (event) {
        const confirmation = confirm("Want to reset?");
        if (!confirmation) {
            event.preventDefault();
        }
    });
});
