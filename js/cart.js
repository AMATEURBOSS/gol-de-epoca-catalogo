
// cart.js
let cart = [];
let cartVisible = false;

function toggleCart() {
    const cartBox = document.getElementById("cartBox");
    cartVisible = !cartVisible;
    cartBox.style.display = cartVisible ? "block" : "none";
    updateCartDisplay();
}

function addToCart(productId, productName, productPrice) {
    const item = cart.find(p => p.id === productId);
    if (item) {
        item.qty += 1;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, qty: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartList = document.getElementById("cartItems");
    const totalDisplay = document.getElementById("totalAmount");
    const shippingNotice = document.getElementById("shippingNotice");
    cartList.innerHTML = "";

    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement("li");
        li.textContent = `${item.name} x${item.qty} - $${item.price * item.qty} MXN`;
        cartList.appendChild(li);
    });

    totalDisplay.textContent = `Total: $${total} MXN`;
    shippingNotice.textContent = cart.reduce((acc, item) => acc + item.qty, 0) >= 5
        ? "🚚 ¡Envío gratis desbloqueado!"
        : "🚚 Envío de $200 MXN a toda la república";

    document.getElementById("checkoutBtn").href = generateWhatsAppLink();
}

function generateWhatsAppLink() {
    const phone = "523339724151";
    let message = "Hola, me gustaría ordenar:
";
    cart.forEach(item => {
        message += `- ${item.name} x${item.qty}
`;
    });
    message += `
Gracias.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
