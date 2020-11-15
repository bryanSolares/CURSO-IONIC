import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Post } from "src/app/interfaces/interfaces";
import { PostsService } from "../../services/posts.service";

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

declare var window: any;

@Component({
  selector: "app-tab2",
  templateUrl: "tab2.page.html",
  styleUrls: ["tab2.page.scss"],
})
export class Tab2Page {
  tempImages: string[] = [];
  post: Post = {
    message: "",
    coords: null,
    position: false,
  };
  cargandoGeo = false;

  constructor(
    private postService: PostsService,
    private route: Router,
    private geoLocation: Geolocation,
    private camera: Camera
  ) {}

  async crearPost() {
    await this.postService.createPost(this.post);
    this.post = { message: "", coords: null, position: false };
    this.route.navigateByUrl("/main/tabs/tab1");
  }

  getGeo() {
    if (!this.post.position) {
      this.cargandoGeo = false;
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;
    this.geoLocation
      .getCurrentPosition()
      .then((resp) => {
        this.cargandoGeo = false;
        const coords = `${resp.coords.latitude},${resp.coords.longitude}`;
        this.post.coords = coords;
      })
      .catch((error) => {
        this.cargandoGeo = false;
      });
  }

  camara() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA,
    };

    this.procesarImage(options);
  }

  libreria() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY ,
    };

    this.procesarImage(options);
  }

  private procesarImage(options: CameraOptions) {
    this.camera.getPicture(options).then(
      (imageData) => {
        const img = window.Ionic.WebView.convertFileSrc(imageData);
        console.log(img);
        this.tempImages.push(imageData);
      },
      (err) => {
        // Handle error
      }
    );
  }
}
