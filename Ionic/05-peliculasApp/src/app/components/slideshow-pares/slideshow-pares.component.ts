import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";

import { DetalleComponent } from "../detalle/detalle.component";
import { Movie } from "./../../interfaces/interfaces";

@Component({
  selector: "app-slideshow-pares",
  templateUrl: "./slideshow-pares.component.html",
  styleUrls: ["./slideshow-pares.component.scss"],
})
export class SlideshowParesComponent implements OnInit {
  @Input() peliculas: Movie[];
  @Output() cargarMas = new EventEmitter();

  slidesOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10,
  };

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  onClick() {
    this.cargarMas.emit();
  }

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
