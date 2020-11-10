"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const server_1 = __importDefault(require("./clases/server"));
const usuario_routes_1 = __importDefault(require("./routes/usuario.routes"));
const server = new server_1.default();
server.app.use(body_parser_1.default.urlencoded({ extended: false }));
server.app.use(body_parser_1.default.json());
server.app.use("/user", usuario_routes_1.default);
mongoose_1.default.connect("mongodb://localhost:27017/fotosgram", { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        throw err;
    }
    console.log("Conexión Exitosa");
});
server.start(() => {
    console.log(`App online en puerto ${server.port}`);
});
