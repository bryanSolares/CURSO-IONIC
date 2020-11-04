import { Component, Input, OnInit } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { MovieDetail, ResultCredits, Cast } from "../../interfaces/interfaces";
import { ModalController, ToastController } from "@ionic/angular";
import { DataLocalService } from "../../services/data-local.service";
import { duration } from "moment";

@Component({
  selector: "app-detalle",
  templateUrl: "./detalle.component.html",
  styleUrls: ["./detalle.component.scss"],
})
export class DetalleComponent implements OnInit {
  @Input() id;
  detallePelicula: MovieDetail;
  actores: Cast[];
  detalleSlice = 150;
  slideActors = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5,
  };
  star = "";

  constructor(
    private moviesServices: MoviesService,
    private dataLocalService: DataLocalService,
    private modalControler: ModalController,
    private toasController: ToastController
  ) {}

  async ngOnInit() {
    this.dataLocalService.existePelicula(this.id).then((existe) => (this.star = existe ? "star" : "star-outline"));

    this.moviesServices.getDetailMovie(this.id).subscribe((response) => {
      this.detallePelicula = response;
    });

    this.moviesServices.getCreditsMovie(this.id).subscribe((response) => {
      this.actores = response.cast;
    });
  }

  regresar() {
    this.modalControler.dismiss();
  }

  async favorito() {
    const resultadoStorage = this.dataLocalService.guardarPelicula(this.detallePelicula);
    const toast = await this.toasController.create({
      message: resultadoStorage[0],
      duration: 2000,
      //<position: "top",
    });
    toast.present();
    this.star = resultadoStorage[1] ? "star" : "star-outline";
  }
}
