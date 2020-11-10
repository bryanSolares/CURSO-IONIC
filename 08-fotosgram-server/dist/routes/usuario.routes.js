"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_1 = __importDefault(require("../clases/token"));
const usuario_model_1 = require("../models/usuario.model");
const auth_middlewar_1 = require("../middlewares/auth.middlewar");
const userRoutes = express_1.Router();
userRoutes.get("/", (req, res) => {
    res.json({ ok: true });
});
userRoutes.post("/create", (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10),
        avatar: req.body.avatar,
    };
    usuario_model_1.Usuario.create(user)
        .then((userDB) => {
        const token = token_1.default.getJWTToken({
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
userRoutes.post("/login", (req, res) => {
    const body = req.body;
    usuario_model_1.Usuario.findOne({ email: body.email }, (error, user) => {
        if (error)
            throw error;
        if (!user) {
            return res.json({
                ok: false,
                msg: "Usuarios/contraseña no son válidos",
            });
        }
        if (user.compararPassword(body.password)) {
            const token = token_1.default.getJWTToken({ _id: user.id, name: user.name, email: user.email, avatar: user.avatar });
            return res.json({
                ok: true,
                token,
            });
        }
        else {
            return res.json({
                ok: false,
                token: "Usuarios/contraseña no son válidos",
            });
        }
    });
});
userRoutes.post("/update", auth_middlewar_1.verifyToken, (req, res) => {
    const user = {
        name: req.body.name || req.user.name,
        email: req.body.email || req.user.email,
        avatar: req.body.avatar || req.user.avatar,
    };
    usuario_model_1.Usuario.findByIdAndUpdate(req.user._id, user, { new: true }, (error, userDB) => {
        if (error)
            throw error;
        if (!userDB) {
            return res.json({
                ok: false,
                msg: "No existe usuario con el ID proporcionado",
            });
        }
        const token = token_1.default.getJWTToken({ _id: userDB.id, name: userDB.name, email: userDB.email, avatar: userDB.avatar });
        res.json({
            ok: true,
            token,
        });
    });
});
exports.default = userRoutes;
