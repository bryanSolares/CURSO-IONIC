"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const uniqid_1 = __importDefault(require("uniqid"));
class FileSystem {
    constructor() { }
    guardarImagenTemp(file, userId) {
        return new Promise((resolve, reject) => {
            const path = this.crearCarpetaUsuario(userId);
            const nombreArchivo = this.generarNombreUnico(file.name);
            file.mv(`${path}/${nombreArchivo}`, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve("");
                }
            });
        });
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, `../uploads`, userId);
        const pathUserTem = `${pathUser}/temp`;
        if (!fs_1.default.existsSync(pathUser)) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTem);
        }
        return pathUserTem;
    }
    generarNombreUnico(nombreOriginal) {
        const arrTem = nombreOriginal.split(".");
        const extencion = arrTem[arrTem.length - 1];
        const nombreUnico = uniqid_1.default();
        return `${nombreUnico}.${extencion}`;
    }
    imagenesTempAPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, `../uploads`, userId, "temp");
        const pathPost = path_1.default.resolve(__dirname, `../uploads`, userId, "posts");
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        else if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesTemp(userId);
        imagenesTemp.forEach((imagen) => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, `../uploads`, userId, "temp");
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    getFotoUrl(userId, img) {
        let pathFinded = path_1.default.resolve(__dirname, `../uploads`, userId, "posts", img);
        if (!fs_1.default.existsSync(pathFinded)) {
            pathFinded = path_1.default.resolve(__dirname, "../assets/400x250.jpg");
        }
        return pathFinded;
    }
}
exports.default = FileSystem;
