import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../intefaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  noticias: Article[] = [];

  constructor(private newService: NoticiasService) {}

  ngOnInit(): void {
    this.cargarNoticias();
  }

  loadData(event){
    this.cargarNoticias(event);
  }

  private cargarNoticias(event?){
    this.newService.getTopHeadLines().subscribe(response => {
      if (response.articles.length === 0) {
        if (event) {
          event.target.disabled = true;
          event.target.complete();
          return;
        }
      }
      this.noticias.push(...response.articles);
      if (event) {
        event.target.complete();
      }
    });
  }

}
