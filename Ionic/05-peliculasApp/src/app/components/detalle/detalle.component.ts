import { Component, Input, OnInit } from "@angular/core";
import { MoviesService } from "../../services/movies.service";
import { MovieDetail, ResultCredits, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';

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
    spaceBetween: -5
  }

  constructor(private moviesServices: MoviesService, private modalControler: ModalController) {}

  ngOnInit() {
    this.moviesServices.getDetailMovie(this.id).subscribe((response) => {
      this.detallePelicula = response;
    });

    this.moviesServices.getCreditsMovie(this.id).subscribe((response) => {
      this.actores = response.cast;
    });
  }

  regresar(){
    this.modalControler.dismiss();
  }

  favorito(){
    
  }
}
