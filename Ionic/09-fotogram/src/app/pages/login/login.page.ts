import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { IonSlides, NavController } from "@ionic/angular";
import { UsuarioService } from "../../services/usuario.service";
import { UIServiceService } from "../../services/uiservice.service";
import { User } from "../../interfaces/interfaces";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"],
})
export class LoginPage implements OnInit {
  @ViewChild("slidePrincipal") slides: IonSlides;

  

  loginUser = {
    email: "test1@test.com",
    password: "123",
  };

  registerUser: User = {
    name: "Josué Perez",
    email: "test2@test.com",
    password: "1234",
    avatar: 'av-1.png'
  };

  constructor(
    private userService: UsuarioService,
    private navController: NavController,
    private uiService: UIServiceService
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    const response = await this.userService.login(this.loginUser);
    response
      ? this.navController.navigateRoot("main/tabs/tab1", { animated: true })
      : this.uiService.alertaInformativa("Usuario o Contraseña son incorrectos");
  }

  async registro(fRegistro: NgForm) {
    if (fRegistro.invalid) {
      return;
    }

    const response = await this.userService.register(this.registerUser);
    response
      ? this.navController.navigateRoot("main/tabs/tab1", { animated: true })
      : this.uiService.alertaInformativa("El correo electrónica ya está tomado");
  }

  cambiarSlide(page: number) {
    this.slides.lockSwipes(false);
    this.slides.slideTo(page);
    this.slides.lockSwipes(true);
  }
}
