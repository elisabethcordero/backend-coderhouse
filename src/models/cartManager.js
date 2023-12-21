import fs from 'fs';
import { execPath } from 'process';

export default class CartManager {
  #filePath;
  #lastId;

  constructor(filePath = "./carts.json") {
      this.#filePath = filePath;
      this.#setLastId();
  }
  async addCart(products) {
    try {
        
        if (!Array.isArray(products) || products.length == 0 ) {
          throw new Error("No se puede crear el carrito, debe contener productos");
        }

        const carts = await this.getCarts();
        
        const newCart = {
            id: ++this.#lastId,
            products
          };

        carts.push(newCart);

        await this.#saveCarts(carts);
    } catch (error) {
        console.log(error);
    }
  }

  async addProductToCart(cartId, product) {
    try {
        const cart = await this.getCartById(cartId);

        if (!cart)
          throw new Error("El carrito no existe.")
        
        let existProduct = cart.products.find(item => item.id === product.id)

        if (existProduct){
          cart.products = cart.products.map(item => {
            if (item.id === product.id)
              item.quantity += product.quantity;

            return item;
          })
        }else{
          cart.products.push({ id: product.id, quantity: product.quantity })
        }
       
        this.updateCart(cartId, cart);
    } catch (error) {
        console.log(error);
    }
  }

  async getCarts() {
      try {
          if (fs.existsSync(this.#filePath)) {
              return JSON.parse(await fs.promises.readFile(this.#filePath, "utf-8"));
          }

          return [];
      } catch (error) {
          console.log(error);
      }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      
      let cart = carts.find((item) => item.id === id);

      return cart !== undefined
        ? cart
        : "No existe el carrito solicitado";

    } catch (error) {
        console.log(error);
    }
  }

  async updateCart(id, updatedCart){
    try{
      let carts = await this.getCarts();
      let cart = carts.find(item => item.id === id);
      carts = carts.filter(item => item.id !== id);

      if(!cart)
        throw new Error("No se puede actualizar, el carrito no existe.");

      cart = {
        ...cart,
        ...updatedCart,
        id,    
      }
      
      carts.push(cart);

      await this.#saveCarts(carts);
    } catch (error) {
        console.log(error);
    }
  }

  async deleteProduct(id){
    try {
      let carts = await this.getCarts();
      
      carts = carts.filter(item => item.id !== id);

      await this.#saveCarts(carts);

    } catch (error) {
        console.log(error);
    }
  }

  async #saveCarts(carts) {
      try {
          await fs.promises.writeFile(this.#filePath, JSON.stringify(carts));
      } catch (error) {
          console.log(error);
      }
  }

  async #setLastId() {
    try {
        const cart = await this.getCarts();

        if (cart.length < 1) {
            this.#lastId = 0;
            return;
        }

        this.#lastId = cart[cart.length - 1].id;
    } catch (error) {
        console.log(error);
    }
  }
}