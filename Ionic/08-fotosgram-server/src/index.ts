import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import morgan from 'morgan'
import Server from "./classes/server";
import userRoutes from "./routes/usuario.routes";
import postRoutes from "./routes/post.routes";

const server = new Server();

server.app.use(morgan('dev'))
server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());
server.app.use(fileUpload({}));
server.app.use(cors({ origin: true, credentials: true }));
server.app.use("/user", userRoutes);
server.app.use("/post", postRoutes);

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
