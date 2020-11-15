import { Router, Response } from "express";
import { verifyToken } from "../middlewares/auth.middlewar";
import { Post } from "../models/post.model";
import { FileUpload } from "../interfaces/file-upload";
import FileSystem from "../classes/file-system";

const postRoutes = Router();
const fileSystem = new FileSystem();

postRoutes.get("/"/*, verifyToken*/, async (req: any, res: Response) => {
  let page = Number(req.query["page"]) || 1;
  let skip = page - 1;
  skip = skip * 10;
  const posts = await Post.find().sort({ _id: -1 }).skip(skip).limit(10).populate("user", "-password").exec();

  res.json({
    ok: true,
    page,
    posts,
  });
});

postRoutes.post("/", verifyToken, (req: any, res: Response) => {
  const body = req.body;
  body.user = req.user;
  const imagenes = fileSystem.imagenesTempAPost(req.user._id);
  body.imgs = imagenes;

  Post.create(body)
    .then(async (postDB) => {
      await postDB.populate("user", "-password").execPopulate();
      res.json({
        ok: true,
        post: postDB,
      });
    })
    .catch((error) => {
      res.json({
        ok: false,
        error,
      });
    });
});

postRoutes.post("/upload", verifyToken, async (req: any, res: Response) => {
  if (!req.files) {
    return res.status(400).json({
      ok: false,
      msg: "No se ha detectado ninguna imagen",
    });
  }

  const file: FileUpload = req.files.image;

  if (!file || !file.mimetype.includes("image")) {
    return res.status(400).json({
      ok: false,
      msg: "No se ha detectado ninguna imagen o no es válida",
    });
  }

  await fileSystem.guardarImagenTemp(file, req.user._id);

  res.json({
    ok: true,
    msg: "Imagen almacenada correctamente",
    file: file.mimetype,
  });
});

postRoutes.get("/image/:userId/:img", verifyToken, async (req: any, res: Response) => {
  const { userId, img } = req.params;
  const pathFoto: any = fileSystem.getFotoUrl(userId, img);

  res.sendFile(pathFoto);

  /*res.json({
    ok: true,
    userId,
    img,
    pathFoto
  });*/
});

export default postRoutes;
