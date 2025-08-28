document.addEventListener("DOMContentLoaded", () => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let orderList = document.getElementById("order-summary");
  let orderTotal = document.getElementById("order-total");
  let total = 0;

  if (cart.length === 0) {
    orderList.innerHTML = "<li>Giỏ hàng trống!</li>";
  } else {
    cart.forEach((item) => {
      let priceNum = parseInt(item.price.replace(/[^\d]/g, ""));
      total += priceNum;
      let li = document.createElement("li");
      li.textContent = `${item.name} - ${item.price}`;
      orderList.appendChild(li);
    });
    orderTotal.textContent =
      "Tổng cộng: " + total.toLocaleString("vi-VN") + " ₫";
  }

  const form = document.getElementById("checkout-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      alert("⚠️ Vui lòng điền đầy đủ và đúng thông tin trước khi đặt hàng!");
      return;
    }

    alert("✅ Đặt hàng thành công! Cảm ơn bạn ❤️");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
  });
});
