import { ApplicationRef, Component, OnInit } from "@angular/core";
import { PushService } from "../services/push.service";
import { OSNotificationPayload } from "@ionic-native/onesignal/ngx";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  mensajes: OSNotificationPayload[] = [];

  constructor(public pushService: PushService, private applicationRef: ApplicationRef) {}

  ngOnInit(): void {
    this.pushService.pushListener.subscribe((noti) => {
      this.mensajes.unshift(noti);
      this.applicationRef.tick();
    });
  }

  async ionViewWillEnter() {
    this.mensajes = await this.pushService.getMensajes();
  }

  async limpiarStorage() {
    await this.pushService.limpiarStorage();
    this.mensajes = await this.pushService.getMensajes();
  }
}
