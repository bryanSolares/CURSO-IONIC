import mongoose from "mongoose";

mongoose.connect(
  "mongodb://localhost:27017/fotosgram",
  { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true },
  (err) => {
    if (err) {
      throw err;
    }

    console.log("Conexión Exitosa");
  }
);

export default mongoose;
