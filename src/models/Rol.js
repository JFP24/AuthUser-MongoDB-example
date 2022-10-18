import { Schema, model } from "mongoose";
//coleccion de roles para guardar en la base de datos
const rolSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

export default model("Role", rolSchema);
