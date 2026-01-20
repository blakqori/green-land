
function updateCartSummary() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    let shipping = cart.length > 0 ? 5 : 0;
    let total = subtotal + shipping;

    document.querySelector(".shopping-cart p").textContent = 
        `You have ${cart.length} items in your cart`;

    document.querySelector(".summary-box .line:nth-child(1) span:last-child")
        .textContent = `$${subtotal.toFixed(2)}`;

    document.querySelector(".summary-box .line:nth-child(2) span:last-child")
        .textContent = `$${shipping.toFixed(2)}`;

    document.querySelector(".summary-box .total span:last-child")
        .textContent = `$${total.toFixed(2)}`;

    document.querySelector(".checkout-footer .total-price")
        .textContent = `$${total.toFixed(2)}`;
}



function activateQuantityButtons() {
    document.querySelectorAll(".item-details").forEach((itemDiv, index) => {
        
        const increaseBtn = itemDiv.querySelector(".increase");
        const decreaseBtn = itemDiv.querySelector(".decrease");
        const deleteBtn = itemDiv.querySelector(".delete");
        const quantitySpan = itemDiv.querySelector(".quantity");

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        increaseBtn.addEventListener("click", () => {
            cart[index].quantity++;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
            updateCartSummary();
        });

        decreaseBtn.addEventListener("click", () => {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
            updateCartSummary();
        });

        deleteBtn.addEventListener("click", () => {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCartItems();
            updateCartSummary();
        });

    });
}



function renderCartItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const container = document.querySelector(".item-details-container");

    container.innerHTML = "";  

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item-details");

        div.innerHTML = `
            <div class="image">
                <img src="${item.image}" width="100px">
            </div>

            <div class="item-detail">
                <h3>${item.name}</h3>
                <p>Description</p>
            </div>

            <div class="quantity1">
                <div class="quantity-wrapper">
                    <span class="quantity">${item.quantity}</span>
                    <div class="quantity-buttons">
                        <button class="increase"><i class="fa-solid fa-sort-up"></i></button>
                        <button class="decrease"><i class="fa-solid fa-sort-down"></i></button>
                    </div>
                </div>

                <span class="item-price">$${item.price}</span>

                <div class="price-trash">
                    <i class="fa-regular fa-trash-can delete"></i>
                </div>
            </div>
        `;

        container.appendChild(div);
    });

    activateQuantityButtons();
    updateCartSummary();
}

document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();
    updateCartSummary();
});



