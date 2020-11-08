import { EventEmitter, Injectable } from "@angular/core";

import { OneSignal, OSNotification, OSNotificationPayload } from "@ionic-native/onesignal/ngx";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root",
})
export class PushService {
  mensajes: OSNotificationPayload[] = [];
  pushListener = new EventEmitter<OSNotificationPayload>();
  userId = "";

  constructor(private oneSignal: OneSignal, private ionicStorage: Storage) {
    this.cargarMensajes();
  }

  initialConfig() {
    this.oneSignal.startInit("a996157c-06fb-4313-aeb7-113f8e1f3663", "48028852463");
    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
    this.oneSignal.handleNotificationReceived().subscribe((notification) => {
      // hacer algo cuando se recibe la notificación
      console.log("Notificación Recibida:", notification);
      this.notificacionRecibida(notification);
    });

    this.oneSignal.handleNotificationOpened().subscribe(async (notification) => {
      // hacer algo cuando se abre la notificación
      console.log("Notificación Abierta:", notification);
      await this.notificacionRecibida(notification.notification);
    });

    this.oneSignal.getIds().then((ids) => {
      this.userId = ids.userId;
    });
    this.oneSignal.endInit();
  }

  async notificacionRecibida(notificacion: OSNotification) {
    await this.cargarMensajes();
    const payload = notificacion.payload;
    const existePush = this.mensajes.find((mensaje) => mensaje.notificationID === payload.notificationID);
    if (existePush) {
      return;
    }

    this.mensajes.unshift(payload);
    this.pushListener.emit(payload);
    this.guardarMensajes();
  }

  guardarMensajes() {
    this.ionicStorage.set("mensajes", this.mensajes);
  }

  async cargarMensajes() {
    this.mensajes = (await this.ionicStorage.get("mensajes")) || [];
    return this.mensajes;
  }

  async getMensajes() {
    await this.cargarMensajes();
    return [...this.mensajes];
  }

  async limpiarStorage() {
    this.mensajes = [];
    await this.ionicStorage.clear();
  }
}
