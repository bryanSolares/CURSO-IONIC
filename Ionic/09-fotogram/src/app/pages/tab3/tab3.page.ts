import { Component, OnInit } from "@angular/core";
import { UsuarioService } from "src/app/services/usuario.service";
import { User } from "../../interfaces/interfaces";
import { NgForm } from "@angular/forms";
import { UIServiceService } from "../../services/uiservice.service";
import { PostsService } from '../../services/posts.service';

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page implements OnInit {
  user: User = {};

  constructor(private usuarioService: UsuarioService, private uiService: UIServiceService, private postService: PostsService) {}

  ngOnInit(): void {
    this.user = this.usuarioService.getUsuario();
  }

  async actualizar(fActualizar: NgForm) {
    if (fActualizar.invalid) {
      return;
    }

    const actualizado = await this.usuarioService.updateUser(this.user);
    actualizado
      ? this.uiService.alertaInformativaToast("Modificación Exitosa")
      : this.uiService.alertaInformativaToast("Error en la actualización");
  }

  logout() {
    this.postService.pagePost = 0;
    this.usuarioService.logout();
  }
}
