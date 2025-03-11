export const updateActiveLink = (page) => {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");

    const hrefValue = link.getAttribute("onclick");

    if (hrefValue && hrefValue.includes(`'${page}'`)) {
      link.classList.add("active");
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  const observeHeader = new MutationObserver((mutations, observer) => {
    const burgerBtn = document.querySelector(".header__burger--btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".mobile-menu-overlay");
    const body = document.body;

    if (
      burgerBtn &&
      mobileMenu &&
      overlay &&
      !burgerBtn.dataset.listenerAdded
    ) {
      burgerBtn.addEventListener("click", function (event) {
        event.stopPropagation();

        burgerBtn.classList.toggle("open");
        mobileMenu.classList.toggle("open");
        overlay.classList.toggle("open");
        body.classList.toggle("no-scroll");
      });

      overlay.addEventListener("click", function () {
        closeMenu();
      });

      document.addEventListener("click", function (event) {
        if (
          !mobileMenu.contains(event.target) &&
          !burgerBtn.contains(event.target)
        ) {
          closeMenu();
        }
      });

      function closeMenu() {
        mobileMenu.classList.remove("open");
        burgerBtn.classList.remove("open");
        overlay.classList.remove("open");
        body.classList.remove("no-scroll");
      }

      burgerBtn.dataset.listenerAdded = "true";
      observer.disconnect();
    }
  });

  observeHeader.observe(document.body, { childList: true, subtree: true });
});
