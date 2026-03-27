const dialogButtons = document.querySelectorAll("button[data-dialog-type]");
console.log(dialogButtons);
dialogButtons.forEach(button => {
    button.addEventListener("click", () => {
        const dialogType = button.getAttribute("data-dialog-type");
        const dialog = document.getElementById(`dialog-${dialogType}`);
        if (dialog) {
            dialog.showModal();
            const closeButton = dialog.querySelector(".top > svg");
            closeButton.addEventListener("click", () => {
                dialog.close();
            });
        }
    });
});