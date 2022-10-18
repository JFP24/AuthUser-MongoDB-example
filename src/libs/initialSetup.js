import Role from "../models/Rol";
export const createRoles = async () => {
  try {
    //este metodo es para saber si ya existe documentos
    const count = await Role.estimatedDocumentCount();
    //si hay algun rol retorna
    if (count > 0) return;
    //se ejecutan las promesas al mismo tiempo para poder guardar los roles en la db
    const values = await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "moderater" }).save(),
      new Role({ name: "admin" }).save(),
    ]);
    console.log(values);
  } catch (error) {
    console.error(error);
  }
};
