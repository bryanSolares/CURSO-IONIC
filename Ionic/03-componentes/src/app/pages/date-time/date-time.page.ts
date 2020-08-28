import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-time',
  templateUrl: './date-time.page.html',
  styleUrls: ['./date-time.page.scss'],
})
export class DateTimePage implements OnInit {

  fechaNac: Date = new Date();
  customPickerOptions;
  customeDate;

  constructor() { }

  ngOnInit() {
    this.customPickerOptions = {
      buttons: [
        {
          text: 'Save',
          handler: (evt) => {console.log('Clicked Save!'), console.log(evt) }
        },
        {
          text: 'Log',
          handler: () => {
            console.log('Clicked Log, Do not Dismiss');
            return false;
          }
        }
      ]
    };
  }

  cambioFecha(event){
    console.log('ionChange: ', event);
    console.log('Date', new Date(event.detail.value));
  }

}
