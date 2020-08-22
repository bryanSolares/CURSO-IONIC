import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Interface } from 'readline';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Componente [] = [
    {
    icon: 'american-football',
    name: 'Action Sheet',
    redirecTo: '/action-sheet'  
  },
  {
    icon: 'logo-apple-appstore',
    name: 'Alert',
    redirecTo: '/alert' 
  }
  ]

  constructor() { }

  ngOnInit() {
  }

}

interface Componente{
  icon: string;
  name: string;
  redirecTo: string;
}
