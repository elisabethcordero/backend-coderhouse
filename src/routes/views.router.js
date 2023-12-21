import { Router } from "express";
import ProductManager from '../models/productManager.js';

const router = Router();
const productManager = new ProductManager()
const defaultRender = {
  title: "Mi Aplicacion"
}

router.get("/product", async (req, res) => {
  const products = await productManager.getProducts();

  res.render("products", { ...defaultRender, 
    title: "Lista de productos", 
    products: products, 
    style: "css/products.css"});
});

router.get("/", (req, res) => {
  res.render("home", { ...defaultRender });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();

  res.render("products", { ...defaultRender, 
    title: "Lista de productos", 
    products: products, 
    style: "css/products.css"});
});


export default router;