import { Injectable } from "@angular/core";
import { NavController } from "@ionic/angular";
import { Storage } from "@ionic/storage";

import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { File } from "@ionic-native/file/ngx";
import { EmailComposer } from "@ionic-native/email-composer/ngx";

import { Registro } from "./../models/registro.model";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  registros: Registro[] = [];

  constructor(
    private storage: Storage,
    private navController: NavController,
    private inAppBrowser: InAppBrowser,
    private file: File,
    private emailComposer: EmailComposer
  ) {
    this.cargarRegistros();
  }

  async guardarRegistro(format: string, text: string) {
    await this.cargarRegistros();
    const nuevoRegistro = new Registro(format, text);
    this.registros.unshift(nuevoRegistro);
    this.storage.set("registros", this.registros);
    this.abrirRegistro(nuevoRegistro);
  }

  async cargarRegistros() {
    this.registros = (await this.storage.get("registros")) || [];
  }

  abrirRegistro(registro: Registro) {
    this.navController.navigateForward("/tabs/tab2");
    switch (registro.type) {
      case "http":
        this.inAppBrowser.create(registro.text, "_system");
        break;
      case "geo":
        this.navController.navigateForward(`/tabs/tab2/mapa/${registro.text}`);
        break;

      default:
        break;
    }
  }

  enviarEmail() {
    let arrTemp = [];
    const titulos = "Tipo, Formato, Creado en, Texto\n";
    arrTemp.push(titulos);
    this.registros.forEach((r) => {
      const linea = `${r.type}, ${r.format}, ${r.created}, ${r.text.replace(",", " ")}\n`;
      arrTemp.push(linea);
    });

    this.crearArchivo(arrTemp.join(""));
  }

  crearArchivo(texto: string) {
    this.file
      .checkFile(this.file.dataDirectory, "registros.csv")
      .then((existe) => {
        console.log(existe);
        return this.escribirEnArchivo(texto);
      })
      .catch((err) => {
        return this.file
          .createFile(this.file.dataDirectory, "registros.csv", false)
          .then((fileEntry) => {
            this.escribirEnArchivo(texto);
          })
          .catch((errr) => {
            console.log(err);
          });
      });
  }

  async escribirEnArchivo(texto: string) {
    await this.file.writeExistingFile(this.file.dataDirectory, "registros.csv", texto);

    const archivo = `${this.file.dataDirectory}'registros.csv'`;

    const email = {
      to: "solares.josue@outlook.com",
      // cc: "",
      // bcc: ["", ""],
      attachments: [
        /*"file://img/logo.png",
        "res://icon.png",
        "base64:icon.png//iVBORw0KGgoAAAANSUhEUg...",
        "file://README.pdf",*/
        archivo,
      ],
      subject: "Backup Scans",
      body: "Aquí estan los backups de los scans",
      isHtml: true,
    };

    this.emailComposer.open(email);
  }
}
