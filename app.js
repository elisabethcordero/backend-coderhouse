import { ProductManager } from './models/productManager.js';

const myFirstProducts = new ProductManager();

console.log("Agregamos productos.");

myFirstProducts.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25
  );
myFirstProducts.addProduct(
    "Pelota",
    "De futbol",
    9.99,
    "http://imagen.jgp",
    "123c",
    23
  );
  
console.log("-----------------------------");
console.log("Obtenemos desde getProducts", myFirstProducts.getProducts());


console.log("-----------------------------");
console.log("Obtenemos el producto id=1");
console.log("desde getProductById", myFirstProducts.getProductById(1));


console.log("-----------------------------");
console.log("Agregamos un duplicado, se espera un error.")

myFirstProducts.addProduct(
      "producto prueba",
      "Este es un producto de prueba",
      200,
      "sin imagen",
      "abc123",
      25
    );