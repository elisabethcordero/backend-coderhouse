import express from 'express'
import { ProductManager } from './models/productManager.js';

const productManager = new ProductManager();

const app = express()
const port = 8080

app.use(express.urlencoded({ extended:true }))

app.get('/', (req, res) => {
  res.send('Desafio3!')
})

app.get('/products', async (req, res) => {
  let queries = req.query;
  let products = await productManager.getProducts(); 
  
  if (queries?.limit && parseInt(queries.limit) > 0){
    let limit = parseInt(queries.limit)
    products = products.slice(0, limit)
  }

  res.send({ products })
})

app.get('/products/:id', async (req, res) => {
  
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


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})