import { updateActiveLink } from "./updateActiveLink";

const loadComponent = async (element, file) => {
  try {
    const response = await fetch(`components/${file}`);
    if (!response.ok) throw new Error("Файл не знайдено");

    const content = await response.text();
    document.querySelector(element).innerHTML = content;
  } catch (error) {
    console.error(`Помилка завантаження ${file}:`, error);
  }
};

const loadCSS = (file) => {
  document
    .querySelectorAll("link[data-dynamic-css]")
    .forEach((el) => el.remove());

  if (file) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = `assets/css/${file}`;
    link.setAttribute("data-dynamic-css", "true");
    document.head.appendChild(link);
  }
};

const loadJS = (file) => {
  document
    .querySelectorAll("script[data-dynamic-js]")
    .forEach((el) => el.remove());

  if (file) {
    const script = document.createElement("script");
    script.src = `assets/js/${file}`;
    script.setAttribute("data-dynamic-js", "true");
    script.defer = true;
    document.body.appendChild(script);
  }
};

const updateLayout = () => {
  if (window.innerWidth <= 768) {
    loadComponent("header", "header/headerMobile.html");
  } else {
    loadComponent("header", "header/headerDesktop.html");
  }

  if (window.innerWidth <= 480) {
    loadComponent("footer", "footer/footerMobile.html");
  } else if (window.innerWidth <= 1024) {
    loadComponent("footer", "footer/footerTablet.html");
  } else {
    loadComponent("footer", "footer/footerDesktop.html");
  }
};

const showLoading = () => {
  document.querySelector(".loading-overlay").classList.add("active");
};

const hideLoading = () => {
  setTimeout(() => {
    document.querySelector(".loading-overlay").classList.remove("active");
  }, 500);
};

window.navigateTo = (event, page) => {
  event.preventDefault();
  window.history.pushState({}, "", `#${page}`);
  loadPage(page);
};

const loadPage = async (page) => {
  try {
    showLoading();
    const main = document.querySelector("main");
    main.innerHTML = "<p>Завантаження...</p>";

    const response = await fetch(`pages/${page}.html`);
    if (!response.ok) throw new Error("Сторінку не знайдено");

    const content = await response.text();
    main.innerHTML = content;

    updateLayout();
    loadCSS(`${page}.css`);
    loadJS(`${page}.js`);

    setTimeout(() => {
      updateActiveLink(page);
    }, 100);
  } catch (error) {
    document.querySelector("main").innerHTML = "<h2>Сторінку не знайдено</h2>";
    console.error(error);
  } finally {
    hideLoading();
  }
};

window.onload = () => {
  const path = window.location.hash.replace("#", "") || "home";
  loadPage(path);
};

window.addEventListener("resize", updateLayout);
window.onpopstate = () => {
  const path = window.location.hash.replace("#", "") || "home";
  loadPage(path);
};
