// Lấy giỏ hàng từ localStorage (nếu chưa có thì tạo mảng rỗng)
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Hiển thị giỏ hàng trong console (chỉ để kiểm tra)
function renderCart() {
  console.log(cart);
}

// Toast khi thêm vào giỏ
const toast = (msg) => {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `position:fixed; left:50%; transform:translateX(-50%); 
      bottom:22px; padding:10px 14px; border-radius:10px; 
      background:linear-gradient(135deg, #22c55e, #16a34a); color:#fff; 
      font-weight:600; box-shadow:0 8px 22px rgba(22,163,74,.35); z-index:9999;`;
  document.body.appendChild(el);
  setTimeout(() => {
    el.style.transition = "opacity .35s";
    el.style.opacity = "0";
  }, 1200);
  setTimeout(() => el.remove(), 1700);
};

// Gắn sự kiện cho nút "Thêm vào giỏ"
document.querySelectorAll(".card").forEach((card) => {
  const btn = card.querySelector(".btn:first-child");
  btn.addEventListener("click", () => {
    const name = card.querySelector(".title").textContent;
    const price = card.querySelector(".price").textContent;

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart)); // Lưu vào localStorage

    toast(`Đã thêm ${name} vào giỏ 🛒`);
    renderCart();
  });
});

//   thêm tìm kiếm sản phẩmm
// Lấy input ô tìm kiếm
const searchInput = document.querySelector(".search input");

// Lắng nghe sự kiện gõ phím
searchInput.addEventListener("input", function () {
  const keyword = this.value.toLowerCase().trim();
  const products = document.querySelectorAll(".card");

  products.forEach((card) => {
    const title = card.querySelector(".title").textContent.toLowerCase();
    const desc = card.querySelector(".desc").textContent.toLowerCase();

    if (title.includes(keyword) || desc.includes(keyword)) {
      card.style.display = "block"; // Hiện sản phẩm nếu khớp
    } else {
      card.style.display = "none"; // Ẩn sản phẩm nếu không khớp
    }
  });
});

// Gắn sự kiện cho nút "Mua Ngay"
document.querySelectorAll(".card").forEach((card) => {
  const buyNowBtn = card.querySelector(".btn.secondary");
  buyNowBtn.addEventListener("click", () => {
    const name = card.querySelector(".title").textContent;
    const price = card.querySelector(".price").textContent;

    // Lưu sản phẩm đang mua vào localStorage (tách riêng checkout)
    localStorage.setItem("checkoutItem", JSON.stringify({ name, price }));

    // Chuyển hướng sang trang checkout
    window.location.href = "checkout.html";
  });
});
