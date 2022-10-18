import mongoose from "mongoose";
//conexcion a la base de datos de mongoDB
mongoose
  .connect("mongodb://localhost/companydb")
  .then((db) => console.log("Db is connect"))
  .catch((error) => console.log(error));
