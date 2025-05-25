let cart = [];

function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    alert(`${name} added to cart.`);
}

function openCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        cartTotal.innerText = '';
    } else {
        cart.forEach(item => {
            total += item.price * item.quantity;
            cartItemsContainer.innerHTML += `
                <div style="border-bottom: 1px solid #ccc; padding: 10px;">
                    <strong>${item.name}</strong><br>
                    Quantity: ${item.quantity}<br>
                    Price: $${item.price} each<br>
                    <button onclick="removeFromCart('${item.name}')">Remove</button>
                </div>
            `;
        });
        cartTotal.innerHTML = `Total: $${total.toFixed(2)}<br><br><button onclick="checkout()">Checkout</button>`;
    }

    document.getElementById('cart-modal').style.display = 'block';
}

function closeCart() {
    document.getElementById('cart-modal').style.display = 'none';
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    openCart(); // Re-render
}

function checkout() {
    let total = cart.reduce((acc, curr) => acc + (curr.price * curr.quantity), 0);
    if (total === 0) {
        alert("Cart is empty.");
        return;
    }

    const stripeHandler = StripeCheckout.configure({
        key: 'your-publishable-key-here', // Replace with your Stripe public key
        locale: 'auto',
        token: function(token) {
            alert("Payment Successful");
            cart = [];
            closeCart();
        }
    });

    stripeHandler.open({
        name: "Dame's Collection",
        description: "Complete your purchase",
        amount: total * 100 // Stripe expects amount in cents
    });
}

// Hook up the cart link
document.addEventListener('DOMContentLoaded', () => {
    const cartLink = document.getElementById('cart');
    if (cartLink) {
        cartLink.addEventListener('click', (e) => {
            e.preventDefault();
            openCart();
        });
    }
});
