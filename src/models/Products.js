import { Schema, model } from "mongoose";

//el esquema es para definir que campos se guarden en la base de datos
const productsShema = new Schema(
  {
    name: String,
    category: String,
    price: Number,
    imgUrl: String,
  },
  {
    //para actualizar la fecha de creacion
    timestamps: true,
    versionKey: false,
  }
);

export default model("Product", productsShema);
