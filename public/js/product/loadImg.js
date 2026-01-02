const imageInput = document.getElementById("image-input");

if (imageInput !== null) {
    imageInput.addEventListener("change", async (ev) => {
        const productImage = document.getElementById("product-image");
        const file = ev.currentTarget.files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsDataURL(file);
        } else {
            productImage.src = "";
        }

        reader.onloadend = function () {
            productImage.src = reader.result;
        }
    })
}