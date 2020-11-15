import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { FileTransfer, FileUploadOptions, FileTransferObject } from "@ionic-native/file-transfer/ngx";

import { environment } from "../../environments/environment";
import { ResponsePost, Post } from "../interfaces/interfaces";
import { UsuarioService } from "./usuario.service";

const endPointBase = environment.endpoint;

@Injectable({
  providedIn: "root",
})
export class PostsService {
  pagePost = 0;
  nuevoPost = new EventEmitter<Post>();

  constructor(private http: HttpClient, private userService: UsuarioService, private fileTransfer: FileTransfer) {}

  getPosts(pull: boolean = false) {
    pull ? (this.pagePost = 0) : this.pagePost++;
    return this.http.get<ResponsePost>(`${endPointBase}/post?page=${this.pagePost}`);
  }

  createPost(post: Post) {
    const headers = new HttpHeaders({
      "x-token": this.userService.token,
    });

    return new Promise((resolve) => {
      this.http.post(`${endPointBase}/post`, post, { headers }).subscribe((response: any) => {
        console.log(response);
        this.nuevoPost.emit(response.post);
        resolve(true);
      });
    });
  }

  uploadImage(img: string) {
    const options: FileUploadOptions = {
      fileKey: "image",
      headers: {
        "x-token": this.userService.token,
      },
    };

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer
      .upload(img, `${endPointBase}/post/upload`, options)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
