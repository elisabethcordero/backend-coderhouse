import fs from 'fs';

export class ProductManager {
  #filePath;
  #lastId;

  constructor(filePath = "./products.json") {
      this.#filePath = filePath;
      this.#setLastId();
  }
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
        if (
          title == undefined ||
          description == undefined ||
          price == undefined ||
          thumbnail == undefined ||
          code == undefined ||
          stock == undefined
        ) {
          throw new Error("Todos los campos son obligatorios");
        }

        const products = await this.getProducts();
        let codeExists = products.some(product => product.code === code);

        if (codeExists) {
          throw new Error("El código ya existe por favor verifique");
        } 

        const newProduct = {
          id: ++this.#lastId,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };

        products.push(newProduct);

        await this.#saveProducts(products);
    } catch (error) {
        console.log(error);
    }
  }

  async getProducts() {
      try {
          if (fs.existsSync(this.#filePath)) {
              return JSON.parse(await fs.promises.readFile(this.#filePath, "utf-8"));
          }

          return [];
      } catch (error) {
          console.log(error);
      }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      
      let product = products.find((dato) => dato.id === id);

      return product !== undefined
        ? product
        : "No existe el producto solicitado";

    } catch (error) {
        console.log(error);
    }
  }

  async updateProduct(id, updatedProduct){
    try{
      let products = await this.getProducts();
      let product = products.find(product => product.id === id);
      products = products.filter(product => product.id !== id);

      if(!product)
        throw new Error("No se puede actualizar, el produto no existe.");

      product = {
        ...product,
        ...updatedProduct,
        id,    
      }
      
      products.push(product);

      await this.#saveProducts(products);
    } catch (error) {
        console.log(error);
    }
  }

  async deleteProduct(id){
    try {
      let products = await this.getProducts();
      
      products = products.filter(product => product.id !== id);

      await this.#saveProducts(products);

    } catch (error) {
        console.log(error);
    }
  }

  async #saveProducts(products) {
      try {
          await fs.promises.writeFile(this.#filePath, JSON.stringify(products));
      } catch (error) {
          console.log(error);
      }
  }

  async #setLastId() {
    try {
        const products = await this.getProducts();

        if (products.length < 1) {
            this.#lastId = 0;
            return;
        }

        this.#lastId = products[products.length - 1].id;
    } catch (error) {
        console.log(error);
    }
}
}