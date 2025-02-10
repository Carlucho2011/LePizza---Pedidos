let cart = [];

function toggleSidebar() {
    const sidebarLeft = document.getElementById("sidebarLeft");
    const sidebarRight = document.getElementById("sidebarRight");
    
    if (sidebarRight.classList.contains('open')) {
        sidebarRight.classList.remove('open');
    }
    
    sidebarLeft.classList.toggle('open');
}

function toggleCart() {
    const sidebarLeft = document.getElementById("sidebarLeft");
    const sidebarRight = document.getElementById("sidebarRight");

    if (sidebarLeft.classList.contains('open')) {
        sidebarLeft.classList.remove('open');
    }
    
    sidebarRight.classList.toggle('open');
}

function showQuantityInput(pizzaName, pizzaPrice) {
    const quantityInput = document.getElementById('quantity-input');
    quantityInput.style.display = 'flex';

    quantityInput.dataset.pizzaName = pizzaName;
    quantityInput.dataset.pizzaPrice = pizzaPrice;
}

function updateQuantity(amount) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    currentValue += amount;

    if (currentValue < 1) {
        currentValue = 1; // Evitar que sea menor que 1
    }

    quantityInput.value = currentValue;
}

function confirmQuantity() {
    const quantity = parseInt(document.getElementById('quantity').value);
    const pizzaName = document.getElementById('quantity-input').dataset.pizzaName;
    const pizzaPrice = parseFloat(document.getElementById('quantity-input').dataset.pizzaPrice);

    if (quantity > 0) {
        const existingPizza = cart.find(item => item.name === pizzaName);
        if (existingPizza) {
            existingPizza.quantity += quantity;
        } else {
            cart.push({ name: pizzaName, price: pizzaPrice, quantity });
        }
        updateCartDisplay();
        document.getElementById('quantity-input').style.display = 'none'; // Ocultar el input
        document.getElementById('quantity').value = ''; // Limpiar el campo de input
    } else {
        alert('Por favor, ingresa una cantidad válida.');
    }
}

function cancelInput() {
    document.getElementById('quantity-input').style.display = 'none'; // Ocultar el input
    document.getElementById('quantity').value = ''; // Limpiar el campo de input
}

function updateCartDisplay() {
    const cartItemsUI = document.getElementById("cartItems"); // Cambiado a "cartItems"
    
    if (!cartItemsUI) {
        console.error("No se encontró el elemento con el ID 'cartItems'");
        return; // Salir si no se encuentra el elemento
    }

    cartItemsUI.innerHTML = ''; // Limpiar los elementos existentes
    let subtotal = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`;
        subtotal += item.price * item.quantity;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'x';
        removeBtn.onclick = () => removeFromCart(item.name);
        li.appendChild(removeBtn);
        cartItemsUI.appendChild(li);
    });

    const subtotalElement = document.getElementById("subtotal");
    
    if (subtotalElement) {
        subtotalElement.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
    } else {
        console.error("No se encontró el elemento con el ID 'subtotal'");
    }
}

function finalizarPedido() {
    alert("Funcionalidad de finalizar pedido no implementada.");
}

function removeFromCart(pizzaName) {
    const existingPizza = cart.find(item => item.name === pizzaName);
    if (existingPizza) {
        const quantityToRemove = parseInt(prompt(`¿Cuántas ${pizzaName} desea eliminar? (Max ${existingPizza.quantity})`));
        if (quantityToRemove > 0 && quantityToRemove <= existingPizza.quantity) {
            existingPizza.quantity -= quantityToRemove;
            if (existingPizza.quantity === 0) {
                cart = cart.filter(item => item.name !== pizzaName);
            }
            updateCartDisplay();
        } else {
            alert('Por favor, ingresa una cantidad válida.');
        }
    }
}

// Session Storage Functions
window.addEventListener("DOMContentLoaded", () => {
    cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    console.log("Carrito cargado desde sessionStorage:", cart); // Log para depurar el carrito cargado
    updateCartDisplay();
});

window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
    console.log("Carrito guardado en sessionStorage:", cart); // Log para depurar el carrito guardado
});