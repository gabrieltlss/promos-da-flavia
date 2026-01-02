function updateProduct({ id, name, price, link, img, categoryId }) {
    // Limpa container da imagem.
    const imageInput = document.getElementById("image-input");
    imageInput.value = "";

    const idInput = document.getElementById("product-id");
    const nameInput = document.getElementById("product-name");
    const priceInput = document.getElementById("product-price");
    const urlInput = document.getElementById("product-url");
    const categoryOption = document.querySelector(`option[value="${categoryId ? categoryId : null}"]`);

    const productImgTag = document.getElementById("product-image");
    productImgTag.src = `/img/${img}`;

    idInput.value = id;
    nameInput.value = name;
    priceInput.value = price;
    urlInput.value = link;
    categoryOption.selected = true;
}