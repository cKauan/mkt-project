const toggleMenu = document.querySelector(".menu-toggle");
const menuWrapper = document.querySelector("#wrapper");
menuWrapper.classList.add("toggled");
toggleMenu.addEventListener('click', (el) => {
    el.preventDefault();
    menuWrapper.classList.toggle("toggled");
})
