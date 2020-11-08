import { Component } from "@angular/core";
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";
import { DataLocalService } from "../../services/data-local.service";

@Component({
  selector: "app-tab1",
  templateUrl: "tab1.page.html",
  styleUrls: ["tab1.page.scss"],
})
export class Tab1Page {
  Swipersopts = {
    allowSlidePrev: false,
    allowSlideNext: false,
  };

  constructor(private barcodeScan: BarcodeScanner, private dataLocalService: DataLocalService) {}

  scan() {
    this.barcodeScan
      .scan()
      .then((barcodeResult) => {
        console.log(barcodeResult);
        if (!barcodeResult.cancelled) {
          this.dataLocalService.guardarRegistro(barcodeResult.format, barcodeResult.text);
        }else{
          this.dataLocalService.guardarRegistro("QRCode", "geo:14.6222328,-90.5185188");  
        }
      })
      .catch((err) => {
        console.log(err);
        //this.dataLocalService.guardarRegistro("QRCode", "https://www.google.com");
        this.dataLocalService.guardarRegistro("QRCode", "geo:14.6222328,-90.5185188");
      });
  }
  ionViewWillEnter() {
    this.scan();
    // console.log("1.--------- ionViewWillEnter -> Inicia carga de página");
  }

  /* 
  ionViewDidEnter() {
    console.log("2.--------- ionViewDidEnter -> cuando la vista es cargarda la 100%");
  }

  ionViewWillLeave(){
   console.log("3.--------- ionViewWillLeave -> Inicia cierre de página");
  }
  ionViewDidLeave() {
    console.log("4.--------- ionViewDidLeave -> cuando salió de la vista del usuario");
  } */
}
