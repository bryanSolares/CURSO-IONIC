import { Component, OnInit } from "@angular/core";
import { MoviesService } from "../services/movies.service";

import { Movie } from './../interfaces/interfaces';
@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  peliculasRecientes: Movie[] = [];
  peliculasPopulares: Movie[] = [];

  constructor(private moviesServices: MoviesService) {}

  ngOnInit(): void {
    this.moviesServices.getFeatures().subscribe((response) => {
      this.peliculasRecientes = response.results;
    });

    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.moviesServices.getPopularies().subscribe((response) => {
      const arrTemp = [...this.peliculasPopulares, ...response.results];
      this.peliculasPopulares = arrTemp;
    });
  }
}
