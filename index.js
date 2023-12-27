//Desafio entregable 3

const fs = require("fs").promises;
const express = require("express");

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.product = [];
    this.path = path;
  }

  async addProduct(newObject) {
    this.product.push(newObject);
  }

  getProducts() {
    return this.product;
  }

  async getProductById(id) {
    return this.product.find((product) => product.id === id);
  }

  async leerArchivo() {
    // Código existente para leer el archivo de productos
  }

  async guardarArchivo(arrayProductos) {
    // Código existente para guardar el archivo de productos
  }

  async updateProduct(id, productoActualizado) {
    // Código existente para actualizar un producto
  }

  async deleteProduct(id) {
    // Código existente para eliminar un producto
  }
}

const manager = new ProductManager("./productos.json");

// Agregar los 10 productos al objeto manager
const productos = [
  {
    id: 1,
    title: "Remera",
    description: "Remera de algodón",
    price: 19.99,
    img: "not image",
    stock: 50,
    code: "001",
  },
  {
    id: 2,
    title: "Pantalón",
    description: "Pantalón de mezclilla",
    price: 39.99,
    img: "not image",
    stock: 30,
    code: "002",
  },
  {
    id: 3,
    title: "Zapatos",
    description: "Zapatos de cuero",
    price: 59.99,
    img: "not image",
    stock: 20,
    code: "003",
  },
  {
    id: 4,
    title: "Cartera",
    description: "Cartera de mano",
    price: 29.99,
    img: "not image",
    stock: 40,
    code: "004",
  },
  {
    id: 5,
    title: "Reloj",
    description: "Reloj de pulsera",
    price: 49.99,
    img: "not image",
    stock: 15,
    code: "005",
  },
  { id: 6,
    title: "Lentes",
    description: "Lentes de sol polarizadas",
    price: 24.99,
    img: "not image",
    stock: 25,
    code: "006",
  },
  {
    id: 7,
    title: "Sombrero",
    description: "Sombrero de ala ancha",
    price: 14.99,
    img: "not image",
    stock: 35,
    code: "007",
  },
  {
    id: 8,
    title: "Bufanda",
    description: "Bufanda de lana",
    price: 9.99,
    img: "not image",
    stock: 50,
    code: "008",
  },
  {
    id: 9,
    title: "Guantes",
    description: "Guantes de cuero",
    price: 12.99,
    img: "not image",
    stock: 30,
    code: "009",
  },
  {
    id: 10,
    title: "Medias",
    description: "Medias de algodón",
    price: 4.99,
    img: "not image",
    stock: 60,
    code: "010",
  },
  
];

productos.forEach((producto) => {
  manager.addProduct(producto);
});

const app = express();
const port = 8080;

app.use(express.json());

// Endpoint para obtener todos los productos
app.get("/products", async (req, res) => {
  const limit = req.query.limit;
  let products = manager.getProducts();

  if (limit) {
    products = products.slice(0, limit);
  }

  res.json(products);
});

// Endpoint para obtener un producto por ID
app.get("/products/:pid", async (req, res) => {
  const productId = req.params.pid;
  const product = await manager.getProductById(productId);

  if (!product) {
    res.status(404).json({ error: "Producto no encontrado" });
  } else {
    res.json(product);
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});

/* Pruebas de consignas de testing
(async () => {
  // Verificar que el archivo tenga al menos 10 productos
  const productos = await manager.getProducts();
  if (productos.length < 10) {
    console.log("El archivo no tiene al menos 10 productos creados");
    return;
  }

  // Prueba 1: Obtener todos los productos
  const response1 = await fetch("http://localhost:8080/products");
  const data1 = await response1.json();
  console.log("Prueba 1 - Obtener todos los productos:");
  console.log(data1);

  // Prueba 2: Obtener los primeros 5 productos
  const response2 = await fetch("http://localhost:8080/products?limit=5");
  const data2 = await response2.json();
  console.log("Prueba 2 - Obtener los primeros 5 productos:");
  console.log(data2);

  // Prueba 3: Obtener un producto por ID existente
  const response3 = await fetch("http://localhost:8080/products/2");
  const data3 = await response3.json();
  console.log("Prueba 3 - Obtener un producto por ID existente:");
  console.log(data3);

  // Prueba 4: Obtener un producto por ID no existente
  const response4 = await fetch("http://localhost:8080/products/34123123");
  const data4 = await response4.json();
  console.log("Prueba 4 - Obtener un producto por ID no existente:");
  console.log(data4);
})();
*/