import path from "path";
import fs from "fs";
import uniqid from "uniqid";
import { FileUpload } from "../interfaces/file-upload";

export default class FileSystem {
  constructor() {}

  guardarImagenTemp(file: FileUpload, userId: string) {
    return new Promise((resolve, reject) => {
      const path = this.crearCarpetaUsuario(userId);
      const nombreArchivo = this.generarNombreUnico(file.name);
      file.mv(`${path}/${nombreArchivo}`, (error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve("");
        }
      });
    });
  }

  private crearCarpetaUsuario(userId: string) {
    const pathUser = path.resolve(__dirname, `../uploads`, userId);
    const pathUserTem = `${pathUser}/temp`;

    if (!fs.existsSync(pathUser)) {
      fs.mkdirSync(pathUser);
      fs.mkdirSync(pathUserTem);
    }

    return pathUserTem;
  }

  private generarNombreUnico(nombreOriginal: string) {
    const arrTem = nombreOriginal.split(".");
    const extencion = arrTem[arrTem.length - 1];
    const nombreUnico = uniqid();

    return `${nombreUnico}.${extencion}`;
  }

  imagenesTempAPost(userId: string) {
    const pathTemp = path.resolve(__dirname, `../uploads`, userId, "temp");
    const pathPost = path.resolve(__dirname, `../uploads`, userId, "posts");

    if (!fs.existsSync(pathTemp)) {
      return [];
    } else if (!fs.existsSync(pathPost)) {
      fs.mkdirSync(pathPost);
    }

    const imagenesTemp = this.obtenerImagenesTemp(userId);
    imagenesTemp.forEach((imagen) => {
      fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
    });

    return imagenesTemp;
  }

  private obtenerImagenesTemp(userId: string) {
    const pathTemp = path.resolve(__dirname, `../uploads`, userId, "temp");
    return fs.readdirSync(pathTemp) || [];
  }

  getFotoUrl(userId: string, img: string) {
    let pathFinded = path.resolve(__dirname, `../uploads`, userId, "posts", img);
    if (!fs.existsSync(pathFinded)) {
      pathFinded = path.resolve(__dirname, "../assets/400x250.jpg");
    }

    return pathFinded;
  }
}
