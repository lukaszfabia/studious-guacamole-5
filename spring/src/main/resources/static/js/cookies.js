
function renderCart() {
    const cart = getCartFromCookies();
    let cartHtml = "";
    cart.forEach(item => {
        cartHtml += `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <input type="number" value="${item.quantity}" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                    <button onclick="removeFromCart(${item.id})">Usuń</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("cartTableBody").innerHTML = cartHtml;
    renderTotalPrice();
}

function renderTotalPrice() {
    const cart = getCartFromCookies();
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById("totalPrice").innerText = totalPrice.toFixed(2);
}



function updateQuantity(productId, quantity) {
    const cart = getCartFromCookies();
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
    }
    saveCartToCookies(cart);
}



function removeFromCart(productId) {
    let cart = getCartFromCookies();
    cart = cart.filter(item => item.id !== productId);
    saveCartToCookies(cart);
}



function addToCart(productId, productName, productPrice) {
    const cart = getCartFromCookies();

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1
        });
    }

    saveCartToCookies(cart);
}



function getCookie(name) {
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}

function getCartFromCookies() {
    const cartJson = getCookie("cart");
    return cartJson ? JSON.parse(cartJson) : [];
}

function saveCartToCookies(cart) {
    setCookie("cart", JSON.stringify(cart), 7);
}
