let allProducts = {};

async function fetchCategoryData() {
    try {
        const resCat = await fetch("https://dummyjson.com/products/categories");
        const categories = await resCat.json();

        renderCategories(categories);

        for (let cat of categories) {
            const res = await fetch(cat.url);
            const data = await res.json();
            allProducts[cat.name] = data.products;
        }

        const firstCat = categories[0].name;
        renderMenuItems(allProducts[firstCat]);

        setupCategorySwitching(categories);

    } catch (e) {
        console.log(e);
    }
}


function renderCategories(categories) {
    const categoriesContainer = document.querySelector(".section-item");
    categoriesContainer.innerHTML = "";

    categories.forEach((item, index) => {
        const itemCat = document.createElement("li");
        itemCat.classList.add("section-item-container");

        itemCat.innerHTML = `
            <button class="sections-item ${index === 0 ? "selected" : ""}">
                ${item.name}
            </button>
        `;

        categoriesContainer.appendChild(itemCat);
    });
}

function renderMenuItems(items) {
    const menuItemsContainer = document.querySelector(".hero-container");
    menuItemsContainer.innerHTML = "";

    items.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add("hero-image");
        menuItem.innerHTML = `
            <div class="card-details">
                <div class="card-title">
                    <img src="${item.thumbnail}" alt="${item.title}" class="image-form">
                    <h3><b>${item.title}</b></h3>
                    <p class="cutoff-text"><b>${item.description}</b></p>
                    <div class="card-footer">
                        <span class="price-cart"><b>${item.price}$</b></span>
                        <button class="cart-btn"
                            data-name="${item.title}"
                            data-image="${item.thumbnail}"
                            data-price="${item.price}">
                            <b>Add to Cart</b>
                        </button>
                        <button class="favorite-btn"><i class="fa-solid fa-heart"></i></button>
                    </div>
                </div>
            </div>
        `;

        menuItemsContainer.appendChild(menuItem);

    });
    document.querySelectorAll(".favorite-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            btn.classList.toggle("active");
        });
    });

    document.querySelectorAll(".cart-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const image = button.getAttribute("data-image");
            const price = button.getAttribute("data-price");
            addToCart({ name, price, image });
        });
    });
}

function addToCart(selectedItem) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItemIndex = cart.findIndex(item => item.name === selectedItem.name);

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += 1;
    } else {
        cart.push({
            name: selectedItem.name,
            price: selectedItem.price,
            image: selectedItem.image,
            quantity: 1,
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();

    Toastify({
        text: `${selectedItem.name} added to the cart!`,
        duration: 3000,
        close: true,
        gravity: "bottom",
        position: "center",
        style: { background: " #4A9C80 " },
        stopOnFocus: true
    }).showToast();
    setTimeout(() => {
        window.location.href = "shoppingList.html";
    }, 500);
}

function updateCartBadge() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.getElementById("cart-badge").textContent = cart.length;
}
function setupCategorySwitching(categories) {
    const categoryButtons = document.querySelectorAll(".section-item-container button");

    categoryButtons.forEach((button, index) => {
        button.addEventListener("click", () => {

            categoryButtons.forEach(btn => btn.classList.remove("selected"));

            button.classList.add("selected");

            const categoryName = categories[index].name;

            renderMenuItems(allProducts[categoryName]);
        });
    });
}



document.addEventListener("DOMContentLoaded", () => {
    fetchCategoryData();
    updateCartBadge();
});
