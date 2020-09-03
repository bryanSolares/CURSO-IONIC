import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseTopHeadlines } from '../intefaces/interfaces';
import { environment } from '../../environments/environment';

const apiKey = environment.apiKey;
const apiURL = environment.Url;
const headers = new HttpHeaders({
  'X-Api-Key': apiKey,
  /*'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST',
  'Access-Control-Allow-Headers': 'Content-Type'*/
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  headLinesPage = 0;
  categoriaActual = '';
  categoriaPage = 0;

  constructor(private http: HttpClient) { }

  private ejecutarQuery<T>(query: string){
    query = apiURL + query;
    return this.http.get<T>(query, {headers} );
  }

  getTopHeadLines(){
    this.headLinesPage ++;
    return this.ejecutarQuery<ResponseTopHeadlines>(`/top-headlines?country=us&page=${this.headLinesPage}`);
  }

  getTopHeadLinesCategories(categoria: string){
    if (this.categoriaActual === categoria) {
      this.categoriaPage++;
    }else{
      this.categoriaPage = 1;
      this.categoriaActual = categoria;
    }
    return this.ejecutarQuery<ResponseTopHeadlines>(`/top-headlines?country=de&category=${categoria}&page=${this.categoriaPage}`);
  }

}
