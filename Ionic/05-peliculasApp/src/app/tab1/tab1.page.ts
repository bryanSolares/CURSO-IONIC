import { Component, OnInit } from '@angular/core';
import { PeliculasService } from '../services/peliculas.service';
import { Movie } from '../intefaces/intefaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  peliculasRecientes: Movie[] = [];

  constructor(private peliculasService: PeliculasService) {
  }

  ngOnInit(): void {
    this.peliculasService.getFeatures().subscribe(data => {
      console.log(data.results);
      this.peliculasRecientes = data.results;
    });
  }

}
