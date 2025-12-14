
const imageInput = document.getElementById("image-input");

imageInput.addEventListener("change", async (ev) => {
    const productImage = document.getElementById("product-image");
    const file = ev.currentTarget.files[0];
    const reader = new FileReader();

    if (file) {
        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }

    reader.onloadend = function () {
        productImage.src = reader.result;
        console.log(reader.result)
    }
})
