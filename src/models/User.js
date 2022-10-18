import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
//el esquema es para definir que campos se guarden en la base de datos
const userShema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    //Cada usuairo tendra un arreglo de roles
    roles: [
      {
        //con ref nos referimos a que esta relacionado con otro modelo de datos que en este caso es el de roles
        ref: "Role",
        //el tipo de dato que se va aestar guardando es el id del rol que se creo en el otro modelo
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    //para actualizar la fecha de creacion
    timestamps: true,
    versionKey: false,
  }
);
//funcion para cifrar datos
userShema.statics.encryptPassword = async (password) => {
  //algoritmo para recorrer y encriptar la contraseña del user
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
//para comparar la contraseña con la que ya exciste
userShema.statics.comparePassword = async (password, receivedPassword) => {
  //recibe dos cosas , la contraseña que ya esta guardad y encriptada y la que el usuario esta ingresando para accerder, se comparan ambas
  return await bcrypt.compare(password, receivedPassword);
};
export default model("User", userShema);
