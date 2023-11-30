import { ProductManager } from './models/productManager.js';

const productManager = new ProductManager();

console.log("Agrego nuevo producto")
await productManager.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "code1",
    25
  );

await productManager.addProduct(
    "producto 2",
    "Segundo producto de prueba",
    200,
    "sin imagen",
    "code2",
    25
  );
console.log(await productManager.getProducts())

console.log("-------------------------------------------");
console.log("Actualizo stock de productId=1")
await productManager.updateProduct(1, {
  thumbnail: 'ahora si tiene imagen',
  stock: 222
  });

console.log("-------------------------------------------");

console.log("Obtengo producto con getProductById(1)")
console.log(await productManager.getProductById(1))

// console.log("-------------------------------------------");

// console.log("Elimino producto productId=1")
// await productManager.deleteProduct(1);
// console.log(await productManager.getProducts())