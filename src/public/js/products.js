const socket = io();
const productContainer = document.getElementById("productContainer");

const productCard = (product) => 
    `<div class="productCard">
        <div class="cardProduct_image">
            <img src="${product.thumbnail}" alt="${product.title}">
        </div>
        <div class="cardProduct_info">
            <h3>${product.title}</h3>
            <p>${product.description}</p>
            <p>${product.price}</p>
            <p>${product.stock}</p>
            <p>${product.code}</p>
        </div>
    </div>`;

socket.on("reloadProducts", products => {
    let cards = "";
    products.forEach(product => {
        cards += productCard(product);
    });
    
    productContainer.innerHTML = cards;
});