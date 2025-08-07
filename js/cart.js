
let cart = [];
document.querySelectorAll('.agregar-carrito').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.closest('.producto');
        const name = product.getAttribute('data-name');
        const price = parseInt(product.getAttribute('data-price'));
        const existing = cart.find(item => item.name === name);
        if (existing) {
            existing.qty += 1;
        } else {
            cart.push({ name, price, qty: 1 });
        }
        updateCartDisplay();
    });
});

document.getElementById('toggleCartBtn').addEventListener('click', () => {
    const popup = document.getElementById('cartPopup');
    popup.style.display = popup.style.display === 'block' ? 'none' : 'block';
});

function updateCartDisplay() {
    const cartList = document.getElementById('cartItems');
    const totalDisplay = document.getElementById('totalAmount');
    const shippingNotice = document.getElementById('shippingNotice');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        total += item.price * item.qty;
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.qty} = $${item.price * item.qty} MXN`;
        cartList.appendChild(li);
    });
    totalDisplay.textContent = `Total: $${total} MXN`;
    shippingNotice.textContent = cart.reduce((a, b) => a + b.qty, 0) >= 5
        ? '🚚 Envío gratis desbloqueado!'
        : '📦 Envío de $200 MXN a toda la república';
    document.getElementById("checkoutBtn").href = generateWhatsAppLink();
}

function generateWhatsAppLink() {
    const phone = "523339724151";
    let message = "Hola, me gustaría ordenar:\n";
    cart.forEach(item => {
        message += `- ${item.name} x${item.qty} = $${item.price * item.qty} MXN\n`;
    });
    return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
