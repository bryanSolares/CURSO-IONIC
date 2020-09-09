import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const urlImg = environment.imgPath;
const noImg = environment.pathNoImg;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(path: string, size: string = 'w500'): string {
    if (!path) {
      return noImg;
    }

    const imgURL = `${urlImg}/${size}${path}`;
    console.log(imgURL);
    return imgURL;
  }

}
