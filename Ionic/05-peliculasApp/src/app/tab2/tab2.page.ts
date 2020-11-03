import { Component } from "@angular/core";
import { MoviesService } from "../services/movies.service";
import { Movie } from "../interfaces/interfaces";
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  textoBuscar = "";
  ideas: string[] = ["Spiderman", "Avenger", "El Señor de los Anillos", "Hulk", "La vida es bella"];
  peliculasBuscadas: Movie[] = [];
  cargando = false;

  constructor(private movieService: MoviesService, private modalController: ModalController) {}

  buscar(event) {
    const valor: string = event.detail.value;
    if (valor.length === 0) {
      this.cargando = false;
      return (this.peliculasBuscadas = []);
    }
    this.cargando = true;
    this.movieService.getSearchMovie(valor).subscribe((response) => {
      this.peliculasBuscadas = response.results;
      this.cargando = false;
    });
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
