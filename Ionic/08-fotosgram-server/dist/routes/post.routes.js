"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middlewar_1 = require("../middlewares/auth.middlewar");
const post_model_1 = require("../models/post.model");
const file_system_1 = __importDefault(require("../classes/file-system"));
const postRoutes = express_1.Router();
const fileSystem = new file_system_1.default();
postRoutes.get("/" /*, verifyToken*/, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let page = Number(req.query["page"]) || 1;
    let skip = page - 1;
    skip = skip * 10;
    const posts = yield post_model_1.Post.find().sort({ _id: -1 }).skip(skip).limit(10).populate("user", "-password").exec();
    res.json({
        ok: true,
        page,
        posts,
    });
}));
postRoutes.post("/", auth_middlewar_1.verifyToken, (req, res) => {
    const body = req.body;
    body.user = req.user;
    const imagenes = fileSystem.imagenesTempAPost(req.user._id);
    body.imgs = imagenes;
    post_model_1.Post.create(body)
        .then((postDB) => __awaiter(void 0, void 0, void 0, function* () {
        yield postDB.populate("user", "-password").execPopulate();
        res.json({
            ok: true,
            post: postDB,
        });
    }))
        .catch((error) => {
        res.json({
            ok: false,
            error,
        });
    });
});
postRoutes.post("/upload", auth_middlewar_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.files) {
        return res.status(400).json({
            ok: false,
            msg: "No se ha detectado ninguna imagen",
        });
    }
    const file = req.files.image;
    if (!file || !file.mimetype.includes("image")) {
        return res.status(400).json({
            ok: false,
            msg: "No se ha detectado ninguna imagen o no es válida",
        });
    }
    yield fileSystem.guardarImagenTemp(file, req.user._id);
    res.json({
        ok: true,
        msg: "Imagen almacenada correctamente",
        file: file.mimetype,
    });
}));
postRoutes.get("/image/:userId/:img", auth_middlewar_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, img } = req.params;
    const pathFoto = fileSystem.getFotoUrl(userId, img);
    res.sendFile(pathFoto);
    /*res.json({
      ok: true,
      userId,
      img,
      pathFoto
    });*/
}));
exports.default = postRoutes;
