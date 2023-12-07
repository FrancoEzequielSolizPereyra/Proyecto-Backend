// Desafio entregable backend 1

class ProductManager {
   
    //variable estatica
    static ultId = 0;
   
    constructor() {
        this.product = [];
    }

    // Metodo
    addproduct(tittle, description, price, image, stock, code) {

        //validacion de campos
        if (!tittle || !description || !price || !image || !stock || !code) {
            console.log("Todos los campos son obligatorios, o los completas o te doxeo");
            return;
        }

        // validacion de que es unico el codigo
        
        if(this.products.some(item => item.code === code)){
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

    this.products.push(ProductoNuevo);

    }

    getProducts() {
        console.log(this.products);

    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);

        if(!product) {
            console.log("Producto no encontrado, mañana seguro te cae un rayo");
        } else {
            console.log("Si se pudo: ", product);
        }

        return product;



    }
}    


/*

//test si funca 

//1 Se creará una instancia de la clase “ProductManager”

const manager = new ProductManager();

//2 Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []

manager.getProducts();

//3 Se llamará al método “addProduct” con los campos:
//title: “producto prueba”
//description:”Este es un producto prueba”
//price:200,
//thumbnail:”Sin imagen”
//stock:25,
//code:”abc123”

manager.addProduct("producto prueba", "Este es un producto prueba", 200, "sin imagen", 25, "abc123");

manager.getProducts();

//4 El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE


manager.addProduct("fideos", "los mas ricos", 200, "sin imagen", "abc124", 50);


manager.addProduct("arroz", "los mas ricos", 200, "sin imagen", "abc125", 50);

//5 Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado

manager.getProducts();


//6 Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.

manager.addProduct("arroz", "el que no se pasa", 200, "sin imagen", "abc125", 50);

//7 Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo

manager.getProductById(1);
manager.getProductById(37);

no estaba seguro si debia dejar esta parte pero por las dudas lo hago jaja
*/