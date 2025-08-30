document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".login button");

  loginBtn.addEventListener("click", () => {
    // Lấy giá trị input
    const username = document.querySelector(".login input[type='text']").value;
    const password = document.querySelector(
      ".login input[type='password']"
    ).value;

    // Nếu chỉ cần bấm login là vào index.html
    // window.location.href = "index.html";

    // Nếu muốn có check username/password
    if (username === "admin" && password === "123") {
      window.location.href = "index.html"; // chuyển sang trang index.html
    } else {
      alert("Sai username hoặc password!");
    }
  });
});
