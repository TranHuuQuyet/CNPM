let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartDiv = document.getElementById("cart");
const totalDiv = document.getElementById("total");

function renderCart() {
  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Giỏ hàng trống...</p>";
    totalDiv.textContent = "";
    return;
  }

  let html = "<ul>";
  let total = 0;
  cart.forEach((item, index) => {
    let priceNum = parseInt(item.price.replace(/[^\d]/g, "")); // Lấy số từ giá
    total += priceNum;
    html += `<li>${item.name} - ${item.price} 
                   <button onclick="removeFromCart(${index})">Xóa</button></li>`;
  });
  html += "</ul>";

  cartDiv.innerHTML = html;
  totalDiv.textContent = "Tổng cộng: " + total.toLocaleString("vi-VN") + " ₫";
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();

// Bắt sự kiện nút Thanh Toán
document.getElementById("checkout-btn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Giỏ hàng đang trống! Hãy thêm sản phẩm trước.");
  } else {
    // alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng ❤️");
    // Nếu có trang thanh toán thật thì redirect:
    window.location.href = "checkout.html";

    // cart = []; // reset giỏ hàng
    // localStorage.setItem("cart", JSON.stringify(cart)); // xoá luôn trong localStorage
    // renderCart(); // render lại giỏ hàng cho sạch
  }
});
