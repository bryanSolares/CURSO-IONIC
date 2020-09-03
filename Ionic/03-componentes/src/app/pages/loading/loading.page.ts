import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.page.html',
  styleUrls: ['./loading.page.scss'],
})
export class LoadingPage implements OnInit {

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
    this.presentLoading('Espere');
    setTimeout(() => {
      this.loadingController.dismiss();
    }, 3500);
  }

  async presentLoading(message: string){
    const loading = await this.loadingController.create({
      message,
      // duration: 2000
    });

    loading.present();
  }

}
