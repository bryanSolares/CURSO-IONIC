import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../intefaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController, ToastController } from '@ionic/angular';

import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() contador: number;
  @Input() enFavoritos;

  constructor(
    private iab: InAppBrowser,
    private actionSheetController: ActionSheetController,
    private socialSharing: SocialSharing,
    private dataLocalService: DataLocalService,
    private toastController: ToastController) { }

  ngOnInit() {}

  abrirNoticia(){
    // console.log('Noticia:',this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu(){

    let guardarBorrarBoton;

    if (this.enFavoritos) {
      guardarBorrarBoton = {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.borrarNoticia(this.noticia);
          this.lanzarToast('Eliminado de Favoritos');
        }
      }
    }else{
      guardarBorrarBoton = {
        text: 'Favorito',
        icon: 'heart',
        cssClass: 'action-dark',
        handler: () => {
          this.dataLocalService.guardarNoticia(this.noticia);
          this.lanzarToast('Agregado a Favoritos');
        }
      }
    }

    const actionSheet = await this.actionSheetController.create({
      buttons: [
      {
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,
            '',
            this.noticia.url
          )
        }
      },
      guardarBorrarBoton,
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  async lanzarToast(message: string){
    const toast = this.toastController.create({
      message,
      duration: 1500,
      position: 'bottom'
    });

    await (await toast).present();
  }

}
