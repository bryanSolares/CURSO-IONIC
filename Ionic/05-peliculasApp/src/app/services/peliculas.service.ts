import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { ResponseMovieDB } from '../intefaces/intefaces';

const apiKey = environment.apiKey;
const url = environment.urlApi;
const languageApi = environment.lgApi;
const languageImg = environment.lgApiImg;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }

  private executeQuery<T>(query: string){
    query = url.concat(query);
    query += `&api_key=${apiKey}&language=${languageApi}&include_image_language=${languageImg}`;
    return this.http.get<T>(query);
  }


  getFeatures(){
    const toDay = new Date();
    const lastDay = new Date(toDay.getFullYear(),toDay.getMonth() + 1, 0).getDate();
    const currentMouth = toDay.getMonth() + 1;

    let mouthString;

    if (currentMouth < 10) {
      mouthString = '0' + currentMouth;
    }else{
      mouthString = currentMouth;
    }

    const init = `${toDay.getFullYear()}-${mouthString}-01`;
    const end = `${toDay.getFullYear()}-${mouthString}-${lastDay}`;

    return this.executeQuery<ResponseMovieDB>(`/discover/movie?primary_release_date.gte=${init}&primary_release_date.lte=${end}`);
  }

}
