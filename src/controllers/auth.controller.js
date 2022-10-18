//importamos el modelo
import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Rol.js";

export const singnup = async (req, res) => {
  try {
    const { username, password, email, roles } = req.body;

    const newUser = new User({
      username,
      email,
      //voy a guardar la contraseña que entra cifrada con la funcion, es asincrono necesita esperar a que se ejecute la accion
      password: await User.encryptPassword(password),
    });

    if (roles) {
      //si el admin me manda el rol, lo busco en la base de datos de roles y lo traigo directamente de ella
      const foundRole = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRole.map((role) => role._id);
    } else {
      //creamos la funcion si no me mandan el rol , le agregamos directamente el user
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }
    //guardamos la informacion en la db
    const savedUser = await newUser.save();
    console.log(savedUser);
    //creamos la funcion para generar el token
    const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
      expiresIn: 86400, //24h
    });
    //respondemos el token
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
};

export const singnin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email }).populate("roles");
    if (!userFound) {
      return res.json({ message: "User not found" });
    }
    //comparamos las contraseñas para poder acceder a la cuenta
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );
    if (!matchPassword) {
      return res.status(401).send({ token: null, message: "Invalid Password" });
    }

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400,
    });
    console.log(userFound);
    return res.status(202).json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(404).send("error in singnin");
  }
};
