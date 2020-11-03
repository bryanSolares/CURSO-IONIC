import { Component, OnInit, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { DetalleComponent } from "../detalle/detalle.component";
import { Movie } from "./../../interfaces/interfaces";

@Component({
  selector: "app-slidesshow-poster",
  templateUrl: "./slidesshow-poster.component.html",
  styleUrls: ["./slidesshow-poster.component.scss"],
})
export class SlidesshowPosterComponent implements OnInit {
  @Input() peliculas: Movie[] = [];
  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  async mostraDetalle(pelicula: Movie) {
    const modal = await this.modalController.create({
      component: DetalleComponent,
      componentProps: {
        id: pelicula.id,
      },
    });

    modal.present();
  }
}
