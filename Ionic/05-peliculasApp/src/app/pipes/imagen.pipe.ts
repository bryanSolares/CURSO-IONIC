import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

const imgURL = environment.IMG_PATH;

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  // w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

  transform(img: string, size: string = "w500"): string {
    if (!img) {
      return "./assets/no-image-banner.jpg";
    }

    return `${imgURL}/${size}${img}`;
  }
}
