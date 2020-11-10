import mongoose from "mongoose";
import bodyParser from "body-parser";
import Server from "./clases/server";
import userRoutes from "./routes/usuario.routes";

const server = new Server();

server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());
server.app.use("/user", userRoutes);

mongoose.connect(
  "mongodb://localhost:27017/fotosgram",
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    }
    console.log("Conexión Exitosa");
  }
);

server.start(() => {
  console.log(`App online en puerto ${server.port}`);
});
