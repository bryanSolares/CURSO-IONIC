"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const server_1 = __importDefault(require("./classes/server"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const post_routes_1 = __importDefault(require("./routes/post.routes"));
const server = new server_1.default();
server.app.use(morgan_1.default('dev'));
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use(body_parser_1.default.json());
server.app.use(express_fileupload_1.default({}));
server.app.use(cors_1.default({ origin: true, credentials: true }));
server.app.use("/user", usuario_routes_1.default);
server.app.use("/post", post_routes_1.default);
mongoose_1.default.connect("mongodb://localhost:27017/fotosgram", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log("Conexión Exitosa");
});
server.start(() => {
    console.log(`App online en puerto ${server.port}`);
});
