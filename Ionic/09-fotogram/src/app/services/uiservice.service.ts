import { Injectable } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Injectable({
  providedIn: "root",
})
export class UIServiceService {
  constructor(private alertController: AlertController) {}

  async alertaInformativa(message: string) {
    const alert = await this.alertController.create({
      message,
      buttons: ["OK"],
      mode: "ios",
    });

    await alert.present();
  }
}
