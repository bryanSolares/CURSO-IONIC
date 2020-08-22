import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {

  posts: any [] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    /* this.dataService.getPosts().subscribe( (data: any) => {
      this.posts = data;
    }); */

    this.posts = this.dataService.getPosts();
  }

  escuchaPadre(evento){
    console.log('Click en:', evento);
  }


}
