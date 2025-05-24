let cart = [];

function addToCart(item, price) {
    cart.push({ item, price });
    alert(`${item} added to cart.`);
}

function checkout() {
    let total = cart.reduce((acc, curr) => acc + curr.price, 0);
    if (total === 0) {
        alert("Cart is empty.");
        return;
    }

    const stripeHandler = StripeCheckout.configure({
        key: 'your-publishable-key-here', // Replace with your Stripe public key
        locale: 'auto',
        token: function(token) {
            alert("Payment Successful");
            cart = []; // Clear cart after payment
        }
    });

    stripeHandler.open({
        name: "Dame's Collection",
        description: "Complete your purchase",
        amount: total * 100 // Stripe expects the amount in cents
    });
}

document.getElementById("cart").addEventListener("click", checkout);