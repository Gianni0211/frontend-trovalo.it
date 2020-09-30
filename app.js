const menu = document.querySelector("#dropdown");
const menuButton = document.querySelector("#navbarDropdownMenuLink");

menuButton.addEventListener("click", () => {
  if (Array.from(menu.classList).includes("dropdown-none")) {
    menu.style.display = "block";

    setTimeout(() => {
      menu.classList.remove("dropdown-none");
      menu.classList.add("dropdown-show");
    }, 100);
  } else {
    menu.classList.remove("dropdown-show");
    menu.classList.add("dropdown-none");
    menu.style.display = "none";
  }
});
