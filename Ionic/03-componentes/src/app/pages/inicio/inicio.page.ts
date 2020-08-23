import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  componentes: Componente[] = [
    {
      icon: 'american-football',
      name: 'Action Sheet',
      redirecTo: '/action-sheet',
    },
    {
      icon: 'logo-apple-appstore',
      name: 'Alert',
      redirecTo: '/alert',
    },
    {
      icon: 'beaker',
      name: 'Avatar',
      redirecTo: '/avatar',
    },
    {
      icon: 'radio-button-on',
      name: 'Button',
      redirecTo: '/button',
    },
    {
      icon: 'card',
      name: 'Cards',
      redirecTo: '/card',
    },
    {
      icon: 'checkmark-circle-outline',
      name: 'Checkbox',
      redirecTo: '/checkbox',
    }
  ];

  constructor() {}

  ngOnInit() {}
}

interface Componente {
  icon: string;
  name: string;
  redirecTo: string;
}
