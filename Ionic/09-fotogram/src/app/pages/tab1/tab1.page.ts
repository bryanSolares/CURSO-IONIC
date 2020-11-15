import { Component, OnInit } from "@angular/core";
import { PostsService } from "../../services/posts.service";
import { Post } from "../../interfaces/interfaces";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page implements OnInit {
  posts: Post[] = [];
  infiniteHabilitado = true;

  constructor(private postsServices: PostsService) {}

  ngOnInit(): void {
    this.siguiente();
    this.postsServices.nuevoPost.subscribe((postNuevo) => {
      this.posts.unshift(postNuevo);
    });
  }

  siguiente(event?, pull = false) {
    this.postsServices.getPosts(pull).subscribe((response) => {
      this.posts.push(...response.posts);
      if (event) {
        event.target.complete();
        if (response.posts.length === 0) {
          this.infiniteHabilitado = false;
        }
      }
    });
  }

  recargar(event) {
    this.siguiente(event, true);
    this.posts = [];
    this.infiniteHabilitado = true;
  }
}
