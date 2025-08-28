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

// Hàm bắn event purchase cho GA4
function trackPurchase(productName, productId, price, quantity) {
  gtag("event", "purchase", {
    transaction_id: "T" + new Date().getTime(), // tạo ID giao dịch ngẫu nhiên
    value: price * quantity,
    currency: "VND",
    items: [
      {
        item_name: productName,
        item_id: productId,
        price: price,
        quantity: quantity,
      },
    ],
  });
  console.log("Đã gửi purchase event cho:", productName);
}

document.addEventListener("DOMContentLoaded", function () {
  // Mảng chứa thông tin sản phẩm (trùng với HTML ở trên)
  const products = [
    { id: "P001", name: "Tai nghe X-Beat Pro", price: 1290000 },
    { id: "P002", name: "Bàn phím NeoKeys 87", price: 1590000 },
    { id: "P003", name: "Laptop Aero 14", price: 22990000 },
    { id: "P004", name: "Smartphone Nova X", price: 9490000 },
    { id: "P005", name: "Smartwatch Pulse S", price: 1990000 },
    { id: "P006", name: "Loa Bluetooth Wave Mini", price: 890000 },
  ];

  // Lấy toàn bộ nút "Mua Ngay"
  const buyButtons = document.querySelectorAll(".card .btn.secondary");

  buyButtons.forEach((btn, index) => {
    btn.addEventListener("click", function () {
      const p = products[index];
      trackPurchase(p.name, p.id, p.price, 1);
    });
  });
});
