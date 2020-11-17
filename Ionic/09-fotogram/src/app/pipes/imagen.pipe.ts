import { Pipe, PipeTransform } from "@angular/core";
import { environment } from "../../environments/environment";

const endPoing = environment.endpoint;

@Pipe({
  name: "imagen",
})
export class ImagenPipe implements PipeTransform {
  // {{local}}/post/image/5fa9f3632e066c4bf468e75d/58l3azwkhcom0ft.jpg

  transform(img: string, userId: string): string {
    return `${endPoing}/post/image/${userId}/${img}`;
  }
}
