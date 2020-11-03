import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as moment from "moment";
import { environment } from "../../environments/environment";

import { ResponseMBD } from "../interfaces/interfaces";
import { MovieDetail } from "../interfaces/interfaces";
import { ResultCredits } from "../interfaces/interfaces";

const URL = environment.URL;
const API_KEY = environment.API_KEY;

@Injectable({
  providedIn: "root",
})
export class MoviesService {
  // tslint:disable-next-line: max-line-length
  // https://api.themoviedb.org/3/discover/movie?api_key=fe67bda7b02bb6b8b3b59457e29221bb&primary_release_date.gte=2020-01-01&primary_release_date.lte=2020-10-22&language=es&include_image_language=es

  private paginaPopulares = 0;

  constructor(private http: HttpClient) {}

  private executeQuery<T>(query: string) {
    query = `${URL}${query}`;
    query += `&api_key=${API_KEY}`;
    return this.http.get<T>(query);
  }

  getFeatures() {
    const hoy = moment().add("day", -60).format("YYYY-MM-DD");
    const ultimoDia = moment().add("days", 30).format("YYYY-MM-DD");
    return this.executeQuery<ResponseMBD>(
      `/discover/movie?primary_release_date.gte=${hoy}&primary_release_date.lte=${ultimoDia}&language=es&include_image_language=es`
    );
  }

  getPopularies() {
    this.paginaPopulares++;
    return this.executeQuery<ResponseMBD>(`/discover/movie?sort_by=popularity.desc&page=${this.paginaPopulares}`);
  }

  getDetailMovie(id: number) {
    return this.executeQuery<MovieDetail>(`/movie/${id}?a=1`);
  }

  getCreditsMovie(id: number) {
    return this.executeQuery<ResultCredits>(`/movie/${id}/credits?a=1`);
  }

  getSearchMovie(pelicula: string){
    return this.executeQuery<ResponseMBD>(`/search/movie?query=${pelicula}`);
  }
}
