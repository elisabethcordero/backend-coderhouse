import { Router } from 'express';
import CartManager from '../models/cartManager.js';

const router = Router();
const cartManager = new CartManager();


router.get('/:id', async (req, res) => {

  let id = parseInt(req.params.id);

  if (isNaN(id) || id < 0){
      res.send("Debes especificar un id válido.")
      return;
  }

  let cart = await cartManager.getCartById(id);

  if (cart){
      res.send({ cart })
      return
  }

  res.send("Carrito inexistente")
})

router.post("/", async (req, res) => {
  const { products } = req.body;
  let response = { message: "Carrito creado" }
  try {
    
    await cartManager.addCart(products);

  } catch (error) {
    response.message = "Error: " + error.message;
  }

  res.json(response);
});

router.post("/:cid/product/:pid", async (req, res) => {
  const { cid, pid } = req.params
  let cartId = parseInt(cid)
  let productId = parseInt(pid)

  if (isNaN(cartId) || cartId < 0 ||
      isNaN(productId) || productId < 0){
      res.send("Debes especificar parametros de ruta válidos.")
      return;
  }

  const product = req.body;
  product.id = productId;
  let response = { message: "Producto agregado al carrito" }
  try {
    
    await cartManager.addProductToCart(cartId, product);

  } catch (error) {
    response.message = "Error: " + error.message;
  }

  res.json(response);
});

export default router;