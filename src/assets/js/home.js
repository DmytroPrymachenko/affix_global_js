console.log("Сторінка home завантажена");
console.log("✅ `home.js` підключений до сторінки!");

function navigateToContacts() {
  window.location.href = "contacts.html";
}

// 🔹 Функція для перевірки та додавання відео
function addVideoIfContainerExists() {
  const heroContainer = document.querySelector(".hero");
  console.log("🔍 Перевірка наявності .hero:", heroContainer);

  if (heroContainer && !heroContainer.dataset.videoAdded) {
    console.log("🎥 Контейнер знайдено, додаємо відео!");

    const videoElement = document.createElement("video");
    videoElement.classList.add("hero__video");
    videoElement.setAttribute("autoplay", "");
    videoElement.setAttribute("loop", "");
    videoElement.setAttribute("muted", "");
    videoElement.setAttribute("playsinline", "");

    const sourceElement = document.createElement("source");
    sourceElement.setAttribute(
      "src",
      "videos/1video.mp4?" + new Date().getTime()
    );

    sourceElement.setAttribute("type", "video/mp4");

    videoElement.appendChild(sourceElement);
    heroContainer.prepend(videoElement);

    heroContainer.dataset.videoAdded = "true";

    console.log("✅ Відео успішно додано в контейнер!");
    return true;
  }
  return false;
}

// 🔹 Запускаємо або чекаємо DOM
if (document.readyState === "loading") {
  console.log("⏳ DOM ще не готовий, чекаємо...");
  document.addEventListener("DOMContentLoaded", () => {
    console.log("✅ DOM завантажено! Перевіряємо контейнер...");
    if (!addVideoIfContainerExists()) {
      startMutationObserver();
    }
  });
} else {
  console.log("🚀 DOM вже завантажено! Перевіряємо контейнер...");
  if (!addVideoIfContainerExists()) {
    startMutationObserver();
  }
}

// 🔹 Функція для відстеження змін у DOM
function startMutationObserver() {
  console.log("⏳ Контейнера ще немає, починаємо спостереження...");

  const observeContainer = new MutationObserver((mutations, observer) => {
    console.log("🔄 Спостереження триває...");
    if (addVideoIfContainerExists()) {
      console.log("🛑 Контейнер знайдено, зупиняємо спостереження.");
      observer.disconnect(); // Зупиняємо спостереження
    }
  });

  // Стежимо за додаванням елементів у <body>
  observeContainer.observe(document.body, { childList: true, subtree: true });
}
