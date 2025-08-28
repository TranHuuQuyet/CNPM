const toggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

toggle.addEventListener("click", () => {
  navbar.classList.toggle("active");
  toggle.textContent = navbar.classList.contains("active") ? "✖" : "☰";
});
