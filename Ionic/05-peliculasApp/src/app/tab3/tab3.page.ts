import { Component, OnInit } from "@angular/core";
import { DataLocalService } from "../services/data-local.service";
import { MoviesService } from "../services/movies.service";
import { MovieDetail } from "../interfaces/interfaces";
import { Genre } from "./../interfaces/interfaces";

@Component({
  selector: "app-tab3",
  templateUrl: "tab3.page.html",
  styleUrls: ["tab3.page.scss"],
})
export class Tab3Page {
  peliculasFavoritos: MovieDetail[] = [];
  generos: Genre[] = [];
  categorizacionGenerosPeliculas: any[] = [];

  constructor(private dataLocalService: DataLocalService, private movieService: MoviesService) {}

  ionViewWillEnter() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.peliculasFavoritos = await this.dataLocalService.cargarFavoritos();
    this.generos = await this.movieService.getGenrs();
    this.peliculasPorGenero(this.generos, this.peliculasFavoritos);
  }

  peliculasPorGenero(generos: Genre[], peliculaDetalle: MovieDetail[]) {
    this.categorizacionGenerosPeliculas = [];
    generos.forEach((e) => {
      if (!this.categorizacionGenerosPeliculas.find((ee) => ee.id === e.id)) {
        this.categorizacionGenerosPeliculas.push({
          genero: e.name,
          pelis: peliculaDetalle.filter((eee) => eee.genres.find((eeee) => eeee.id === e.id)),
        });
      }
    });

    console.log(this.categorizacionGenerosPeliculas);
  }

  closeModal() {
    this.cargarDatos();
    console.log("close modal");
  }
}
