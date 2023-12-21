import { Router } from 'express';
import ProductManager from '../models/productManager.js';

const router = Router();
const productManager = new ProductManager();
let socketServer = null;

export const setSocketServer = (server) =>
  socketServer = server;


router.get('/', async (req, res) => {
  let queries = req.query;
  let products = await productManager.getProducts(); 

  if (queries?.limit && parseInt(queries.limit) > 0){
      let limit = parseInt(queries.limit)
      products = products.slice(0, limit)
  }

  res.send({ products })
})

router.get('/:id', async (req, res) => {

  let id = parseInt(req.params.id);
  
  if (isNaN(id) || id < 0){
      res.send("Debes especificar un id válido.")
      return;
  }

  let products = await productManager.getProducts();
  let product = products.find(prod => prod.id === id);

  if (product){
      res.send({ product })
      return
  }

  res.send("Producto inexistente")
})

router.post("/", async (req, res) => {
  const { title, description, price, thumbnail, code, stock, category } = req.body;
  let response = { message: "Producto creado" }
  try {
    
    await productManager.addProduct(title, description, price, thumbnail, code, stock, category, true);
    socketServer.emit("new_product");

  } catch (error) {
    response.message = "Error: " + error.message;
  }
  
  res.json(response);
});

router.put("/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  if (isNaN(id) || id < 0){
      res.send("Debes especificar un id válido.")
      return;
  }
  
  const updatedProduct = req.body;
  let response = { message: "Producto actualizado" }
  try {
    
    await productManager.updateProduct(id, updatedProduct);

  } catch (error) {
    response.message = "Error, " + error.message;
  }

  res.json(response);
})
 
router.delete("/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  if (isNaN(id) || id < 0){
      res.send("Debes especificar un id válido.")
      return;
  }
  let response = { message: "Producto eliminado" }
  try {
    
    await productManager.deleteProduct(id);

  } catch (error) {
    response.message = "Error, " + error.message;
  }
  
  res.json(response);
});

export default router;