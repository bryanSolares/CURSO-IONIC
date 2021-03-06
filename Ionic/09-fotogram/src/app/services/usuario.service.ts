import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Storage } from "@ionic/storage";

import { environment } from "./../../environments/environment";
import { User } from "../interfaces/interfaces";
import { NavController } from "@ionic/angular";
import { async } from "@angular/core/testing";

const endPointBase = environment.endpoint;

@Injectable({
  providedIn: "root",
})
export class UsuarioService {
  token: string = null;
  private user: User;
  constructor(private http: HttpClient, private storage: Storage, private navController: NavController) {}

  login(dataUser: { email: string; password: string }) {
    return new Promise((resolve) => {
      return this.http.post(`${endPointBase}/user/login`, dataUser).subscribe(async (response: any) => {
        if (response.ok) {
          await this.saveToken(response.token);
          resolve(true);
        } else {
          this.token = null;
          this.storage.clear();
          resolve(false);
        }
      });
    });
  }

  register(dataUser: User) {
    return new Promise((resolve) => {
      return this.http.post(`${endPointBase}/user/create`, dataUser).subscribe(async (response: any) => {
        response.ok ? await this.saveToken(response.token) : (this.token = null), this.storage.clear();
        resolve(response.ok);
      });
    });
  }

  async validateToken(): Promise<boolean> {
    await this.loadToken();
    if (!this.token) {
      this.navController.navigateRoot("/login");
      return Promise.resolve(false);
    }
    return new Promise<boolean>((resolve) => {
      const headers = new HttpHeaders({ "x-token": this.token });
      return this.http.get(`${endPointBase}/user`, { headers }).subscribe((response: any) => {
        if (response.ok) {
          this.user = response.user;
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  updateUser(dataUser: User) {
    const headers = new HttpHeaders({
      "x-token": this.token,
    });

    return new Promise((resolve) => {
      this.http.post(`${endPointBase}/user/update`, dataUser, { headers }).subscribe((response: any) => {
        if (response.ok) {
          this.saveToken(response.token);
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  logout() {
    this.token = null;
    this.user = null;
    this.storage.clear();
    this.navController.navigateRoot("/login", { animated: true });
  }

  getUsuario() {
    if (!this.user._id) {
      this.validateToken();
    }
    return { ...this.user };
  }

  async loadToken() {
    this.token = (await this.storage.get("token")) || null;
  }

  async saveToken(token: string) {
    this.token = token;
    await this.storage.set("token", token);
    await this.validateToken();
  }
}
