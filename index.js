// Desafio entregable backend 2

const fs = requier ("fs").promises;

class ProductManager {
   
    //variable estatica
    static ultId = 0;
   
    constructor(path) {
        this.product = [];
        this.path = path;
    }

    // Metodo
    async addProduct(newObjet) {

        let { title, description, price, img, code, stock } = newObjet;

        //validacion de campos
        if (!tittle || !description || !price || !image || !stock || !code) {
            console.log("Todos los campos son obligatorios, o los completas o te doxeo");
            return;
        }

        // validacion de que es unico el codigo
        
        if(this.product.some(item => item.code === code)){
            console.log("Que sea unico si sos muy amable, gracias y que no tengas buen dia");
            return;
    }
    
    //Objeto
    
    const ProductoNuevo = {
        
        id: ++ProductManager.ultId,
        tittle,
        description,
        price,
        image,
        stock,
        code,
    }

    this.product.push(ProductoNuevo);

    await this.guardarArchivo(this.product);

    }

    getProducts() {
        console.log(this.product);

    }

    async getProductById(id) {
        try {
            const arrayProductos = await this.leerArchivo();
            const buscado = arrayProductos.find(item => item.id === id);

            if (!buscado) {
                console.log("Producto no encontrado");
            } else {
                console.log("Siii, lo encontramos! ");
                return buscado;
            }

        } catch (error) {
            console.log("Error al leer el archivo ", error);
        }

    }
}    

//metodos Desafio 2


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

//Actualizamos algun producto:

async updateProduct(id, productoActualizado) {
    try {
        const arrayProductos = await this.leerArchivo();

        const index = arrayProductos.findIndex(item => item.id === id);

        if (index !== -1) {
            //Puedo usar el método de array splice para reemplazar el objeto en la posicion del index: 
            arrayProductos.splice(index, 1, productoActualizado);
            await this.guardarArchivo(arrayProductos);
        } else {
            console.log("no se encontró el producto");
        }

    } catch (error) {
        console.log("Error al actualizar el producto", error);
    }
}





//test si funca 

//1 Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager("./productos.json");

//2 Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

manager.getProducts();

//3 Se llamará al método “addProduct” con los campos:
//tittle: “producto prueba”
//description:”Este es un producto prueba”
//price:200,
//thumbnail:”Sin imagen”
//stock:25,
//code:”abc123”

const panDulce = {
    title: "panDulce",
    description: "dulce como la victoria",
    price: 725,
    img: "sin imagen",
    stock: 10,
    code: "abc123"
}

manager.addProduct(panDulce);
/*

//4 El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE


const yerba = {
    title: "yerba",
    description: "la mejor del pais",
    price: 800,
    img: "sin imagen",
    stock: 10,
    code: "abc123"
}

manager.addProduct(panDulce);
/*
//Repetimos el codigo: 

//manager.addProduct(aceite);
//Las validaciones funcionan. 

//Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado


manager.getProducts();

//Se llamará al método “getProductById” y se corroborará que devuelva el producto con el id especificado, en caso de no existir, debe arrojar un error.

async function testeamosBusquedaPorId() {
    const buscado = await manager.getProductById(2);
    console.log(buscado);
}

testeamosBusquedaPorId();

//Se llamará al método “updateProduct” y se intentará cambiar un campo de algún producto, se evaluará que no se elimine el id y que sí se haya hecho la actualización.

const salsa = {
    id: 1,
    title: "salsa tomate", 
    description: "los mas ricos", 
    price: 150,
    img: "Sin imagen",
    code: "abc123",
    stock: 30
};

async function testeamosActualizar() {
    await manager.updateProduct(1, salsa);
}

testeamosActualizar();
*/

