import { Router, Request, Response } from "express";
import bcrypt from "bcrypt";
import Token from "../clases/token";
import { Usuario } from "../models/usuario.model";
import { verifyToken } from "../middlewares/auth.middlewar";

const userRoutes = Router();

userRoutes.get("/", (req: Request, res: Response) => {
  res.json({ ok: true });
});

userRoutes.post("/create", (req: Request, res: Response) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: req.body.avatar,
  };

  Usuario.create(user)
    .then((userDB) => {
      const token = Token.getJWTToken({
        _id: userDB.id,
        name: userDB.name,
        email: userDB.email,
        avatar: userDB.avatar,
      });

      res.json({
        ok: true,
        msg: "Usuario Creado",
        token,
      });
    })
    .catch((error) => {
      res.json({
        ok: false,
        msg: error,
      });
    });
});

userRoutes.post("/login", (req: Request, res: Response) => {
  const body = req.body;

  Usuario.findOne({ email: body.email }, (error, user) => {
    if (error) throw error;

    if (!user) {
      return res.json({
        ok: false,
        msg: "Usuarios/contraseña no son válidos",
      });
    }

    if (user.compararPassword(body.password)) {
      const token = Token.getJWTToken({ _id: user.id, name: user.name, email: user.email, avatar: user.avatar });
      return res.json({
        ok: true,
        token,
      });
    } else {
      return res.json({
        ok: false,
        token: "Usuarios/contraseña no son válidos",
      });
    }
  });
});

userRoutes.post("/update", verifyToken, (req: any, res: Response) => {
  const user = {
    name: req.body.name || req.user.name,
    email: req.body.email || req.user.email,
    avatar: req.body.avatar || req.user.avatar,
  };

  Usuario.findByIdAndUpdate(req.user._id, user, { new: true }, (error, userDB) => {
    if (error) throw error;

    if (!userDB) {
      return res.json({
        ok: false,
        msg: "No existe usuario con el ID proporcionado",
      });
    }

    const token = Token.getJWTToken({ _id: userDB.id, name: userDB.name, email: userDB.email, avatar: userDB.avatar });
    res.json({
      ok: true,
      token,
    });
  });
});
export default userRoutes;
