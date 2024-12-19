
function renderCart() {
    const cart = getCartFromCookies();
    let cartHtml = "";
    cart.forEach(item => {
        cartHtml += `
            <tr class="hover">
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>
                    <button onclick="updateQuantity(${item.id}, -1)" class="btn btn-decrement">-</button>
                    <span id="quantity-${item.id}">${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" class="btn btn-increment">+</button>
                </td>
                <td id="price-${item.id}">${(item.price * item.quantity).toFixed(2)}</td>
                <td class="flex items-end justify-end">
                    <button onclick="removeFromCart(${item.id})">Usuń</button>
                </td>
            </tr>
        `;
    });
    document.getElementById("cartTableBody").innerHTML = cartHtml;
    renderTotalPrice();
}

function renderTotalPrice() {
    document.getElementById("totalPrice").innerText = getTotalPrice().toFixed(2);
}

function getTotalPrice() {
    const cart = getCartFromCookies();
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function updateQuantity(productId, change) {
    const cart = getCartFromCookies();
    console.log(cart);
    const id = parseInt(productId);
    const item = cart.find(item => parseInt(item.id) === id);

    if (item) {
        item.quantity += change;

        if (item.quantity < 1) {
            item.quantity = 1;
        }

        saveCartToCookies(cart);
        const quantityElement = document.getElementById(`quantity-${id}`);
        const priceElement = document.getElementById(`price-${id}`);
        const totalPrice = document.getElementById("totalPrice");

        if (quantityElement) {
            quantityElement.textContent = item.quantity;
        } else {
            console.error(`Nie znaleziono elementu z ID quantity-${id}`);
        }

        if (priceElement) {
            priceElement.textContent = (item.price * item.quantity).toFixed(2);
        } else {
            console.error(`Nie znaleziono elementu z ID price-${id}`);
        }

        if (totalPrice) {
            totalPrice.textContent = getTotalPrice().toFixed(2);
        } else {
            console.error(`Nie znaleziono elementu z ID price-${id}`);
        }

    } else {
        console.error(`Produkt z ID ${id} nie został znaleziony w koszyku.`);
    }
}

function removeFromCart(productId) {
    let cart = getCartFromCookies();
    cart = cart.filter(item => item.id !== productId);
    saveCartToCookies(cart);
}

function handleAddToCart(element) {
    const productId = element.getAttribute('data-id');
    const productName = element.getAttribute('data-name');
    const productPrice = parseFloat(element.getAttribute('data-price'));

    addToCart(productId, productName, productPrice);
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
