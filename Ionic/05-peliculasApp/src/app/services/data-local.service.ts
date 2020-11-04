import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { MovieDetail } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class DataLocalService {
  peliculas: MovieDetail[] = [];

  constructor(private storage: Storage) {
    this.cargarFavoritos();
  }

  guardarPelicula(pelicula: MovieDetail) {
    let resultadoStorage = [];

    if (this.peliculas.length === 0 || !this.peliculas.find((e) => e.id === pelicula.id)) {
      this.peliculas.push(pelicula);
      resultadoStorage.push("Pelicula Agregada a Favoritos");
      resultadoStorage.push(true);
    } else {
      this.peliculas = this.peliculas.filter((e) => e.id !== pelicula.id);
      resultadoStorage.push("Pelicula removida de Favoritos");
      resultadoStorage.push(false);
    }
    this.storage.set("movies", this.peliculas);
    return resultadoStorage;
  }

  async cargarFavoritos() {
    const peliculasStorage = await this.storage.get("movies");
    this.peliculas = peliculasStorage || [];
    return this.peliculas;
  }

  async existePelicula(id) {
    await this.cargarFavoritos();
    const existe = this.peliculas.find((e) => e.id === id);
    return existe ? true : false;
  }
}
