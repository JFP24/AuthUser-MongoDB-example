import app from "./app";
//traemos importado el archivo de la base de datos para que funcione con el puerto
import "./database";
app.listen(3000);
console.log("server listen on port ", 3000);
