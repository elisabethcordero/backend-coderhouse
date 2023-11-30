import { ProductManager } from './models/productManager.js';

const productManager = new ProductManager();

await productManager.addProduct(
    "producto prueba",
    "Este es un producto de prueba",
    200,
    "sin imagen",
    "abc123",
    25
  );

console.log(await productManager.getProducts())

// console.log(await productManager.getProductById(1))

// await productManager.deleteProduct(1);
// console.log("despues:")
// console.log(await productManager.getProducts())

// await productManager.updateProduct(1, {
//     title: "producto prueba actualizado",
//     description: "Este es un producto de prueba",
//     price: 250,
//     thumbnail: "sin imagen",
//     code: "abc123",
//     stock: 25
//   });

// console.log(await productManager.getProducts())

// productManager.addProduct(
//     "Pelota",
//     "De futbol",
//     9.99,
//     "http://imagen.jgp",
//     "123c",
//     23
//   );
  
// productManager.addProduct(
//       "producto prueba",
//       "Este es un producto de prueba",
//       200,
//       "sin imagen",
//       "abc123",
//       25
//     );