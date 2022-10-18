//importamos el modelo de la base de datos
import Products from "../models/products";

export const createProducts = async (req, res) => {
  try {
    //destructuramos la informacion que nos llega desde el body
    const { name, category, price, imgUrl } = req.body;
    //creamos un nuevo productos en el modelo de la base de datos , lo guardamos en una variable
    const newProducts = new Products({ name, category, price, imgUrl });
    //utilizamos la variable donde guardamos los datos que nos entran por body, con el metodo save  para guardar en la base de datos
    const productsSave = await newProducts.save();
    console.log(productsSave);
    res.status(201).json(productsSave);
  } catch (error) {
    console.log(error, "Error in CreateProducst");
    res.status(404).json("Error in CreateProducst");
  }
};

export const getProducts = async (req, res) => {
  try {
    //con el metodo find listamos todos los productos que se encuentren en el modelo de la base de datos
    const products = await Products.find();
    console.log(products);
    res.status(202).json(products);
  } catch (error) {
    console.log(error);
    res.status(404).send("Error in getProducts");
  }
};

export const getProductsById = async (req, res) => {
  try {
    //destructuramos el id que nos entra por params
    const { id } = req.params;
    //buscamos con el metodo findById el peroductos especifico
    const productsId = await Products.findById(id);
    console.log(productsId);
    //accedemos a las propiedades que se necesitan del objeto
    const product = {
      name: productsId.name,
      category: productsId.category,
      price: productsId.price,
      img: productsId.imgUrl,
    };
    //devolvemos la informacion requerida
    res.status(202).json(product);
  } catch (error) {
    console.log(error);
    res.status(404).send("error getProductsById");
  }
};

export const updateProductsById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProducts = await Products.findByIdAndUpdate(id, req.body, {
      //esto es para que mongodb me devuelva el producto con los datos actualizados
      new: true,
    });
    res.status(200).json(updatedProducts);
  } catch (error) {
    console.log(error);
    res.status(404).json("Error in updateProducts");
  }
};

export const deleteProductsById = async (req, res) => {
  try {
    //Extraemos el id por params
    const { id } = req.params;
    //con este metodo lo que hacemos es eliminar un producto con el id
    const deleteProducts = await Products.findByIdAndDelete(id);
    res.status(200).json("Productos delete succesfully");
  } catch (error) {
    console.log(error);
    res.status(404).send("error in delete products");
  }
};
