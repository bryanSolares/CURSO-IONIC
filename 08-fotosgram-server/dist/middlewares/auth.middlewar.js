"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const token_1 = __importDefault(require("../clases/token"));
exports.verifyToken = (req, res, next) => {
    const token = req.headers["x-token"] || "";
    // const token = req.get("x-token") || "";
    token_1.default.compareToken(token)
        .then((decoded) => {
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
