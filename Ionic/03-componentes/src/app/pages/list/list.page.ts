import { Component, OnInit, ViewChild } from '@angular/core';
import { IonList, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  usuarios: Observable<any>;
  @ViewChild('lista') lista: IonList;

  constructor(private dataService: DataService, private toastController: ToastController) {}

  ngOnInit() {
    this.usuarios = this.dataService.getUsers();
  }

  favorite(user) {
    console.log('favorite', user);
    this.lista.closeSlidingItems();
    this.presentToast('Guardado en Favoritos');
  }
  share(user) {
    console.log('share', user);
    this.lista.closeSlidingItems();
    this.presentToast('Compartido!');
  }
  trash(user) {
    console.log('trash', user);
    this.lista.closeSlidingItems();
    this.presentToast('Borrado');
  }

  async presentToast(message: string, position: string = 'top'){
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      position: 'top',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Push bottom ok');
          }
        }
      ]
    });

    await toast.present();
  }
}
