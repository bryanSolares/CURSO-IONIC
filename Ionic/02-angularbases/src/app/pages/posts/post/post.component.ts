import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
})
export class PostComponent implements OnInit {

  @Input()post;
  @Output() clickPost = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.clickPost.emit(this.post.id);
  }

}
