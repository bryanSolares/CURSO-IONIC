import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from '../../services/noticias.service';
import { Article } from '../../intefaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild(IonSegment) segment: IonSegment;
  categorias = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
  noticias: Article[] = [];

  constructor(private newService: NoticiasService) {}

  ngOnInit(): void {
  }

  ionViewDidEnter(){
    this.segment.value = this.categorias[0];
    this.cargarNoticias(this.cargarNoticias[0]);
  }

  segmentChanged(event){
    this.noticias = [];
    this.cargarNoticias(event.target.value);
  }

  loadData(event){
   this.cargarNoticias(this.segment.value, event);
  }
  private cargarNoticias(categoria: string, event?){
    this.newService.getTopHeadLinesCategories(categoria).subscribe(data => {
      this.noticias.push(...data.articles);
      if (event) {
        event.target.complete();
        if (data.articles.length === 0) {
          // event.target.disabled = true;
        }
      }


    });
  }


}
