export class ProductManager {
  static correlativoId = 0;
  products;
  
  constructor() {
    this.products = [];
  }
  
  addProduct(title, description, price, thumbnail, code, stock) {
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
    let codeExists = this.products.some((dato) => dato.code == code);

    if (codeExists) {
      throw new Error("El código ya existe por favor verifique");
    } 
    
    ProductManager.correlativoId++;
    
    const newProduct = {
    id: ProductManager.correlativoId,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    };
    this.products.push(newProduct);

  }
  getProducts() {
    return this.products;
  }
  getProductById(id) {
    let product = this.products.find((dato) => dato.id === id);

    if (product !== undefined) {
      return product;
    } else {
      return "No existe el producto solicitado";
    }
  }
}