//Desafio entregable 2

const fs = require("fs").promises;

class ProductManager {
  static ultId = 0;

  constructor(path) {
    this.product = [];
    this.path = path;
  }

  async addProduct(newObject) {
    let { title, description, price, img, code, stock } = newObject;

    if (!title || !description || !price || !img || !stock || !code) {
      console.log("Todos los campos son obligatorios, o los completas o te doxeo");
      return;
    }

    if (this.product.some((item) => item.code === code)) {
      console.log("Que sea único si sos muy amable, gracias y que no tengas buen día");
      return;
    }

    const productoNuevo = {
      id: ++ProductManager.ultId,
      title,
      description,
      price,
      img,
      stock,
      code,
    };

    this.product.push(productoNuevo);

    await this.guardarArchivo(this.product);
  }

  getProducts() {
    return this.product;
  }

  async getProductById(id) {
    try {
      const arrayProductos = await this.leerArchivo();
      const buscado = arrayProductos.find((item) => item.id === id);

      if (!buscado) {
        console.log("Producto no encontrado");
      } else {
        console.log("¡Sí, lo encontramos!");
        return buscado;
      }
    } catch (error) {
      console.log("Error al leer el archivo", error);
    }
  }

  async leerArchivo() {
    try {
      const respuesta = await fs.readFile(this.path, "utf-8");
      const arrayProductos = JSON.parse(respuesta);
      return arrayProductos;
    } catch (error) {
      console.log("Error en la lectura del archivo", error);
    }
  }

  async guardarArchivo(arrayProductos) {
    try {
      await fs.writeFile(this.path, JSON.stringify(arrayProductos, null, 2));
    } catch (error) {
      console.log("Error guardando el archivo", error);
    }
  }

  async updateProduct(id, productoActualizado) {
    try {
      const arrayProductos = await this.leerArchivo();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1, productoActualizado);
        await this.guardarArchivo(arrayProductos);
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al actualizar el producto", error);
    }
  }

  async deleteProduct(id) {
    try {
      const arrayProductos = await this.leerArchivo();

      const index = arrayProductos.findIndex((item) => item.id === id);

      if (index !== -1) {
        arrayProductos.splice(index, 1);
        await this.guardarArchivo(arrayProductos);
        console.log("Producto eliminado exitosamente");
      } else {
        console.log("No se encontró el producto");
      }
    } catch (error) {
      console.log("Error al eliminar el producto", error);
    }
  }
}

const manager = new ProductManager("./productos.json");

console.log(manager.getProducts());

const panDulce = {
  title: "panDulce",
  description: "dulce como la victoria",
  price: 725,
  img: "sin imagen",
  stock: 10,
  code: "abc123",
};
manager.addProduct(panDulce);

const yerba = {
  title: "yerba",
  description: "la mejor del país",
  price: 800,
  img: "sin imagen",
  stock: 10,
  code: "abc123",
};
manager.addProduct(yerba);

console.log(manager.getProducts());

async function testeamosBusquedaPorId() {
  const buscado = await manager.getProductById(2);
  console.log(buscado);
}
testeamosBusquedaPorId();

const mostaza = {
  id: 1,
  title: "mostaza",
  description: "Saborizante",
  price: 150,
  img: "Sin imagen",
  code: "abc123",
  stock: 30,
};

async function testeamosActualizar() {
  await manager.updateProduct(1, mostaza);
}
testeamosActualizar();

async function testeamosEliminar() {
  await manager.deleteProduct(1);
}
testeamosEliminar();