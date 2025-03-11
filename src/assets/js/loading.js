const showLoading = () => {
    document.querySelector(".loading-overlay").classList.add("active");
};

const hideLoading = () => {
    setTimeout(() => {
        document.querySelector(".loading-overlay").classList.remove("active");
    }, 500); // Невелика затримка для ефекту
};
