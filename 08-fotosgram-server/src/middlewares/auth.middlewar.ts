import { Response, Request, NextFunction } from "express";
import Token from "../clases/token";

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers["x-token"] || "";
  // const token = req.get("x-token") || "";

  Token.compareToken(token)
    .then((decoded: any) => {
      req.user = decoded.usuario;
      next();
    })
    .catch((err) => {
      return res.json({
        ok: false,
        msg: "Token no válido",
      });
    });
};
