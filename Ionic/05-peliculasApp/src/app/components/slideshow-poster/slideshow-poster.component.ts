import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/intefaces/intefaces';

@Component({
  selector: 'app-slideshow-poster',
  templateUrl: './slideshow-poster.component.html',
  styleUrls: ['./slideshow-poster.component.scss'],
})
export class SlideshowPosterComponent implements OnInit {

  @Input()peliculasRecientes: Movie[] = [];

  opciones = {
    spaceBetween: 0,
    slidesPerView: 3.3,
    freeMode: true
  }

  constructor() { }

  ngOnInit() {
  }

}
