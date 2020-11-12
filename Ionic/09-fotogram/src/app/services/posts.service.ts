import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ResponsePost } from "../interfaces/interfaces";

const endPointBase = environment.endpoint;

@Injectable({
  providedIn: "root",
})
export class PostsService {
  pagePost = 0;

  constructor(private http: HttpClient) {}

  getPosts(pull: boolean = false) {
    pull ? (this.pagePost = 0) : this.pagePost++;
    return this.http.get<ResponsePost>(`${endPointBase}/post?page=${this.pagePost}`);
  }
}
