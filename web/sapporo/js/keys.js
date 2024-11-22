/* jshint esversion: 6 */
document.addEventListener('DOMContentLoaded', function () {
    const demoArea = document.getElementById('demo-area');
    const altKeyElem = document.getElementById('altKey');
    const ctrlKeyElem = document.getElementById('ctrlKey');
    const shiftKeyElem = document.getElementById('shiftKey');
    const keyCodeElem = document.getElementById('keyCode');
    const clientXElem = document.getElementById('clientX');
    const clientYElem = document.getElementById('clientY');
    const screenXElem = document.getElementById('screenX');
    const screenYElem = document.getElementById('screenY');

    demoArea.addEventListener('mousemove', function (event) {
        altKeyElem.textContent = event.altKey ? 'Pressed' : 'Not pressed';
        ctrlKeyElem.textContent = event.ctrlKey ? 'Pressed' : 'Not pressed';
        shiftKeyElem.textContent = event.shiftKey ? 'Pressed' : 'Not pressed';
        clientXElem.textContent = event.clientX;
        clientYElem.textContent = event.clientY;
        screenXElem.textContent = event.screenX;
        screenYElem.textContent = event.screenY;
    });

    demoArea.addEventListener('mousedown', function (event) {
        altKeyElem.textContent = event.altKey ? 'Pressed' : 'Not pressed';
        ctrlKeyElem.textContent = event.ctrlKey ? 'Pressed' : 'Not pressed';
        shiftKeyElem.textContent = event.shiftKey ? 'Pressed' : 'Not pressed';
    });


    document.addEventListener('keydown', function (event) {
        keyCodeElem.textContent = event.key ? event.key : 'N/A';
    });

});
