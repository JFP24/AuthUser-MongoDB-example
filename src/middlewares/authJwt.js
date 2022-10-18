import jwt from "jsonwebtoken";
import config from "../config";
import Role from "../models/Rol";
import User from "../models/User";
//esta es una funcion para saber el rol del ususario y verificar el token si pasa esta funcion pasa a la siguiente si no manda un mensaje de error
export const verifyToken = async (req, res, next) => {
  try {
    //recibimos un token
    const token = req.headers["x-access-token"];
    console.log(token);
    //comprobamos si el token existe
    if (!token) return res.status(403).json({ message: "No token Provided" });
    //trae el valor que tiene el token, verifica si el token es valido
    //si existe extraemos lo que trae dentro del token
    const decoded = jwt.verify(token, config.SECRET);
    req.userId = decoded.id;
    //verificamos el usuario
    const user = await User.findById(req.userId, { password: 0 });
    //si no existe mandamos un mensaje
    if (!user) return res.status(404).json({ message: "No user Found" });
    console.log(user);

    console.log(decoded);
    next();
  } catch (error) {
    console.log(error);
    res.send("error verifyToken");
  }
};

export const isModerator = async (req, res, next) => {
  try {
    //verificamos el id del usuario en el modelo, y ese user tendra una propiedad rol
    const user = await User.findById(req.userId);
    //y traemos los objetos que cumplan con esa propiedad de rol
    const roles = await Role.find({ _id: { $in: user.roles } });
    const findRol = roles.map((r) => r.name);
    console.log(findRol);
    if (findRol[0] === "moderater" || findRol[1] === "admin") {
      next();
    }
    return res.status(403).json({ message: "no tienes authorizacion " });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Error desde is Moderator" });
  }
};
