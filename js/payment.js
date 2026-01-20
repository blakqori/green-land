
document.addEventListener("DOMContentLoaded", function () {

    var name = document.getElementById("cardName");
    var card = document.getElementById("cardNumber");
    var date = document.getElementById("expiryDate");
    var cvv = document.getElementById("cvv");
    var btn = document.getElementById("checkoutBtn");

    card.addEventListener("input", function () {
        var v = card.value.replace(/[^0-9]/g, "").slice(0, 16);
        card.value = v.replace(/(.{4})/g, "$1 ").trim();
    });

    date.addEventListener("input", function () {
        var v = date.value.replace(/[^0-9]/g, "").slice(0, 4);
        date.value = v.length > 2 ? v.slice(0,2)+"/"+v.slice(2) : v;
    });

    cvv.addEventListener("input", function () {
        cvv.value = cvv.value.replace(/[^0-9]/g, "").slice(0, 3);
    });

    btn.addEventListener("click", function (e) {
        e.preventDefault();

        name.style.border = card.style.border =
        date.style.border = cvv.style.border = "1px solid #ccc";

        if (!/^[A-Za-z\s]+$/.test(name.value)) {
            name.style.border = "2px solid red";
            return;
        }

        if (!/^[0-9]{16}$/.test(card.value.replace(/\s+/g,""))) {
            card.style.border = "2px solid red";
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(date.value)) {
            date.style.border = "2px solid red";
            return;
        }

        if (!/^[0-9]{3}$/.test(cvv.value)) {
            cvv.style.border = "2px solid red";
            return;
        }

        alert("Order has been paid successfully.");

        localStorage.removeItem("cart");

        var b = document.getElementById("cart-badge");
        if (b) b.innerHTML = "0";

        var i = document.getElementById("cartItems");
        if (i) i.innerHTML = "";

        var t = document.querySelector(".shopping-cart p");
        if (t) t.innerHTML = "You have 0 items in your cart";

        name.value = "";
        card.value = "";
        date.value = "";
        cvv.value = "";
    });
});
